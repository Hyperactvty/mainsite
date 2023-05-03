import React, {useEffect} from "react";
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
  Button,
  Fab,
  IconButton,
  Zoom,
} from "@mui/material";
import theme from "../theme";

//#region Icons
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import GitHubIcon from '@mui/icons-material/GitHub';

import RateUX_1 from '@mui/icons-material/SentimentVeryDissatisfied';
import RateUX_2 from '@mui/icons-material/SentimentDissatisfied';
import RateUX_3 from '@mui/icons-material/SentimentNeutral';
import RateUX_4 from '@mui/icons-material/SentimentSatisfiedAlt';
import RateUX_5 from '@mui/icons-material/SentimentVerySatisfied';
//#endregion Icons

import braydenHamster from "../media/SquareHampterGif.gif";
import BraydenThompsonLogoWhite from "../media/logos/Brayden Thompson-logos_white_cropped.png";
import tempContactInfo from "../temp_CONTACTINFO.json";
import {loadImg} from "./methods/helperMethods";

//var element = $('<video/>').attr(attributes);

const futureTaskComplete = (_isDone, _task) => {
  return(
    <code>[{_isDone ? <code style={{color:"yellowgreen"}}>✔</code> : <code style={{color:"red"}}>✖</code>}] <code style={{textDecorationLine: _isDone ? "line-through" : "none"}}>{_task}</code><br/></code>
  );
};

//#region Logo Variables
let logoLoaded = false;
//get the original image size and aspect ratio
// let originalWidth = 0;//originalImage.naturalWidth;
// let originalHeight = 0;//originalImage.naturalHeight;
let aspectRatio = 0;// originalWidth/originalHeight;
let newWidth=0; let newHeight = 0;
//#endregion Logo Variables

function handleWindowSizeChange() {
  try {
    newWidth = window.innerWidth*0.6;
    //calculate the new height
    newHeight = newWidth/aspectRatio;
    newHeight = Math.floor(newHeight);
    document.getElementById("braydenThompsonLogo").style.height = `${newHeight}px`; 
    // console.log(originalWidth,originalHeight,aspectRatio,newWidth,newHeight);
  } catch (e) {
    console.log("err",e);
  }
};



const AboutPage = ({ setState, state }) => {
  
  useEffect(() => {
    // resizes the logo if logo is present
    window.addEventListener('resize', handleWindowSizeChange);
    return () => {
        window.removeEventListener('resize', handleWindowSizeChange);
    }
  }, []);
const transitionDuration = {
  enter: theme.transitions.duration.enteringScreen,
  exit: theme.transitions.duration.leavingScreen,
  iterableDelay: 150,
};
const fabs = [
{
  mobileDisplay: <IconButton 
  aria-label="email" size="large" 
  style={{display:state.isMobile ? "inherit" :"none", backgroundColor:"#e0e0e0"/*theme.palette.primary.main*/, color:theme.palette.common.black, zIndex:1}}
  href={"mailto:".concat(tempContactInfo.email).concat("?subject=Portfolio%20Email%20-%20%3Cinsert_name%3E&body=Composed%20from%20portfolio.")}
  >
    <EmailIcon fontSize="large"/>
</IconButton>,
  desktopDisplay:<Fab 
  variant="extended" style={{textTransform: "none", display:!state.isMobile ? "inherit" :"none", zIndex:1}} 
  href={"mailto:".concat(tempContactInfo.email).concat("?subject=Portfolio%20Email%20-%20%3Cinsert_name%3E&body=Composed%20from%20portfolio.")}
  >
  <EmailIcon sx={{ mr: 1}} fontSize="medium"/>
  {!state.isMobile && tempContactInfo.email}
</Fab>,
  label: 'Email',
},
{
  mobileDisplay: <IconButton 
  aria-label="phone" size="large" 
  style={{display:state.isMobile ? "inherit" :"none", backgroundColor:"#e0e0e0"/*theme.palette.primary.main*/, color:theme.palette.common.black, zIndex:1}}
  href={"tel:".concat(tempContactInfo.phone)}
  >
    <PhoneIcon fontSize="large"/>
</IconButton>,
  desktopDisplay:<Fab 
  variant="extended" style={{textTransform: "none", display:!state.isMobile ? "inherit" :"none", zIndex:1}} 
  href={"tel:".concat(tempContactInfo.phone)}
  >
  <PhoneIcon sx={{ mr: 1}} fontSize="medium"/>
  {!state.isMobile && '(' + tempContactInfo.phone.substring(0,3) + ') ' + tempContactInfo.phone.substring(3,6) + '-' + tempContactInfo.phone.substring(6)}
</Fab>,
  label: 'Phone',
},
{
  mobileDisplay: <IconButton 
  aria-label="github" size="large" 
  style={{display:state.isMobile ? "inherit" :"none", backgroundColor:"#e0e0e0"/*theme.palette.primary.main*/, color:theme.palette.common.black, zIndex:1}}
  href={"".concat(tempContactInfo.phone)}
  >
    <GitHubIcon fontSize="large"/>
</IconButton>,
  desktopDisplay:<Fab 
  variant="extended" style={{textTransform: "none", display:!state.isMobile ? "inherit" :"none", zIndex:1}} 
  href={":".concat(tempContactInfo.phone)}
  >
  <GitHubIcon sx={{ mr: 1}} fontSize="medium"/>
  {!state.isMobile && "GitHub Info Here"}
</Fab>,
  label: 'GitHub',
},
];

  return (
    <ThemeProvider theme={theme}>
      <div id={"braydenThompsonLogo"}/>
      
      
      {!logoLoaded && <Typography variant="h2" color="white" style={{fontSize:"10vw", textAlign:"center", marginTop:"10px", }}>
            Brayden Thompson
      </Typography> }

      <Typography variant="body1" color="white" style={{}}>Note: Convert image to SVG</Typography>

      {/* Have circle image here */}
      <Card style={{marginLeft:"5vw", marginRight:"5vw"}}>
      {/*<Box style={{/*marginLeft:"5vw"* /}}>*/}
        <img 
          src={braydenHamster} alt="loading..." 
          onLoad={
            () => {
              const originalImage = new Image();
              originalImage.src = document.getElementById("braydenLogoToGoHome").src;//URL.createObjectURL(file);
              //get the original image size and aspect ratio
              const originalWidth = originalImage.naturalWidth;
              const originalHeight = originalImage.naturalHeight;
              aspectRatio = originalWidth/originalHeight;

              newWidth=window.innerWidth*0.6;
              //calculate the new height
              newHeight = newWidth/aspectRatio;
              newHeight = Math.floor(newHeight);

              // document.getElementById("braydenThompsonLogo").style.backgroundImage = `url(${document.getElementById("braydenThompsonLogoImg").src})`; 
              document.getElementById("braydenThompsonLogo").style.backgroundImage = `url(${document.getElementById("braydenLogoToGoHome").src})`; 
              document.getElementById("braydenThompsonLogo").style.width = `60%`;//`60%`; 
              // document.getElementById("braydenThompsonLogo").style.width = state.isMobile ? `${newWidth}px` : `60%`;//`60%`; 
              document.getElementById("braydenThompsonLogo").style.height = `${newHeight}px`; 
              document.getElementById("braydenThompsonLogo").style.marginLeft = `20%`; 
              document.getElementById("braydenThompsonLogo").style.marginRight = `20%`; 
              document.getElementById("braydenThompsonLogo").style.marginTop = `10px`; 
              document.getElementById("braydenThompsonLogo").style.backgroundPosition = `center`; 
              document.getElementById("braydenThompsonLogo").style.backgroundRepeat = `no-repeat`; 
              document.getElementById("braydenThompsonLogo").style.backgroundSize = `contain`; 
              logoLoaded = true;
              setState({});
            }
          }
          style={{width:"90vw", maxWidth:"500px",borderRadius:"25%", float:"left", paddingRight:10, paddingBottom:10}}/>
      {/* </Box> */}
      <Typography variant="body1" color="white" style={{marginTop:"10px", margin:"5%"}}>
      Born in <a href="https://goo.gl/maps/aLRSSKMvGNxh7XR3A" style={{textDecorationColor:"greenyellow", color:"greenyellow"}}>Hamilton, Ontario</a>. 
      Interests are animals, games, and graphic design. A creative thinker and ...
      Started programing at 13 years old, and has interests in <a href="https://en.wikipedia.org/wiki/Brain%E2%80%93computer_interface" style={{textDecorationColor:"greenyellow", color:"greenyellow"}}>Computer-Brain Interfacing</a>...
      </Typography> 
      </Card>
      <Card style={{marginLeft:"5vw", marginRight:"5vw", marginTop:"10px"}}>
       {/* socials bar here */}
      <Typography variant="body1" color="white" style={{marginTop:"10px", margin:"5%"}}>
      
      {/* <Box style={{backgroundColor:"teal"}}>
        <Typography style={{alignItems: "center", display: "flex"}}>
        <EmailIcon style={{marginRight:"10px"}}/>{!state.isMobile && "braydenthxmpson@gmail.com"}
        </Typography>
      </Box> */}
      <Typography variant="h2" color="white" style={{marginBottom:"10px", fontSize:!state.isMobile ? "6vw" : "10vw", textAlign:"center"}}>Contact Me</Typography>
      <Stack direction="row" spacing={1}>
        {/* #region Email */}
        {/* <Fab 
          variant="extended" style={{textTransform: "none", display:!state.isMobile ? "inherit" :"none"}} 
          href={"mailto:".concat(tempContactInfo.email).concat("?subject=Portfolio%20Email%20-%20%3Cinsert_name%3E&body=Composed%20from%20portfolio.")}
          >
          <EmailIcon sx={{ mr: !state.isMobile ? 1 : 0}} fontSize={!state.isMobile ? "medium" :"large"}/>
          {!state.isMobile && tempContactInfo.email}
        </Fab> */}
        {/* <IconButton 
          aria-label="email" size="large" 
          style={{display:state.isMobile ? "inherit" :"none", backgroundColor:"#e0e0e0", color:theme.palette.common.black}}
          href={"mailto:".concat(tempContactInfo.email).concat("?subject=Portfolio%20Email%20-%20%3Cinsert_name%3E&body=Composed%20from%20portfolio.")}
          >
            <EmailIcon fontSize="large"/>
        </IconButton> */}
        {/* #endregion Email */}
        {/* #region Phone */}
        {/* <Fab 
          variant="extended" style={{textTransform: "none", display:!state.isMobile ? "inherit" :"none"}} 
          href={"tel:".concat(tempContactInfo.phone)}
          >
          <PhoneIcon sx={{ mr: !state.isMobile ? 1 : 0}} fontSize={!state.isMobile ? "medium" :"large"}/>
          {!state.isMobile && '(' + tempContactInfo.phone.substring(0,3) + ') ' + tempContactInfo.phone.substring(3,6) + '-' + tempContactInfo.phone.substring(6)}
        </Fab> */}
        {/* <IconButton 
          aria-label="phone" size="large" 
          style={{display:state.isMobile ? "inherit" :"none", backgroundColor:"#e0e0e0", color:theme.palette.common.black}}
          href={"tel:".concat(tempContactInfo.phone)}
          >
            <PhoneIcon fontSize="large"/>
        </IconButton> */}
        {/* #endregion Phone */}

        {/* have like "1", "2", "3"... for showing up */}
        {fabs.map((fab, index) => (
        <Zoom
          key={fab.label}
          in={state.isMobile}
          timeout={transitionDuration}
          style={{
            transitionDelay: `${index * transitionDuration.iterableDelay}ms`,
          }}
          unmountOnExit
        >
          {fab.mobileDisplay}
        </Zoom>
      ))}
      {fabs.map((fab, index) => (
        <Zoom
          key={fab.label}
          in={!state.isMobile}
          timeout={transitionDuration}
          style={{
            transitionDelay: `${index * transitionDuration.iterableDelay}ms`,
          }}
          unmountOnExit
        >
          {fab.desktopDisplay}
        </Zoom>
      ))}
    </Stack>

    </Typography> 
    </Card>
    <Card style={{marginLeft:"5vw", marginRight:"5vw", marginTop:"10px"}}>
      <Typography variant="body1" color="white" style={{marginTop:"10px", margin:"5%"}}>
        <Typography variant="h2" color="white" style={{marginBottom:"10px", fontSize:!state.isMobile ? "6vw" : "10vw", textAlign:"center"}}>Rate your user experience</Typography>
        <Stack direction="row" spacing={1}>
            
            <IconButton 
              aria-label="ux rate very poor" size="large" 
              style={{backgroundColor:"#e0e0e0", color:theme.palette.common.black}}
              href={"".concat("")}
              >
                <RateUX_1 fontSize="large"/>
            </IconButton>
            <IconButton 
              aria-label="ux rate very poor" size="large" 
              style={{backgroundColor:"#e0e0e0", color:theme.palette.common.black}}
              href={"".concat("")}
              >
                <RateUX_2 fontSize="large"/>
            </IconButton>
            <IconButton 
              aria-label="ux rate very poor" size="large" 
              style={{backgroundColor:"#e0e0e0", color:theme.palette.common.black}}
              href={"".concat("")}
              >
                <RateUX_3 fontSize="large"/>
            </IconButton>
            <IconButton 
              aria-label="ux rate very poor" size="large" 
              style={{backgroundColor:"#e0e0e0", color:theme.palette.common.black}}
              href={"".concat("")}
              >
                <RateUX_4 fontSize="large"/>
            </IconButton>
            <IconButton 
              aria-label="ux rate very poor" size="large" 
              style={{backgroundColor:"#e0e0e0", color:theme.palette.common.black}}
              href={"".concat("")}
              >
                <RateUX_5 fontSize="large"/>
            </IconButton>
        </Stack>
      </Typography> 
    </Card>

      <Card style={{marginLeft:"5vw", marginRight:"5vw", marginTop:"10px"}}>
      <Typography variant="h2" color="white" style={{marginTop:"5%",marginBottom:"5px", fontSize:!state.isMobile ? "6vw" : "10vw", textAlign:"center"}}>Intro to Programming</Typography>
      {/* <CardHeader variant="h2" color="white" style={{marginBottom:"10px", fontSize:!state.isMobile ? "6vw" : "10vw", textAlign:"center"}}>Intro to Programming</CardHeader> */}
      <Typography variant="body1" color="white" style={{margin:"0 5% 5% 5%"}}>
      Gained interests from playing videogames that promoted creative thinking, like <a href="" style={{textDecorationColor:"greenyellow", color:"greenyellow", fontWeight:"bold"}}>Minecraft</a>, 
      The <a href="" style={{textDecorationColor:"greenyellow", color:"greenyellow", fontWeight:"bold"}}>Little Big Planet</a> series, 
      and <a href="" style={{textDecorationColor:"greenyellow", color:"greenyellow", fontWeight:"bold"}}>Roblox</a>. I wanted to express my creativity in life, and most 
      decent paying jobs are repitition with no thought, so I chose programming. I programmed in <a>Python</a> during my highschool years, and created a few discord bots since then using Python.
      
      </Typography> 
      </Card>

      <Card style={{marginLeft:"5vw", marginRight:"5vw", marginTop:"10px"}}>
      <Typography variant="h2" color="white" style={{marginTop:"5%",marginBottom:"5px", fontSize:!state.isMobile ? "6vw" : "10vw", textAlign:"center"}}>Future Things</Typography>
      {/* <CardHeader variant="h2" color="white" style={{marginBottom:"10px", fontSize:!state.isMobile ? "6vw" : "10vw", textAlign:"center"}}>Intro to Programming</CardHeader> */}
      <Typography variant="body1" color="white" style={{margin:"0 5% 5% 5%",display:"flex",flexDirection:"column"}}>
        <code style={{backgroundColor:"rgba(44, 47, 51, 1)"}}>
          {futureTaskComplete(false, "Get into crypto")} 
          {futureTaskComplete(true, "Feed Hamster")} 
          {futureTaskComplete(true, "Create Portfolio")} {/* Have dropdown subsection here */}
          {futureTaskComplete(false, "Do Cyber Security Post-grad")} 
        </code>
      </Typography> 
      </Card>

    </ThemeProvider>
  );
};
export default AboutPage;
