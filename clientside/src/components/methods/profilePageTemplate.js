import React, {useReducer} from "react";
import { Route, Link, Routes, useParams } from "react-router-dom";
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
  Typography, Avatar,
  Box,
  Stack,
  Button,
  Fab, SvgIcon,
  IconButton, Chip,
  Zoom,FormControlLabel, FormLabel,
  Accordion, AccordionDetails, AccordionSummary,
  Grid, Switch,
  Modal, Tooltip, Paper,
  Input,FormControl,InputLabel,FormHelperText, Badge,
} from "@mui/material";

import theme from "../../theme";
import qdb from "../queryDB";
import countries from "../countries";
import ListedBadges from "./profileBadgeList";
import {stringToColor, stringAvatar} from "./helperMethods";

import VerifiedIcon from '@mui/icons-material/Verified';
import AdminIcon from '@mui/icons-material/Shield';
import TesterIcon from '@mui/icons-material/BugReport';
import TheIcon from '@mui/icons-material/Star'; // Brayden's Special Star
let userProfile = {};
let firstLoad = true;
let findFlagInList;
// let setState; let UUID;
//let userUUID = "";

const grabProfileData = async (setState, userUUID) => {
    console.log("UUID",userUUID);
    // userUUID = window.location.pathname.replace("/users/","").replace("/profile","");
    //userUUID = userUUID===undefined ? window.location.pathname.replace("/users/","").replace("/profile","") : userUUID;
    userUUID = userUUID===undefined ? window.location.pathname.replace("/users/","").slice(0,31) : userUUID;
    console.log("_UUID:",userUUID);
    console.log("Sliced",window.location.pathname.replace("/users/","").slice(0,31));
    let dbGrab = /*await*/ qdb(
        "query",
        "grabProfileData",
        `UUID: "${userUUID}"`, 
        "username, country, firstname, lastname, verified, profilepictureURI"
    );

    dbGrab.then(r=> {
        userProfile = r.data.grabProfileData;
        console.log("Assigned User Profile",r);
        findFlagInList = `https://flagcdn.com/w20/${countries.find((_c) => _c.label === userProfile?.country).code.toLowerCase()}.png` ?? "https://emojings.com/wp-content/uploads/2020/04/Earth-14.png";
        // let _flag = countries.find((_c) => _c.label === userProfile?.country);
        setState({});
    }).catch(r=> {
        console.log("User could not be found.",r);
    });
    
};

/**
 * @note Temporary!  
 */
const badges = () => {
    return {
      "verified":{
          // aquired:false,
          icon: <VerifiedIcon style={{ color:"#0288d1", fontSize:"3.5rem"}} />,
          name: "Verified",
          description: "This user has verified their account",
          background:null, 
      },
      "tester_early":{
          // aquired:false,
          icon: <TesterIcon style={{ color:"#52d102", fontSize:"3.5rem"}} />,
          name: "Early Tester",
          description: "This user was an early tester",
          background:{color:"white",shape:"circle"}, 
      },
      "admin":{
          // aquired:false,
          icon: <AdminIcon style={{ color:"#0288d1", fontSize:"3.5rem"}} />,
          name: "Administrator",
          description: "This user is an administrator",
          background:null, 
      },
  };
};

const ProfileBadge = ({icon, tooltipText}) => {
<Tooltip title={tooltipText} placement="right">
    {icon}
</Tooltip>
};

let badgeID = 0;
const Item = () => {
  function doOnLoad() {
    setTimeout(() => {
      try {

        document.getElementById(_id).style.height = document.getElementById(_id).clientWidth+"px";
        document.getElementById(_id+"_Icon").style.fontSize = (document.getElementById(_id).clientWidth-(theme.spacing(1).replace("px","")*2))+"px";
      } catch {}
    }, 100)
  };
  let _id =badgeID++;// Math.floor(Math.random() * 99999999)+"";
  badgeID = _id;
  return (
    <Box style={{
      display:"grid",
      //"grid-area": "myArea",
      backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
      ...theme.typography.body2,
      padding: theme.spacing(1),
      textAlign: 'center',
      color: theme.palette.text.secondary,
      height:"50px",
      // display:"flex",
      // alignItems:"flex-end",
      // justifyContent:"center",
    }}
    id={_id}
    onLoad={
      false// doOnLoad()
    }
    >
      {/* {badges().admin.icon} */}
      <AdminIcon style={{ 
        position:"relative",
        color:"#0288d1", 
        // fontSize:document.getElementById(_id).style.width+"px"
      }} id={_id+"_Icon"}/>
      {badges().admin.name}
    </Box>
  );
};

function FormRow() {
  let _xs = Math.abs(Math.floor((Math.floor(window.innerWidth/90)-12)/2));
  if(window.innerWidth < 360) {_xs = 12;}
  let smaller_xs = 4;//Math.abs(Math.floor(window.innerWidth/90)-10);
  //_xs = _xs > 4 ? 4 : _xs;
  console.log(_xs);
  return (
    <React.Fragment>
      {/* <Grid item xs={_xs/*4 /* Mobile * /}> */}
        <Item>Item</Item>
      {/* </Grid> */}
      {/* <Grid item xs={_xs}> */}
        <Item>Item</Item>
      {/* </Grid> */}
      {/* <Grid item xs={_xs}> */}
        <Item>Item</Item>
      {/* </Grid> */}
    </React.Fragment>
  );
};

// grabProfileData();
const ProfilePageTemplate = ({ setState, state, /*match*/ }) => {
    // const {
    //     params: { UUID },
    //   } = match;
    // console.log("match:",match);
    let { UUID } = useParams();

    const [badgeModalOpen, setBadgeModalOpen] = React.useState(false);
    const handleBadgeModalOpen = () => setBadgeModalOpen(true);
    const handleBadgeModalClose = () => setBadgeModalOpen(false);

    if(firstLoad) {
        grabProfileData(setState, UUID);
        
        //UUID = UUID===undefined ? window.location.pathname.replace("/users/","").replace("/profile","") : UUID;
        // UUID = UUID===undefined ? window.location.pathname.slice(7).slice(0,31) : UUID;
        // modifyUserBadge();
        firstLoad=false;
    }
    

  return (
    <ThemeProvider theme={theme}> 
      <Box style={{
        backgroundColor:theme.palette.background.default,
        marginLeft:"5vw", marginRight:"5vw",marginTop:"10px", paddingBottom:"10px"}}>
            {userProfile!==undefined && <div class={`image`} style={
                userProfile?.profilePicture ? /** Grab `profileBannerURI` from DB */
                {
                    backgroundImage: ` linear-gradient(rgba(35, 39, 42, 1), rgba(35, 39, 42, 0), rgba(35, 39, 42, 1)), url(${userProfile?.profilePicture})`,
                    height:"6em",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    "position": "relative", 
                    display:"flex",alignItems:"flex-end",
                } : {
                    // backgroundColor:stringToColor(userProfile?.username),
                    backgroundColor:"#3f3f3f",
                    height:"12em",
                    backgroundSize: "cover",
                    "position": "relative",
                    display:"flex",alignItems:"flex-end",
                }
            }>
                <div id={"profilePicture"} 
                    style={{
                        marginBottom:"25px",
                        marginLeft:"5vw",
                    }}
                >
                    <Badge> 
                    <Avatar alt={userProfile?.username} src={userProfile?.profilepictureURI} style={{width:"150px", height:"150px",}} /> 
                        {/* <VerifiedIcon style={{width:"20px", marginLeft:"10px", color:"#0288d1", position:"absolute",bottom:"10%",right:"10%"}} /> */}
                        {/* <VerifiedIcon style={{width:"20px", marginLeft:"10px", color:"#0288d1", position:"absolute",bottom:"10%",right:"10%"}} /> */}
                        <TheIcon style={{width:"30px", marginLeft:"10px", color:"gold", position:"absolute",bottom:"10%",right:"10%"}} />
                        {/* <img src={findFlagInList} style={{width:"30px", position:"absolute",bottom:"10%",right:"10%"}}/> */}
                    </Badge>
                </div>
                <Typography variant="caption"  style={{fontSize:20, position:"absolute",bottom:0,marginLeft:"10px",color:theme.palette.info.contrastText, zIndex:5,marginLeft:"5vw"}} /**subtitle1 */>
                <Box style={{display:"flex", }}>
                    @{userProfile?.username}
                    <VerifiedIcon style={{width:"20px", marginLeft:"10px", alignSelf:"center", color:"#0288d1"}} color={"#0288d1"/*"info"*/} />
                    <img src={findFlagInList} style={{width:"20px", marginLeft:"10px", alignSelf:"center"}}/>
                    {/* <div id={"userCountryFlag"} style={{
                        backgroundImage: "https://emojings.com/wp-content/uploads/2020/04/Earth-14.png",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat"
                    }}/> */}

                </Box>
                </Typography>
            </div>}
            
          <Typography variant="h2" color="white" classes={"pageTitle"} style={{marginLeft:"5vw",fontSize:"10vw", textAlign:"left", marginTop:"10px"}}>
              User
          </Typography> 
          <Box style={{/*display:"flex",*/marginLeft:"5vw", marginRight:"5vw"}}>
            Content Here
            {/* Have this go to the right on desktop, and have the width to the box's width while mobile */}
            <CardContent style={{backgroundColor:"#c4c4c4", width:"(100%)-5vw"}}>
                <CardHeader
                    title={
                        <Typography variant="h2" color="white" style={{marginLeft:"5vw",fontSize:state.isMobile ? "36px" : "60px"}}>
                        Badges
                        </Typography>
                    }
                    subheader={`{badges.count} total badges`}
                    style={{paddingTop:0}}
                />
                <Box style={{display:"flex", }}>
                    <ListedBadges/>
                </Box>
                <Button onClick={handleBadgeModalOpen}>Show All Badges</Button>
            </CardContent>
          </Box>
            <Modal
                open={badgeModalOpen}
                onClose={handleBadgeModalClose}
                aria-labelledby="badge-modal-title"
                aria-describedby="badge-modal-description"
            >
                <Box sx={{position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: `80%`,
                    bgcolor: 'background.paper',
                    border: '2px solid #fff',
                    boxShadow: 24,
                    p: 4,}}
                >
                  <Typography variant="h2" color="white" style={{marginLeft:"5vw",fontSize:state.isMobile ? "36px" : "60px"}}>
                  All Badges
                  </Typography>
                  <Box sx={{ flexGrow: 1 }}
                  //https://www.w3schools.com/CSSref/tryit.asp?filename=trycss_grid-template-areas
                    style={{
                      display: "grid",
                      "grid-template-areas": '...',
                      //"grid-auto-flow": "row",
                      //"grid-template-columns": "auto auto auto",
                      "gap": "50px",
                    }}
                  >
                      <FormRow />

                    </Box>
                </Box>
            </Modal>
      </Box>
      
      
    </ThemeProvider>
  );
};


export default ProfilePageTemplate;
