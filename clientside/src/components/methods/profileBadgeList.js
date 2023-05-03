import React, {useReducer} from "react";
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
  Modal, Tooltip,
  Input,FormControl,InputLabel,FormHelperText, Badge,
} from "@mui/material";
import theme from "../../theme";

import VerifiedIcon from '@mui/icons-material/Verified';
import LockedIcon from '@mui/icons-material/Lock';
import TesterIcon from '@mui/icons-material/BugReport';
import AdminIcon from '@mui/icons-material/Shield';
import TheIcon from '@mui/icons-material/Star'; // Brayden's Special Star

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

    let _template = {
        name: "", 
        description: "", 
        type: "", 
        date: "", 
        rarity: "",
        dateAchieved:"",
        backgroundShape:""
    };
     

    //return _b;
};

const ProfileBadge = ({icon, tooltipText}) => {
<Tooltip title={tooltipText} placement="right">
    {icon}
</Tooltip>
};

const ListedBadges = ({ userdata }) => {
    let _badges = []; // run through the `badges` method above to see what badges the user will have

    let _b = [];
    Object.values(badges()).forEach(element => {
        console.log(element);
        _b.push(
            <Box style={{textAlign:"center", /*flexBasis:"min-content",*/ width:/*parent.width/4*/"80px"}}>
                {/* <Tooltip title={element?.description} placement="right"> */}
                    <Box style={{position:"relative", left:"12.5%"}}>
                        {element.icon}
                        {<LockedIcon style={{color:theme.palette.grey[700], position:"relative", left:"-50%", verticalAlign:"super", bottom:10}}/>}
                    </Box>
                    {/* {element.icon} */}
                    <Typography id={`${element.name.replace(" ","")}`}variant="caption"  style={{ fontSize:/*"3.5vwmin"/*20*/"80%", color:theme.palette.info.contrastText, zIndex:5,}} /**subtitle1 */>
                        {element.name}
                    </Typography>
                    {/* {console.log(document.getElementById(element.name.replace(" ","")))} */}
                {/* </Tooltip> */}
            </Box>
        );
    });
    return (
        <>
            {/* {_badges} */}
            {_b}
            {/* <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, }}>
                {Array.from(Array(6)).map((_, index) => (
                <Grid item md={3} key={index}>
                    <Box>xs=2</Box>
                </Grid>
                ))}
            </Grid> */}
        </>
    );
};


export default ListedBadges;
