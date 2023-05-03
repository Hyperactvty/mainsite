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

//#region Icons
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import HttpsIcon from '@mui/icons-material/Https';
/* For the profile picture */ import ImageIcon from '@mui/icons-material/Image';
//#endregion Icons

const LogoutPage = ({ setState, state }) => {

  const redirectSoon =  () => {
    setTimeout(()=>{window.location.pathname = "/home";},3000);
  };
  

  return (
    <ThemeProvider theme={theme}>
      <Typography variant="h2" color="white" style={{fontSize:"10vw", textAlign:"center", marginTop:"10px"}}>
            Adios
      </Typography> 
      <Card style={{marginLeft:"5vw", marginRight:"5vw"}}>
        <Box style={{marginLeft:"5%",marginRight:"5%", width:"90%", display:"block"}}>
        <Typography variant="h6" color="white" style={{fontSize:30, textAlign:"center"}}>
            You have been logged out.
          </Typography> 
          <Typography variant="h6" color="white" style={{fontSize:16, textAlign:"center"}}>
            You will be redirected soon...
          </Typography> 
          {redirectSoon()}
          </Box>
        </Card>
      <Card style={{marginLeft:"5vw", marginRight:"5vw",marginTop:"10px"}}>
      </Card>
    </ThemeProvider>
  );
};
export default LogoutPage;
