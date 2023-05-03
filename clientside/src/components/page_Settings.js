import React, {useReducer} from "react";
import { Route, Link, Routes } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import {
  Toolbar,
  Autocomplete,
  TextField,
  Card, styled,
  AppBar,
  CardHeader,
  CardContent,
  List, ListItem, ListItemText, 
  ListItemButton, ListItemIcon,
  Typography,
  Box,
  Stack,
  Button,
  Fab, SvgIcon,
  IconButton, Chip,
  Zoom,FormControlLabel, FormLabel,
  Accordion, AccordionDetails, AccordionSummary,
  Grid, Switch,
  Modal, Tooltip,
  Input,FormControl,InputLabel,FormHelperText,
} from "@mui/material";
import LoadingButton from './LoadingButton';
//import LoadingButton from '@mui/lab/LoadingButton';
import theme from "../theme";
import countries from "./countries";
import qdb from "./queryDB";

//import fishbotImage from "../media/discordbot_Fishbot_noHyper.png"; /** Grab from db */
import fishbotImage from "../media/discordbot_Fishbot2022.png"; /** Grab from db */
import DiscordIcon from '@mui/icons-material/ShieldMoon';
import EntertainmentIcon from '@mui/icons-material/Tv';
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import CancelIcon from '@mui/icons-material/Cancel';
import UtilityIcon from '@mui/icons-material/Engineering';
import EditAttributesIcon from '@mui/icons-material/EditAttributes';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

// const SETTINGSTABS = [
//   {
//     name:"Account Info", data: {
//       header: "Account Info", data: {
//         label: "Full Name", data: {
//           content: <Typography>First Last</Typography>
//         }

//       },
//       header: "Personal", data: {
//         label: "Theme", data: {
//           content: <Typography>Planned for future</Typography>
//         }
//       }
//     },
//   }, {
//     name: "Security", data: {
//       header: "Basic Info", data: {
//         label: "Verify Account", data: {
//           content: <Button variant="contained">Verify Account</Button>
//         }
//       }
//     },
//   }
// ];

let usrdata = JSON.parse(localStorage.getItem('userdata'));
let changedCountry = false; 
let countrySaveButton = {
  enabled:false,
  isLoading:false,
  finished:false,
  timeout:undefined,
};
let profilePictureUploadButton = {
  enabled:false,
  isLoading:false,
  finished:false,
  timeout:undefined,
};

//#region Edit Buttons
let editFields = {
  accountInfo: {
    fullName: {
      button: {
        isEditing: false,
        allowSave:false,
      },
      //Save?
      firstName: {
        value: JSON.parse(localStorage.getItem('userdata'))?.firstname,
        required: true,
        error: false,
        reset: null,
      },
      lastName: {
        value: JSON.parse(localStorage.getItem('userdata'))?.lastname,
        required: true,
        error: false,
        reset: null,
      },
    },
    password: {
      button: {
        isEditing: false,
        allowSave:false,
      },
      password: {
        value: "********",
        placeholder: "",
        matchesDB: false,
        required: true,
        error: false,
        reset: null,
      },
    }
  }
};
//#endregion Edit Buttons

const ImageInput = styled('input')({
  display: 'none',
});

const SETTINGSTABS = [
  {
    name:"Account Info", data: [
      {
        header: "Account Info", data: [
          {
            label: "Full Name", 
            content: <Typography variant="h6">{usrdata?.firstname} {usrdata?.lastname}</Typography>,
            rightWidget: <IconButton style={{marginLeft:"5px", padding:4,alignContent:"center"}}><EditIcon style={{fontSize:"20px"}}/></IconButton>
            
          }, {
            label: "Username",
            content: <Typography variant="h6">Username</Typography>
          }
        ],
      },{
        header: "Personal", data: [{
          label: "Theme", data: {
            content: <Typography variant="h6">Planned for future</Typography>
          }
        }]
      }
    ],
  }, {
    name: "Security", data: [{
      header: "Basic Info", data: [{
        label: "Verify Account", data: {
          content: <Button variant="contained">Verify Account</Button>
        }
      }]
    }],
  }
];

//#region Helper Methods

/**
 * 
 * @param {string} label 
 * @param {*} defaultValue 
 * @param {*} onChange 
 * @param {*} style 
 * @param {*} helperText 
 * @param {Boolean} required
 * @returns 
 */
const InputForm = ({label, defaultValue, onChange, style={}, helperText, required=false, setState}) => {
  let _idHelper = label.toString().toLowerCase().replace(" ","-");
  let _throwError = false;
  // console.log("defVal: ",defaultValue, " | onChange: ",onChange);
  return (
    <FormControl variant="standard">
      <InputLabel htmlFor={_idHelper}>{label}</InputLabel>
      <Input
        id={_idHelper}
        defaultValue={defaultValue}
        onChange={(e) => {
          defaultValue = e.target.value;
          if(required && defaultValue==="") {
            _throwError =  true;
          }
          setState({});
        }}
        style={style}
        error={_throwError}
        onClose={() => {
          // console.log("onCLose: ",defaultValue, " | onChange: ",onChange);
          if(required && onChange==="") {
            _throwError =  true;
          }
          setState({});
        }}
        aria-describedby={`${_idHelper}-text`}
      />
      <FormHelperText id={`${_idHelper}-text`} style={{display: helperText!=="" ? "block" : "none"}}>
        {helperText}
      </FormHelperText>
    </FormControl>
  );
};

//#endregion Helper Methods

//#region Database Methods
const updateCountry = async (state, setState) => {
  console.log(JSON.parse(window.localStorage.getItem("countryChangeValue")).label);
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
            updateusercountry(
              UUID: "${usrdata?.UUID/*state.id*/}",
              country: "${JSON.parse(window.localStorage.getItem("countryChangeValue")).label}"
            )
            {UUID, country }}`,
      }),
    });
    let json = await response.json();
    // window.localStorage.setItem('userdata',JSON.stringify(json.data.updateusercountry));
    console.log("DB Return: ",json.data?.updateusercountry);
    if(json.data?.updateusercountry===undefined) { 
      countrySaveButton.finished=true; 
      countrySaveButton.isLoading = false;
      setState({});
      // countrySaveButton.enabled = false;
      return -1/*"!ERROR_MISSINGCOUNTRY"*/; 
    }

    /** Update the localstorage and the db */
    let getUserdata = JSON.parse(window.localStorage.getItem("userdata"));
    const findFlagInList = JSON.parse(window.localStorage.getItem("countryChangeValue"));
    const profileFlagBadge = `https://flagcdn.com/w20/${findFlagInList.code.toLowerCase()}.png`;
    getUserdata.countryBadge = profileFlagBadge;
    getUserdata.country = JSON.parse(window.localStorage.getItem("countryChangeValue")).label;
    console.log("Update UD:",getUserdata);
    window.localStorage.setItem('userdata',JSON.stringify(getUserdata));
    usrdata = JSON.parse(localStorage.getItem('userdata'));
    clearTimeout(countrySaveButton.timeout);
    countrySaveButton.finished=true; countrySaveButton.isLoading = false;
    // When success... 
    countrySaveButton.enabled = false;
    setState({});
    
    /** Button title turn green and say "Success!" */
    return 1;
  } catch (error) {
    console.log(error);
    return -1;
    // setState({
    //   msg: `Problem loading server data - ${error.message}`,
    // });
  }
};

const updateProfilePicture = async (setState) => {
  // blob64
  const profilePicture = document.getElementById("preview3").src;//.substring(document.getElementById("preview3").src.indexOf(',') + 1);
  let dbGrab = await qdb(
    "mutation",
    "updateprofilepicture",
    `UUID: "${usrdata?.UUID}",
    profilepictureURI: "${profilePicture}"`, 
    "UUID, profilepictureURI"
  );
  
  try {

    let json = dbGrab;
    // window.localStorage.setItem('userdata',JSON.stringify(json.data.updateusercountry));
    console.log("DB Return: ",json.data?.updateprofilepicture);
    if(json.data?.updateprofilepicture===undefined) { 
      profilePictureUploadButton.finished=true; 
      profilePictureUploadButton.isLoading=false;
      setState({});
      return -1/*"!ERROR_MISSINGCOUNTRY"*/; 
    }

    /** Update the localstorage and the db */
    let getUserdata = JSON.parse(window.localStorage.getItem("userdata"));
    
    getUserdata.profilePicture = profilePicture;
    console.log("Update UD:",getUserdata);
    window.localStorage.setItem('userdata',JSON.stringify(getUserdata));
    usrdata = JSON.parse(localStorage.getItem('userdata'));
    clearTimeout(profilePictureUploadButton.timeout);
    profilePictureUploadButton.finished=true; profilePictureUploadButton.isLoading = false;
    // When success... 
    profilePictureUploadButton.enabled = false;
    setState({});
    
    /** Button title turn green and say "Success!" */
    return 1;
  } catch (error) {
    console.log(error);
    return -1;
    // setState({
    //   msg: `Problem loading server data - ${error.message}`,
    // });
  }
};
//#endregion Database Methods 

const DisplaySettingPageMobile = ({expanded, handleChange}) => {
  return (
    <Accordion expanded={expanded === 'Account Info'} onChange={handleChange('Account Info')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="account-settings-content"
          id="account-settings-header"
        >
          <Typography sx={{ width: '33%', flexShrink: 0 }}>
            General settings
          </Typography>
          <Typography sx={{ color: 'text.secondary', marginLeft:"5px" }}>Account Details, Personal Info</Typography>
        </AccordionSummary>
        <AccordionDetails>
        <Typography variant="body1" color="white" style={{marginTop:"0px", fontSize:20,fontWeight:"bold"}}>Account Info</Typography>
      <Box style={{display:"flex", }}>
        <Typography variant="h6" color="gray" style={{marginTop:"0px",marginRight:"5px"}}>
          Full Name:
        </Typography>
        <Typography variant="h6">{usrdata?.firstname} {usrdata?.lastname}</Typography>
        <IconButton style={{marginLeft:"5px", padding:4,alignContent:"center"}}><EditIcon style={{fontSize:"20px"}}/></IconButton>
      </Box>
      <Box style={{display:"flex", }}>
        <Typography variant="h6" color="gray" style={{marginTop:"0px",marginRight:"5px"}}>
          Username:
        </Typography>
        <Typography variant="h6">{usrdata?.username}</Typography>
        <IconButton style={{marginLeft:"5px", padding:4,alignContent:"center"}}><EditIcon style={{fontSize:"20px"}}/></IconButton>
      </Box>
      <Box style={{display:"flex", }}>
        <Typography variant="h6" color="gray" style={{marginTop:"0px",marginRight:"5px"}}>
          Profile Picture:
        </Typography>
        <Typography variant="h6">N/A</Typography>
        <IconButton style={{marginLeft:"5px", padding:4,alignContent:"center"}}><EditIcon style={{fontSize:"20px"}}/></IconButton>
      </Box>

      <Typography variant="body1" color="white" style={{marginTop:"10px", fontSize:20,fontWeight:"bold"}}>Personal Info</Typography>
      <Box style={{display:"flex", }}>
        <Typography variant="h6" color="gray" style={{marginTop:"0px",marginRight:"5px"}}>Theme:</Typography>
        {/* <Autocomplete></Autocomplete> */}
        <Button variant="contained">Save</Button>
      </Box>
      <Box style={{display:"flex", }}>
        <Typography variant="h6" color="gray" style={{marginTop:"0px",marginRight:"5px"}}>
          Country:
        </Typography>
        <Autocomplete
          id="country-select-demo"
          sx={{ width: 300 }}
          options={countries}
          autoHighlight
          /*defaultValue*/value={countries.find((_c) => _c.label === usrdata?.country) ?? countries.at(0)}
          getOptionLabel={(option) => option.label}
          renderOption={(props, option) => (
            <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
              <img
                loading="lazy"
                width="20"
                src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                alt=""
              />
              {option.label} {option.code!=='' ? `(${option.code})` : ""}
            </Box>
          )}
          renderInput={(params) => (
            <TextField
              {...params}
              title="Pick your country"
              inputProps={{
                ...params.inputProps,
                autoComplete: 'country-name', // disable autocomplete and autofill
              }}
            />
          )}
          // isOptionEqualToValue={"Hidden"}
        />
      </Box>
      when update the country, update the state and localStorage
    
        </AccordionDetails>
      </Accordion>
  );

};

// This function is used to convert base64 encoding to mime type (blob)
function base64ToBlob(base64, mime) 
{
    mime = mime || '';
    var sliceSize = 1024;
    var byteChars = window.atob(base64);
    var byteArrays = [];

    for (var offset = 0, len = byteChars.length; offset < len; offset += sliceSize) {
        var slice = byteChars.slice(offset, offset + sliceSize);

        var byteNumbers = new Array(slice.length);
        for (var i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
        }

        var byteArray = new Uint8Array(byteNumbers);

        byteArrays.push(byteArray);
    }

    return new Blob(byteArrays, {type: mime});
}

const UserSettingsPage = ({ setState, state }) => {
  
  const initialState = {
    selectedTab:SETTINGSTABS[0],
    temp_ProfilePicture:undefined,
    previewImage: null,
    fileUploadFailed: false,
  };
  const reducer = (state, newState) => ({ ...state, ...newState });
  const [_state, set_State] = useReducer(reducer, initialState);
  const [_temp_PWD, set_Temp_PWD] = React.useState("");
  const [_temp_CONFIRMPWD, set_Temp_CONFIRMPWD] = React.useState("");

  /** For Password confirmation before password change (DESKTOP) */
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    editFields.accountInfo.password.password.matchesDB = false;
    editFields.accountInfo.password.button.isEditing = false;
    setOpen(true);
  };
  const handleClose = () => { 
    set_Temp_CONFIRMPWD("");
    editFields.accountInfo.password.password.placeholder="";
    editFields.accountInfo.password.password.matchesDB = false;
    editFields.accountInfo.password.button.isEditing = false;
    setOpen(false); 
    /** Forces re-render */
    setState({});
  };
  

  /** For Mobile */
  const [expanded, setExpanded] = React.useState(false);
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const DisplaySettingPage = (_page) => {
    let pageToReturn = undefined;
    switch (_page) {
      default:
      case "Account Info":
        pageToReturn=<Card style={{borderRadius:0, backgroundColor:theme.palette.divider}}>
        <Typography variant="body1" color="white" style={{marginTop:"0px", fontSize:20,fontWeight:"bold"}}>Account Info</Typography>
        {/** Fullname */}
        <Box style={{display:"flex", }}>
          <Typography variant="h6" color="gray" style={{marginTop:"0px",marginRight:"5px"}}>
            Full Name:
          </Typography>
          <Typography variant="h6" style={{display: !editFields.accountInfo.fullName.button.isEditing ? "block" : "none"}}>{usrdata?.firstname} {usrdata?.lastname}</Typography>
          <Box id={"fullNameEdit"} style={{display: editFields.accountInfo.fullName.button.isEditing ? "block" : "none"}}>
            <FormControl variant="standard" style={{marginTop:0}}>
              <Input
                defaultValue={editFields.accountInfo.fullName.firstName.value}
                onChange={(e) => {
                  editFields.accountInfo.fullName.firstName.value = e.target.value;
                  let _testField = editFields.accountInfo.fullName.firstName;
                  editFields.accountInfo.fullName.firstName.error = 
                    _testField.required && _testField.value==="" ||
                    !(new RegExp(/^[A-Za-z][A-Za-z\'\-]+([\ A-Za-z][A-Za-z\'\-]+)$/).test(_testField.value) || new RegExp(/^[a-zA-Z]+([a-zA-Z](_|-| )[a-zA-Z])*[a-zA-Z]+$/).test(_testField.value));

                  editFields.accountInfo.fullName.button.allowSave = 
                    (editFields.accountInfo.fullName.lastName.value !== JSON.parse(localStorage.getItem('userdata')).lastname ||
                    editFields.accountInfo.fullName.firstName.value !== JSON.parse(localStorage.getItem('userdata')).firstname) &&
                    (editFields.accountInfo.fullName.firstName.error && editFields.accountInfo.fullName.lastName.error)===false;
                  setState({});
                }}
                placeholder={"First Name"}
                value={editFields.accountInfo.fullName.firstName.reset}
                error={editFields.accountInfo.fullName.firstName.error}
                style={{fontSize:"20px"}}
                autoComplete="given-name"
                aria-describedby="firstNameEditField-text"
              />
              <FormHelperText id="firstNameEditField-text" error={true}>
                {editFields.accountInfo.fullName.firstName.error && "This field is required"}
              </FormHelperText>
            </FormControl>
            <FormControl variant="standard">
              <Input
                defaultValue={editFields.accountInfo.fullName.lastName.value}
                onChange={(e) => {
                  editFields.accountInfo.fullName.lastName.value = e.target.value;
                  let _testField = editFields.accountInfo.fullName.lastName;
                  editFields.accountInfo.fullName.lastName.error = 
                    _testField.required && _testField.value==="" 
                    ||!(new RegExp(/^[A-Za-z][A-Za-z\'\-]+([\ A-Za-z][A-Za-z\'\-]+)$/).test(_testField.value) || new RegExp(/^[a-zA-Z]+([a-zA-Z](_|-| )[a-zA-Z])*[a-zA-Z]+$/).test(_testField.value));

                    editFields.accountInfo.fullName.button.allowSave = 
                      (editFields.accountInfo.fullName.lastName.value !== JSON.parse(localStorage.getItem('userdata')).lastname ||
                      editFields.accountInfo.fullName.firstName.value !== JSON.parse(localStorage.getItem('userdata')).firstname) &&
                      (editFields.accountInfo.fullName.firstName.error && editFields.accountInfo.fullName.lastName.error)===false;
                  setState({});
                }}
                placeholder={"Last Name"}
                value={editFields.accountInfo.fullName.lastName.reset}
                error={editFields.accountInfo.fullName.lastName.error}
                style={{fontSize:"20px"}}
                autoComplete="family-name"
                aria-describedby="lastNameEditField-text"
              />
              <FormHelperText id="lastNameeEditField-text" error={true}>
                {editFields.accountInfo.fullName.lastName.error && "This field is required"}
              </FormHelperText>
            </FormControl>
            {/* <InputForm label={"Last Name"} defaultValue={editFields.accountInfo.fullName.lastName} onChange={editFields.accountInfo.fullName.lastName} style={{fontSize:"20px"}} required={true} setState={setState} /> */}
          </Box>
          <IconButton 
            style={{marginLeft:"5px", padding:4,alignContent:"center"}} 
            disabled={
              editFields.accountInfo.fullName.button.allowSave===false && editFields.accountInfo.fullName.button.isEditing
            }
            onClick={() => { 
              
              editFields.accountInfo.fullName.button.isEditing=!editFields.accountInfo.fullName.button.isEditing; 
              if( !editFields.accountInfo.fullName.button.isEditing ) {
                console.log("Wants to save");
                if(
                  editFields.accountInfo.fullName.lastName.value !== JSON.parse(localStorage.getItem('userdata')).lastname ||
                  editFields.accountInfo.fullName.firstName.value !== JSON.parse(localStorage.getItem('userdata')).firstname
                ) {
                  let dbGrab = /*await*/ qdb(
                    "mutation",
                    "updatefullname",
                    `UUID: "${usrdata?.UUID}",
                    firstname: "${editFields.accountInfo.fullName.firstName.value}",
                    lastname: "${editFields.accountInfo.fullName.lastName.value}"`, 
                    "UUID, firstname, lastname"
                  );

                  // console.warn(dbGrab);

                  // if success, update the `usrdata` variable & localstorage/state.
                  /** Update the localstorage and the db */
                  let getUserdata = JSON.parse(window.localStorage.getItem("userdata"));
                  getUserdata.firstname = editFields.accountInfo.fullName.firstName.value;
                  getUserdata.lastname = editFields.accountInfo.fullName.lastName.value;
                  console.log("Update UD:",getUserdata);
                  window.localStorage.setItem('userdata',JSON.stringify(getUserdata));
                  usrdata = JSON.parse(localStorage.getItem('userdata'));
                }

              } else {
                
                if(
                  (editFields.accountInfo.fullName.lastName.value !== JSON.parse(localStorage.getItem('userdata')).lastname ||
                  editFields.accountInfo.fullName.firstName.value !== JSON.parse(localStorage.getItem('userdata')).firstname) &&
                  (editFields.accountInfo.fullName.firstName.error && editFields.accountInfo.fullName.lastName.error)===false
                ) {
                  console.log("Allow for save.");
                }
              }
              // resets the `reset` value so the user can edit again
              editFields.accountInfo.fullName.firstName.reset = null;
              editFields.accountInfo.fullName.lastName.reset = null;
              setState({}); 
            }}
          >
            {
              editFields.accountInfo.fullName.button.isEditing ? 
              <CheckIcon style={{fontSize:"20px", color:editFields.accountInfo.fullName.button.allowSave===false && editFields.accountInfo.fullName.button.isEditing ? theme.palette.grey[500] : theme.palette.info.contrastText }}/> :
              <EditIcon style={{fontSize:"20px", color:theme.palette.info.contrastText}}/>
            }
          </IconButton>
          <IconButton 
            style={{marginLeft:"5px", padding:4,alignContent:"center", display:editFields.accountInfo.fullName.button.isEditing ? "block" : "none"}} 
            onClick={() => { 
              editFields.accountInfo.fullName.button.isEditing=false; 
              editFields.accountInfo.fullName.firstName.value = JSON.parse(localStorage.getItem('userdata')).firstname;
              editFields.accountInfo.fullName.lastName.value = JSON.parse(localStorage.getItem('userdata')).lastname;
              editFields.accountInfo.fullName.firstName.reset = editFields.accountInfo.fullName.firstName.value;
              editFields.accountInfo.fullName.lastName.reset = editFields.accountInfo.fullName.lastName.value;
              setState({}); 
            }}
          >
              <CancelIcon style={{fontSize:"20px", color:theme.palette.info.contrastText}}/>
          </IconButton>
        </Box>
        {/** Username */}
        <Box style={{display:"flex", }}>
          <Typography variant="h6" color="gray" style={{marginTop:"0px",marginRight:"5px"}}>
            Username:
          </Typography>
          <Typography variant="h6">{usrdata?.username}</Typography>
          {/* <IconButton style={{marginLeft:"5px", padding:4,alignContent:"center"}}><EditIcon style={{fontSize:"20px", color:theme.palette.info.contrastText}}/></IconButton> */}
        </Box>
        {/** Password */}
        <Box style={{display:"flex", }}>
          <Typography variant="h6" color="gray" style={{marginTop:"0px",marginRight:"5px"}}>
            Password:
          </Typography>
          <Typography variant="h6" style={{display: !editFields.accountInfo.password.button.isEditing ? "block" : "none"}}>{editFields.accountInfo.password.password.value}</Typography>
          <Box id={"passwordEdit"} style={{display: editFields.accountInfo.password.button.isEditing ? "block" : "none"}}>
            <FormControl variant="standard" style={{marginTop:0}}>
              <Input
                defaultValue={editFields.accountInfo.password.password.value}
                onChange={(e) => {
                  editFields.accountInfo.password.password.value = e.target.value;
                  let _testField = editFields.accountInfo.password.password;

                  let hasNumber = false; let hasCapital = false; let hasLowerCase = false; const isWithinLength = 8<=_testField.value.length && _testField.value.length <=50;
                  const _pwd = _testField.value;
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
                  });

                  const wordMatch = _testField.value.match(/^(?=.*\d)(?=.*[a-zA-Z0-9])(.{8,50})$/);
                  console.log("Checking for number in password: ",_testField.value," | Regex Match: ",wordMatch);
                  let allCriteriaMet = !(hasNumber&&hasCapital&&hasLowerCase&&isWithinLength);

                  if(_testField.value==="") {
                    // textFieldErrors.password.display = re.test(_state?.password);
                    editFields.accountInfo.password.password.placeholder = "Please provide a password";
                  } else if (allCriteriaMet) {
                    let _displayParams = [hasNumber ? null : "min. 1 number",hasCapital ? null : "min. 1 capital letter",hasLowerCase ? null : "min. 1 lowercase letter",isWithinLength ? null : "between 8 and 50 characters"].filter(
                      (value) => { 
                        return value !== null;
                      }
                    );

                    editFields.accountInfo.password.password.placeholder = `Password must ${hasNumber&&hasCapital&&hasLowerCase? "be" : "have:"} `+_displayParams.join(", ").toString();
                  } else {
                    editFields.accountInfo.password.password.placeholder = "";
                  }

                  console.log("Placeholder:",editFields.accountInfo.password.password.placeholder);
                  editFields.accountInfo.password.password.error = _testField.required && _testField.value==="";

                  editFields.accountInfo.password.button.allowSave = 
                  (editFields.accountInfo.password.password.value !== _temp_PWD) && //JSON.parse(localStorage.getItem('userdata'))?.password) &&
                  (editFields.accountInfo.password.password.error)===false;
                  setState({});
                }}
                placeholder={"Password"}
                value={editFields.accountInfo.password.password.reset}
                error={editFields.accountInfo.password.password.error}
                style={{fontSize:"20px"}}
                autoComplete="new-password"
                aria-describedby="passwordEditField-text"
              />
              <FormHelperText id="passwordEditField-text" error={true}>
                {/*editFields.accountInfo.password.password.error && */editFields.accountInfo.password.password.placeholder}
              </FormHelperText>
            </FormControl>
          </Box>
          <IconButton 
            style={{marginLeft:"5px", padding:4,alignContent:"center"}} 
            disabled={
              editFields.accountInfo.password.button.allowSave===false && editFields.accountInfo.password.button.isEditing
            }
            onClick={() => { 
              
              if(editFields.accountInfo.password.password.matchesDB) {
                editFields.accountInfo.password.button.isEditing=!editFields.accountInfo.password.button.isEditing; 
              }
              if(editFields.accountInfo.password.password.matchesDB && !editFields.accountInfo.password.button.isEditing ) {
                console.log("Wants to save");
                if(
                  editFields.accountInfo.password.password.matchesDB === true
                ) {
                  let _pwd = editFields.accountInfo.password.password.value;
                  let dbGrab = /*await*/ qdb(
                    "mutation",
                    "updatepassword",
                    `UUID: "${usrdata?.UUID}",
                    password: "${_pwd}"`, 
                    "UUID, password"
                  );

                  dbGrab.then(r=>{
                    console.log("response:",r);
                    //editFields.accountInfo.password.password.value = 
                  });

                  // console.warn(dbGrab);

                  // if success, update the `usrdata` variable & localstorage/state.
                  /** Update the localstorage and the db */
                  // let getUserdata = JSON.parse(window.localStorage.getItem("userdata"));
                  // getUserdata.firstname = editFields.accountInfo.fullName.firstName.value;
                  // getUserdata.lastname = editFields.accountInfo.fullName.lastName.value;
                  // console.log("Update UD:",getUserdata);
                  // window.localStorage.setItem('userdata',JSON.stringify(getUserdata));
                  // usrdata = JSON.parse(localStorage.getItem('userdata'));
                }

              } else {
                console.log("Popup Modal");
                handleOpen();
                /** Pop up modal here */
                
              }
              editFields.accountInfo.password.password.value = "********";
              editFields.accountInfo.password.password.reset = editFields.accountInfo.password.password.value;
              // resets the `reset` value so the user can edit again
              editFields.accountInfo.password.password.reset = null;
              setState({}); 
            }}
          >
            {
              editFields.accountInfo.password.button.isEditing ? 
              <CheckIcon style={{fontSize:"20px", color:editFields.accountInfo.password.button.allowSave===false && editFields.accountInfo.password.button.isEditing ? theme.palette.grey[500] : theme.palette.info.contrastText }}/> :
              <EditIcon style={{fontSize:"20px", color:theme.palette.info.contrastText}}/>
            }
          </IconButton>
          <IconButton 
            style={{marginLeft:"5px", padding:4,alignContent:"center", display:editFields.accountInfo.password.button.isEditing ? "block" : "none"}} 
            onClick={() => { 
              editFields.accountInfo.password.button.isEditing=false; 
              editFields.accountInfo.password.password.value = "********";
              editFields.accountInfo.password.password.reset = editFields.accountInfo.password.password.value;
              setState({}); 
            }}
          >
              <CancelIcon style={{fontSize:"20px", color:theme.palette.info.contrastText}}/>
          </IconButton>
          <Tooltip title="Good." placement="right">
          <Typography variant="body1" color="gray" style={{marginTop:"0px",marginRight:"5px"}}>
            Forgot password?
          </Typography></Tooltip>
        </Box>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4,}} 
          >
            <Typography id="modal-modal-title" variant="h6" component="h2" color={theme.palette.info.contrastText}>
              Confirm Password
            </Typography>
            <TextField
            sx={{mt: 2}}
              required
              id="confirm-password-input"
              label="Confirm Password"
              type="password"
              autoComplete="confirm-password" // or "confirm-password"
              fullwidth
              variant="filled"
              value={_temp_CONFIRMPWD}
              onChange={(event) => { set_Temp_CONFIRMPWD(event.target.value);}}
              style={{width:"100%", marginBottom:"10px"}}
            />
            <Button
              variant="contained" color="success" 
              onClick={() => {
                let dbGrab = /*await*/ qdb(
                  "query",
                  "confirmUserPassword",
                  `UUID: "${usrdata?.UUID}",
                  password: "${_temp_CONFIRMPWD}"`, 
                  "isMatch, password"
                );

                
                dbGrab
                  .then((r) => { 
                    console.log(r);
                    editFields.accountInfo.password.password.matchesDB = r.data.confirmUserPassword.isMatch;
                    editFields.accountInfo.password.button.isEditing=editFields.accountInfo.password.password.matchesDB;
                    //console.log("pwd match: ",r.data.confirmUserPassword);
                    /** Sets the temp pwd to the password if confirmed */
                    set_Temp_PWD(r.data.confirmUserPassword.isMatch===true ? r.data.confirmUserPassword.password : "");
                    editFields.accountInfo.password.password.reset = r.data.confirmUserPassword.password;
                    /** Forces re-render */
                    setState({});
                    setTimeout(() => {
                      editFields.accountInfo.password.password.reset = null;
                    }, 300);
                    return true; 
                  })
                  .catch((e) => { 
                    console.log("Failed",e); 
                    editFields.accountInfo.password.password.matchesDB = false;
                    editFields.accountInfo.password.button.isEditing = false;
                    editFields.accountInfo.password.password.reset = "********";
                    setTimeout(() => {
                      editFields.accountInfo.password.password.reset = null;
                    }, 300);
                    /** Forces re-render */
                    setState({});
                    return false; 
                  });


                /** Forces re-render */
                setState({});
                set_Temp_PWD("");
                set_Temp_CONFIRMPWD("");
                handleClose();
              }}
            >
              Confirm
            </Button>
          </Box>
        </Modal>
        <Box style={{display:"flex", }}>
          <Typography variant="h6" color="gray" style={{marginTop:"0px",marginRight:"5px"}}>
            Profile Picture:
          </Typography>
          <div id="profile-picture-holder" style={{
            width:"150px",
            height:"150px",
            display:_state.temp_ProfilePicture ? "block" : "none",
            
            backgroundImage: `url(${_state.previewImage})`,
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            "position": "relative"
          }}></div>
          {/* {_state.previewImage && 
            <img className="preview previewImg" src={_state.previewImage} alt="" />
          } */}
          <label htmlFor="upload-profile-picture-button">
            <ImageInput accept="image/*" id="upload-profile-picture-button" type="file" onChange={(e) => {
              if(!e.target.files || e.target.files.length===0) { return; }
              const file = e.target.files[0];
              // Check if file's size is under 10mb
              console.log(file.size/1024/1024,"mb");
              /* 32mb is maximum for conversion */
              if(file.size/1024/1024 > 32) { 
                _state.fileUploadFailed=true;
                // Re-render page
                setState({});
                return; 
              } else {/* if (file.size/1024/1024 <= 32 && file.size/1024/1024 > 10/*2* /) {*/
                let img = document.createElement("img");
                // img.src = URL.createObjectURL(file);

                let imageFile = e.target.files[0];
                var reader = new FileReader();
                reader.onload = function (e) {
                    //var img = document.createElement("img");
                    img.onload = function (event) {
                        // Dynamically create a canvas element
                        var canvas = document.createElement("canvas");

                        // var canvas = document.getElementById("canvas");
                        var ctx = canvas.getContext("2d");

                        // Actual resizing
                        ctx.drawImage(img, 0, 0, 3000, 3000);

                        // Show resized image in preview element
                        var dataurl = canvas.toDataURL(imageFile.type);
                        document.getElementById("preview").src = dataurl;
                    }
                    img.src = e.target.result;
                }
                reader.readAsDataURL(imageFile);
                console.log("result",reader.result);


                
                
                console.log("Image",img.width);
                /* Convert to under 2mb */
                
                

                
                document.getElementById("preview2").onload = function (event) {
                  console.log("Is On load");
                  console.log("Width:",document.getElementById("preview2").width);
                  console.log("Width:",document.getElementById("preview2").src);
                  
                  let newWidth=512; let newHeight = undefined;
                  //create an image object from the path
                  const originalImage = new Image();
                  originalImage.src = document.getElementById("preview2").src;//URL.createObjectURL(file);
                  //get the original image size and aspect ratio
                  const originalWidth = originalImage.naturalWidth;
                  const originalHeight = originalImage.naturalHeight;
                  const aspectRatio = originalWidth/originalHeight;

                  // const MAX_WIDTH = 3000; const MAX_HEIGHT = 3000;
                  // let width = img.width;
                  // let height = img.height;

                  // Change the resizing logic
                  // if (width > height) {
                  //     if (width > MAX_WIDTH) {
                  //         height = height * (MAX_WIDTH / width);
                  //         width = MAX_WIDTH;
                  //     }
                  // } else {
                  //     if (height > MAX_HEIGHT) {
                  //         width = width * (MAX_HEIGHT / height);
                  //         height = MAX_HEIGHT;
                  //     }
                  // }

          
                  //if the new height wasn't specified, use the width and the original aspect ratio
                  if (newHeight === undefined) {
                      //calculate the new height
                      newHeight = newWidth/aspectRatio;
                      newHeight = Math.floor(newHeight);
                  }

                  console.log("OW: ",originalWidth);
                  console.log("NW: ",newWidth);
                  console.log("OH: ",originalHeight);
                  console.log("NH: ",newHeight);

                  var width = newWidth; 
                  var height = newHeight; 


                  var canvas = document.createElement('canvas');  // Dynamically Create a Canvas Element
                  canvas.width  = width;  // Set the width of the Canvas
                  canvas.height = height;  // Set the height of the Canvas
                  var ctx = canvas.getContext("2d");  // Get the "context" of the canvas 
                  var img = document.getElementById("preview2");  // The id of your image container
                  ctx.drawImage(img,0,0,width,height);  // Draw your image to the canvas


                  var jpegFile = canvas.toDataURL("image/png"); 
                  console.log(jpegFile);
                  document.getElementById("preview3").src = jpegFile;
                  var base64str = document.getElementById("preview3").src.substring(document.getElementById("preview3").src.indexOf(',') + 1);
                  var decoded = atob(base64str);

                  console.log("FileSize: " + decoded.length);

                  var jpegFile64 = jpegFile.replace(/^data:image\/(png|jpeg);base64,/, "");
                  var jpegBlob = base64ToBlob(jpegFile64, 'image/png');  
                  console.log("jpegblob:",jpegBlob);

                  //document.getElementById("preview2").src = URL.createObjectURL(e.target.files[0]);
                }
                document.getElementById("preview2").src = URL.createObjectURL(e.target.files[0]);
              }
              _state.fileUploadFailed=false;
              // set_State({temp_ProfilePicture:file});
              _state.temp_ProfilePicture = file;
              _state.previewImage = URL.createObjectURL(file);
              console.log(URL.createObjectURL(_state?.temp_ProfilePicture));
              console.log("UploadData:",file);
              console.log("_state:",_state);
              // Re-render page
              setState({});
            }} />
            <Button variant="contained" component="span">
              Choose Image
            </Button>
            <Typography variant="caption" color={theme.palette.info.contrastText}>Max. file size 10mb <strike>2mb</strike></Typography>
            <Typography variant="h6">{_state.temp_ProfilePicture?.name}</Typography>
            <Typography variant="caption" color="red" style={{display:_state.fileUploadFailed ? "block" : "none",}}>File size too big</Typography>
          </label>
          <Button variant="contained" component="span" style={{display:_state.temp_ProfilePicture ? "block" : "none",}}
            onClick={() => {
              updateProfilePicture(setState);
            }}>
            Upload
          </Button>
          
          
        </Box>
        <img id="preview2" style={{display:"none"}}/>
        <img id="preview3" style={{display:"none"}}/>
        <Box style={{display:"flex", }}>
          <Typography variant="h6" color="gray" style={{marginTop:"0px",marginRight:"5px"}}>
            Banner:
          </Typography>
          <Typography variant="h6">NYI</Typography>
        </Box>
        
  
        <Typography variant="body1" color="white" style={{marginTop:"10px", fontSize:20,fontWeight:"bold"}}>Personal Info</Typography>
        <Box style={{display:"flex", }}>
          <Typography variant="h6" color="gray" style={{marginTop:"0px",marginRight:"5px"}}>Theme:</Typography>
          {/* <Autocomplete></Autocomplete> */}
          <Button variant="contained">Save</Button>
        </Box>
        <Box style={{display:"flex", }}>
          <Typography variant="h6" color="gray" style={{marginTop:"0px",marginRight:"5px"}}>
            Country:
          </Typography>
          <Autocomplete
            id="country-select-demo"
            sx={{ width: 300 }}
            options={countries}
            autoHighlight
            /** If changed, it calls from the localstorage, if page first open, grabs the country from userdata instead */
            value={changedCountry ? JSON.parse(window.localStorage.getItem("countryChangeValue")) : countries.find((_c) => _c.label === usrdata?.country) ?? countries.at(0)}
            /*defaultValue*///value={countries.find((_c) => _c.label === usrdata?.country) ?? countries.at(0)}
            onClose={() => {
              //console.log("Closed | CCV: ",(window.localStorage.getItem("countryChangeValue")));
              // changedCountry=true;
              //console.log(changedCountry ? JSON.parse(window.localStorage.getItem("countryChangeValue")) : countries.find((_c) => _c.label === usrdata?.country) ?? countries.at(0));
            }}
            onChange={(e,countryChangeData)=> {
              changedCountry=true; countrySaveButton.enabled = true; countrySaveButton.finished=false;
              // Stores the selected country to the user's system
              window.localStorage.setItem('countryChangeValue',JSON.stringify(countryChangeData));
              
              const findFlagInList = changedCountry ? JSON.parse(window.localStorage.getItem("countryChangeValue")) : countries.find((_c) => _c.label === usrdata?.country) ?? countries.at(0);
              // const profileFlagBadge = `https://flagcdn.com/w20/${findFlagInList.code.toLowerCase()}.png`;
              // 
              // /** Update the localstorage and the db */
              // let getUserdata = JSON.parse(window.localStorage.getItem("userdata"));
              // getUserdata.countryBadge = profileFlagBadge;
              // console.log("getuserdata",getUserdata);
              // window.localStorage.setItem('userdata',JSON.stringify(getUserdata));
              // usrdata = JSON.parse(localStorage.getItem('userdata'));
              
              
              if(findFlagInList.code==='') {
                /** Earth Emoji */
              } else {
                // /** Update the localstorage and the db */
                // let getUserdata = JSON.parse(window.localStorage.getItem("userdata"));
                // getUserdata.countryBadge = profileFlagBadge;
                // console.log("getuserdata",getUserdata);
                // window.localStorage.setItem('userdata',JSON.stringify(getUserdata));
                // usrdata = JSON.parse(localStorage.getItem('userdata'));
                
                
                
                
                // window.localStorage.setItem('userdata',window.localStorage.getItem(json.data.newuserregister));
              }
  
              /** Forces re-render */
              setState({});
            }}
            getOptionLabel={(option) => option.label}
            renderOption={(props, option) => (
              <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                <img
                  loading="lazy"
                  width="20"
                  src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                  srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                  alt=""
                />
                {option.label} {option.code!=='' ? `(${option.code})` : ""}
              </Box>
            )}
            renderInput={(params) => (
              <TextField
                {...params}
                title="Pick your country"
                inputProps={{
                  ...params.inputProps,
                  autoComplete: 'country-name', // disable autocomplete and autofill
                }}
              />
            )}
            // isOptionEqualToValue={"Hidden"}
          />
          {/* <Button 
            // have "Save" button, when clicked, have loading button
            variant="contained" //color="success" 
            style={{display: countrySaveButton.enabled ? "block" : "none"}}
            disabled={countrySaveButton.isLoading}
            
            onClick={() => {
              countrySaveButton.isLoading = true;
              
              // Have popup saying "change successful", rate limit to 3/minute
              // When success... 
              countrySaveButton.enabled = false;
              /** Forces re-render * /
              setState({});
            }}
          >Save</Button> */}
          <LoadingButton
          variant="contained" color="success" 
          style={{display: countrySaveButton.enabled ? "block" : "none"}}
          disabled={countrySaveButton.isLoading}
          loading={countrySaveButton.isLoading}
          done={countrySaveButton.finished}
          onClick={() => {
            const attemptCountryUpdate = updateCountry(state,setState);
            // Have popup saying "change successful", rate limit to 3/minute
            
            
            /** Forces re-render */
            setState({});
            // When clicked, show the progress
            countrySaveButton.isLoading = true;

            // In 3 seconds, end the progress to show that it's done
            countrySaveButton.timeout = setTimeout(() => { 
              countrySaveButton.finished=true; countrySaveButton.isLoading = false;

              
              // When success... 
              countrySaveButton.enabled = false;
              /** Forces re-render */
              setState({});
            }, 3000);
          }}
        >
          Save
        </LoadingButton>
        </Box>
      </Card>;
        break;
      case "Security":
        pageToReturn=<Box style={{borderRadius:0, backgroundColor:theme.palette.divider}}>
        <Typography variant="body1" color="white" style={{marginTop:"0px", fontSize:20,fontWeight:"bold"}}>Security</Typography>
        <Box style={{display:"flex", }}>
          <Typography variant="h6" color="gray" style={{marginTop:"0px",marginRight:"5px"}}>
            Verify Your Account:
          </Typography>
          <Button variant="contained">Verify</Button>
        </Box>
        
      </Box>;
        break;
    }
    return pageToReturn;
  };

  return (
    <ThemeProvider theme={theme}> 
      <Box style={{
        backgroundColor:theme.palette.background.default,
        marginLeft:"5vw", marginRight:"5vw",marginTop:"10px", paddingBottom:"10px"}}>
          <Typography variant="h2" color="white" classes={"pageTitle"} style={{marginLeft:"5vw",fontSize:"10vw", textAlign:"left", marginTop:"10px"}}>
              Settings
          </Typography> 
          <Box style={{display:"flex",}}>
            {/* Settings Buttons */}
            {!state.isMobile && 
              <Box style={{marginLeft:"5vw",width:"12%", height:"10vh",}}>
                <Box style={{
                  // marginLeft:"5vw",
                  backgroundColor:theme.palette.divider,
                  // position:"absolute",
                  float:"left",
                  }}>
                  <List>
                    {SETTINGSTABS.map((_setting) => (
                      <ListItem key={_setting.name} disablePadding onClick={() =>{set_State({ selectedTab: _setting});}}> 
                        <ListItemButton 
                          style={{
                            borderLeft:`${_state.selectedTab.name === _setting.name ? "3px":"0px"} solid white`,
                            // marginLeft:_state.selectedTab.name === _setting.name ? "-3px":"0px",
                          }}
                          // value={_setting}
                          // onClick={set_State({ selectedTab: _setting})}
                          
                        >
                          
                          <ListItemText primary={_setting.name} style={{marginLeft:_state.selectedTab.name === _setting.name ? "-3px":"0px",color:_state.selectedTab.name === _setting.name ? "white" : "#bdbebe"}}/>
                        </ListItemButton>
                      </ListItem>
                    ))}
                  </List>
                </Box>
              </Box> 
            }
            
            <Box style={{width:!state.isMobile ? "75%" : "100%", /*height:"10vh",* / backgroundColor:"orange"*/}}>
              {!state.isMobile ? DisplaySettingPage(_state.selectedTab.name,_state) : <DisplaySettingPageMobile expanded={expanded} handleChange={handleChange}/>}
              
            </Box>
        
            {/* if things dont work, just hard-code the fields
            { [].concat(_state.selectedTab.data).map((_category) => (

              <Typography variant="body1" color="white" style={{marginTop:"0px", fontSize:20,fontWeight:"bold"}}>
                  {console.log("_category",_category)}
                  {_category.header}
                  {[].concat(_category.data).map((_field) => (
                    <Box style={{display:"flex", }}>
                      <Typography variant="h6" color="gray" style={{marginTop:"0px",marginRight:"5px"}}>
                        {_field.label}:
                      </Typography>
                        {_field.content}
                      {_field?.rightWidget}
                    </Box>
                  ))}
              </Typography> 
              
            ))} */}
          </Box>
      </Box>
      
      
    </ThemeProvider>
  );
};


export default UserSettingsPage;
