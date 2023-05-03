import React from "react";
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
  Grid,
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

// import fishbotImage from "../media/discordbot_Fishbot_noHyper.png";
import fishbotImage from "../media/discordbot_Fishbot2022.png";
import tempContactInfo from "../temp_CONTACTINFO.json";

//var element = $('<video/>').attr(attributes);

const projects = [ /** Pull from database */
  {
    id:0,
    name: "Fishbot",
    subtitle: "Discord Bot",
    description: "Fishbot is a text-based fishing game. Click here for more information.",
    imageURI: fishbotImage,
    redirect:"fishbot",
    isActive: false,
    isFeatured: true
  },
  {
    id:1,
    name: "Project 1",
    subtitle: "Sub",
    description: "Click here for more information.",
    redirect:"",
    isActive: false,
    isFeatured: false
  },
  {
    id:2,
    name: "Project 2",
    subtitle: "Subtitle",
    description: "Click here for more information.",
    imageURI: fishbotImage,
    redirect:"",
    isActive: false,
    isFeatured: false
  },
  {
    id:3,
    name: "Project 3",
    subtitle: "Title of Subs",
    description: "Click here for more information.",
    redirect:"",
    isActive: true,
    isFeatured: false
  },
  {
    id:4,
    name: "Project 4",
    subtitle: "",
    description: "Click here for more information.",
    redirect:"",
    isActive: false,
    isFeatured: false
  },
];

const showcase = {
  duration: 5000/*ms */,
  showingID: 1,
  isHovering: false,
};
let pulledProjects = [];
projects.forEach(_project => {
  if(!_project.isFeatured){ pulledProjects.push(_project); }
});

const GenerateProjectCard = ({state, _projectData}) => {
  const handleMouseEnter = (event) => {
    showcase.isHovering = true;
    console.log(showcase);
  };

  const handleMouseLeave = (event) => {
    showcase.isHovering = false;
    console.log(showcase);
    console.log("Left");
  };

  return (
    <Card 
      class="imageContainer" /*fullwidth*/ style={{ /*marginLeft:"5vw", marginRight:"5vw", marginTop:"10px"*/ }}  
      // onMouseEnter={handleMouseEnter}
      // onMouseLeave={handleMouseLeave}
      >
        <Link to={`${_projectData.redirect}`} style={{textDecoration:"none"}}>
      <div class={`image ${_projectData.isFeatured ? "featured" : ""}`} style={
        showcase.isHovering ? {
          backgroundImage: ` linear-gradient(rgba(35, 39, 42, 1), rgba(35, 39, 42, 0), rgba(35, 39, 42, 1)), url(${_projectData.imageURI})`,
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          "position": "relative", 
        } : {
          backgroundImage: ` linear-gradient(rgba(35, 39, 42, 1), rgba(35, 39, 42, 0), rgba(35, 39, 42, 1)), url(${_projectData.imageURI})`,
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          "position": "relative", /*opacity:_projectData.isActive ? 1 : 0.3/*"opacity":showcase.showingID===_projectData.id ? 1 : 0.3*/
        }}>
        <Typography variant="h2" color="white" style={{
          fontSize:!state.isMobile ? "6vw" : "10vw", textAlign:"center",
          background: "linear-gradient(rgba(35, 39, 42, 1), rgba(35, 39, 42, 0))",
          textShadow: "0 0 10px rgba(35, 39, 42,1)",
          // "text-shadow": "0 0 10px rgba(35, 39, 42,1)",
        }}>{_projectData.name}</Typography>
        <Typography variant="subtitle1" color="white" style={{marginBottom:"10px", fontSize:!state.isMobile ? "3vw" : "6vw", textAlign:"center", textShadow: "0 0 10px rgba(35, 39, 42,1)",}}>{_projectData.subtitle}</Typography>
          <Typography variant="body1" color="white" style={{marginTop:"10px", margin:"5%", textShadow: "0 0 10px rgba(35, 39, 42,1)",
          /*background: "linear-gradient(rgba(35, 39, 42, 0), rgba(35, 39, 42, 1))",*/}}>
          {_projectData.description}
          </Typography> 
      </div></Link>
    </Card>
  );
};

const ProjectsPage = ({ setState, state }) => {
  const handleMouseEnterProject = (event) => {
    showcase.isHovering = true;
    console.log(showcase);
  };

  const handleMouseLeaveProject = (event) => {
    showcase.isHovering = false;
    console.log(showcase);
    console.log("Left");
  };

  return (
    <ThemeProvider theme={theme}>
      <Typography variant="h2" color="white" style={{fontSize:"10vw", textAlign:"center", marginTop:"10px"}}>
            Projects
      </Typography> 
      <Box style={{
        backgroundColor:theme.palette.background.default,
        marginLeft:"5vw", marginRight:"5vw",}}>
      {/* Have description here */}
      <Typography variant="body1" color="white" style={{marginTop:"10px", margin:"5%"}}>
      Some projects I have worked on over the years.
      </Typography> 
      <Typography variant="h2" color="white" style={{marginTop:"10px", margin:"5%"}}>
      Featured Project
      </Typography> 
      <GenerateProjectCard state={state} _projectData={projects[0]}/>
      </Box>
      
      <Box style={{
        /* Have (min 2, have check screen size, maybe max 3) grid if desktop, rows if mobile */
        backgroundColor:theme.palette.background.default,
        marginLeft:"5vw", marginRight:"5vw",
      }} /*onMouseEnter={handleMouseEnterProject} onMouseLeave={handleMouseLeaveProject}*/>
        <Typography variant="body1" color="white" style={{marginTop:"10px", margin:"5%", }}>
          USE ASYNC EVENTS FOR SHOWCASE!
          Note: Have `Tags` at the bottom of each page, and when clicked, bring to `AllProjects` with the query
        </Typography> 
        <Grid container>
        {pulledProjects.map((_project, index) => (
          <Grid item xs={6} style={{paddingLeft: !state.isMobile ? "20px" : "10px",
          paddingRight: !state.isMobile ? "20px" : "10px",}}>
            <GenerateProjectCard state={state} _projectData={_project}/>
            {/* <Card class="imageContainer">
              <div class="image" style={
                showcase.isHovering ? {
                  backgroundImage: ` linear-gradient(rgba(35, 39, 42, 1), rgba(35, 39, 42, 0), rgba(35, 39, 42, 1)), url(${_project.imageURI})`,
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "cover",
                  "position": "relative", 
                } : {
                  backgroundImage: ` linear-gradient(rgba(35, 39, 42, 1), rgba(35, 39, 42, 0), rgba(35, 39, 42, 1)), url(${_project.imageURI})`,
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "cover",
                  "position": "relative", 
                  ///*opacity:_project.isActive ? 1 : 0.3* //*"opacity":showcase.showingID===_project.id ? 1 : 0.3* /
                }}>
                <Typography variant="h2" color="white" style={{
                  fontSize:!state.isMobile ? "6vw" : "10vw", textAlign:"center",
                  background: "linear-gradient(rgba(35, 39, 42, 1), rgba(35, 39, 42, 0))",
                  textShadow: "0 0 10px rgba(35, 39, 42,1)",
                  // "text-shadow": "0 0 10px rgba(35, 39, 42,1)",
                }}>{_project.name}</Typography>
                <Typography variant="subtitle1" color="white" style={{marginBottom:"10px", fontSize:!state.isMobile ? "3vw" : "6vw", textAlign:"center"}}>{_project.subtitle}</Typography>
                  <Typography variant="body1" color="white" style={{marginTop:"10px", margin:"5%", 
                  ///*background: "linear-gradient(rgba(35, 39, 42, 0), rgba(35, 39, 42, 1))",* /
                  }}>
                  {_project.description}
                  </Typography> 
              </div>
            </Card> */}
          </Grid>
        ))}
        </Grid>
        <Grid container>
          <Grid item xs={state.isMobile ? 3 : 5}/>
          <Grid item xs={state.isMobile ? 6 : 2}>
            <Link to={`${"all"}`} style={{textDecoration:"none"}}>
              <Button variant="contained" fullWidth style={{}}>View all {pulledProjects===null ? "-" : /*pulledProjects*/projects.length} projects</Button>
            </Link>
          </Grid>
        </Grid>
      </Box>
    </ThemeProvider>
  );
};
export default ProjectsPage;
