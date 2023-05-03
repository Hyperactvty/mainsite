import React from "react";
import { ThemeProvider } from "@mui/material/styles";
import {
  // Toolbar,
  Card,
  // AppBar,
  // CardHeader,
  CardContent,
  Typography,
  CardActions,
  IconButton, Button, Box,
  Tabs, tabsClasses, Tab, ButtonGroup,
} from "@mui/material";
import SwipeableViews from 'react-swipeable-views';
import theme from "../theme";
import PropTypes from 'prop-types';

//#region Icons
//import PinIcon from '@mui/icons-material/BookmarkAdd';
import PinIcon from '@mui/icons-material/PushPin';
import UpdateIcon from '@mui/icons-material/BookmarkAdd';
import InfoIcon from '@mui/icons-material/Info';

import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import BrushIcon from '@mui/icons-material/Brush';
import CircleIcon from '@mui/icons-material/Circle';

//#endregion Icons

/** Notes:
 *  Login to leave comments.
 *  -> For login, use `Stepper`
 */

const CreateInfoBox = (_type,_data) => {
  const INFOBOXICONS = {
    "normal":<PinIcon style={{display:"none"}}/>,
    "pinned":<PinIcon style={{float:"right"}}/>,
    "info":<InfoIcon style={{float:"right"}}/>,
    "update":<UpdateIcon style={{float:"right"}}/>,
  };
  const INFOBOXCOLOURS = {
    "normal":{
      primary: theme.palette.background.paper,
      text: {
        primary: "rgba(255, 255, 255, 0.87)",
        secondary: "rgba(119, 119, 119, 0.54)", // This includes icon
        actionbutton: "rgba(105,105,105,1)"
      }
    },
    "pinned":{
      primary: "rgba(95, 39, 42, 1)",
      text: {
        primary: "rgba(255, 255, 255, 0.87)",
        secondary: "rgba(119, 119, 119, 0.54)", // This includes icon
        actionbutton: "rgba(105,105,105,1)"
      }
    },
    "info":{
      primary: "rgba(83, 119, 129, 1)",
      text: {
        primary: "rgba(255, 255, 255, 0.87)",
        secondary: "rgba(255, 255, 255, 0.54)", // This includes icon
        actionbutton: "rgba(255,255,255,1)"
      }
    }, // The `medium<seagreen|turquoise|ect>` looks great
    "update":{
      primary: "rgba(255, 174, 88, 1)", // gold
      text: {
        primary: "rgba(255, 255, 255, 0.87)",
        secondary: "rgba(119, 119, 119, 0.54)", // This includes icon
        actionbutton: "rgba(105,105,105,1)"
      }
    },
  };
  const INFOBOXIDENTIFIERS = {
    "normal":"Post",
    "pinned":"Pinned Message",
    "info":"Information",
    "update":"Update", 
  };
  const infoBoxJSON = {
    boxType:"normal", //affects the colouring of the background, ect.
    boxIcon: INFOBOXICONS.normal,
    boxColour:INFOBOXCOLOURS.normal,
    headerIdentifier: INFOBOXIDENTIFIERS.normal,
  };
  _type = _type+"".toLowerCase();
  switch (_type) {
    case "pinned":
    case "update":
    case "info":
      infoBoxJSON.boxType=_type;
      infoBoxJSON.boxIcon=INFOBOXICONS[_type];
      infoBoxJSON.boxColour=INFOBOXCOLOURS[_type];
      infoBoxJSON.headerIdentifier=INFOBOXIDENTIFIERS[_type];
      break;
  
    default:
      // infoBoxJSON.infoBoxType="standard";
      break;
  };

  let shareButtonBkgnd = `${infoBoxJSON.boxColour.text.actionbutton}`.replace("rgba(",'').replace(")",'').replace(" ",'').split(",");
  shareButtonBkgnd = `rgba(${shareButtonBkgnd[0]},${shareButtonBkgnd[1]},${shareButtonBkgnd[2]},0.25)`
  
  let cardButtons=[];
  if(_data.contents.actions.length!==0) {
    (_data.contents.actions).map(_action => {
      if(_action.type==="button"){
        cardButtons.push(<Button size="small" style={{color:infoBoxJSON.boxColour.text.primary, backgroundColor:shareButtonBkgnd, textTransform:"none"}}>{_action.icon}{_action.text}</Button>)
      }
      if(_action.type==="iconbutton"){
        cardButtons.push(<IconButton size="small" style={{color:infoBoxJSON.boxColour.text.primary, flexDirection:"column", backgroundColor:shareButtonBkgnd, width:"50px", height:"50px"}}>{_action.icon}{_action.text}</IconButton>)
      }
      // if(_action.type==="sharebutton"){
      //   cardButtons.push(<Button size="small" style={{color:infoBoxJSON.boxColour.text.actionbutton, float:"right"}}>Share</Button>)
      // }
      return 0;
    });
  }

  return (
    <Box sx={{ minWidth: 275, maxWidth:"500px", /*height:"250px",*/ marginBottom:"10px", marginLeft:"10px", marginRight:"10px" }}>
      <Card variant="outlined" style={{backgroundColor:infoBoxJSON.boxColour.primary}}>
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color={infoBoxJSON.boxColour.text.secondary} gutterBottom>
            {infoBoxJSON.headerIdentifier}
            {infoBoxJSON.boxIcon}
            <Typography sx={{ fontSize: 14 }} color={infoBoxJSON.boxColour.text.secondary} gutterBottom style={{float:"right", marginRight:"5px"}}>{_data.dateposted/*"mm/dd/yyyy"*/}</Typography>
          </Typography>
          <Typography variant="h5" component="div">
            {_data.title}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color={infoBoxJSON.boxColour.text.secondary}>{_data.contents.subheader}</Typography>
          {_data.contents.body}
        </CardContent>
        <CardActions>
          {/* <Stack direction="row" spacing={1}> */}
            {cardButtons}
            <Button size="small" style={{color:infoBoxJSON.boxColour.text.primary, float:"right" /* float bottom, too maybe? ( `bottom:0` ) */, backgroundColor:shareButtonBkgnd, marginLeft:"auto"}}>Share</Button>
          {/* </Stack> */}
        </CardActions>
      </Card>
    </Box>
  );
};

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`action-tabpanel-${index}`}
      aria-labelledby={`action-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 0 }}>{children}</Box>}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `action-tab-${index}`,
    'aria-controls': `action-tabpanel-${index}`,
  };
}

const LandingPage = () => {
  let grabbedInfoBoxes = [];
  /** IMPORTANT: HAVE THE `Pinned` MESSAGES AT THE VERY TOP, BY ORDER OF DATE (Newest down) */
  /** ALSO IMPORTANT: HAVE THIS SYNCED FROM A SERVER; HAVE THE DATA PULLED FROM DB */

  /* For Server Side */
  const pullFromDBParams = {limit:25, };

  grabbedInfoBoxes.push({"date":Date.UTC(2015,5,9,7,37,4,0),"type":"pinned","box": CreateInfoBox("pinned", {
    // "dateposted":Date.now().toLocaleString('en-us'), 
    "dateposted":"05/09/2015", 
    "title":"Bonk", 
    "contents": 
    {
      "subheader" : null,
      "body":              
          <Typography variant="body2">
            Just Bonk. That's it.
          </Typography>,
      "actions":[
        {"type":"button", "text":"Bonk"}
      ]
    }
  })});
  grabbedInfoBoxes.push({"date":Date.UTC(2022,5,14,2,46,27,0),"type":"pinned","box": CreateInfoBox("pinned", {
    "dateposted":"05/14/2022", 
    "title":"Welcome to my page", 
    "contents": 
    {
      "subheader" : "Take a look around",
      "body":              
          <Typography variant="body2">
            In the meantime, take a look at some of these pages (insert `IconButtons` corrosponding to some of the menu items)
          </Typography>,
      "actions":[
        {"type":"button", "text":"FAQ", "icon":<QuestionAnswerIcon style={{}}/>},
        {"type":"button", "text":"Contact", "icon":<AlternateEmailIcon style={{}}/>},
        {"type":"button", "text":"Themes", "icon":<BrushIcon style={{}}/>},
      ]
    }
  })});
    
  grabbedInfoBoxes.push({"date":Date.UTC(2012,12,14,14,32,26,0),"type":"info","box": CreateInfoBox("info", {
        "dateposted":"12/14/2012", 
        "title":"The Big Sad", 
        "contents": 
        {
          "subheader" : "Have dropdown button to view long posts\n... show more",
          "body":<Typography>Potential Bugs:
              <div>
                <li>User can change the localStorage to manipulate the database</li>
                <li></li>
              </div>
          </Typography>,
          "actions":[]
        }
  })});

  grabbedInfoBoxes.push({"UPID":"bring over the UUID","date":Date.UTC(2022,6,6,13,37,11,0),"type":"update","box": CreateInfoBox("update", {
        "dateposted":"06/06/2022", 
        "title":"Bees === Fish?", 
        "contents": 
        {
          "subheader" : null,
          "body":<Typography>Bees are now classified as fish as per <a href="https://www.msn.com/en-ca/news/world/bees-are-now-classified-as-a-type-of-fish-in-california/ar-AAY8aI5?bk=1&ocid=msedgntp&cvid=906931bfe44046b1834e682912afa5ef">California Endangered Species Act (CESA)</a>
          </Typography>,
          "actions":[]
        }
  })});
  
  /* Sorts the data entries and then reverses it for most recent */
  grabbedInfoBoxes.sort((a,b)=> a.date - b.date).reverse();

  let pinnedPosts = []; 
  let temp_grabbedInfoBoxes = grabbedInfoBoxes;
  grabbedInfoBoxes.forEach(_infobox=>{
    if(_infobox.type==="pinned") {
      pinnedPosts.push(_infobox); 
      temp_grabbedInfoBoxes.splice(temp_grabbedInfoBoxes.indexOf(_infobox),1);
      //console.log(`Index : ${temp_grabbedInfoBoxes.findIndex(_infobox.date)}`);
    }
  })

  // CONCAT THE ARRAYS
  grabbedInfoBoxes=/*pinnedPosts.concat*/(temp_grabbedInfoBoxes);


  const [showPinnedPage, setPinnedPage] = React.useState(0);
  const handlePinnedPageChange = (event, newValue) => {
    console.log(event);
    console.log(newValue);
    setPinnedPage(newValue);
  };


  const CreateTab = (_index, ) => {
    const _ctStyle = _index===showPinnedPage ? {color:"white", fontSize:"10px"} : {color:"grey", fontSize:"8px"};
    return (
      <Tab style={{width:"50px", height:"50px", border:"none", minWidth:"50px"}} icon={<CircleIcon sx={{fontSize:"10px"}} style={_ctStyle}/>}>
      </Tab>
    );
  };
  const PinnedTabButtonGroup = () => {
    let rtnElements = [];
    for (let i = 0; i < pinnedPosts.length; i++) { rtnElements.push(CreateTab(i)); }
    return (rtnElements);
  };
  const PinnedTabGroup = () => {
    let rtnElements = [];
    for (let index = 0; index < pinnedPosts.length; index++) {
      //const element = pinnedPosts[index];
      rtnElements.push(<TabPanel value={showPinnedPage} index={index} dir={theme.direction}>{pinnedPosts[index].box}</TabPanel>);
      
    }
    //return ([CreateTab(0),CreateTab(1),CreateTab(2)]);
    return (rtnElements);
  };

  return (
    <ThemeProvider theme={theme}>
      
      <Typography variant="h6" color="white" style={{fontSize:30, textAlign:"center"}}>
            Welcome to the page
      </Typography> 
      {/* <Typography variant="h6" color="white" style={{fontSize:60, textAlign:"center"}}>
      ¯\_(ツ)_/¯
      </Typography>  */}
      <Typography variant="h6" color="white" style={{fontSize:15, textAlign:"center"}}>
      Have blog using skeleton here / Social Updates<br/>Pinned (Below [This dialog is temporary])
      </Typography> 
      {/* Pinned Message Box */}
      <Box width="auto" style={{marginLeft:"5vw", marginRight:"5vw", minHeight:"150px",}}>
        <Box  style={{padding:0}}>          
          <SwipeableViews
            axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
            index={showPinnedPage}
            onChangeIndex={handlePinnedPageChange}
          >
            {PinnedTabGroup()}
          </SwipeableViews>
          <Tabs
            value={showPinnedPage}
            onChange={handlePinnedPageChange}
            indicatorColor="white"
            textColor="white"
            variant="scrollable"
            scrollButtons
            allowScrollButtonsMobile={true}
            // centered
            
            //aria-label="scrollable auto tabs example"
            sx={{color:"white",
              [`& .${tabsClasses.scrollButtons}`]: {
                '&.Mui-disabled': { opacity: 0.3 },
              },
            }}
          >
            {/* Mobile = Display ONLY 1, Desktop, show like in MS Paint (2 behind the foregrounded item) */}
            {PinnedTabButtonGroup()}
          </Tabs>
        </Box>
      </Box>
      <Card style={{marginLeft:"5vw", marginRight:"5vw", marginTop:"10px"}}>
      {grabbedInfoBoxes.map((_box) => (_box.box))}
      </Card>
    </ThemeProvider>
  );
};
export default LandingPage;
