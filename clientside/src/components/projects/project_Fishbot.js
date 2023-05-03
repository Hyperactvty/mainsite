import React, {useState, useReducer} from "react";
import { Route, Link, Routes } from "react-router-dom";
import styled from '@mui/styled-engine';

import { ThemeProvider } from "@mui/material/styles";
import {
  Toolbar,
  Autocomplete,
  TextField,
  Card,
  AppBar,
  Breadcrumbs, BottomNavigation, BottomNavigationAction,
  CardHeader, CardMedia,
  CardContent,ClickAwayListener,
  Typography,
  Box,
  Stack,
  Button, useMediaQuery,
  Fab, SvgIcon,
  IconButton, Chip,
  Zoom,FormControlLabel,InputAdornment,
  Dialog, DialogTitle, DialogContent, DialogActions,
  DialogContentText, Slider,
  Grid, Switch, Slide, Skeleton, Avatar, hslToRgb,

  List, ListItem, ListItemText, 
  ListItemButton, ListItemAvatar, ListItemIcon, ListSubheader,
  Menu, Divider, Collapse, Drawer,
} from "@mui/material";import PropTypes from 'prop-types';
import theme from "../../theme";
//import recomposeColor from ""

import SendIcon from '@mui/icons-material/Send';
import BackpackIcon from '@mui/icons-material/Backpack';
import CrewIcon from '@mui/icons-material/EmojiPeople';
import DiscountedItemIcon from '@mui/icons-material/LocalOffer';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import SetMealIcon from '@mui/icons-material/SetMeal';
import BoatIcon from '@mui/icons-material/Sailing';
import HookIcon from '@mui/icons-material/Phishing';
import MoneyIcon from '@mui/icons-material/LocalAtm';
import FeaturedIcon from '@mui/icons-material/Star';
import SaleIcon from '@mui/icons-material/LocalOffer';
import LoyaltySaleIcon from '@mui/icons-material/Loyalty';
import PiggybankIcon from '@mui/icons-material/Savings';
import TackleBoxIcon from '@mui/icons-material/Key';
import Boats_FishingBoatsIcon from '@mui/icons-material/Kayaking';
import Region_DeepSeaIcon from '@mui/icons-material/ScubaDiving';
import Region_TropicalIcon from '@mui/icons-material/Surfing';

import Weather_ThunderstormIcon from '@mui/icons-material/Thunderstorm';
import Weather_ExtremeWavesIcon from '@mui/icons-material/Tsunami';
import Weather_SevereColdIcon from '@mui/icons-material/SevereCold';
import Weather_CycloneIcon from '@mui/icons-material/Cyclone';
import Weather_CalmIcon from '@mui/icons-material/Water';
import Weather_CloudyIcon from '@mui/icons-material/Cloud';
import Weather_SunnyIcon from '@mui/icons-material/WbSunny';

import DropdownOpenIcon from '@mui/icons-material/ExpandMore';
import DropdownCloseIcon from '@mui/icons-material/ExpandLess';

//import fishbotImage from "../media/discordbot_Fishbot_noHyper.png"; /** Grab from db */
import fishbotImage from "../../media/discordbot_Fishbot2022.png"; /** Grab from db */
import temp_BoatImage from "../../media/RIB_EXAMPLE.png"; /** Grab from db */
import temp_ShopItemPlaceholderImage from "../../media/Sack.png"; /** Grab from db */
import temp_BackgroundBannerPlaceholderImage from "../../media/temp_pullfromdb/Animated_SunsetLake.gif"; /** Grab from db */

import temp_GlobalMapOceansLabeledImage from "../../media/temp_pullfromdb/Oceans Coloured Good 360x176.png"; /** @note This is actually temporary, just for getting the array. */
import temp_GlobalMapImage from "../../media/temp_pullfromdb/NASA_WaterClimateRender_September_360x180.jfif"; /** Grab from db */
import temp_GlobalMapCSV from "../../media/temp_pullfromdb/WaterCSV_1985-09-01.CSV"; /** Grab from db */

let temp_oceanNamesArray = []; /** @note This is actually temporary, just for getting the array. */

let renderedEmbed = false;

let borderColour = "#fff";
let inputData = {}; let prevCMD = undefined; let temp_UserFishData = {rod: "basic", lure:"basic",bait:"basic", currentHaul: []/*(typedef(string))*/};
let temp_currentHaul = [];
let _ws = undefined; let displayOnScreen = "initial";
let fish_isFishing = false; let dialogProps = {code: -1, msg: ""};
let recentFish = {rarityColour: "crimson"}; 
let shop_BreadcrumbHistory = [{name: "Home", icon: <ShoppingBagIcon/>},{name: "Fishing Supplies", icon: null}, {name: "Bait", icon: null}];
let crew_BreadcrumbHistory = [{name: "Home", icon: null}];
let inventory_BreadcrumbHistory = [{name: "Home", icon: /*<*/BackpackIcon/*/>*/},{name: "Fishing Supplies", icon: null}, {name: "Bait", icon: null}];

   /**
   * @note Have the method names in format of "{command}_{What the method is}
   */
    const PageLoadWelcomeMessage = ({data}) => {
      return (
        <Typography variant="body1" color="white" style={{marginTop:"auto", margin:"11px/*5%*/ 5px 11px/*5%*/ 10px"}}>
            Welcome to Fishbot, {usrdata?.username!==undefined ? usrdata.username : "Guest"}
        </Typography>
      );
    };
    let embedData = <PageLoadWelcomeMessage/>; let renderedPage = {render: undefined, name: "fish"};
    //let renderedPage = {render: <PageLoadWelcomeMessage/>, name: "pageLoad"};
    
    const NotAValidCommand = ({data}) => {
      console.log("v",[].concat(inputData).values().next());
      return (
        <div>
          <Typography variant="body1" color="white" style={{marginTop:"auto", margin:"11px/*5%*/ 5px 11px/*5%*/ 10px"}}>
              <b style={{backgroundColor:"#3c3c3c", padding:"3px 5px"}}>{[].concat(inputData).values().next().value}</b> is not a valid command
          </Typography>
        </div>
      );
    };
    const NotImplementedCommand = ({data}) => {
      // borderColour = "#dda000";
      return (
        <div>
          <Typography variant="body1" color="white" style={{marginTop:"auto", margin:"11px/*5%*/ 5px 11px/*5%*/ 10px"}}>
              <b style={{backgroundColor:"#3c3c3c", padding:"3px 5px"}}>{[].concat(inputData).values().next().value.command}</b> is not yet implemented.
          </Typography>
        </div>
      );
    };

const CreateEmbed = ({refresh, data=<PageLoadWelcomeMessage/>, borderColour="#fff"}) => {
  if(renderedEmbed === false) {
    console.log("renderedEmbed",renderedEmbed);
    console.log("borderColour",borderColour);
    // refresh({});
  }
  renderedEmbed = true;
  return (
    <Grid container>
        <Grid item style={{height:"100px", width:"56px"}} >
        <Box id={"fishbotAvatar"} style={{float:"left", height:"100%",}}>
        <Avatar alt="Fishbot" src={fishbotImage} sx={{ width: 56, height: 56 }} style={{float:"left"}}/> 
        </Box>
        </Grid>
        <Grid id={"embedArea"} item style={{
          display:"grid",
          width:"80%"
        }}>
            <Box style={{display:"flex", alignItems:"baseline", float:"left", /*height:"45px",width:"auto"*/}}>
            
                {/* <Grid item > */}
                    <Typography variant="body1" color="white" style={{marginTop:"auto", margin:"11px/*5%*/ 5px 11px/*5%*/ 10px", height:24}}>
                        Fishbot
                    </Typography> 
                {/* </Grid> */}
                {/* <Grid item > */}
                <Typography variant="body1" color="white" style={{backgroundColor:"lightslategrey", borderRadius:"5px", width:"min-content",height:"fit-content", padding:"0 5px", display:"flex", fontSize:"15px"}}>
                    BOT
                </Typography> 
                {/* </Grid> */}
            </Box>
            {/* <Grid item sm> */}
            <Box style={{
                backgroundColor:theme.palette.background.default,
                padding:"16px", borderRadius:"4px", boxShadow: "0px 4px 8px rgb(0 0 0 / 30%)",
                borderLeft:"4px solid", display:prevCMD!=="fish" ? "flex" : "block"/* For un-formatting the discord thing just for the buttons to fit */, 
                alignItems:"flex-start",marginTop:"8px", borderColor:borderColour

                // display:"flex", alignItems:"baseline", height:100, 
                // padding: "0 100vw", margin: "0 -100vw", 
                // borderRadius:"10px"
            }}>
                {data!==undefined ? data : <PageLoadWelcomeMessage/>}
            </Box>
            {/* </Grid> */}
        </Grid>
    </Grid>
  );
};

const usrdata = JSON.parse(localStorage.getItem('userdata')) ?? {UUID: `Guest${Math.ceil(Math.random()*99999999)}`};

const fish_shopDirectoryList = [
  {name:"Item of the Day", type:"default", icon: FeaturedIcon, items: [
    {id: 0, type: "rod", name: "Basic", selected: false},
  ]},
  {name:"Weekly Deals", type:"default", icon: SaleIcon, items: [
    {id: 0, type: "rod", name: "Basic", selected: false},
  ]},
  {name:"Loyalty Shop", type:"default", icon: LoyaltySaleIcon, items: [
    {id: 0, type: "rod", name: "Basic", selected: false},
  ]},
  {name:"div", type:"divider", icon: null},
  {
    name:"Fishing Supplies", type:"dropdown",
    open:false, subpages: [
      { name:"Rods", icon: null, items: [
        {id: 0, type: "rod", name: "Basic", selected: false, showStats: false},
      ]},
      { name:"Bait", icon: null, items: [
        {id: 0, type: "bait", name: "Basic", selected: false, showStats: false},
        {id: 1, type: "bait", name: "Gummy", selected: false, showStats: false},
        {id: 2, type: "bait", name: "Worm", selected: false, showStats: false},
      ]},
      { name:"Lures", icon: null, items: [
        {id: 0, type: "lure", name: "Basic", selected: false, showStats: false},
      ]},
      { name:"Backpacks", icon: null, items: [
        {id: 0, type: "backpack", name: "Basic", selected: false, showStats: false},
      ]},
    ]
  },
  {
    name:"Regions", type:"dropdown",
    open:false, subpages: [
      { name:"Lakes", items: [{}] },
      { name:"Ocean", items: [{}] },
    ]
  },
  {
    name:"Boats", type:"dropdown",
    open:false, subpages: [
      {name:"Fishing", icon:Boats_FishingBoatsIcon, items: [{}]}, 
      {name:"Canvas Sail", icon: null, items: [{}]},
    ]
  },
  { name:"Hire Crew", type:"default", icon: null, items: [{}] },
  { name:"Tackle Boxes", type:"default", icon: TackleBoxIcon, items: [
    {id: 0, type: "tacklebox", name: "Standard", selected: false, rarity: "Common"},
    {id: 1, type: "tacklebox", name: "Large", selected: false, rarity: "Uncommon"},
    {id: 2, type: "tacklebox", name: "Crate", selected: false, rarity: "Rare"},
    {id: 3, type: "tacklebox", name: "Barrel", selected: false, rarity: "Epic"},
    {id: 4, type: "tacklebox", name: "Chest", selected: false, rarity: "Legendary"},
  ] /** Have this refresh every 12 hours. Also have rarities. */},
];

let shop_DisplayPage = fish_shopDirectoryList[4].subpages[1];

const fish_inventoryDirectoryList = [
  {name:"Equipped", type:"default", icon: null,  items:[] },
  {name:"div", type:"divider", icon: null},
  {
    /** @note Pull stats from DB */
    name:"Fishing Supplies", type:"dropdown",
    open:false, subpages: [
      { name:"Rods", icon: null, items: [
        {id: 0, type: "rod", name: "Basic", selected: false, showStats: false},
      ]},
      { name:"Bait", icon: null, items: [
        {id: 0, type: "bait", name: "Basic", selected: false, showStats: false},
      ]},
      { name:"Lures", icon: null, items: [
        {id: 0, type: "lure", name: "Basic", selected: false, showStats: false},
      ]},
      { name:"Backpacks", icon: null, items: [
        {id: 0, type: "backpack", name: "Basic", selected: false, showStats: false},
      ]},
    ]
  },
  {
    name:"Equipment", type:"dropdown",
    open:false, subpages: [
      { name:"Hat", icon: null, items: [
        {id: 0, type: "rod", name: "Basic", selected: false, showStats: false},
      ]},
      { name:"Vests", icon: null, items: [
        {id: 0, type: "bait", name: "Basic", selected: false, showStats: false},
      ]},
      { name:"Pants", icon: null, items: [
        {id: 0, type: "lure", name: "Basic", selected: false, showStats: false},
      ]},
      { name:"Trinkets (max. 3)", icon: null, items: [
        {id: 0, type: "backpack", name: "Basic", selected: false, showStats: false},
      ]},
    ]
  },
  {name:"Fish Haul", type:"default", icon: FeaturedIcon, items:[]},
  {
    name:"Regions", type:"dropdown",
    open:false, subpages: [
      { name:"Lakes", icon: null,  items:[]},
      { name:"Ocean", icon: null,  items:[]},
    ]
  },
  {
    name:"Boats", type:"dropdown",
    description: "",
    open:false, subpages: [
      {name:"Fishing", icon:Boats_FishingBoatsIcon, items:[]}, 
      {name:"Canvas Sail", icon: null,  items:[]},
    ]
  },
  { name:"Manage Crew", type:"default", icon: null,  items:[] },
];
let inventory_DisplayPage = fish_inventoryDirectoryList[5].subpages[1];

const fish_crewDirectoryList = [
  {name:"Active Crew", type:"default", icon: null,  items:[] /** @note Pull from DB */ },
  {name:"Fishing Business", type:"default", icon: null,  items:[
    { name:"button_Change Business Name", type:"button", icon: null, items: []},
  ] /** @note Pull from DB */ }, // The user's LLC
  {name:"div", type:"divider", icon: null},
  {
    name:"By Category", type:"dropdown",
    open:false, subpages: [
      { name:"All", icon: null, items: []}, // Grab from DB (temp-use: the Object)
      { name:"Guides", icon: null, items: []},
      { name:"Fishers", icon: null, items: []},
      { name:"Workers", icon: null, items: []}, // Used for building companies throughout all the worlds/ realms
      { name:"Marketers", icon: null, items: []},
      { name:"Distributors", icon: null, items: []},
    ]
  },

  { name:"Manage Crew", type:"default", icon: null,  items:[] },
];
let crew_DisplayPage = fish_crewDirectoryList[3].subpages[0];

function rarityToColour(rarity=undefined) {
  let r = "none";
  switch (rarity) {
    case "Common":
      r = "#6f7291";
      break;
    case "Uncommon":
      r = "#46c74c";
      break;
    case "Rare":
      r = "#4684c7";
      break;
    case "Epic":
      r = "#9d46c7";
      break;
    case "Legendary":
      r = "#c77746";//"#f5a623";
      break;
    // case "Relic":
    //   recentFish.rarityColour = "#8f05ab"
    //   break;
    case "Exotic":
      r = "#c74646";//"#crimson"
      break;
    case "Event":
      r = /*"#7cd6ef"*/ /*"#61dafb"*/ "#46c79f";
      break;
    default:
      //r = "#fff";//"crimson";
      break;
  }
  return r;
};

function csvToArray(str, delimiter = ",") {
  // slice from start of text to the first \n index
  // use split to create an array from string by delimiter
  let h = [];
  for (let index = 0; index < 360; index++) {
    h.push(index);
  }
  const headers = h;
  // const headers = str.slice(0, str.indexOf("\n")).split(delimiter);
  // console.log("HEADERS > ",headers);

  // slice from \n index + 1 to the end of the text
  // use split to create an array of each csv value row
  const rows = str.slice(str.indexOf("\n")).split("\n");
  // const rows = str.slice(str.indexOf("\n")).split("\n");

  // console.log("ROWS > ",rows);

  // Map the rows
  // split values from each row into an array
  // use headers.reduce to create an object
  // object properties derived from headers:values
  // the object passed as an element of the array
  let arr = rows.map(function (row) {
    const values = row.split(delimiter);
    const el = headers.reduce(function (object, header, index) {
      // console.log("o",object, "h",header, "i",index)
      object[header] = values[index];
      return object;
    }, {});
    return el;
  });
  // console.log("arr Prior > ",arr);
  arr = arr.slice(1);
  // console.log(arr);

  // return the array
  return arr;
}


/*const*/let GLOBALMAP2D = undefined;//csvToArray(temp_GlobalMapCSV);
let t_fileRead = undefined;

async function createFile(){
  let response = await fetch(temp_GlobalMapCSV);
  let data = await response.blob();
  let metadata = {
    type: 'text/csv'
  };
  let file = new File([data], "test.CSV", metadata);
  // ... do something with the file or return it
  // console.log("FILE > ",file)
  file.arrayBuffer().then((arrayBuffer) => {
    const blob = new Blob([new Uint8Array(arrayBuffer)], {type: file.type });
    // console.log(blob);
  });

  var reader = new FileReader();
  reader.onload = function () {
    // console.log(reader.result);
    t_fileRead = csvToArray(reader.result)
    GLOBALMAP2D = t_fileRead;
  };
  reader.readAsText(file);
}
createFile();

let dialogW = 0;
let dialogH = 0;
function ShopPurchaseDialog(props) {
  const [itemAmount, setItemAmount] = React.useState(1);
  const [displayScreen, setDisplayScreen] = React.useState(0);
  const [displayBuyResult, setDisplayBuyResult] = React.useState([]);
  const { onClose, item, open } = props;
  const data = item.data;
  const category = item.category.endsWith("s") ? item.category.endsWith("es") ? item.category.slice(0,-2) : item.category.slice(0,-1) : item.category;
  const handleClose = () => {
    onClose(item);
  };
  let isMobile = useMediaQuery('(min-width:600px)');

  let res = {};

  return (
    <Dialog id={"shopPurchaseDialog"} onClose={handleClose} open={open} style={{overflow:"hidden"}} onMouseEnter={(e) => {
      if(dialogW===0) {
        dialogW = Object.entries(document.getElementById("shopPurchaseDialog").children).find(([_,e]) => e.role === "presentation")[1].children[0].clientWidth;//document.getElementById("shopPurchaseDialog").children[2].clientWidth;
        dialogH = Object.entries(document.getElementById("shopPurchaseDialog").children).find(([_,e]) => e.role === "presentation")[1].children[0].clientHeight//document.getElementById("shopPurchaseDialog").children[2].clientHeight;
        // console.log(w,h)
        // setDialogWH([w,h]);
        Object.entries(document.getElementById("shopPurchaseDialog").children).find(([_,e]) => e.role === "presentation")[1].children[0].id = "divShopDialog";
      }
      // document.getElementById("divShopDialog").style.width = `${dialogW}px`;
      // document.getElementById("divShopDialog").style.height = `${dialogH}px`;
    }}>
      <DialogTitle>Bass Rookie Shop</DialogTitle>
      <Box id="dialogBox" style={{marginLeft:isMobile ? "2.5vw" : "5vw", marginRight:isMobile ? "2.5vw" : "5vw"}}>
        {displayScreen===0 && <div id={"shopConfirmationScreen"}>
          <Box style={{backgroundImage:`url(${temp_ShopItemPlaceholderImage})`, backgroundColor:"#fff", backgroundSize:"80px", backgroundPosition:"center", backgroundRepeat:"no-repeat", height:"100px", width:"100px", borderRadius:"10px", outline:data?.rarity ? "solid" : "none", outlineColor: rarityToColour(data?.rarity), float:"left", marginRight:"10px"}}></Box>
          <Box id="rightSideAttrs" style={{float:"right"}}>
            <Typography variant="body1" color="white" style={{display:"flex",alignItems:"baseline", flexWrap:"wrap" }}>
              {data.name} {category}
            </Typography>
            <Typography variant="body2" color="white" style={{display:"flex",alignItems:"baseline", flexWrap:"wrap" }}>
              / ea
            </Typography>
            <div style={{marginTop:"10px"}}>
            <TextField
              id={`${data.name}-${data.id}-input`}
              label={`Buy ${data.name} ${category}?`}
              placeholder={"1"}
              // type="number"
              // value={shop_quantity}
              // onChange={(e) => setShop_quantity(e.target.value)}
              InputLabelProps={{
                shrink: true,

              }}
            />
            <div style={{display:"flex"}}>
            <Grid item xs={6}>
              <Button id={`${data.name}-${data.id}`} style={{textTransform:"none", display:"block"}} color={"success"} variant={"contained"}
                onClick={(e) => {
                  let v = document.getElementById(`${data.name}-${data.id}-input`).value;
                  const amt = v ? v : 1;
                  console.log(amt);
                  setItemAmount(amt);
                  let query = "";
                  switch (category) {
                    case "Tackle Box":
                      query="openTacklebox"
                      break;
                  
                    default:
                      query="increase"
                      break;
                  }

                  console.log(`ws://localhost:5000/fishbot/${query}/user=${usrdata?.UUID}&category=${category}&item=${data.name}&amt=${amt}`);
                  _ws = new WebSocket(`ws://localhost:5000/fishbot/${query}/user=${usrdata?.UUID}&category=${category}&item=${data.name}&amt=${amt}`);
                  _ws.onmessage = (message) => {
                      message = message.data;//JSON.parse(message.data);
                      res = JSON.parse(message);//?.data.user;
                      if(res?.tempData) {
                        temp_UserFishData = res?.tempData;
                      }
                      if(res.success === true) {
                        setDisplayScreen(2);
                        setDisplayBuyResult(res.result);
                        let temp_displayBuyResult = [];
                        console.log(Object.entries(res.result));
                        Object.entries(res.result).forEach(([_,e]) => {
                          // if exists, add to existing
                          console.log("e",e)
                          // if(temp_displayBuyResult.entries((i,a) => {console.log("> i, a > ",i,a)}))
                          temp_displayBuyResult.entries((i,a) => {console.log("> i, a > ",i,a)});
                          console.log("tdBR",temp_displayBuyResult.findIndex(ele => ele.item === e.item));
                          let _i = temp_displayBuyResult.findIndex(ele => ele.item === e.item);
                          if(_i===-1) {
                            e.spannedOverBoxes = 1;
                            temp_displayBuyResult.push(e);
                          } else {
                            console.log("Updated amount > ",temp_displayBuyResult[_i].amount," -> ",temp_displayBuyResult[_i].amount+e.amount );
                            temp_displayBuyResult[_i].amount += e.amount;
                            temp_displayBuyResult[_i].spannedOverBoxes += 1;
                          }
                        });
                        setDisplayBuyResult(temp_displayBuyResult);
                        console.log(temp_displayBuyResult);
                        // setTimeout(() => onClose(JSON.stringify({msg: `Successfully bought ${itemAmount} <objectname> for <price>`})), 5000);
                      } else {
                        console.warn("There was a problem processing your request");
                        setDisplayScreen(-1);
                      }

                      console.log("RES > ",res);
                  };
                  setDisplayScreen(1);
                  // setShop_quantity(e.target.value>0 ? e.target.value : 1);
                }}
              >Buy
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button id={`${data.name}-${data.id}`} style={{textTransform:"none", display:"block"}} color={"error"} variant={"contained"}
                onClick={(e) => {
                  console.log("set to max");
                  setDisplayScreen(1);
                  // setShop_quantity(e.target.value>0 ? e.target.value : 1);
                }}
              >Max
              </Button>
            </Grid>
            </div>
          </div>
          </Box>
        </div>}
        {displayScreen===1 && <div id={"shopConfirmationWaitingScreen"}>
          <Typography variant="body1" color="white" style={{display:"flex",alignItems:"baseline", flexWrap:"wrap" }}>
            import the progress component here
          </Typography>
        </div>}
        {displayScreen===-1 && <div id={"shopConfirmationWaitingScreen"}>
          <Typography variant="body1" color="red" style={{display:"flex",alignItems:"baseline", flexWrap:"wrap" }}>
            There was an error with your request
          </Typography>
        </div>}
        {displayScreen===2 && <div id={"shopConfirmationScreen"}>
            <Typography variant="body1" color="white" style={{display:"flex",alignItems:"baseline", flexWrap:"wrap" }}>
              Success!
            </Typography>
            <Divider/>
            <div style={{ maxWidth:"100%"}}>
            {displayBuyResult.map((data,i) => (
                // <Grid id={i} item xs={6} md={4}>
                  <Box key={i} style={{marginTop:"10px",maxWidth:"inherit", padding:"10px", borderRadius:"10px", outline:data?.rarity ? "solid" : "none", outlineColor: rarityToColour(data?.rarity)}}>
                    {data.item.split(".").at(-1).substring(0,1).toUpperCase()+data.item.split(".").at(-1).substring(1)} {data.item.split(".").length>1?data.item.split(".").at(-2).substring(0,1).toUpperCase()+data.item.split(".").at(-2).substring(1):": (name)"} x{data.amount} {data.spannedOverBoxes > 1 ? `(~${Math.ceil((parseInt(data.amount)/parseInt(data.spannedOverBoxes)*1000))/1000}/box)` : null}
                  </Box>
                // </Grid>
            ))}
            <div style={{display:"flex"}}>
              
              <Button id={`${data.name}-${data.id}`} style={{textTransform:"none", display:"block"}} color={"error"} variant={"contained"}
                onClick={(e) => {
                  onClose(JSON.stringify({msg: `Successfully bought ${itemAmount} <objectname> for <price>`}));
                  // setShop_quantity(e.target.value>0 ? e.target.value : 1);
                }}
              >Close
              </Button>
              +/- points from using the box (+/-points if gained valuation for each item)
            </div>
          </div>
        </div>}
      </Box>
    </Dialog>
  );
}

ShopPurchaseDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  item: PropTypes.object.isRequired
};

function ChangeLocationDialog(props) {
  const [altTracking, setAltTracking] = React.useState(true);
  const [validFishLocation, setValidFishLocation] = React.useState({valid: false, warmth:99999});
  const [adjustedMouseToBoatLocator, setAdjustedMouseToBoatLocator] = React.useState(50);
  const [location, setLocation] = React.useState({lon: 0, lat: 0});

  const { onClose, selectedValue, open } = props;
  /** @note X, Y */

  let myImg = undefined;

  const handleClose = () => {
    onClose(selectedValue);
  };

  function FindPosition(oElement) {
    if(typeof( oElement.offsetParent ) != "undefined")
    {
      for(var posX = 0, posY = 0; oElement; oElement = oElement.offsetParent)
      {
        posX += oElement.offsetLeft;
        posY += oElement.offsetTop;
      }
        return [ posX, posY ];
      }
      else
      {
        return [ oElement.x, oElement.y ];
      }
  }

  function GetCoordinates(e) {
    var PosX = 0;
    var PosY = 0;
    var ImgPos;
    ImgPos = FindPosition(myImg);
    if (!e) var e = window.event;
    if (e.pageX || e.pageY)
    {
      PosX = e.pageX;
      // PosY = e.pageY;
      PosY = e.clientY+25;
      // console.log("PosY = ",e.pageY);
      console.log("PosY = ",e.clientY," + ",document.body.scrollTop," + ", document.documentElement.scrollTop);
    }
    else if (e.clientX || e.clientY)
      {
        PosX = e.clientX + document.body.scrollLeft
          + document.documentElement.scrollLeft;
        PosY = e.clientY + document.body.scrollTop
          + document.documentElement.scrollTop;
        console.log("PosY = ",e.clientY," + ",document.body.scrollTop," + ", document.documentElement.scrollTop);
      }
    PosX = PosX - ImgPos[0];
    PosY = PosY - ImgPos[1];
    if(altTracking) {
      PosY = PosY - adjustedMouseToBoatLocator;//100;//50;
    } else {
      PosY = PosY;// - 50;

    }
    
    setLocation({lon: PosX, lat: PosY}); 

    //console.log(GLOBALMAP2D[Math.abs(PosX)][PosY-60]);

    var f = document.getElementById('boatIcon');
    let bpX = PosX-(25);
    let bpY = PosY-25;//(25+50);
    f.style.transform = 'translateY('+(bpY)+'px)';
    f.style.transform += 'translateX('+(bpX)+'px)';
    console.log("px > ",bpX, " py > ", bpY);

    // validFishLocation = {valid: false, warmth: GLOBALMAP2D[PosY][PosX]};
    if(PosY < 179 && (GLOBALMAP2D[PosY][PosX]!=="99999.0" && GLOBALMAP2D[PosY][PosX]!=="99998.0")) {
      let ocean = "North Pacific Ocean";
      if(temp_oceanNamesArray[PosY][PosX] === "rgb(85,255,0)") {
        ocean = "North Pacific Ocean";
      } else if(temp_oceanNamesArray[PosY][PosX] === "rgb(189, 199242)") {
        ocean = "Arctic Ocean";
      } else if(temp_oceanNamesArray[PosY][PosX] === "rgb(214,111,156)") {
        ocean = "Southern Ocean";
      } else if(temp_oceanNamesArray[PosY][PosX] === "rgb(255,255,115)") {
        ocean = "Southern Pacific Ocean";
      } else if(temp_oceanNamesArray[PosY][PosX] === "rgb(209,255,115)") {
        ocean = "Northern Atlantic Ocean";
      } else if(temp_oceanNamesArray[PosY][PosX] === "rgb(195,250,204)") {
        ocean = "Southern Atlantic Ocean";
      } else if(temp_oceanNamesArray[PosY][PosX] === "rgb(255,170,0)") {
        ocean = "Indian Ocean";
      } else if(temp_oceanNamesArray[PosY][PosX] === "rgb(0,255,197)") {
        ocean = "South China Sea";
      } else if(temp_oceanNamesArray[PosY][PosX] === "rgb(255,115,223)") {
        ocean = "Mediterranean Sea";
      } else {
        ocean = "Baltic Sea";
      }
      setValidFishLocation({valid: true, warmth: GLOBALMAP2D[PosY][PosX], ocean: ocean});
      console.log("IS VLAID!",validFishLocation, "Ocean > ",ocean);
    } else {
      // if(GLOBALMAP2D[PosY][PosX]==="99998.0") {
      //   console.log("That is ice.");
      // }
      console.log("Not Valid Location",validFishLocation);
      setValidFishLocation({valid: false, warmth: GLOBALMAP2D[PosY][PosX]});

    }

    // console.log("The RGB > ",temp_oceanNamesArray[PosY][PosX]);


    // f.style.transform = 'translateY('+(PosY-25)+'px)';
    // f.style.transform += 'translateX('+(PosX-25)+'px)';

    // f.style.transform = 'translateY('+(PosY-25)+'px)';
    // f.style.transform += 'translateX('+(PosX-25)+'px)';
    
    // document.addEventListener('click', function(ev){
    //     f.style.transform = 'translateY('+(ev.clientY-25)+'px)';
    //     f.style.transform += 'translateX('+(ev.clientX-25)+'px)';
    // },false);
  }


  return (
    <Dialog id={"globalMapDialog"} onClose={handleClose} open={open} style={{overflow:"hidden"}}>
      <DialogTitle>Click to sail</DialogTitle>
      (don't worry, the boat can go through land)
      <canvas id="myCanvas" width="360" height="176" style={{display:"none"}}></canvas>
      <div>
        <BoatIcon id="boatIcon" sx={{fontSize:30, position:"absolute", transition: "transform 1s", pointerEvents: "none"}}/>
        {/* <CardMedia id={"globalMapImage"} component="img" height="180" image={temp_GlobalMapImage} alt="Global Fish Area" onClick={(e) => { */}
        <div id={"globalMapImage"} style={{height:180,width:360, backgroundImage: `url(${temp_GlobalMapImage})`,backgroundPosition: "center",backgroundRepeat: "no-repeat",backgroundSize: "cover",}} alt="Global Fish Area" onClick={(e) => {
          myImg = document.getElementById("globalMapImage");
          myImg.onmousedown = GetCoordinates;

          // console.log(document.getElementById("globalMapImage").parentElement.parentElement);
          document.getElementById("globalMapImage").parentElement.parentElement.style.overflow = "hidden"; /** @note to have no scroll bar */

          /** @note The 360x176 image colour array-izer3000 */
          function drawImage(imageObj) {
            var canvas = document.getElementById('myCanvas');
            var context = canvas.getContext('2d');
            var imageX = 0;
            var imageY = 0;
            var imageWidth = imageObj.width;
            var imageHeight = imageObj.height;
    
            context.drawImage(imageObj, imageX, imageY);
    
            var imageData = context.getImageData(imageX, imageY, imageWidth, imageHeight);
            var data = imageData.data;

            // let tRGBarry = new Array(176);
            let tRGBarry = Array.from(Array(176), () => new Array(360));
            let itr = 0; // 360 items per row
            let rowItr = 0; // 176 rows
            // iterate over all pixels
            for(var i = 0, n = data.length; i < n; i += 4) {
              var red = data[i];
              var green = data[i + 1];
              var blue = data[i + 2];
              var alpha = data[i + 3];
              // tRGBarry[rowItr].push(`rgb(${red},${green},${blue})`);
              tRGBarry[rowItr][itr] = (`rgb(${red},${green},${blue})`);
              itr+=1;
              if(itr>=360) {
                rowItr++;
                itr = 0;
              }
            }
            // console.log("The Complete Array",tRGBarry);
            temp_oceanNamesArray = tRGBarry;
    
            // // pick out pixel data from x, y coordinate
            // var x = 20;
            // var y = 20;
            // var red = data[((imageWidth * y) + x) * 4];
            // var green = data[((imageWidth * y) + x) * 4 + 1];
            // var blue = data[((imageWidth * y) + x) * 4 + 2];
            // var alpha = data[((imageWidth * y) + x) * 4 + 3];
            
            // // iterate over all pixels based on x and y coordinates
            // for(var y = 0; y < imageHeight; y++) {
            //   // loop through each column
            //   for(var x = 0; x < imageWidth; x++) {
            //     var red = data[((imageWidth * y) + x) * 4];
            //     var green = data[((imageWidth * y) + x) * 4 + 1];
            //     var blue = data[((imageWidth * y) + x) * 4 + 2];
            //     var alpha = data[((imageWidth * y) + x) * 4 + 3];
            //   }
            // }
          }
          // if(temp_oceanNamesArray===[]) {
            var imageObj = new Image();
            imageObj.onload = function() {
              drawImage(this);
            };
            imageObj.src = temp_GlobalMapOceansLabeledImage;
          // }
  
          
        }}/>
          
      </div>
      
      {
        validFishLocation.valid
        ? <Typography variant="body1" color="white" style={{}}>Temperature: {validFishLocation.warmth}&deg;C</Typography>
        : <Typography variant="body1" color="red" style={{}}>Invalid Location</Typography>
      }
      Note: Add MAriana's trench location
      <Slider value={adjustedMouseToBoatLocator} 
        onChange={(e) => setAdjustedMouseToBoatLocator(e.target.value)}
        step={10}
        marks
        min={10}
        max={110} 
        aria-label="Default" valueLabelDisplay="auto" />

      <Button variant="contained" color="info" onClick={() => setAltTracking(!altTracking)}>
        Location not Right? Click.
      </Button>
      {/* <Grid item xs={12} md={3}> */}
        <Button variant="contained" fullWidth endIcon={<BoatIcon/>}>Dock (if near land)</Button>
      {/* </Grid> */}
      <Button disabled={!validFishLocation.valid} variant="contained" color="success" onClick={() => onClose(JSON.stringify({name:validFishLocation?.ocean, /*lon:location.lon, lat: location.lat,*/ warmth: validFishLocation.warmth}))}>
        Go (Sail)
      </Button>
    </Dialog>
  );
}

ChangeLocationDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
};


const Project_FishbotPage = ({ setState, state }) => {
    

    const [givenCommand, setGivenCommand] = React.useState("");
    const [fishScreen, setFishScreen] = React.useState("initial");
    const reducer = (fishState, newFishState) => ({ ...fishState, ...newFishState });
    const [fishState, setFishState] = useReducer(reducer, {
      isFishing: false,
      hooked: false,
      reeling: false,
      cooldown: false,
    });
    const [fishingState, setFishingState] = React.useState(undefined);
    const [errorDialogOpen, setErrorDialogOpen] = React.useState(false);
    const [bottomNavValue, setBottomNavValue] = React.useState(1);
    const [hideWelcomeMessage,setHideWelcomeMessage] = React.useState(false);

    const [continueButtonDisable, setContinueButtonDisable] = React.useState(true);
    function continueButtonCooldown(e) {
      // setContinueButtonDisable(true);
      setTimeout(() => {
        if(continueButtonDisable!==false) {
          setContinueButtonDisable(false);
        }
      }, 4000);
    }

    const [validCommand, setValidCommand] = React.useState(undefined);

  const [fish_ShopDrawerOpen, setFish_ShopDrawerOpen] = React.useState(null);
  const [fish_DisplayWeatherAlert, setFish_DisplayWeatherAlert] = React.useState(false); 
  const [fish_ShowWeatherAlert, setFish_ShowWeatherAlert] = React.useState(false); 
  let weatherFABref = React.useRef(null);
  const [shop_ShopDrawerOpen, setShopBreadcrumb] = React.useState(null);
  const [shop_ShopMenuOpen, setShop_ShopMenuOpen] = React.useState(false);
  const [shop_quantity, setShop_quantity] = React.useState(1);
  
  let shopDrawerSelectedLI = undefined;
  let inventoryDrawerSelectedLI = undefined;
  let crewDrawerSelectedLI = undefined;

  const [inventory_MenuOpen, setInventory_MenuOpen] = React.useState(false);
  const [fish_InventoryDrawerOpen, setFish_InventoryDrawerOpen] = React.useState(null);

  const [currentRegion, setCurrentRegion] = React.useState({ region: "North America - Canada", location: "Great Lake" }); // Have this changed whenever the user logs in and syncs to their DB profile
  
  const [locationDialogOpen, setLocationDialogOpen] = React.useState(false);
  const [selectedXYValue, setSelectedXYValue] = React.useState(JSON.stringify({lon: 50, lat: 50}));

  const [shopPurchaseDialogOpen, setShopPurchaseDialogOpen] = React.useState(false);
  const [shop_SelectedItem, setShop_SelectedItem] = React.useState({data: shop_DisplayPage.items[0], category:"Rods"});

  const handleClickLocationDialogOpen = () => {
    setLocationDialogOpen(true);
  };
  const handleLocationDialogClose = (value) => {
    setLocationDialogOpen(false);
    setSelectedXYValue(value);
  };

  React.useEffect(() => {
    console.log("On page load");
    /** @note Sync the user's data from the DB */
    setCurrentRegion({ region: "Earth", location: "Global"}); /** @temp */
    /** @note Have day cycle every hour (1 hour = 1 day) */
    /** @note Research the average tampreture gain and loss by day and night */
    // https://neo.gsfc.nasa.gov/view.php?datasetId=AVHRR_CLIM_M&date=1985-09-01
  }, []);

  function unselectFields(arr, data) {
    arr.items.forEach(e => {
      if(e.id!==data.id) {
        e.selected = false;
      }
    });
    data.selected = true;
    setState({});
  };
    // const shopDrawerItemList = (anchor) => (
    //   <Box
    //     sx={{ width: 250 }}
    //     role="presentation"
    //     onClick={() => setFish_ShopDrawerOpen(null)}
    //     // style={{ color: "white"}}
    //     // onKeyDown={toggleDrawer(anchor, false)}
    //   >
    //     <List>
    //       {fish_shopDirectoryList.map((data) => {
    //           if(data.type)
    //           return (
    //             <ListItem key={data.name} disablePadding>
    //             <ListItemButton>
    //               <ListItemIcon style={{color:"inherit"}}>
    //                   {data.icon}
    //               </ListItemIcon>
    //               <ListItemText primary={data.name} />
    //             </ListItemButton>
    //           </ListItem>
    //           );
    //       }
    //       )}
    //     </List>
    //   </Box>
    // );


    const Help_MainPage = ({data}) => {
      let gridList = [];
      COMMANDS.find(cmd => cmd.name === "help").subCommands.forEach(_cmd => {
        gridList.push(
          <Grid id={`helpSection-${_cmd.name}`} item style={{marginTop:"10px",}} xs={12} md={4}>
            <p style={{backgroundColor:"#3c3c3c", padding:"3px 5px", width:"fit-content", margin:0}}>{_cmd.name}</p>
            <p style={{fontWeight:"lighter", margin:0}}>{_cmd.description}</p>
          </Grid>
        );
      });
      gridList = gridList.splice(1);
      console.log("GL",gridList);
      return (
        <div style={{margin:"11px/*5%*/ 5px 11px/*5%*/ 10px"}}>
          <Typography variant="body1" color="white" style={{marginTop:"auto", }}>
              <b>Help</b>
          </Typography>
          <Typography variant="body1" color="white" style={{display:"flex",alignItems:"baseline", flexWrap:"wrap" }}>
              Type <p style={{backgroundColor:"#3c3c3c", margin:0,padding:"3px 5px", width:"fit-content"}}>help {"<option>"}</p> for a more detailed summary
          </Typography>
          {inputData["subcommand"]===null && 
            <Grid id={"helpGridList"} container /*spacing={1}*/ style={{
              // display:"grid",
              margin:0,
              // width:"80%"
            }}>
              {gridList}
              {/* <Grid id={"embedArea"} item><p style={{backgroundColor:"#3c3c3c", padding:"3px 5px"}}>e</p></Grid> */}

            </Grid>
          }
        </div>
      );
    };

    function checkIfNeedHTMLParse(_html) {
      if(_html) {
        setTimeout(() => {
          if(document.getElementById('alert-dialog-description')===null) { return; }
          if(document.getElementById('alert-dialog-description').childElementCount!==0) { return; }
          let element=document.createElement("p");
          element.innerHTML = new DOMParser().parseFromString( _html, 'text/html').body.outerHTML;
          element.style.margin = 0;
          document.getElementById('alert-dialog-description').appendChild(element);
        }, 1);
      }
    }

    const Fish = ({data}) => {
    
      let isMobile = useMediaQuery('(min-width:600px)');

      function openShopMenu(value) {
        if(isMobile===false) {
          console.log("Click", isMobile);
          setShop_ShopMenuOpen(!shop_ShopMenuOpen);
        }
        return false;
      }

      let res = {hooked: false};
      
      

      function populateFishData() {
        setTimeout(() => {
          try {
            document.getElementById("fish-caught-screen").style.borderColor=recentFish.rarityColour;
            function unitConverter(value=0, unitOfMeasure="length", systemOfMeasure="me") {
              const VALID_SOM = ["me", "im"];
              if(!VALID_SOM.some(u => u===systemOfMeasure)) {return "Can't do that";}
              if(systemOfMeasure==="im") {
                if(unitOfMeasure === "length") {
                  let temp_uom = (value % 1) * 12;
                  return `${Math.floor(value)!==0 ? `${Math.floor(value)}ft` : ""}${Math.ceil(temp_uom)%12!==0 ? ` ${Math.ceil(temp_uom)%12}in` : ""}`;
                }
                if(unitOfMeasure === "weight") {
                  let temp_uom = (value % 1) * 16;
                  return `${Math.floor(value)!==0 ? `${Math.floor(value)}lb` : ""}${Math.ceil(temp_uom)%16!==0 ? ` ${Math.ceil(temp_uom)%16}oz` : ""}`;
                }
              }
              if(systemOfMeasure==="me") {
                if(unitOfMeasure === "length") {
                  value = value * 0.3048;
                  let temp_uom = (value % 1) * 100;
                  return `${Math.floor(value)!==0 ? `${Math.floor(value)}m` : ""}${Math.ceil(temp_uom)%100!==0 ? ` ${Math.ceil(temp_uom)%100}cm` : ""}`;
                }
                if(unitOfMeasure === "weight") {
                  value = value * 0.45359237;
                  let temp_uom = (value % 1) * 1000;
                  return `${Math.floor(value)!==0 ? `${Math.floor(value)}kg` : ""}${Math.ceil(temp_uom)%1000!==0 ? ` ${Math.ceil(temp_uom)%1000}g` : ""}`;
                }
              }
              // let temp_uom = (value % 1) * 16;
              // return `${Math.floor(value)!==0 ? `${Math.floor(value)}lb` : ""}${Math.ceil(temp_uom)%16!==0 ? ` ${Math.ceil(temp_uom)%16}oz` : ""}`;
            }
            function gradeValuation(thingToGrade, qualifier) {
              const GRADES = ['D-','D','D+','C-','C','C+','B-','B','B+','A-','A','A+','S','SS','SSS'];
              /** @note maybe use `clamp()` */
              let grade = 'D-'; let colour = "#ff0000";
              // if(thingToGrade < 10) { grade = 'D-'; colour = '#ff0000'; } 
              if(thingToGrade < 6.6666666667*1) { grade = 'D-'; colour = '#ff0000'; } 
              else if(6.6666666667*1 <= thingToGrade < 6.6666666667*2) { grade = 'D'; colour = '#ff0000'; } 
              else if(6.6666666667*2 <= thingToGrade < 6.6666666667*3) { grade = 'D+'; colour = '#ff0000'; } 
              else if(6.6666666667*3 <= thingToGrade < 6.6666666667*4) { grade = 'C-'; colour = '#ff0000'; } 
              else if(6.6666666667*4 <= thingToGrade < 6.6666666667*5) { grade = 'C'; colour = '#ff0000'; } 
              else if(6.6666666667*5 <= thingToGrade < 6.6666666667*6) { grade = 'C+'; colour = '#ff0000'; } 
              else if(6.6666666667*6 <= thingToGrade < 6.6666666667*7) { grade = 'B-'; colour = '#ff0000'; } 
              else if(6.6666666667*7 <= thingToGrade < 6.6666666667*8) { grade = 'B'; colour = '#ff0000'; } 
              else if(6.6666666667*8 <= thingToGrade < 6.6666666667*9) { grade = 'B+'; colour = '#ff0000'; } 
              else if(6.6666666667*9 <= thingToGrade < 6.6666666667*10) { grade = 'A-'; colour = '#ff0000'; } 
              else if(6.6666666667*10 <= thingToGrade < 6.6666666667*11) { grade = 'A'; colour = '#ff0000'; } 
              else if(6.6666666667*11 <= thingToGrade < 6.6666666667*12) { grade = 'A+'; colour = '#ff0000'; } 
              else if(6.6666666667*12 <= thingToGrade < 6.6666666667*13) { grade = 'S'; colour = '#ff0000'; } 
              else if(6.6666666667*13 <= thingToGrade < 6.6666666667*14) { grade = 'SS'; colour = '#ff0000'; } 
              else { grade = 'SSS'; colour = 'limegreen'; } 

              // else if(92.5 <= thingToGrade < 95) { grade = 'S'; colour = 'even less limegreen'; } 
              // else if(95 <= thingToGrade < 97.5) { grade = 'SS'; colour = 'less limegreen'; } 
              // else { grade = 'SSS'; colour = 'limegreen'; }
              
              //backgroundColor:hslToRgb("hsl(50, 100, 50)")
              return {grade, colour};
            }
            /** @note May have to update the display values of the screen here, too. */
            /** @note eID = Element ID, rfV = Recent Fish Value */
            const _kvPair = [
              // {eID: "fish-name", rfV: recentFish?.Name},
              {eID: "fish-rarity", rfV: recentFish?.Rarity},
              {eID: "fish-description", rfV: recentFish?.Description},
              {eID: "fish-weight", rfV: recentFish?.weight ? unitConverter((parseFloat(recentFish?.weight)).toFixed(2),"weight","im") : "-"},
              {eID: "fish-weight-min", rfV: (parseFloat(recentFish?.MIN_WEIGHT)).toFixed(2)},
              {eID: "fish-weight-max", rfV: (parseFloat(recentFish?.MAX_WEIGHT)).toFixed(2)},
              {eID: "fish-weight-percent", rfV: (((parseFloat(recentFish?.weight) - parseFloat(recentFish.MIN_WEIGHT)) / ((parseFloat(recentFish.MAX_WEIGHT) - parseFloat(recentFish.MIN_WEIGHT))))*100).toFixed(2), doColour: true},
              {eID: "fish-length", rfV: recentFish?.length ? unitConverter((parseFloat(recentFish?.length)).toFixed(2),"length","me") : "-"},
              {eID: "fish-length-min", rfV: (parseFloat(recentFish?.MIN_LENGTH)).toFixed(2)},
              {eID: "fish-length-max", rfV: (parseFloat(recentFish?.MAX_LENGTH)).toFixed(2)},
              {eID: "fish-length-percent", rfV: (((parseFloat(recentFish?.length) - parseFloat(recentFish.MIN_LENGTH)) / ((parseFloat(recentFish.MAX_LENGTH) - parseFloat(recentFish.MIN_LENGTH))))*100).toFixed(2), doColour: true},
              {eID: "fish-width", rfV: recentFish?.width ? unitConverter((parseFloat(recentFish?.width)).toFixed(2),"length","im") : "-"},
              {eID: "fish-width-min", rfV: (parseFloat(recentFish?.MIN_WIDTH)).toFixed(2)},
              {eID: "fish-width-max", rfV: (parseFloat(recentFish?.MAX_WIDTH)).toFixed(2)},
              {eID: "fish-width-percent", rfV: (((parseFloat(recentFish?.width) - parseFloat(recentFish.MIN_WIDTH)) / ((parseFloat(recentFish.MAX_WIDTH) - parseFloat(recentFish.MIN_WIDTH))))*100).toFixed(2), doColour: true},
              {eID: "fish-set", rfV: recentFish?.Set ? `&nbsp;| Set: ${recentFish?.Set}` : ""},
              {eID: "fish-name", rfV: recentFish?.Name},
            ]; 
            console.log("0 <",(((parseFloat(recentFish?.weight) - parseFloat(recentFish.MIN_WEIGHT)) / ((parseFloat(recentFish.MAX_WEIGHT) - parseFloat(recentFish.MIN_WEIGHT))))*100).toFixed(2)," < 100");
            console.log(0 < (((parseFloat(recentFish?.weight) - parseFloat(recentFish.MIN_WEIGHT)) / ((parseFloat(recentFish.MAX_WEIGHT) - parseFloat(recentFish.MIN_WEIGHT))))*100).toFixed(2) < 100);
            _kvPair.forEach(e => {
              // console.log(document.getElementById(e.eID).innerText);
              
              // let _t = document.getElementById(e.eID).innerText;
              // document.getElementById(e.eID).style.margin=0;
              if(
                document.getElementById(e.eID).childElementCount===0 
                && e.rfV!==undefined 
                // && (_t==="" ||  _t==="-")
                && (document.getElementById(_kvPair[_kvPair.length-1].eID).innerText==="-")
              ) {
                let element=document.createElement("p");
                element.innerHTML = new DOMParser().parseFromString( e.rfV, 'text/html').body.outerHTML;
                element.style.margin = 0;
                if(e.doColour) {
                  element.style.color = hslToRgb(`hsl(${e.rfV}, 100, 50)`);
                }
                
                document.getElementById(e.eID).innerText=""; // May be the culprit for refreshing after button update
                document.getElementById(e.eID).appendChild(element);
                console.log("Added ",e.rfv," to ",e.eID);
              }
            });
            // document.getElementById("fish-name").appendChild(new DOMParser().parseFromString( recentFish.Name, 'text/html').body.outerHTML);
            console.log("The fish?> ",recentFish);
          } catch(e) {console.error("E (populate) > ",e)}
        }, 1);
      };

      

      // let initialUD = undefined;
      // const getInitialData = () => {
      //   if(initialUD!==undefined) { return; }
      //   console.log("Yes;");
      //   // On component load, grab the user's data
      //   let _initialWS = new WebSocket(`ws://localhost:5000/fishbot/${"grabUD"}/user=${usrdata?.UUID}`);
      //   _initialWS.onmessage = (message) => {
      //     message = message.data;//JSON.parse(message.data);
      //     console.log("UD Message:", message);
      //     initialUD = JSON.parse(message);
      //   };
      // }
      

      const handleFishInitialClick = (e) => {
        if(res?.errorCode) {
          setErrorDialogOpen(true);
          console.error("ERRORCODE > ",res.msg );
          setFishingState({isFishing: false});
          setFishScreen("initial");
          return;
        }
        // fish_isFishing = !fish_isFishing;
        // displayOnScreen = fish_isFishing ? "fishing_waiting" : "initial";
        // setFishScreen(fish_isFishing ? "fishing_waiting" : "initial");
        // setFishScreen(fishState.isFishing ? "fishing_waiting" : "initial");
        
        /** @note The `!` may be a major issue */
        let _isFishn = fishingState?.isFishing ? !fishingState.isFishing : true;
        setFishState({isFishing: _isFishn});
        // console.log("IF > ",fishingState.isFishing);
        // setFishScreen(fishState.isFishing ? "fishing_waiting" : "initial");
        setFishScreen(_isFishn ? "fishing_waiting" : "initial");

        // _ws = new WebSocket(`ws://${window.location.host}/fishbot/fish`);// ?user=${usrdata}`);
        // _ws = new WebSocket(`ws://localhost:5000/fishbot/${"fish"}/user=${usrdata?.UUID}?isFishing=${fishState.isFishing}`);// ?user=${usrdata}`);

        // if(_isFishn){_ws = new WebSocket(`ws://localhost:5000/fishbot/${"fish"}/user=${usrdata?.UUID}&isFishing=${fishState.isFishing}`);}
        // if(_isFishn){_ws = new WebSocket(`ws://localhost:5000/fishbot/${"fish"}/user=${usrdata?.UUID}&isFishing=${_isFishn}`);}
        _ws = new WebSocket(`ws://localhost:5000/fishbot/${"fish"}/user=${usrdata?.UUID}&isFishing=${_isFishn}`);
        _ws.onmessage = (message) => {
            message = message.data;//JSON.parse(message.data);
            // console.log("Fish Message:", message);
            res = JSON.parse(message);//?.data.user;
            if(res?.errorCode) {
              dialogProps.code = res.errorCode;
              dialogProps.msg = res.msg;
              setErrorDialogOpen(true);
              console.error("ERRORCODE (Should not have been hit) > ",res.msg );
              setFishingState({isFishing: false});
              setFishScreen("initial");
              return;
            }
            switch (res?.state) {
              // default:
              case 0: // Reeled In Early // Default
                // console.log("RIE / DEFAULT");
                console.log("RIE");
                setFishingState({isFishing: false});
                setFishScreen("initial");
                break;
              case 1: // Fishing
                  setFishingState({isFishing: true});
                  setFishScreen("fishing_waiting");
                  break;
              case 2: // Hooked
                  console.warn("You feel a tugging at your line..." );
                  setFishingState({isFishing: true, hooked: true});
                  setFishScreen("fishing_waiting");
                  // setFishScreen("fishing_hooked");
                  // setFishScreen("fishing_waiting");
                  break;
              case 3: // Catch
                  console.warn("Caught!");
                  setFishingState({isFishing: false, caught: true});
                  setFishScreen("fish_caught");
                  break;
              case -1: // Missed
                  console.warn("Your fish skedaddled." );
                  setFishingState({isFishing: false});
                  setFishScreen("initial");
                  break;
              default:
                console.log("Default");
                break;
            }
            if(res?.errorCode) {
              console.warn("Error > ",res.msg );
              // fish_isFishing = false;
              setFishingState({isFishing: false});
              setFishScreen("initial");
            }

            if(res?.tempData) {
              // console.log("Updating Temp Data > ",res?.tempData);
              let _t = temp_UserFishData;
              console.log("tUFD pts > ",temp_UserFishData.points);
              console.log("tUFD > ",temp_UserFishData);
              /** @note have the ability to set your bobber length/ how deep you would want to have your line sink. */
              temp_UserFishData = res?.tempData;
              temp_UserFishData.currentHaul = _t?.currentHaul ? _t.currentHaul : [];
              console.log("post-tUFD > ",temp_UserFishData.points);
              temp_UserFishData.points+=_t.points;
            }

            if(res?.fish) {
              recentFish = res.fish;
              temp_UserFishData.points = res.fish.points;
              //recentFish.rarityColour
              console.log(recentFish.Rarity, typeof(recentFish.Rarity));
              switch (recentFish.Rarity) {
                case "Common":
                  recentFish.rarityColour = "#6f7291";
                  break;
                case "Uncommon":
                  recentFish.rarityColour = "#46c74c";
                  break;
                case "Rare":
                  recentFish.rarityColour = "#4684c7";
                  break;
                case "Epic":
                  recentFish.rarityColour = "#9d46c7";
                  break;
                case "Legendary":
                  recentFish.rarityColour = "#c77746";//"#f5a623";
                  break;
                // case "Relic":
                //   recentFish.rarityColour = "#8f05ab"
                //   break;
                case "Exotic":
                  recentFish.rarityColour = "#c74646";//"#crimson"
                  break;
                case "Event":
                  recentFish.rarityColour = /*"#7cd6ef"*/ /*"#61dafb"*/ "#46c79f";
                  break;
                default:
                  recentFish.rarityColour = "#fff";//"crimson";
                  break;
              }
              temp_UserFishData.currentHaul.push(recentFish);
              console.log("FISH > ",recentFish);
            }
            

        };
        _ws.onclose = (e) => {
          console.log("ws Close > ",e);
        };
        
        
      };
      const handleShopClick = (e) => {
        setFish_ShopDrawerOpen(true);
        // displayOnScreen = "shop_home";
        // setFishScreen("shop_home");
        // console.log("display on screen",displayOnScreen);
      };

      /** @note temp until properly implimented */
      const WEATHERLEVEL = {
        Update: { // Gold-Orange
          Sunny: {
            name: "Sunny",
            icon: Weather_SunnyIcon
          },
          Calm: {
            name: "Calm",
            icon: Weather_CalmIcon
          },
          Cloudy: {
            name: "Cloudy",
            icon: Weather_CloudyIcon
          },
        },
        Extreme: { // Red
          ExtremeWaves: {
            name: "Extreme Waves",
            icon: Weather_ExtremeWavesIcon
          },
          SevereCold: {
            name: "Severe Cold",
            icon: Weather_SevereColdIcon
          },
          Cyclone: {
            name: "Cyclone",
            icon: Weather_CycloneIcon
          },
          Thunderstorm: {
            name: "Thunderstorm",
            icon: Weather_ThunderstormIcon
          },
        }
      }
      let weatherAlert = WEATHERLEVEL["Extreme"]["Thunderstorm"];

      const StyledAvatar = styled(Fab)`
  ${({ theme }) => `
  cursor: pointer;
  color: ${theme.palette.error.contrastText};
  width: 48px;/*56px;*/
  height: 48px;/*56px;*/
  justify-content: center;
  overflow: hidden;
  transition: ${theme.transitions.create(['justify-content','width'], {
    duration: "250ms",
    //cubic-bezier(0, 1.5, .8, 1)
  })};
  &:hover {
    justify-content: left;
    width: 166px;
  }
  `}
`;
const WeatherAlertFab = styled(Fab)`
  ${({ theme }) => `
  cursor: pointer;
  color: ${theme.palette.error.contrastText};
  width: 48px;/*56px;*/
  height: 48px;/*56px;*/
  `}
`;

const WeatherAlertFabOpen = styled(Fab)`
  ${({ theme }) => `
  cursor: pointer;
  color: ${theme.palette.error.contrastText};
  width: 166px;
  height: 48px;/*56px;*/
  justify-content: left;
  overflow: hidden;
  `}
`;

      /** @note Have images `display:"hidden"` so they use less network resources. */
      return (
        <div style={{margin:"11px/*5%*/ 5px 11px/*5%*/ 10px", display:"block"}} /*ref={weatherFABref}*/>
          {/** @region Fishing Main Screen */}
          {fishScreen === "initial" && 
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <Grid container spacing={1}>
                <Grid item xs={12} style={{display:"flex",justifyContent:"right", height:0, /*top:isMobile ? 0 : document.getElementById("header-region-name").clientHeight*/}}>
                  {/* {fish_ShowWeatherAlert===true && <Slide direction="left" in={fish_ShowWeatherAlert} container={weatherFABref.current} mountOnEnter unmountOnExit  */}
                  {fish_ShowWeatherAlert===true && <Slide direction="left" in={fish_ShowWeatherAlert} container={weatherFABref.current} mountOnEnter unmountOnExit 
                    easing={{
                      enter: "cubic-bezier(0, 1.5, .8, 1)",
                      exit: "linear"
                    }}
                  >
                  {/* <Collapse in={fish_DisplayWeatherAlert}> */}
                    {/* <Fab 
                      onClick={() => {setFish_DisplayWeatherAlert(!isMobile ? !fish_DisplayWeatherAlert : fish_DisplayWeatherAlert); }} 
                      onMouseEnter={() => setFish_DisplayWeatherAlert(true)}
                      onMouseLeave={() => setFish_DisplayWeatherAlert(false)}
                      variant={fish_DisplayWeatherAlert ? "extended" : "circular"}  aria-label="weather alert" 
                      className="fishingWeatherAlertFAB"
                      style={
                        {
                          marginRight:"0px", marginLeft:"auto",
                          color: theme.palette.error.contrastText,
                          backgroundColor:fish_DisplayWeatherAlert ? "#00ff00" : "#ff0000",
                          textTransform:"none", 
                          width: fish_DisplayWeatherAlert ? 142 : 56,
                          transition: "width 250ms, background-color 250ms"
                        }
                      }
                    >
                        <weatherAlert.icon sx={{ mr: fish_DisplayWeatherAlert ? 1 : null }} />
                        {fish_DisplayWeatherAlert && weatherAlert.name}
                      </Fab> */}
                      
                      <WeatherAlertFabOpen onClick={() => {setFish_DisplayWeatherAlert(!isMobile ? !fish_DisplayWeatherAlert : fish_DisplayWeatherAlert); }} 
                      // onMouseEnter={() => setFish_DisplayWeatherAlert(true)}
                      onMouseLeave={() => setFish_ShowWeatherAlert(false)} // The error for making it not so cool
                      variant={"extended"} style={{backgroundColor:"#cf0000"}}>
                        <weatherAlert.icon sx={{ mr: fish_ShowWeatherAlert ? 1 : null }} />
                        {fish_ShowWeatherAlert && weatherAlert.name}</WeatherAlertFabOpen> 

                        {/* <StyledAvatar onClick={() => {setFish_DisplayWeatherAlert(!isMobile ? !fish_DisplayWeatherAlert : fish_DisplayWeatherAlert); }} 
                      onMouseEnter={() => setFish_DisplayWeatherAlert(true)}
                      onMouseLeave={() => setFish_DisplayWeatherAlert(false)} // The error for making it not so cool
                      variant={fish_DisplayWeatherAlert ? "extended" : "circular"} style={{backgroundColor:"#ff0000"}}>
                        <weatherAlert.icon sx={{ mr: fish_DisplayWeatherAlert ? 1 : null }} />
                        {fish_DisplayWeatherAlert && weatherAlert.name}</StyledAvatar>  */}
                  {/* </Collapse> */}
                  </Slide> }
                  {!fish_ShowWeatherAlert && <WeatherAlertFab onClick={() => {setFish_DisplayWeatherAlert(!isMobile ? !fish_DisplayWeatherAlert : fish_DisplayWeatherAlert); }} 
                      onMouseEnter={() => setFish_ShowWeatherAlert(true)}
                      // onMouseLeave={() => setFish_ShowWeatherAlert(false)} // The error for making it not so cool
                      variant={"circular"} style={{backgroundColor:"#cf0000"}}>
                        <weatherAlert.icon sx={{ mr: fish_DisplayWeatherAlert ? 1 : null }} />
                        {fish_DisplayWeatherAlert && weatherAlert.name}</WeatherAlertFab> }
                </Grid>
                
              <Grid item xs={12} id="header-region-name" style={{
                backgroundImage:`url(${temp_BackgroundBannerPlaceholderImage})`,
                backgroundRepeat:"no-repeat",
                backgroundSize:"cover",
                backgroundPositionY:"bottom", // have this changed for the different backgrounds
                padding:isMobile ? "50px" : 0
              }}>
                  <Typography variant="h1" color="white" style={{fontSize:"32px", textAlign:"center", textShadow: "0 0 10px rgba(35, 39, 42,1)"}} >
                    {currentRegion.location} ({currentRegion.region}) 
                  </Typography>
                  {selectedXYValue}
                </Grid>
              <Grid item xs={12} md={4}>
                  <Typography variant="body1" color="white" style={{display:"flex",alignItems:"baseline", flexWrap:"wrap" }}>
                    {usrdata?.username!==undefined ? usrdata.username : "Guest"} (lvl {
                      temp_UserFishData.bait?.selected ? temp_UserFishData.bait[temp_UserFishData.bait.selected].name : "-"
                    })
                  </Typography>
                </Grid>
                
                <Grid item xs={6} md={4}>
                  <Typography variant="body1" color="white" style={{display:"flex",alignItems:"baseline", flexWrap:"wrap" }}>
                    Bait: {
                      temp_UserFishData.bait?.selected ? temp_UserFishData.bait[temp_UserFishData.bait.selected].name : "-"
                    } ({
                      temp_UserFishData.bait?.selected ? temp_UserFishData.bait[temp_UserFishData.bait.selected].amount : "-"
                    })
                  </Typography>
                </Grid>
                <Grid item xs={6} md={4}>
                  <Typography variant="body1" color="white" style={{display:"flex",alignItems:"baseline", flexWrap:"wrap" }}>
                  Current Haul: {
                      temp_UserFishData?.currentHaul.length
                    } (cap. : {
                      temp_UserFishData.boat?.selected ? Math.ceil((temp_UserFishData.boat[temp_UserFishData.boat.selected.split(".")[0]][temp_UserFishData.boat.selected.split(".")[1]].length-2)*1.75) : "-"
                    })
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} md={3}>
              {/* {fishScreen === "initial" && fishState.isFishing===false &&  */}
              <Button variant="contained" fullWidth onClick={handleClickLocationDialogOpen} endIcon={<BoatIcon/>}>Boat/Region</Button>
              {/* } */}
            </Grid>
            <Grid item xs={12} md={6}>
              {/* {fishScreen === "initial" && fishState.isFishing===false &&  */}
              <div><CardMedia component="img" height="140" image={temp_BoatImage} alt="Your Boat" /></div>
              {/* } */}
            </Grid>
            <Grid item xs={12} md={3}>
              {/* {fishScreen === "initial" && fishState.isFishing===false &&  */}
              <Button variant="contained" fullWidth endIcon={<SetMealIcon/>}>Fishipedia</Button>
              {/* } */}
            </Grid>
            {/* spacing */}
            {isMobile && 
            // fishScreen === "initial" && fishState.isFishing===false && 
            <Grid item xs={12} style={{height:"36.5px"}}></Grid>
            }
            <Grid item xs={12} md={3}>
              {/* {fishScreen === "initial" && fishState.isFishing===false &&  */}
              {/* <Button variant="contained" fullWidth onClick={handleShopClick} endIcon={<ShoppingBagIcon/>}>Shop</Button> */}
              {/* } */}
            </Grid>
            <Grid item xs={12} md={6}>
              <Button 
                // variant="contained" color={fishState.isFishing ? fishState.hooked ? "success" : "primary" : "secondary"} fullWidth 
                variant="contained" color={"secondary"} fullWidth 
                onClick={handleFishInitialClick} endIcon={<HookIcon/>}> 
                  {/* {fishState.isFishing ? fishState.hooked ? "Reel In" : "Waiting..." : "Fish"} {fishState.isFishing&&fishState.hooked ? "HEAAAAAVE!" : null} */}
                  Fish
              </Button>
            </Grid>
            <Grid item xs={12} md={3}>
              {/* {fishScreen === "initial" && fishState.isFishing===false &&  */}
              {/* <Button variant="contained" fullWidth endIcon={<BackpackIcon/>}>Backpack</Button> */}
              {/* } */}
            </Grid>
          {/* {Have a side drawer pop out and show their stuff..?} */}
          </Grid>
          }
          {/** @endregion Fishing Main Screen */}

          <ChangeLocationDialog
            selectedValue={selectedXYValue}
            open={locationDialogOpen}
            onClose={handleLocationDialogClose}
          />

          {/** @region Shop Drawer */}
          {fishScreen.includes("shop_") && 
            <Grid container spacing={1} id={"shop-menu-screen"}>
              {/* <Drawer
              anchor={"left"}
              open={Boolean(fish_ShopDrawerOpen)}
              //onClose={toggleDrawer("right", false)}
              onClose={setFish_ShopDrawerOpen(null)}
            > */}
              <Box
                sx={{ width: 250, marginRight:"10px" }}
                //style={{float:"left"}}
                id={"shop-menu-sidebar"}
                role="presentation"
                onClick={(e) => {
                  try {
                    if(shopDrawerSelectedLI.id.includes("dropdown")) { 
                    } else {
                      setFish_ShopDrawerOpen(null);
                      setShop_ShopMenuOpen(false);
                    }
                  } catch (e) {}
                }}
              >
                {/* <Box onClick={(e) => {
                  try {
                   setShop_ShopMenuOpen(!shop_ShopMenuOpen);
                  } catch (e) {}
                }}> Dropdown Mobile Storefront
                <Collapse in={shop_ShopMenuOpen} timeout="auto" unmountOnExit style={{alignSelf:""}} onClick={(e) => {
                  try {
                    console.log("CLicked");
                  } catch (e) {}
                }}>EGGS</Collapse>
                </Box> */}
                <List
                  subheader={
                    // <ListSubheader component="div" id="nested-list-subheader" onClick={openShopMenu} style={{display: "flex", alignItems: "center", justifyContent:"space-between"}}>
                    <ListSubheader component="div" id="nested-list-subheader" onClick={openShopMenu} style={{display: "flex", alignItems: "center", justifyContent:"space-between", flexWrap:"wrap"}}>
                      Bass Rookie Shop {shop_ShopMenuOpen ? <DropdownCloseIcon style={{display: isMobile ? "none" : "initial"}}/> : <DropdownOpenIcon style={{display: isMobile ? "none" : "initial"}}/>}
                      <div style={{display: "flex", alignItems: "center", float:"right"}}><MoneyIcon/> {temp_UserFishData?.points ? (parseFloat(temp_UserFishData.points).toFixed(2)).toLocaleString("en-US") : "-"}</div>
                    </ListSubheader>
                  }
                >
                  {(isMobile || shop_ShopMenuOpen) && fish_shopDirectoryList.map((data, itr) => (
                    <div id={`sdl-${data.name} ${data.type}`} onClick={(e) => {
                      shopDrawerSelectedLI = e.currentTarget;
                      if(data.type==="dropdown") {
                        data.open = !data.open;
                        setState({});
                      } else {
                        let temp_breadcrumb = {name: data.name, icon: data?.icon}
                        shop_BreadcrumbHistory = shop_BreadcrumbHistory.slice(0,1);
                        shop_BreadcrumbHistory.push(temp_breadcrumb);
                        console.log("fsIL > ",itr)
                        shop_DisplayPage = fish_shopDirectoryList[itr/*-1*/];//[data.name];
                        setState({});
                      }
                    }}>
                    {
                      data.type==="dropdown" ? 
                        <ListItem key={data.name} disablePadding style={{display:"block"}}>
                          <ListItemButton style={{alignSelf:"baseline"}}>
                          <ListItemText primary={data.name} />
                            <ListItemIcon style={{color:"inherit"}}>
                              {data.open ? <DropdownCloseIcon sx={{ mr: 0.5 }} fontSize="inherit"/> : <DropdownOpenIcon sx={{ mr: 0.5 }} fontSize="inherit" />}
                            </ListItemIcon>
                          </ListItemButton>
                          <Collapse in={data?.open} timeout="auto" unmountOnExit style={{alignSelf:""}}>
                          {data?.subpages && 
                            data?.subpages.map((_subpageData, _itr) => (
                              <List component="div" disablePadding>
                                <ListItemButton sx={{ pl: 6 }} /*component="a" href={`${_subpageData.to}`}*/ onClick={() => {
                                  shop_BreadcrumbHistory = shop_BreadcrumbHistory.slice(0,1);
                                  let temp_breadcrumb = {name: data.name, icon: data?.icon}
                                  shop_BreadcrumbHistory.push(temp_breadcrumb);
                                  temp_breadcrumb = {name: _subpageData.name, icon: _subpageData?.icon}
                                  shop_BreadcrumbHistory.push(temp_breadcrumb);
                                  console.log("sDP -> fsIL > ", data.name, " | itr > ",fish_shopDirectoryList[itr].subpages[_itr]);
                                  shop_DisplayPage = fish_shopDirectoryList[itr].subpages[_itr];//[data.name][_subpageData.name];
                                  setFish_ShopDrawerOpen(null);
                                  setShop_ShopMenuOpen(false);
                                }}>
                                  <ListItemText primary={_subpageData.name} />
                                  <ListItemIcon style={{color:"inherit"}}>
                                    {_subpageData?.icon ? <_subpageData.icon sx={{ mr: 0.5 }} fontSize="inherit"/> : null}
                                  </ListItemIcon>
                                </ListItemButton>
                              </List>
                            ))
                          }
                          </Collapse>
                      </ListItem>
                    : data.type==="divider" ? <Divider/> :
                      <ListItem key={data.name} disablePadding>
                        <ListItemButton>
                        <ListItemText primary={data.name} />
                          <ListItemIcon style={{color:"inherit"}}>
                            {data?.icon ? <data.icon sx={{ mr: 0.5 }} fontSize="inherit"/> : null}
                          </ListItemIcon>
                        </ListItemButton>
                    </ListItem>
                  }
                    </div>
                  ))}
                </List>
              </Box>
            {/* </Drawer> */}
            <Box id={"breadcrumb-and-items"} 
              onLoad={function grabEle() {
                setTimeout(() => {
                  console.log("CW > ",document.getElementById("shop-menu-screen")?.clientWidth)
                  document.getElementById("breadcrumb-and-items").style.width = isMobile ? document.getElementById("shop-menu-screen")?.clientWidth - 300 : null;
                },1)
              }}
              style={{
                display:"flex", flexDirection:"column", //width:"100%"-"250px"
                width:isMobile ? document.getElementById("shop-menu-screen")?.clientWidth ? document.getElementById("shop-menu-screen")?.clientWidth - 300 : null : null
              }}
            >
            <Breadcrumbs aria-label="shop-breadcrumbs" id="shop-breadcrumbs">
              {shop_BreadcrumbHistory.map((data, itr) => (
                itr !== shop_BreadcrumbHistory.length-1 ? 
                  <Button color={"inherit"} sx={{ display: 'flex', alignItems: 'center' }} 
                    style={{textTransform:"none",display:"flex",alignItems:"flex-start"}} startIcon={data?.icon ? (data.icon).type===undefined ? null : data.icon : null}
                    onClick={()=>{
                      shop_BreadcrumbHistory = shop_BreadcrumbHistory.slice(0,1+itr);
                      setState({});
                    }}
                  >
                    <Typography>
                      {/* {console.log(data.name,(data.icon).type)} */}
                      {/* {data?.icon ? (data.icon).type===undefined ? null : data?.icon : null} */}
                      {data.name}
                    </Typography>
                  </Button> : 
                  <Button color={"inherit"} sx={{ display: 'flex', alignItems: 'center', color:"text.primary" }} 
                    style={{textTransform:"none",display:"flex",alignItems:"flex-start", cursor:"default", }} startIcon={data?.icon ? (data.icon).type===undefined ? null : <data.icon sx={{ mr: 0.5 }} fontSize="inherit"/> : null}
                    disableElevation={true}
                    disableTouchRipple={true}
                    //disableFocusRipple={true}
                    //unselectable="on"
                  >
                    <Typography color="text.primary">
                      {/* {console.log(data.name,(data.icon).type)} */}
                      {/* {data?.icon ? (data.icon).type===undefined ? null : data?.icon : null} */}
                      {data.name}
                    </Typography>
                  </Button>
                  // <Typography
                  //   sx={{ display: 'flex', alignItems: 'center' }}
                  //   // style={{textTransform:"none",display:"flex",alignItems:"flex-start"}}
                  //   color="text.primary"
                  // >
                  //   {data?.icon ? (data.icon).type===undefined ? null : data?.icon : null}
                  //   {data.name}
                  // </Typography>
              ))}
            </Breadcrumbs>
            {/* <br/> */}
            <Grid container spacing={1}>
              {shop_DisplayPage.items.map((data) => (
                <Grid id={data.id} item xs={6} md={4}>
                  <Button id={`${data.name}-${data.id}`} 
                    // style={{textTransform:"none", display:"block"}} 
                    style={{textTransform:"none", display:"flex", flexDirection:"column"}} 
                    onClick={() => {
                      data.selected=!data.selected;
                      if(shop_BreadcrumbHistory.at(-1).name==="Tackle Boxes") {
                        console.log("Updating The Popup Item > ",data.name);
                        setShop_SelectedItem({data: data, category:shop_BreadcrumbHistory.at(-1).name});
                        setShopPurchaseDialogOpen(true);
                      }
                      unselectFields(shop_DisplayPage, data);
                      setState({});
                    }}
                  >
                    {/* <Box style={{}}><CardMedia component="img" width="auto" image={temp_ShopItemPlaceholderImage} alt={`${data.name} image`} /></Box> */}
                    <Box style={{backgroundImage:`url(${temp_ShopItemPlaceholderImage})`, backgroundColor:"#fff", backgroundSize:"80px", backgroundPosition:"center", backgroundRepeat:"no-repeat", height:"100px", width:"100px", borderRadius:"10px", outline:data?.rarity ? "solid" : "none", outlineColor: rarityToColour(data?.rarity)}}></Box>
                    <Typography variant="body1" color="white" style={{display:"flex",alignItems:"baseline", flexWrap:"wrap" }}>
                      {data.name}
                    </Typography>
                  </Button>
                  {data.selected && false && 
                    // <Grid item xs={6}>
                      <ClickAwayListener onClickAway={() => {data.selected=false; setState({});}}>
                        <div>
                        <TextField
                          id={`${data.name}-${data.id}-input`}
                          label={`Buy ${data.name}?`}
                          placeholder={"1"}
                          // type="number"
                          // value={shop_quantity}
                          // onChange={(e) => setShop_quantity(e.target.value)}
                          InputLabelProps={{
                            shrink: true,

                          }}
                        />
                        <div style={{display:"flex"}}>
                        <Grid item xs={6}>
                          <Button id={`${data.name}-${data.id}`} style={{textTransform:"none", display:"block"}} color={"success"} variant={"contained"}
                            onClick={(e) => {
                              let v = document.getElementById(`${data.name}-${data.id}-input`).value;
                              const amt = v ? v : 1;
                              console.log(amt);
                              setShop_quantity(amt);

                              console.log(`ws://localhost:5000/fishbot/${"increase"}/user=${usrdata?.UUID}&category=${shop_BreadcrumbHistory.at(-1).name}&item=${data.name}&amt=${amt}`);
                              _ws = new WebSocket(`ws://localhost:5000/fishbot/${"increase"}/user=${usrdata?.UUID}&category=${shop_BreadcrumbHistory.at(-1).name}&item=${data.name}&amt=${amt}`);
                              _ws.onmessage = (message) => {
                                  message = message.data;//JSON.parse(message.data);
                                  res = JSON.parse(message);//?.data.user;
                                  if(res?.tempData) {
                                    temp_UserFishData = res?.tempData;
                                  }
                              };
                              // setShop_quantity(e.target.value>0 ? e.target.value : 1);
                            }}
                          >Buy
                          </Button>
                        </Grid>
                        <Grid item xs={6}>
                          <Button id={`${data.name}-${data.id}`} style={{textTransform:"none", display:"block"}} color={"error"} variant={"contained"}
                            onClick={(e) => {
                              console.log("set to max");
                              // setShop_quantity(e.target.value>0 ? e.target.value : 1);
                            }}
                          >Max
                          </Button>
                        </Grid>
                        </div>
                        </div>
                      </ClickAwayListener>
                    // </Grid>
                    }
                </Grid>
              ))}
            </Grid>
            </Box>
           
            
            </Grid>
          }
          

          {/** @endregion Shop Drawer */}

          <ShopPurchaseDialog
            item={shop_SelectedItem}
            open={shopPurchaseDialogOpen}
            onClose={() => {setShopPurchaseDialogOpen(false);}}
          />

          {/** @region Inventory Drawer */}
          {fishScreen.includes("inventory_") && 
            <Grid container spacing={1} id={"inventory-menu-screen"}>
              {/* <Drawer
              anchor={"left"}
              open={Boolean(fish_ShopDrawerOpen)}
              //onClose={toggleDrawer("right", false)}
              onClose={setFish_ShopDrawerOpen(null)}
            > */}
              <Box
                sx={{ width: 250, marginRight:"10px" }}
                //style={{float:"left"}}
                id={"inventory-menu-sidebar"}
                role="presentation"
                onClick={(e) => {
                  try {
                    if(inventoryDrawerSelectedLI.id.includes("dropdown")) { 
                    } else {
                      setFish_InventoryDrawerOpen(null);
                      setInventory_MenuOpen(false);
                    }
                  } catch (e) {}
                }}
              >
                {/* <Box onClick={(e) => {
                  try {
                   setShop_ShopMenuOpen(!shop_ShopMenuOpen);
                  } catch (e) {}
                }}> Dropdown Mobile Storefront
                <Collapse in={shop_ShopMenuOpen} timeout="auto" unmountOnExit style={{alignSelf:""}} onClick={(e) => {
                  try {
                    console.log("CLicked");
                  } catch (e) {}
                }}>EGGS</Collapse>
                </Box> */}
                <List
                  subheader={
                    // <ListSubheader component="div" id="nested-list-subheader" onClick={openShopMenu} style={{display: "flex", alignItems: "center", justifyContent:"space-between"}}>
                    <ListSubheader component="div" id="nested-list-subheader" onClick={function (value) {
                      if(isMobile===false) {
                        //console.log("Click", isMobile);
                        setInventory_MenuOpen(!inventory_MenuOpen);
                      }
                      return false;
                    }} style={{display: "flex", alignItems: "center", justifyContent:"space-between", flexWrap:"wrap"}}>
                      Your Things {inventory_MenuOpen ? <DropdownCloseIcon style={{display: isMobile ? "none" : "initial"}}/> : <DropdownOpenIcon style={{display: isMobile ? "none" : "initial"}}/>}
                      <div style={{display: "flex", alignItems: "center", float:"right"}}><MoneyIcon/> {temp_UserFishData?.points ? (parseFloat(temp_UserFishData.points).toFixed(2)).toLocaleString("en-US") : "-"}</div>
                    </ListSubheader>
                  }
                >
                  {(isMobile || inventory_MenuOpen) && fish_inventoryDirectoryList.map((data, itr) => (
                    <div id={`sdl-${data.name} ${data.type}`} onClick={(e) => {
                      inventoryDrawerSelectedLI = e.currentTarget;
                      if(data.type==="dropdown") {
                        data.open = !data.open;
                        setState({});
                      } else {
                        let temp_breadcrumb = {name: data.name, icon: data?.icon}
                        inventory_BreadcrumbHistory = inventory_BreadcrumbHistory.slice(0,1);
                        inventory_BreadcrumbHistory.push(temp_breadcrumb);
                        console.log("fsIL > ",itr)
                        inventory_DisplayPage = fish_inventoryDirectoryList[itr/*-1*/];//[data.name];
                        setState({});
                      }
                    }}>
                    {
                      data.type==="dropdown" ? 
                        <ListItem key={data.name} disablePadding style={{display:"block"}}>
                          <ListItemButton style={{alignSelf:"baseline"}}>
                          <ListItemText primary={data.name} />
                            <ListItemIcon style={{color:"inherit"}}>
                                {data.open ? <DropdownCloseIcon sx={{ mr: 0.5 }} fontSize="inherit"/> : <DropdownOpenIcon sx={{ mr: 0.5 }} fontSize="inherit" />}
                            </ListItemIcon>
                          </ListItemButton>
                          <Collapse in={data?.open} timeout="auto" unmountOnExit style={{alignSelf:""}}>
                          {data?.subpages && 
                            data?.subpages.map((_subpageData, _itr) => (
                              <List component="div" disablePadding>
                                <ListItemButton sx={{ pl: 6 }} /*component="a" href={`${_subpageData.to}`}*/ onClick={() => {
                                  inventory_BreadcrumbHistory = inventory_BreadcrumbHistory.slice(0,1);
                                  let temp_breadcrumb = {name: data.name, icon: data?.icon}
                                  inventory_BreadcrumbHistory.push(temp_breadcrumb);
                                  temp_breadcrumb = {name: _subpageData.name, icon: _subpageData?.icon}
                                  inventory_BreadcrumbHistory.push(temp_breadcrumb);

                                  console.log(fish_inventoryDirectoryList[itr].subpages[_itr]);//.subpages[_itr]; // items
                                  inventory_DisplayPage = fish_inventoryDirectoryList[itr].subpages[_itr];//[data.name][_subpageData.name];
                                  //shop_DisplayPage = fish_inventoryDirectoryList[itr].subpages!==undefined ? fish_inventoryDirectoryList[itr].subpages[_itr] : null;//[data.name][_subpageData.name];
                                  
                                  setFish_InventoryDrawerOpen(null);
                                  setInventory_MenuOpen(false);
                                }}>
                                  <ListItemText primary={_subpageData.name} />
                                  <ListItemIcon style={{color:"inherit"}}>
                                      {_subpageData?.icon ? <_subpageData.icon sx={{ mr: 0.5 }} fontSize="inherit"/> : null}
                                  </ListItemIcon>
                                </ListItemButton>
                              </List>
                            ))
                          }
                          </Collapse>
                      </ListItem>
                    : data.type==="divider" ? <Divider/> :
                      <ListItem key={data.name} disablePadding>
                        <ListItemButton>
                        <ListItemText primary={data.name} />
                          <ListItemIcon style={{color:"inherit"}}>
                            {data?.icon ? <data.icon sx={{ mr: 0.5 }} fontSize="inherit"/> : null}
                          </ListItemIcon>
                        </ListItemButton>
                    </ListItem>
                  }
                    </div>
                  ))}
                </List>
              </Box>
            {/* </Drawer> */}
            <Box id={"inv-breadcrumb-and-items"} 
              onLoad={function grabEle() {
                setTimeout(() => {
                  console.log("CW > ",document.getElementById("inventory-menu-screen")?.clientWidth)
                  document.getElementById("inv-breadcrumb-and-items").style.width = isMobile ? document.getElementById("inventory-menu-screen")?.clientWidth - 300 : null;
                },1)
              }}
              style={{
                display:"flex", flexDirection:"column", //width:"100%"-"250px"
                width:isMobile ? document.getElementById("inventory-menu-screen")?.clientWidth ? document.getElementById("inventory-menu-screen")?.clientWidth - 300 : null : null
              }}
            >
            <Breadcrumbs aria-label="inventory-breadcrumbs" id="inventory-breadcrumbs">
              {inventory_BreadcrumbHistory.map((data, itr) => (
                itr !== inventory_BreadcrumbHistory.length-1 ? 
                  <Button color={"inherit"} sx={{ display: 'flex', alignItems: 'center' }} 
                    style={{textTransform:"none",display:"flex",alignItems:"flex-start"}} startIcon={data?.icon ? (data.icon).type===undefined ? null : <data.icon sx={{ mr: 0.5 }} fontSize="inherit"/> : null}
                    onClick={()=>{
                      inventory_BreadcrumbHistory = inventory_BreadcrumbHistory.slice(0,1+itr);
                      setState({});
                    }}
                  >
                    <Typography>
                      {/* {console.log(data.name,(data.icon).type)} */}
                      {/* {data?.icon ? (data.icon).type===undefined ? null : data?.icon : null} */}
                      {data.name}
                    </Typography>
                  </Button> : 
                  <Button color={"inherit"} sx={{ display: 'flex', alignItems: 'center', color:"text.primary" }} 
                    style={{textTransform:"none",display:"flex",alignItems:"flex-start", cursor:"default", }} startIcon={data?.icon ? (data.icon).type===undefined ? null : <data.icon sx={{ mr: 0.5 }} fontSize="inherit"/> : null}
                    disableElevation={true}
                    disableTouchRipple={true}
                    //disableFocusRipple={true}
                    //unselectable="on"
                  >
                    <Typography color="text.primary">
                      {/* {console.log(data.name,(data.icon).type)} */}
                      {/* {data?.icon ? (data.icon).type===undefined ? null : data?.icon : null} */}
                      {data.name}
                    </Typography>
                  </Button>
                  // <Typography
                  //   sx={{ display: 'flex', alignItems: 'center' }}
                  //   // style={{textTransform:"none",display:"flex",alignItems:"flex-start"}}
                  //   color="text.primary"
                  // >
                  //   {data?.icon ? (data.icon).type===undefined ? null : data?.icon : null}
                  //   {data.name}
                  // </Typography>
              ))}
            </Breadcrumbs>
            Have Guide show locations of where some fish are on the map using the fish's personal image to show

            {/* <br/> */}
            <Grid container spacing={1}>
              {inventory_DisplayPage.items.map((data) => (
                <Grid id={data.id} item xs={6} md={4}>
                  <Button id={`${data.name}-${data.id}`} 
                    // style={{textTransform:"none", display:"block"}} 
                    style={{textTransform:"none", display:"flex", flexDirection:"column"}} 
                    onClick={() => {
                      data.selected=!data.selected;
                      unselectFields(inventory_DisplayPage, data);
                      setState({});
                    }}
                  >
                    {/* <Box style={{}}><CardMedia component="img" width="auto" image={temp_ShopItemPlaceholderImage} alt={`${data.name} image`} /></Box> */}
                    <Box style={{backgroundImage:`url(${temp_ShopItemPlaceholderImage})`, backgroundColor:"#fff", backgroundSize:"80px", backgroundPosition:"center", backgroundRepeat:"no-repeat", height:"100px", width:"100px"}}></Box>
                    <Typography variant="body1" color="white" style={{display:"flex",alignItems:"baseline", flexWrap:"wrap" }}>
                      {data.name}
                    </Typography>
                  </Button>
                  {data.selected && 
                    // <Grid item xs={6}>
                      <ClickAwayListener onClickAway={() => {data.selected=false; setState({});}}>
                        <div>
                        <div style={{display:"flex"}}>
                        <Grid item xs={6}>
                        <Box style={{width:"100px"}}>
                        <Typography variant="body1" color="white" style={{fontSize:"15px"}}>
                          Stats
                        </Typography>
                        <Divider/>
                          have stat
                        </Box>
                          <Button id={`${data.name}-${data.id}`} style={{textTransform:"none", display:"block", backgroundColor:"#8f0000"}} variant={"contained"}
                            onClick={(e) => {
                              return; /** @note Make this functional */
                              let v = document.getElementById(`${data.name}-${data.id}-input`).value;
                              const amt = v ? v : 1;
                              console.log(amt);
                              setShop_quantity(amt);

                              console.log(`ws://localhost:5000/fishbot/${"increase"}/user=${usrdata?.UUID}&category=${shop_BreadcrumbHistory.at(-1).name}&item=${data.name}&amt=${amt}`);
                              _ws = new WebSocket(`ws://localhost:5000/fishbot/${"increase"}/user=${usrdata?.UUID}&category=${shop_BreadcrumbHistory.at(-1).name}&item=${data.name}&amt=${amt}`);
                              _ws.onmessage = (message) => {
                                  message = message.data;//JSON.parse(message.data);
                                  res = JSON.parse(message);//?.data.user;
                                  if(res?.tempData) {
                                    temp_UserFishData = res?.tempData;
                                  }
                              };
                              // setShop_quantity(e.target.value>0 ? e.target.value : 1);
                            }}
                          >Let Go (if fish)
                          </Button>
                        </Grid>
                        </div>
                        </div>
                      </ClickAwayListener>
                    // </Grid>
                    }
                </Grid>
              ))}
            </Grid>
            </Box>
           
            
            </Grid>
          }
          

          {/** @endregion Inventory Drawer */}

          {/** @region Crew Drawer */}
          {fishScreen.includes("crew_") && 
            <Grid container spacing={1} id={"crew-menu-screen"}>
              {/* <Drawer
              anchor={"left"}
              open={Boolean(fish_ShopDrawerOpen)}
              //onClose={toggleDrawer("right", false)}
              onClose={setFish_ShopDrawerOpen(null)}
            > */}
              <Box
                sx={{ width: 250, marginRight:"10px" }}
                //style={{float:"left"}}
                id={"crew-menu-sidebar"}
                role="presentation"
                onClick={(e) => {
                  try {
                    if(crewDrawerSelectedLI.id.includes("dropdown")) { 
                    } else {
                      setFish_ShopDrawerOpen(null);
                      setShop_ShopMenuOpen(false);
                    }
                  } catch (e) {}
                }}
              >
                {/* <Box onClick={(e) => {
                  try {
                   setShop_ShopMenuOpen(!shop_ShopMenuOpen);
                  } catch (e) {}
                }}> Dropdown Mobile Storefront
                <Collapse in={shop_ShopMenuOpen} timeout="auto" unmountOnExit style={{alignSelf:""}} onClick={(e) => {
                  try {
                    console.log("CLicked");
                  } catch (e) {}
                }}>EGGS</Collapse>
                </Box> */}
                <List
                  subheader={
                    // <ListSubheader component="div" id="nested-list-subheader" onClick={openShopMenu} style={{display: "flex", alignItems: "center", justifyContent:"space-between"}}>
                    <ListSubheader component="div" id="nested-list-subheader" onClick={openShopMenu} style={{display: "flex", alignItems: "center", justifyContent:"space-between", flexWrap:"wrap"}}>
                      Hired Crew
                      <div style={{display: "flex", alignItems: "center", float:"right"}}><MoneyIcon/> {temp_UserFishData?.points ? (parseFloat(temp_UserFishData.points).toFixed(2)).toLocaleString("en-US") : "-"}</div>
                    </ListSubheader>
                  }
                >
                  {(isMobile || shop_ShopMenuOpen) && fish_crewDirectoryList.map((data, itr) => (
                    <div key={`cdl-${data.name} ${data.type}`} id={`cdl-${data.name} ${data.type}`} onClick={(e) => {
                      crewDrawerSelectedLI = e.currentTarget;
                      if(data.type==="dropdown") {
                        data.open = !data.open;
                        setState({});
                      } else {
                        let temp_breadcrumb = {name: data.name, icon: data?.icon}
                        crew_BreadcrumbHistory = crew_BreadcrumbHistory.slice(0,1);
                        crew_BreadcrumbHistory.push(temp_breadcrumb);
                        console.log("fsIL > ",itr)
                        crew_DisplayPage = fish_crewDirectoryList[itr/*-1*/];//[data.name];
                        setState({});
                      }
                    }}>
                    {
                      data.type==="dropdown" ? 
                        <ListItem key={data.name} disablePadding style={{display:"block"}}>
                          <ListItemButton style={{alignSelf:"baseline"}}>
                          <ListItemText primary={data.name} />
                            <ListItemIcon style={{color:"inherit"}}>
                              {data.open ? <DropdownCloseIcon sx={{ mr: 0.5 }} fontSize="inherit"/> : <DropdownOpenIcon sx={{ mr: 0.5 }} fontSize="inherit" />}
                            </ListItemIcon>
                          </ListItemButton>
                          <Collapse in={data?.open} timeout="auto" unmountOnExit style={{alignSelf:""}}>
                          {data?.subpages && 
                            data?.subpages.map((_subpageData, _itr) => (
                              <List component="div" disablePadding>
                                <ListItemButton sx={{ pl: 6 }} /*component="a" href={`${_subpageData.to}`}*/ onClick={() => {
                                  shop_BreadcrumbHistory = shop_BreadcrumbHistory.slice(0,1);
                                  let temp_breadcrumb = {name: data.name, icon: data?.icon}
                                  crew_BreadcrumbHistory.push(temp_breadcrumb);
                                  temp_breadcrumb = {name: _subpageData.name, icon: _subpageData?.icon}
                                  crew_BreadcrumbHistory.push(temp_breadcrumb);
                                  crew_DisplayPage = fish_crewDirectoryList[itr].subpages[_itr];//[data.name][_subpageData.name];
                                  setFish_ShopDrawerOpen(null);
                                  setShop_ShopMenuOpen(false);
                                }}>
                                  <ListItemText primary={_subpageData.name} />
                                  <ListItemIcon style={{color:"inherit"}}>
                                    {_subpageData?.icon ? <_subpageData.icon sx={{ mr: 0.5 }} fontSize="inherit"/> : null}
                                  </ListItemIcon>
                                </ListItemButton>
                              </List>
                            ))
                          }
                          </Collapse>
                      </ListItem>
                    : data.type==="divider" ? <Divider/> :
                      <ListItem key={data.name} disablePadding>
                        <ListItemButton>
                        <ListItemText primary={data.name} />
                          <ListItemIcon style={{color:"inherit"}}>
                            {data?.icon ? <data.icon sx={{ mr: 0.5 }} fontSize="inherit"/> : null}
                          </ListItemIcon>
                        </ListItemButton>
                    </ListItem>
                  }
                    </div>
                  ))}
                </List>
              </Box>
            {/* </Drawer> */}
            <Box id={"breadcrumb-and-items"} 
              onLoad={function grabEle() {
                setTimeout(() => {
                  console.log("CW > ",document.getElementById("shop-menu-screen")?.clientWidth)
                  document.getElementById("breadcrumb-and-items").style.width = isMobile ? document.getElementById("shop-menu-screen")?.clientWidth - 300 : null;
                },1)
              }}
              style={{
                display:"flex", flexDirection:"column", //width:"100%"-"250px"
                width:isMobile ? document.getElementById("shop-menu-screen")?.clientWidth ? document.getElementById("shop-menu-screen")?.clientWidth - 300 : null : null
              }}
            >
            <Breadcrumbs aria-label="shop-breadcrumbs" id="shop-breadcrumbs">
              {crew_BreadcrumbHistory.map((data, itr) => (
                itr !== crew_BreadcrumbHistory.length-1 ? 
                  <Button color={"inherit"} sx={{ display: 'flex', alignItems: 'center' }} 
                    style={{textTransform:"none",display:"flex",alignItems:"flex-start"}} startIcon={data?.icon ? (data.icon).type===undefined ? null : data.icon : null}
                    onClick={()=>{
                      crew_BreadcrumbHistory = crew_BreadcrumbHistory.slice(0,1+itr);
                      setState({});
                    }}
                  >
                    <Typography>
                      {/* {console.log(data.name,(data.icon).type)} */}
                      {/* {data?.icon ? (data.icon).type===undefined ? null : data?.icon : null} */}
                      {data.name}
                    </Typography>
                  </Button> : 
                  <Button color={"inherit"} sx={{ display: 'flex', alignItems: 'center', color:"text.primary" }} 
                    style={{textTransform:"none",display:"flex",alignItems:"flex-start", cursor:"default", }} startIcon={data?.icon ? (data.icon).type===undefined ? null : <data.icon sx={{ mr: 0.5 }} fontSize="inherit"/> : null}
                    disableElevation={true}
                    disableTouchRipple={true}
                    //disableFocusRipple={true}
                    //unselectable="on"
                  >
                    <Typography color="text.primary">
                      {/* {console.log(data.name,(data.icon).type)} */}
                      {/* {data?.icon ? (data.icon).type===undefined ? null : data?.icon : null} */}
                      {data.name}
                    </Typography>
                  </Button>
                  // <Typography
                  //   sx={{ display: 'flex', alignItems: 'center' }}
                  //   // style={{textTransform:"none",display:"flex",alignItems:"flex-start"}}
                  //   color="text.primary"
                  // >
                  //   {data?.icon ? (data.icon).type===undefined ? null : data?.icon : null}
                  //   {data.name}
                  // </Typography>
              ))}
            </Breadcrumbs>
            {/* <br/> */}
            <Grid container spacing={1}>
              {crew_DisplayPage.items.map((data) => (
                <Grid id={data.id} item xs={data.name.includes("button_") ? 12 : 6} md={data.name.includes("button_") ? 12 : 4}>
                  <Button id={`${data.name}-${data.id}`} 
                    // style={{textTransform:"none", display:"block"}} 
                    style={{textTransform:"none", display:"flex", flexDirection:"column"/*, width:data.name.includes("button_") ? "100%" : null*/}} 
                    fullWidth={data.name.includes("button_")}
                    onClick={() => {
                      data.selected=!data.selected;
                      if(crew_BreadcrumbHistory.at(-1).name==="Tackle Boxes") {
                        console.log("Updating The Popup Item > ",data.name);
                        setShop_SelectedItem({data: data, category:crew_BreadcrumbHistory.at(-1).name});
                        setShopPurchaseDialogOpen(true);
                      }
                      unselectFields(crew_DisplayPage, data);
                      setState({});
                    }}
                  >
                    {/* <Box style={{}}><CardMedia component="img" width="auto" image={temp_ShopItemPlaceholderImage} alt={`${data.name} image`} /></Box> */}
                    <Box style={{backgroundImage:`url(${temp_ShopItemPlaceholderImage})`, backgroundColor:"#fff", backgroundSize:"80px", backgroundPosition:"center", backgroundRepeat:"no-repeat", height:"100px", width:"100px", borderRadius:"10px", outline:data?.rarity ? "solid" : "none", outlineColor: rarityToColour(data?.rarity)}}></Box>
                    <Typography variant="body1" color="white" style={{display:"flex",alignItems:"baseline", flexWrap:"wrap" }}>
                      {data.name}
                    </Typography>
                  </Button>
                  {data.selected && false && 
                    // <Grid item xs={6}>
                      <ClickAwayListener onClickAway={() => {data.selected=false; setState({});}}>
                        <div>
                        <TextField
                          id={`${data.name}-${data.id}-input`}
                          label={`Buy ${data.name}?`}
                          placeholder={"1"}
                          // type="number"
                          // value={shop_quantity}
                          // onChange={(e) => setShop_quantity(e.target.value)}
                          InputLabelProps={{
                            shrink: true,

                          }}
                        />
                        
                        </div>
                      </ClickAwayListener>
                    // </Grid>
                    }
                </Grid>
              ))}
            </Grid>
            </Box>
           
            
            </Grid>
          }
          

          {/** @endregion Crew Drawer */}

          {/** @region Error Dialog / Modal */}
          <Dialog
            open={errorDialogOpen}
            onClose={() => setErrorDialogOpen(false)}
            // fullWidth={true}
            maxWidth='xs'
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            onLoad={checkIfNeedHTMLParse(dialogProps.msg)}
          >
            <DialogTitle id="alert-dialog-title">
              {"Woah there, fisher..."}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description" variant="body1" color="white">
              </DialogContentText>
              
              {/* {document.getElementById('dialogAlert').innerHTML= dialogProps.msg} */}
            </DialogContent>
            <DialogContentText id="alert-dialog-description" style={{textAlignLast:"end", marginInline: "10px"}} variant="caption">
                Error Code: {dialogProps.code}
              </DialogContentText>
            <DialogActions>
              <Button onClick={() => setErrorDialogOpen(false)} variant="contained" color={"info"} autoFocus>Okay</Button>
            </DialogActions>
          </Dialog>
          {/** @endregion Error Dialog / Modal */}

          {/** @region Actual Fishing Screen */}
          {fishScreen === "fishing_waiting" && 
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <Grid container spacing={1}>
                <Grid item xs={12} md={4}>
                  <Typography variant="body1" color="white" style={{display:"flex",alignItems:"baseline", flexWrap:"wrap" }}>
                    Level: {
                      temp_UserFishData.bait?.selected ? temp_UserFishData.bait[temp_UserFishData.bait.selected].name : "-"
                    }
                  </Typography>
                </Grid>
                <Grid item xs={6} md={4}>
                  <Typography variant="body1" color="white" style={{display:"flex",alignItems:"baseline", flexWrap:"wrap" }}>
                    Bait: {
                      temp_UserFishData.bait?.selected ? temp_UserFishData.bait[temp_UserFishData.bait.selected].name : "-"
                    } ({
                      temp_UserFishData.bait?.selected ? temp_UserFishData.bait[temp_UserFishData.bait.selected].amount : "-"
                    })
                  </Typography>
                </Grid>
                <Grid item xs={6} md={4}>
                  <Typography variant="body1" color="white" style={{display:"flex",alignItems:"baseline", flexWrap:"wrap" }}>
                  Lure: {
                      temp_UserFishData.lure?.selected ? temp_UserFishData.lure[temp_UserFishData.lure.selected].name : "-"
                    } ({
                      temp_UserFishData.lure?.selected ? temp_UserFishData.lure[temp_UserFishData.lure.selected].amount : "-"
                    })
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item md={3}></Grid>
            <Grid item xs={12} md={6}>
              {/* {console.log(`${fishState.isFishing ? fishState.hooked ? "Reel In" : "Waiting..." : "Fish"} ${fishState.isFishing&&fishState.hooked ? "HEAAAAAVE!" : null}`)} */}
              {console.log("Hooked? > ",fishingState?.hooked)}
              {console.log(`${fishingState?.hooked ? "Reel In" : "Waiting..."} ${fishingState?.hooked ? "HEAAAAAVE!" : null}`)}
              {console.log("FS >",fishingState)}
              <Button 
                // variant="contained" color={fishState.isFishing ? fishState.hooked ? "success" : "primary" : "secondary"} fullWidth 
                variant="contained" color={fishingState?.hooked ? "success" : "primary"} fullWidth 
                onClick={handleFishInitialClick}>
                  {/* {fishState.isFishing ? fishState.hooked ? "Reel In" : "Waiting..." : "Fish"} {fishState.isFishing&&fishState.hooked ? "HEAAAAAVE!" : null} */}
                  {fishingState?.hooked ? "Reel In" : "Waiting..." } {fishingState?.hooked ? "HEAAAAAVE!" : null}
              </Button>
            </Grid>
            <Grid item md={3}></Grid>
            
          </Grid>
          }
          {/** @endregion Actual Fishing Screen */}
          
          {/** @region Fishing Success Screen */}
          {fishScreen === "fish_caught" && 
          <Grid container spacing={1}>
            <Grid item xs={12} id={"fish-caught-screen"} style={{
                backgroundColor: "#2c2c2c", border: "solid",
                borderColor: recentFish?.rarityColour ? recentFish.rarityColour : "aquamarine", 
                padding: isMobile ? "10px" : "5vw",
                margin: "8px 0 0 8px"
              }}
              onLoad={populateFishData()}
              >
              <Grid container spacing={1}>
                <Grid item xs={12}>
                  <Typography variant="body1" color="white" style={{display:"flex",alignItems:"baseline", flexWrap:"wrap" }}>
                    Name:&nbsp;{<p id="fish-name" style={{margin:0}}>-</p>}&nbsp;({"-"}%)
                  </Typography><Typography variant="caption" color="white" style={{display:"flex",alignItems:"baseline", flexWrap:"wrap" }}>
                  Rarity:&nbsp;{<p id="fish-rarity" style={{margin:0}}>-</p>}{<p id="fish-set" style={{margin:0}}></p>}
                  </Typography>
                </Grid>
                <Grid item xs={6} md={4}>
                  <Typography variant="body1" color="white" style={{display:"flex",alignItems:"baseline", flexWrap:"wrap" }}>
                    Weight:&nbsp;{<p id="fish-weight" style={{margin:0}}>-</p>}&nbsp;({<p id="fish-weight-percent" style={{margin:0}}>-</p>}%)
                  </Typography>
                </Grid>
                <Grid item xs={6} md={4}>
                  <Typography variant="body1" color="white" style={{display:"flex",alignItems:"baseline", flexWrap:"wrap" }}>
                    Length:&nbsp;{<p id="fish-length" style={{margin:0}}>-</p>}&nbsp;({<p id="fish-length-percent" style={{margin:0}}>-</p>}%)
                  </Typography>
                </Grid>
                <Grid item xs={6} md={4}>
                  <Typography variant="body1" color="white" style={{display:"flex",alignItems:"baseline", flexWrap:"wrap" }}>
                    Width:&nbsp;{<p id="fish-width" style={{margin:0}}>-</p>}&nbsp;({<p id="fish-width-percent" style={{margin:0}}>-</p>}%)
                  </Typography>
                </Grid>
                {/** @note MIN -> MAX */}
                <Grid item xs={6} md={4}>
                  <Typography variant="body1" color="white" style={{display:"flex",alignItems:"baseline", flexWrap:"wrap" }}>
                    Weight:&nbsp;<b>Min:</b>&nbsp;{<p id="fish-weight-min" style={{margin:0}}>-</p>}&nbsp;|&nbsp;<b>Max:</b>&nbsp;{<p id="fish-weight-max" style={{margin:0}}>-</p>}
                  </Typography>
                </Grid>
                <Grid item xs={6} md={4}>
                  <Typography variant="body1" color="white" style={{display:"flex",alignItems:"baseline", flexWrap:"wrap" }}>
                    Length:&nbsp;<b>Min:</b>&nbsp;{<p id="fish-length-min" style={{margin:0}}>-</p>}&nbsp;|&nbsp;<b>Max:</b>&nbsp;{<p id="fish-length-max" style={{margin:0}}>-</p>}
                  </Typography>
                </Grid>
                <Grid item xs={6} md={4}>
                  <Typography variant="body1" color="white" style={{display:"flex",alignItems:"baseline", flexWrap:"wrap" }}>
                    Width:&nbsp;<b>Min:</b>&nbsp;{<p id="fish-width-min" style={{margin:0}}>-</p>}&nbsp;|&nbsp;<b>Max:</b>&nbsp;{<p id="fish-width-max" style={{margin:0}}>-</p>}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                <Typography variant="body1" color="white" style={{display:"flex",alignItems:"baseline", flexWrap:"wrap", fontStyle:"italic" }}>
                    {
                      <p id="fish-description" style={{margin:0}}></p>
                    }
                  </Typography>
                  Image here
                  {<br/>}
                  Have dropdown for advanced details
                </Grid>
              </Grid>
            </Grid>
            {/* spacing */}
            {<Grid item xs={12} style={{height:"36.5px"}}></Grid>}
            <Grid item md={3}></Grid>
            <Grid item xs={12} md={6}>
              <Button 
                variant="contained" color={"success"} fullWidth 
                style={{backgroundColor: continueButtonDisable ? theme.palette.grey[900] : null, cursor:continueButtonDisable ? "default" : null}}
                onLoad={continueButtonCooldown()}
                disableElevation={continueButtonDisable}
                disableTouchRipple={continueButtonDisable}
                // disabled={continueButtonDisable}
                onClick={() => {if(continueButtonDisable===false) {setFishScreen("initial"); setContinueButtonDisable(true);}}}>
                  Continue
              </Button>
            </Grid>
            <Grid item md={3}></Grid>
          {/* {Have a side drawer pop out and show their stuff..?} */}
          </Grid>
          }
          {/** @endregion Fishing Success Screen */}

          {/** @region Bottom Navigation */}
          <BottomNavigation showLabels value={bottomNavValue} onChange={(e, newValue) => { 
            setBottomNavValue(newValue); 
            //setFishScreen("shop_home");
            if(newValue==="store") { setFishScreen("shop_home"); }
            if(newValue==="boat") { setFishScreen("boat_home"); }
            if(newValue==="fish") { setFishScreen("initial"); }
            if(newValue==="inventory") { setFishScreen("inventory_home"); }
            if(newValue==="crew") { setFishScreen("crew_home"); }
          }}>
            <BottomNavigationAction
              label="Store"
              value="store"
              icon={<ShoppingBagIcon />}
            />
            <BottomNavigationAction
              label="Boat" // Boat Overview
              value="boat"
              icon={<BoatIcon />}
            />
            <BottomNavigationAction
              label="Fish"
              value="fish"
              icon={<HookIcon />}
            />
            <BottomNavigationAction
              label="Inventory"
              value="inventory"
              icon={<BackpackIcon />}
            />
            <BottomNavigationAction
              label="Crew"
              value="crew"
              icon={<CrewIcon />}
            />
            {/* <BottomNavigationAction
              label="My Crew"
              value="myCrew"
              icon={<BackpackIcon />}
            /> */}
          </BottomNavigation>
          {/** @endregion Bottom Navigation */}

        </div>
      );
    };

    const Fish_Success = ({data}) => {
      return `Congratulations, ${usrdata?.username!==undefined ? usrdata.username : "Guest"}`
    };

    const COMMANDS = [
        {
            name: "help", 
            alias:["cmds"],
            description:"Displays all the commands",
            minArgs:0,
            args: [],
            onSelect: <Help_MainPage data={inputData}/>,
            props:{
              borderColor:"#1ED20A",
            },
            subCommands: [
              {
                name: "", 
                description:""        
              },
              {
                name: "start", 
                // name: "help fish", 
                description:"The command to register to start fishing"        
              },
              {
                name: "fish", 
                // name: "help fish", 
                description:"The command to fish"        
              },
            ]
        },
        {
            name: "start", 
            alias:null,
            description:"Start your fishing journey here",
            minArgs:0,
            args: [],
            onSelect: null,
        },
        {
            name: "fish", 
            alias:null,
            description:"The command to fish",
            minArgs:0,
            args: [],
            onSelect: <Fish/>,
            props:{
              borderColor:"#1ED20A",
            },
        },
    ];


    const isValidCommand = (_input) => { 
      // console.log("Valid Command:",COMMANDS.find(cmd => cmd.name === (_input+"").split(" ")[0]));
      return COMMANDS.find(cmd => cmd.name === (_input+"").split(" ")[0]);// || COMMANDS.find(cmd => cmd.alias.find(alias => alias === (_input+"").split(" ")[0]));
    };
    const handleEnterHit = (event) => { 
        // const _selectedCommand = COMMANDS.find(cmd => cmd.name === (event+"").split(" ")[0]);

        if(event.code!=="Enter" && event.type!=="click") { return; }
        console.log("Sending Command ",givenCommand);
        // split the event target with space
        let _cmd = givenCommand.split(" ")[0];
        // console.log("Alias",COMMANDS.some(cmd => cmd.alias.some(alias => alias === _cmd)));
        if(COMMANDS.some(cmd => cmd.name === _cmd) /*|| COMMANDS.some(cmd => cmd.alias.some(alias => alias === _cmd))*/) {
            let prepCMDforServer = validCommand;
            let indexArgs = []; let _iter = 0;
            givenCommand.split(" ").slice(1).forEach(e => {
              indexArgs.push({i: _iter++, arg: e});
            });
            let _t = givenCommand.split(" ");
            // inputData = {command:_t[0], subcommand:_t[1], args:_t.splice(2)};
            inputData = {command:_t[0], subcommand:_t[1] ? _t[1] : null, args:_t[2] ? _t.splice(2) : []};

            // prepCMDforServer.args = givenCommand.split(" ").slice(1);
            prepCMDforServer.args = indexArgs;
            console.log("Full String",givenCommand);
            console.log("Has The Command:",_cmd);
            // console.log("VCMD:",validCommand);
            console.log("prepCMDforServer:",prepCMDforServer);
            // sendCommandToServer(selectedCommand);
        } else {
            console.log("Does not have the command:",_cmd);
            inputData = givenCommand;
            // setValidCommand(false);
        }
        borderColour = validCommand ? validCommand?.props ? validCommand.props.borderColor : "#dda000" : "#ff0000";
        embedData = validCommand ? validCommand?.onSelect ? validCommand.onSelect : <NotImplementedCommand/> : <NotAValidCommand/>;
        renderedPage.name = validCommand ? validCommand?.onSelect ? validCommand.name : "NotImplementedCommand" : "NotAValidCommand";
        renderedPage.render = validCommand ? validCommand?.onSelect ? null : <NotImplementedCommand/> : <NotAValidCommand/>;

        // embedData = prevCMD!==givenCommand ? validCommand ? validCommand?.onSelect ? validCommand.onSelect : <NotImplementedCommand/> : <NotAValidCommand/> : null;
        console.log("BCLR > ",borderColour);
        // setState({});
        prevCMD = givenCommand;
        setGivenCommand("");
        setValidCommand(undefined);
        renderedEmbed=false;
    };

  return (
    <ThemeProvider theme={theme}> 
        <Typography variant="h2" color="white" style={{fontSize:"10vw", textAlign:"center", marginTop:"10px"}}>
            Fishbot
        </Typography> 
        <Box style={state.isMobile===false ? {
            // backgroundColor:theme.palette.background.default,
            marginLeft:"5vw", marginRight:"5vw", paddingBottom:"10px"} : {}}>
            <Typography variant="body1" color="white" style={{marginLeft:"5vw", marginRight:"5vw"}}>
                Simulator: Test out the bot (be logged in to save)
            </Typography>             
            <Card style={{
                backgroundColor:theme.palette.background.paper,
                marginLeft:"5vw", marginRight:"5vw", padding:"10px"}}
            >
                
                {/* <CreateEmbed 
                  refresh={setState} 
                  data={embedData}
                  borderColour={borderColour}/> */}

                  <Grid container>
                    <Grid item style={{height:"100px", width:"56px"}} >
                    <Box id={"fishbotAvatar"} style={{float:"left", height:"100%",}}>
                    <Avatar alt="Fishbot" src={fishbotImage} sx={{ width: 56, height: 56 }} style={{float:"left"}}/> 
                    </Box>
                    </Grid>
                    <Grid id={"embedArea"} item style={{
                      display:"grid",
                      width:"80%"
                    }}>
                        <Box style={{display:"flex", alignItems:"baseline", float:"left", /*height:"45px",width:"auto"*/}}>
                                <Typography variant="body1" color="white" style={{marginTop:"auto", margin:"11px/*5%*/ 5px 11px/*5%*/ 10px", height:24}}>
                                    Fishbot
                                </Typography> 
                            <Typography variant="body1" color="white" style={{backgroundColor:"lightslategrey", borderRadius:"5px", width:"min-content",height:"fit-content", padding:"0 5px", display:"flex", fontSize:"15px"}}>
                                BOT
                            </Typography> 
                        </Box>
                        <Box style={{
                            backgroundColor:theme.palette.background.default,
                            padding:"16px", borderRadius:"4px", boxShadow: "0px 4px 8px rgb(0 0 0 / 30%)",
                            borderLeft:"4px solid", 
                            // display:prevCMD!=="fish" ? "flex" : "block"/* For un-formatting the discord thing just for the buttons to fit */, 
                            alignItems:"flex-start",marginTop:"8px", borderColor:borderColour
                        }} id="weatherFABref" ref={weatherFABref}>
                            {/* {renderedPage.render===undefined && <PageLoadWelcomeMessage/> ? null : renderedPage.render} */}
                            {/* {renderedPage.render===undefined ? <div><PageLoadWelcomeMessage/><br/></div> : renderedPage.render} */}
                            {/* {renderedPage.render===undefined && <ClickAwayListener onClickAway={hideWelcomeMessage(true)}><PageLoadWelcomeMessage/></ClickAwayListener>} */}
                            {/* have `PageLoadWelcomeMessage` display ontop of the `fish` render*/}
                            {renderedPage.name === "help" && <Help_MainPage/>}
                            {renderedPage.name === "fish" && <Fish/>}
                            {/* <Typography>Fish data partially pulled from <a href="https://www.fishwatch.gov/developers">FishWatch.gov</a></Typography> */}
                        </Box>
                        {hideWelcomeMessage===false && <ClickAwayListener onClickAway={() => setHideWelcomeMessage(true)}>
                          <Box style={{
                              backgroundColor:theme.palette.background.default,
                              padding:"16px", borderRadius:"4px", boxShadow: "0px 4px 8px rgb(0 0 0 / 30%)",
                              borderLeft:"4px solid", display:prevCMD!=="fish" ? "flex" : "block"/* For un-formatting the discord thing just for the buttons to fit */, 
                              alignItems:"flex-start",marginTop:"8px", borderColor:borderColour
                          }}>
                            <PageLoadWelcomeMessage/>
                          </Box>
                        </ClickAwayListener>}
                    </Grid>
                </Grid>
                {/** Use the description stuff, jst split using (" - ") */}
                <Autocomplete
                    id="commands"
                    style={{marginTop: "10px", backgroundColor:theme.palette.background.default}}
                    freeSolo
                    inputValue={givenCommand}
                    onInputChange={(event, newInputValue) => {
                        setGivenCommand(newInputValue);
                        const _tempIsValid = isValidCommand(newInputValue);
                        setValidCommand(_tempIsValid);
                        // handleEnterHit(newInputValue);
                    }}
                    // onKeyDown={handleEnterHit}
                    onKeyDown={(event) => {
                      //if(event.code!=="Enter" && event.type!=="click") { return; }
                      if(event.code==="Enter") { handleEnterHit(event); return; }
                      
                    }}
                    /** 
                     * @note Commented this out so can test `options` below without `option.name` return.
                     */ options={
                          validCommand && validCommand?.subCommands ? [].concat(validCommand?.subCommands).map(
                            (option) => `${validCommand.name}${option.name!=="" ? " " : ""}${option.name}`
                          ) : COMMANDS.map((option) => option.name)
                        }
                    
                    // options={validCommand && validCommand?.subCommands ? [].concat(validCommand?.subCommands).map((option) => `${validCommand.name}${option.name!=="" ? " " : ""}${option.name}`) : COMMANDS.map((option) => option)}
                    
                     // getOptionLabel={(option) => `${option.name}`}
                    // getOptionLabel={(option) => `${option.name} - ${option?.description}`}
                    
                    // getOptionLabel={validCommand && validCommand?.subCommands ? (option) => `${validCommand}${option.name!=="" ? " " : ""}${option} - ${option}` : (option) => `${option} - ${option?.description}`}
                    // getOptionLabel={validCommand && validCommand?.subCommands ? (option) => `${validCommand.name}${option.name!=="" ? " " : ""}${option.name} - ${option?.description}` : (option) => `${option.name} - ${option?.description}`}
                    renderInput={(params) => <TextField 
                        {...params} variant="filled" 
                        label="Type here and hit enter to send" 
                        // getOptionLabel={(params) => `${params.name} - ${params?.description}`}
                        InputProps={{
                          ...params.InputProps,
                          endAdornment: (
                            <React.Fragment>
                              <IconButton
                                aria-label="send command"
                                onClick={handleEnterHit}
                                edge="end"
                                disabled={givenCommand===""}
                              >
                                <SendIcon style={{color:givenCommand==="" ? theme.palette.text.disabled : "#fff"}} />
                              </IconButton>
                            </React.Fragment>
                          )
                        }}
                        />}
                    
                  renderOption={(props, option) => {
                    const optionIndex = props.id.split("-")[2]; // The number after the default "commands-option-#"
                    return (
                        <Typography 
                          {...props}
                          key={`${option} - title${option?.description+"".substring(0,16)}`}
                        >
                          {/* {`${option} - ${option?.description}`} */}
                          <Typography style={{marginRight:"10px"}}>{option}</Typography>-
                          <Typography style={{color:theme.palette.grey[500],marginLeft:"10px"}}>{COMMANDS[optionIndex]?.description}</Typography>
                        </Typography>
                    ); 
                  }}
                />
            </Card>
            
        </Box>
      <Box style={{
        backgroundColor:theme.palette.background.default,
        marginLeft:"5vw", marginRight:"5vw",marginTop:"10px", paddingBottom:"10px"}}>
        <Typography variant="body1" color="white" style={{marginTop:"10px", margin:"5%"}}>
            Commands (Dropdown)
        </Typography> 
        {/* <Typography variant="body1" color="white" style={{}}>
          Note: grab these from the server-side via db calls<br/>
            {JSON.stringify(temp_UserFishData)}
        </Typography>  */}
        
      </Box>
      
    </ThemeProvider>
  );
};
export default Project_FishbotPage;
