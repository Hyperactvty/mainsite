import React, {useState, useReducer} from "react";
import { Route, Link, Routes } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import {
  Toolbar,
  Card,
  AppBar,
  CardHeader,
  CardContent,
  Typography,
  Box,
  Stack,
  Button, //LoadingButton,
  Fab,
  IconButton,
  TextField,
  Zoom,
} from "@mui/material";
import theme from "../theme";
import countries from "./countries";

//#region Icons
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import HttpsIcon from '@mui/icons-material/Https';
/* For the profile picture */ import ImageIcon from '@mui/icons-material/Image';
//#endregion Icons

const SignupPage = ({ setState, state }) => {

  const initialState = {
    firstname:"",
    lastname:"",
    username:"",
    email:"",
    confirmEmail:"",
    password:"",
    confirmPassword:"",
    country:"",
  };
  const reducer = (state, newState) => ({ ...state, ...newState });
  const [_state, set_State] = useReducer(reducer, initialState);

  let errorFields = {
    firstname:false,
    lastname:false,
    username:{display:false, message:""},
    email:{display:false, message:"This will help verify your account"},
    confirmEmail:false,
    password:{display:false, message:""},
    confirmPassword:{display:false, message:""},
  };
  const [textFieldErrors, setTextFieldErrors] = useReducer(reducer, errorFields);
  
  //#region Sign-Up
  const validateUserInput = async () => {
    /** Grab username and email from db, check if it exists */
    textFieldErrors.firstname = _state.firstname==="";
    textFieldErrors.lastname= _state.lastname==="";
    /** Check if username exists */
    let serverResponse = await fetch("http://localhost:5000/graphql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
        body: JSON.stringify({
          query:
            `query { grabUsername (username: "${_state.username.toLowerCase()}") {username} }`,
        }),
      });
    let usernameExists = await serverResponse.json();
    let validateUsername = /^[a-zA-Z0-9_]{4,20}$/; //"/^(?=.*)(?=.*[a-z])(.{4,20})$/");
    
    console.log("Is UN Valid: ",/^[a-zA-Z0-9_]{4,20}$/.test(_state.username));
    textFieldErrors.username.display = (usernameExists.data.grabUsername !== null || /*usernameExists.data.grabUsername !== "" ||*/ _state.username === "" || usernameExists.data.grabUsername?.username === "!ERROR_USERNAMEFORBIDDEN");
    // textFieldErrors.username.message = textFieldErrors.username.display ? `"${usernameExists.data.grabUsername}" is already in use` : "";
    if(_state.username === "") {
      textFieldErrors.username.message = "Please provide a username";
    } else if(textFieldErrors.username.display) {
      textFieldErrors.username.message = `"${_state.username}" is already in use`;
    } else { textFieldErrors.username.message = ""; }

    /** Check if passwords match */
    //let strongRegexPassword = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
    //console.log("IsStrong?",strongRegexPassword.test(_state.password));
    /** Password must have 1 number, 1 capital letter, and between 8 and 50 characters */
    const re = new RegExp("/^(?=.*\d)(?=.*[a-zA-Z0-9])(.{8,50})$/");

    //textFieldErrors.password.display = re.test(_state.password);
    let hasNumber = false; let hasCapital = false; let hasLowerCase = false; const isWithinLength = 8<=_state?.password.length && _state?.password.length <=50;
    const _pwd = _state?.password;
    _pwd.split("").forEach(_char => {
      if((_char/0).toString()==="Infinity") {
        hasNumber=true; 
        // break;
      }
    });
    const _capitals = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    _pwd.split("").forEach(_char => {
      _capitals.split("").forEach(_c => {
        if(_c===_char) { hasCapital=true; }
        if(_c.toLowerCase()===_char) { hasLowerCase=true; }
      });
      // if(_char.match(/^[A-Z]$/)===true) {
      //   hasCapital=true; 
      //   // break;
      // }
    });

    const wordMatch = _state?.password.match(/^(?=.*\d)(?=.*[a-zA-Z0-9])(.{8,50})$/);
    console.log("Checking for number in password: ",_state?.password," | Regex Match: ",wordMatch);
    textFieldErrors.password.display = !(hasNumber&&hasCapital&&hasLowerCase&&isWithinLength);//re.test(_state?.password);
    // if(re.test(_state.password)) {
    // if(textFieldErrors.password.display===false) {
    if(_state?.password==="") {
      // textFieldErrors.password.display = re.test(_state?.password);
      textFieldErrors.password.message = "Please provide a password";
    } else if (textFieldErrors.password.display) {
      let _displayParams = [hasNumber ? null : "min. 1 number",hasCapital ? null : "min. 1 capital letter",hasLowerCase ? null : "min. 1 lowercase letter",isWithinLength ? null : "between 8 and 50 characters"].filter(
        (value) => { 
          return value !== null;
        }
      );

      textFieldErrors.password.message = `Password must ${hasNumber&&hasCapital&&hasLowerCase? "be" : "have:"} `+_displayParams.join(", ").toString();
    } else {
      textFieldErrors.password.message = "";
    }
    textFieldErrors.confirmPassword.display = !(_state.password===_state.confirmPassword);

    /** Check if email exists */
    serverResponse = await fetch("http://localhost:5000/graphql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
        body: JSON.stringify({
          query:
            `query { grabEmail (email: "${_state.email.toLowerCase()}") {email} }`,
        }),
      });
    const emailExists = await serverResponse.json();
    const isValidEmail = (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(_state.email));

    textFieldErrors.email.display = (emailExists.data.grabEmail !== null || isValidEmail===false);
    if(_state?.email==="") {
      textFieldErrors.email.message = "Please provide an email";
    } else if (textFieldErrors.email.display) {
      textFieldErrors.email.message = isValidEmail ? `"${_state.email}" is already in use` :
        "Please provide a valid email (?) (example@email.com)";
    } else {
      textFieldErrors.email.message = "";
    }
    textFieldErrors.confirmEmail = !(_state.email===_state.confirmEmail);
    
    /** Forces re-render */
    setState({});
    /** If all is good, then register */
    if(textFieldErrors.firstname===false && textFieldErrors.lastname===false && 
    textFieldErrors.username.display===false && textFieldErrors.email.display===false && /** Comment this line out for testing offline */
    textFieldErrors.confirmEmail===false && textFieldErrors.password.display===false && 
    textFieldErrors.confirmPassword.display===false) {
      console.log("Registering user...");
      registerUser();
    }
    
  };

  const registerUser = async () => {
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    try {

      let response = await fetch("http://localhost:5000/graphql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
        body: JSON.stringify({
          query:
            `mutation {
              newuserregister(
                email: "${_state.email}",
                username: "${_state.username}",
                firstname: "${_state.firstname}",
                lastname: "${_state.lastname}",
                password: "${_state.password}",
                country: ${_state.country==="" ? `"Private"` : `"${_state.country}"`}
              )
              {email,username,firstname,lastname, password, country }}`,
        }),
      });
      let json = await response.json();
      window.localStorage.setItem('userdata',JSON.stringify(json.data.newuserregister));
        setState({
          userdata: json.data.newuserregister,
          contactServer: true,
        });
      /** Button title turn green and say "Success!" */
      /** Redirect here */
      window.location.pathname = "/home";
    } catch (error) {
      console.log(error);
      setState({
        msg: `Problem loading server data - ${error.message}`,
      });
    }
  };

  //#endregion Sign-up

  return (
    <ThemeProvider theme={theme}>
      <Typography variant="h2" color="white" style={{fontSize:"10vw", textAlign:"center", marginTop:"10px"}}>
            Sign-up
      </Typography> 
      <Card style={{marginLeft:"5vw", marginRight:"5vw"}}>
          {/* Sign-up Authentication  */}
          <Box style={{marginLeft:"5%",marginRight:"5%", width:"90%", display:"block"}}>
          <TextField
            required
            autoFocus
            id="first-name"
            label="First Name"
            autoComplete="given-name" // https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#autofill
            fullwidth
            variant="filled"
            error={textFieldErrors.firstname}
            value={_state?.firstname}
            // onClick={textFieldErrors.firstname = _state?.firstname===""}
            // onSelect={textFieldErrors.firstname = _state?.firstname===""}
            onChange={(event) => {
              set_State({ firstname: event.target.value });
              // textFieldErrors.firstname = _state.firstname==="";
            }}
            style={{width:"100%", marginBottom:"10px"}}
          />
          <TextField
            required
            id="last-name"
            label="Last Name"
            autoComplete="family-name"
            fullwidth
            variant="filled"
            error={textFieldErrors.lastname}
            value={_state?.lastname}
            // onSelect={textFieldErrors.lastname = _state?.lastname===""}
            onChange={(event) => {
              set_State({ lastname: event.target.value });
              // textFieldErrors.lastname = _state?.lastname==="";
            }}
            style={{width:"100%", marginBottom:"10px"}}
          />
          <TextField
            required
            id="user-name"
            label="User Name"
            helperText={textFieldErrors?.username.message}
            fullwidth
            variant="filled"
            error={textFieldErrors.username.display}
            value={_state?.username}
            onChange={(event) => { set_State({ username: event.target.value });}}
            onFocus={(e)=> {console.log(e.target.value);}}
            style={{width:"100%", marginBottom:"10px"}}
          />
          {/* <Typography variant="h6" color={theme.palette.error.main} style={{fontSize:16, textAlign:"center", display: textFieldErrors.password.display ? "block" : "none"}}>
            {textFieldErrors.password.message}
          </Typography>  */}
          <TextField
            required
            id="password-input"
            label="Password"
            helperText={textFieldErrors.password.message}
            type="password"
            autoComplete="new-password"
            fullwidth
            variant="filled"
            error={textFieldErrors.password.display}
            // onError={console.log("Password must have 1 number, 1 capital letter, and between 8 and 50 characters")}
            value={_state?.password}
            onChange={(event) => { set_State({ password: event.target.value });}}
            style={{width:"100%", marginBottom:"10px"}}
          />
          {/* <Typography variant="h6" color={theme.palette.error.main} style={{fontSize:16, textAlign:"center", display: textFieldErrors.confirmPassword ? "block" : "none"}}>
            Passwords do not match
          </Typography>  */}
          <TextField
            required
            id="confirm-password-input"
            label="Confirm Password"
            helperText={textFieldErrors.confirmPassword.display ? "Passwords do not match" : ""}
            type="password"
            autoComplete="new-password" // or "confirm-password"
            fullwidth
            variant="filled"
            error={textFieldErrors.confirmPassword.display}
            value={_state?.confirmPassword}
            onChange={(event) => { set_State({ confirmPassword: event.target.value });}}
            style={{width:"100%", marginBottom:"10px"}}
          />
          <TextField
            required
            id="email-helperText"
            label="Email"
            // defaultValue="Default Value"
            helperText={textFieldErrors.email.message}
            // onHover={console.log("Hoveing Email")}
            fullwidth
            variant="filled"
            error={textFieldErrors.email.display}
            value={_state?.email}
            onChange={(event) => { set_State({ email: event.target.value });}}
            style={{width:"100%", marginBottom:"10px"}}
          />
          <TextField
            required
            id="confirm-email"
            label="Confirm Email"
            helperText={textFieldErrors.confirmEmail ? "Emails do not match" : ""}
            fullwidth
            variant="filled"
            error={textFieldErrors.confirmEmail}
            value={_state?.confirmEmail}
            onChange={(event) => { set_State({ confirmEmail: event.target.value });}}
            style={{width:"100%", marginBottom:"10px"}}
          />
          <TextField
            id="country"
            label="Country"
            autoComplete="country-name"
            fullwidth
            variant="filled"
            value={_state?.country}
            onChange={(event) => { set_State({ country: event.target.value });}}
            style={{width:"100%", marginBottom:"10px"}}
          />
          <Button variant="contained" style={{width:"40%", marginLeft:"30%", marginRight:"30%",marginBottom:"10px"}} onClick={validateUserInput} >Sign-up</Button>
          </Box>
        </Card>
      <Card style={{marginLeft:"5vw", marginRight:"5vw",marginTop:"10px"}}>
        <Button style={{textTransform:"none", width:"100%"}} href={"/login"}>
          <Typography variant="body1" color="white" style={{marginTop:"10px", margin:"5%", textAlign:"center"}}>
          Already have an account? Click to Sign-in
          </Typography> 
        </Button>
      </Card>
      

    </ThemeProvider>
  );
};
export default SignupPage;
