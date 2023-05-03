import React, {useState, useReducer} from "react";
import { Route, Link, Routes, useNavigate  } from "react-router-dom";
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

//#region Icons
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import HttpsIcon from '@mui/icons-material/Https';
/* For the profile picture */ import ImageIcon from '@mui/icons-material/Image';
//#endregion Icons

const LoginPage = ({ setState, state }) => {

  const initialState = {
    msg: "",
    contactServer: {
      contactEstablished:false,
      success:false /** Temp */
    },
    email:"",password:"",
    prevEmail:"",prevPassword:"",
  };
  const reducer = (state, newState) => ({ ...state, ...newState });
  const [_state, set_State] = useReducer(reducer, initialState);


  //#region Sign-in
  const handleEmailChange = (event) => {
    set_State({ /*userdata:{*/email: event.target.value /*}*/});    
  };
  const handlePasswordChange = (event) => {
    set_State({ /*userdata:{*/password: event.target.value /*}*/});
  };

  const attemptSigninWithCredentials = async (/*_email, _password*/) => {
    try {
      set_State({
        msg: "Contacting Server...",
      });
      
      let response = await fetch("http://localhost:5000/graphql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
        body: JSON.stringify({
          query:
          /** @todo remove `UUID`, `email` and `password` for security reasons */
            `query { signinuser (email: "${_state.email}", password: "${_state.password}") {UUID, email, username,firstname,lastname,password,verified,country, profilepictureURI} }`,
        }),
      });

      let json = await response.json();
      console.log("Body Data Success? ", json);
      /** Forces re-render */
      setState({});
      if(json.data.signinuser!==null) {
        set_State({msg:"Redirecting to main site soon..."});
        window.localStorage.setItem('userdata',JSON.stringify(json.data.signinuser));
        setState({
          userdata: json.data.signinuser,
          contactServer: true,
        });
        /** Redirect here */
        /** Have go back to previous VALIDATED page (eg: home, projects, ect., NOT login, Signup, ect. that uses personal info/contact server.) */
        window.location.pathname = "/home";
        // console.log(window.location.pathname);
      } else {
        set_State({msg:"Email or password is incorrect"});
      }
      
    } catch (error) {
      console.log(error);
      set_State({msg:"There has been an error"});
      setState({
        contactServer: false,
      });
    }
  };

  const handleSignInButtonClick = (event) => {
    //Send to server to validate
    attemptSigninWithCredentials();
  };
  //#endregion Sign-in
  

  return (
    <ThemeProvider theme={theme}>
      <Typography variant="h2" color="white" style={{fontSize:"10vw", textAlign:"center", marginTop:"10px"}}>
            Sign-in
      </Typography> 
      <Card style={{marginLeft:"5vw", marginRight:"5vw"}}>
        <Box style={{marginLeft:"5%",marginRight:"5%", width:"90%", display:"block"}}>
        <Typography variant="body1" color="red" style={{marginTop:"10px", margin:"5%", textAlign:"center"}}>
          {_state.msg}
          </Typography> 
        <TextField
            required
            id="filled-required"
            label="Email"
            fullwidth
            variant="filled"
            autoComplete="email"
            value={_state?.email/*.userdata.email*/}
            onChange={handleEmailChange}
            style={{width:"100%", marginBottom:"10px"}}
          />
        <TextField
            required
            id="filled-password-input"
            label="Password"
            type="password"
            autoComplete="current-password"
            fullwidth
            variant="filled"
            value={_state?.password/*userdata.password*/}
            onChange={handlePasswordChange}
            style={{width:"100%", marginBottom:"10px"}}
            // endAdornment={
            //   <div
            //     className="end-adornment-clickable"
            //     style={{
            //       display: "contents",
            //       opacity: isPasswordVisible ? 1 : 0.5,
            //     }}
            //     onClick={togglePasswordVisibility}
            //   >
            //     {isPasswordVisible ? <VisibilityIcon /> : <VisibilityOffIcon />}
            //   </div>
            // }
          />
          {/* LoadingButton */}
          <Button variant="contained" style={{width:"40%", marginLeft:"30%", marginRight:"30%", marginBottom:"10px"}} 
          onClick={handleSignInButtonClick}
          //disabled={email===previousEmailPassword.email || password===previousEmailPassword.password}
          disabled={_state.email===_state.prevEmail || _state.password===_state.prevPassword}
          loading={true}
          loadingPosition="end"
          >Sign-in</Button>{/* LoadingButton */}
          </Box>
        </Card>
      <Card style={{marginLeft:"5vw", marginRight:"5vw",marginTop:"10px"}}>
        <Button style={{textTransform:"none", width:"100%"}}href={"/signup"}>
          <Typography variant="body1" color="white" style={{marginTop:"10px", margin:"5%", textAlign:"center"}}>
          Don't have an account? Click to Sign-up for free
          </Typography> 
        </Button>
      </Card>
      

    </ThemeProvider>
  );
};
export default LoginPage;
