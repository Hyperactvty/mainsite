import "./App.css";
import { 
  Route, Link, Routes, useNavigate, 
  useParams, Navigate, Outlet, useLocation, NavLink,
} from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";
import qdb from "./components/queryDB";

//#region Icons
import HomeIcon from '@mui/icons-material/Home';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import EmailIcon from '@mui/icons-material/Email';
import MenuIcon from '@mui/icons-material/Menu';
import SettingsIcon from '@mui/icons-material/Settings';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import BrushIcon from '@mui/icons-material/Brush';
// import FeaturedIcon from '@mui/icons-material/StarBorder';
import FeaturedIcon from '@mui/icons-material/Star';
import DropdownOpenIcon from '@mui/icons-material/ExpandMore';
import DropdownCloseIcon from '@mui/icons-material/ExpandLess';
/** For the HelpBot */ import LiveHelpIcon from '@mui/icons-material/LiveHelp';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import VerifiedIcon from '@mui/icons-material/Verified';


//#endregion Icons

import React, { useState, useReducer, useEffect } from "react";
//#region Pages
import LandingPage from "./components/page_LandingPage";
import PageThemes from "./components/page_Themes";
import PageNotFound from "./components/page_NotFound";
import AboutPage from "./components/page_About";
import LoginPage from "./components/page_Login";
import LogoutPage from "./components/page_Logout";
import SignupPage from "./components/page_SignUp";
import UserSettingsPage from "./components/page_Settings";
import ProjectsPage from "./components/page_Projects";
import AllProjectsPage from "./components/page_AllProjects";
import Project_FishbotPage from "./components/projects/project_Fishbot";

import ProfilePageTemplate from "./components/methods/profilePageTemplate";
import UserNotFound from "./components/userRouteMethods/page_UserNotFound";
import DefaultUserPage from "./components/userRouteMethods/page_DefaultUser";
import UserSearchPage from "./components/userRouteMethods/page_UserSearch";
//#endregion Pages

import {
  Snackbar, Drawer,
  Toolbar, Card,
  AppBar,
  MenuItem,
  Typography, List, ListItem, ListItemText, 
  ListItemButton, ListItemAvatar, ListItemIcon, ListSubheader,
  Menu, Divider, Collapse,
  Box,
  Tooltip,
  Avatar,
  IconButton,
  useMediaQuery,
  Badge,
} from "@mui/material";
import { common } from "@mui/material/colors";
import BraydenThompsonLogoWhite from "./media/logos/Brayden Thompson-logos_white_cropped.png";

//#region Helper Functions
function stringToColor(string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

function stringAvatar(name) {
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${name.split(' ')[0][0]}${name.split(' ')[0][1]}`,
  };
}
//#endregion Helper Functions

let usrdata = JSON.parse(localStorage.getItem('userdata'));

let authorizedUserPages = [
  {to:`/users/${usrdata?.UUID}`/* /profile */, name:"Profile", icon: <SettingsIcon/>},
  {to:"/settings",name:"Settings", icon: <SettingsIcon/>},
];

const pageDirectoryList = [
  {
    to:null, name:"Projects", type:"dropdown",
    icon: { open: <DropdownOpenIcon/>, close: <DropdownCloseIcon/>}, open:false, subpages: [
      { to:"/projects", name:"Featured", icon: <FeaturedIcon/>, },
      { to:"/projects/all", name:"All", icon: null, },
    ]
  },
  {to:"/settings",name:"Settings", type:"default", icon: <SettingsIcon/>},
  {
    to:null, name:"Other", type:"dropdown",
    icon: { open: <DropdownOpenIcon/>, close: <DropdownCloseIcon/>}, open:false, subpages: [
      {to:"/faq",name:"FAQ", icon:<QuestionAnswerIcon/>}, 
      {to:"/contact",name:"Contact", icon: <AlternateEmailIcon/>},
    ]
  },
];


let settings = [
  
  // {to:"/faq",name:"FAQ", icon:<QuestionAnswerIcon/>}, 
  // {to:"/contact",name:"Contact", icon: <AlternateEmailIcon/>},
  {to:"/changeTheme",name:"Themes", icon: <BrushIcon/>},
  
  {to:"/login",name:"Log-in", icon: <LoginIcon/>},
  // or...
  {to:"/logout",name:"Log-out", icon: <LogoutIcon/>, onClickLogout:true},
];
const toolbarLinkRedirect = [{to:"/home",name:"Home"}, {to:"/projects",name:"Projects"}, {to:"/about",name:"About"}];

let footerHeight=144; let headerHeight = 47;

const GenerateLegalFooter = () => {
  return (
    <Typography /*footer */ id="legal" variant="body1" color="white" style={{
        backgroundColor:theme.palette.background.default, 
        // zIndex:10,
        // width:"100%", position:"fixed", bottom:0 //Here is problem
    }}> 
      <p>&copy; 2022 by Brayden Thompson. All rights reserved. Please read the <a href="">Privacy Policy</a> and <a href="">Terms of Service</a>.</p> 
    </Typography> 
  );
};

const modifyCountryBadge = () => {
  let nodes = document.getElementById('userCountryBadge')?.childNodes;
  for(var i=0; i<nodes?.length; i++) {
      if (nodes[i].nodeName.toLowerCase() == 'span') {
          // console.log("Applying");
          // nodes[i].style.background = "red";
          nodes[i].style.backgroundImage = `url(${JSON.parse(localStorage.getItem("userdata"))?.countryBadge})`;
          nodes[i].style.backgroundPosition = "center";
          nodes[i].style.backgroundRepeat = "no-repeat";
      }
  }
}
window.onload = () => {
  console.log(window.location);
  if(!JSON.parse(window.localStorage.getItem("userdata"))?.profilePicture) {
    /** Update the localstorage and the db */
    let getUserdata = JSON.parse(window.localStorage.getItem("userdata"));
    getUserdata.profilePicture = JSON.parse(window.localStorage.getItem("userdata"))?.profilepictureURI;
    console.log("Update UD:",getUserdata);
    window.localStorage.setItem('userdata',JSON.stringify(getUserdata));
  }
  modifyCountryBadge();
  //footerHeight = document.getElementById("legal").clientHeight;
  //document.getElementById("footerSpacer").style.height = (footerHeight + 10)+"px";
  headerHeight = document.getElementById("headerAppBar")?.clientHeight;
  if(!headerHeight) { return; }
  document.getElementById("headerSpacer").style.height = (headerHeight + 10)+"px";
}

const SettingsIconDisplay = () => {
  let returnIcon = <MoreHorizIcon style={{fill:"white"}}/>;
  try {
    if(localStorage.getItem("userdata")/*!==undefined*/) {
      // TODO: Have the avatar profile picture here
      returnIcon = 
      <Badge
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        overlap="circular" badgeContent=" "
        id="userCountryBadge"
      > 
      {
        JSON.parse(window.localStorage.getItem("userdata"))?.profilePicture || JSON.parse(window.localStorage.getItem("userdata"))?.profilepictureURI ? 
        /** If user has a profile picture, display it */
        <Avatar alt={JSON.parse(window.localStorage.getItem("userdata"))?.username} src={JSON.parse(window.localStorage.getItem("userdata"))?.profilePicture || JSON.parse(window.localStorage.getItem("userdata"))?.profilepictureURI} />
        :
        /** ... otherwise display the first 2 letters of their username as their picture */
        <Avatar {...stringAvatar(JSON.parse(localStorage.getItem("userdata"))?.username)} />
      }
        
        </Badge>;
    }
  } catch (e) {
    console.warn("Error",e);
  }  
  return (
    returnIcon
  );
};

function App() {
  const initialState = {
    msg: "",
    snackBarMsg: "",
    contactServer: false,
    isToolbarLoaded: false,
    isMobile: !useMediaQuery('(min-width:600px)'), //const matches = useMediaQuery('(min-width:600px)');
    userdata: {},
  };
  const reducer = (state, newState) => ({ ...state, ...newState });
  const [state, setState] = useReducer(reducer, initialState);
  useEffect(() => {

  }, [state, setState]);
  const snackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setState({
      msg: `Be sure to rate your User Experience!`,
      contactServer: false,
    });
  };

  // const [authToken, setAuthToken] = React.useState(null);
  

  // /** @todo Replace with a back-end JWT token */
  // const handleLogin = async () => {
  //   const token = "2342f2f1d131rf12";//await fakeAuth();
  //   setAuthToken(token);
  // };

  // const handleLogout = () => {
  //   setAuthToken(null);
  // };

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const generatedToolbarLinkRedirect = [];

  /** The Right Sidebar */

  const GenerateAvatarCard = () => {
    const localStorageGrab = JSON.parse(localStorage.getItem("userdata"));
    // let profileCardImage = 
    // if(profileCardImage===undefined) {
    //   profileCardImage = 
    // } else {
    //   profileCardImage = 
    // }
    return (
      <Card >
        {/* <Link to={`/profile/${localStorageGrab?.UUID}`}> */}
        <Link to={`/users/${localStorageGrab?.UUID}`/* /profile */} style={{ color: "inherit", textDecoration: "none" }}>
          <div class={`image`} style={
            // JSON.parse(window.localStorage.getItem("userdata"))?.profilePicture ? 
            // /** If user has a profile picture, display it */
            // <Avatar alt={JSON.parse(window.localStorage.getItem("userdata"))?.username} src={JSON.parse(window.localStorage.getItem("userdata"))?.profilePicture} />
            // :
            // /** ... otherwise display the first 2 letters of their username as their picture */
            // <Avatar {...stringAvatar(JSON.parse(localStorage.getItem("userdata"))?.username)} />

          // localStorageGrab?.profileImageURI!==undefined ? 
          JSON.parse(window.localStorage.getItem("userdata"))?.profilePicture ? 
          {
              // backgroundImage: ` linear-gradient(rgba(35, 39, 42, 1), rgba(35, 39, 42, 0), rgba(35, 39, 42, 1)), url(${localStorageGrab?.profileImageURI})`,
              backgroundImage: ` linear-gradient(rgba(35, 39, 42, 1), rgba(35, 39, 42, 0), rgba(35, 39, 42, 1)), url(${JSON.parse(window.localStorage.getItem("userdata"))?.profilePicture})`,
              height:"6em",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              "position": "relative", 
          } : {
            backgroundColor:stringToColor(localStorageGrab?.username),
            height:"6em",
            // padding:"10px",
            backgroundSize: "cover",
            "position": "relative"
          }
        }>
            
            <Typography variant="caption" style={{fontSize:20, position:"absolute",bottom:0,marginLeft:"10px"}} /**subtitle1 */>
              @{localStorageGrab?.username}
              {localStorageGrab?.isVerified ? <VerifiedIcon style={{width:"20px", marginLeft:"10px", alignSelf:"center", color:"#0288d1",position:"relative",verticalAlign:"middle"}} color={"#0288d1"/*"info"*/} /> : null}
            </Typography>
            </div>
          </Link>
      </Card>
    );
  };

  const list = (anchor) => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={() => setAnchorElUser(null)}
      // style={{ color: "white"}}
      // onKeyDown={toggleDrawer(anchor, false)}
    >
      {localStorage.getItem("userdata") && (
        <GenerateAvatarCard/>
      )}
      {localStorage.getItem("userdata") && (<List>
        {authorizedUserPages.map((data) => (
            <Link to={data.to} style={{ color: "inherit", textDecoration: "none",display:"flex" }} onClick={() => data?.onClickLogout ? window.localStorage.removeItem("userdata") : null}>
            <ListItem key={data.name} disablePadding>
            <ListItemButton>
              <ListItemIcon style={{color:"inherit"}}>
                  {data.icon}
              </ListItemIcon>
              <ListItemText primary={data.name} />
            </ListItemButton>
          </ListItem>
          </Link>
        ))}
      </List>
      )}
      {localStorage.getItem("userdata") && (<Divider />)}
      <List>
        {settings.map((data) => (
          <Link to={data.to} style={{ color: "inherit", textDecoration: "none",display:"flex" }} onClick={() => data?.onClickLogout ? window.localStorage.removeItem("userdata") : null}>
          <ListItem key={data.name} disablePadding>
          <ListItemButton>
            <ListItemIcon style={{color:"inherit"}}>
                {data.icon}
            </ListItemIcon>
            <ListItemText primary={data.name} />
          </ListItemButton>
        </ListItem>
        </Link>
        ))}
      </List>
    </Box>
  );

  let selectedLI = undefined;
  const pageDirectory = () => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={(e) => {
        if(selectedLI.id.includes("dropdown")) { 
          console.log("Will Not Close"); 
        } else {
          console.log("Will close");
          setAnchorElNav(null);
        }
        // console.log("clacked",e.target);
        // console.log("parent_?",e.currentTarget);
        // console.log("itm",e.currentTarget.children.item(0));
        // console.log("itm chdrn",e.currentTarget.children.item(0).children);
        // /** @name: This sounds... cursed */
        // const grabbedChildren = e.currentTarget.children.item(0).children; 
        // for (let _i = 0; _i < grabbedChildren.length; _i++) {
        //   // const element = array[index];
        //   console.log(`Child ${_i}`,grabbedChildren.item(_i));
        //   console.log(`Child ${_i} dropdown?`,grabbedChildren.item(_i).id.includes("dropdown"));
        // }
      }}

    >
      {/* {localStorage.getItem("userdata") && (<Divider />)} */}
      <List
        subheader={
          <ListSubheader component="div" id="nested-list-subheader">
            Page Directory
          </ListSubheader>
        }
      >
        {pageDirectoryList.map((data) => (
          <div id={`pd-${data.name} ${data.type}`} onClick={(e) => {
            console.log("clicked",e.target);
            console.log("parent",e.currentTarget.id.includes("dropdown"));
            selectedLI = e.currentTarget;
            if(data.type==="dropdown") {
              data.open = !data.open;
              setState({});
            }
            //e.currentTarget.id.includes("dropdown") ? setAnchorElNav(e.currentTarget) : setAnchorElNav(null);
          }}>
          {
            data.type==="dropdown" ? 
              <ListItem key={data.name} disablePadding style={{display:"block"}}>
                <ListItemButton style={{alignSelf:"baseline"}}>
                <ListItemText primary={data.name} />
                  <ListItemIcon style={{color:"inherit"}}>
                      {data.open ? data.icon.close : data.icon.open}
                  </ListItemIcon>
                </ListItemButton>
                <Collapse in={data?.open} timeout="auto" unmountOnExit style={{alignSelf:""}}>
                {data?.subpages && 
                  data?.subpages.map((_subpageData) => (
                  // <Collapse in={_subpageData?.open} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                      {/* <ListItemButton sx={{ pl: 6 }} component="a" href={`#${_subpageData.to}`} onClick={() => { */}
                      <ListItemButton sx={{ pl: 6 }} component="a" href={`${_subpageData.to}`} onClick={() => {
                        setAnchorElNav(null);
                      }}>
                        <ListItemText primary={_subpageData.name} />
                        <ListItemIcon style={{color:"inherit"}}>
                            {_subpageData?.icon}
                        </ListItemIcon>
                      </ListItemButton>
                    </List>
                  // </Collapse>
                  ))
                }
                </Collapse>
            </ListItem>
           : 
            <Link to={data.to!==null ? data.to : "/"} style={{ color: "inherit", textDecoration: "none",display:"flex" }}>
              <ListItem key={data.name} disablePadding>
                <ListItemButton>
                <ListItemText primary={data.name} />
                  <ListItemIcon style={{color:"inherit"}}>
                      {data?.icon}
                  </ListItemIcon>
                </ListItemButton>
            </ListItem>
          </Link>
        }
          </div>
        ))}
      </List>
    </Box>
  );

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === /*'Space'*/'Tab' || event.key === 'Shift')) {
      //console.log("Toggle me pls");
      return;
    }

    setState({ ...state, sideBar: open });
  };

  /** End : The Right Sidebar */

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

 //return <LandingPage />;
 
 toolbarLinkRedirect.forEach(_item => {
  generatedToolbarLinkRedirect.push(
    <MenuItem component={Link} to={_item.to}>
      <Typography variant="subtitle1">{_item.name}</Typography>
      {/* {_item.name} */}
    </MenuItem>
  );
  if(generatedToolbarLinkRedirect.length < (toolbarLinkRedirect.length*2)-1) {generatedToolbarLinkRedirect.push(<Typography>|</Typography>);}
 });
 state.isToolbarLoaded = true;
//  const isM = !useMediaQuery('(min-width:600px)');
//  if(state.isMobile!==isM) { setState({isMobile: !useMediaQuery('(min-width:600px)')}); }
const [width, setWidth] = useState(window.innerWidth);

function handleWindowSizeChange() {
  //setState({isMobile: !useMediaQuery('(min-width:600px)')});
    setWidth(window.innerWidth);
    //setState({isMobile: width <= 768});
}
useEffect(() => {
    window.addEventListener('resize', handleWindowSizeChange);
    return () => {
        window.removeEventListener('resize', handleWindowSizeChange);
    }
}, []);

const isMobile = width <= 768;
if(isMobile!==state.isMobile) { setState({isMobile: isMobile}); }
//setState({isMobile: width <= 768});

/** TODO: Validate the login with certain keys..? */
try {
    const usrdata = JSON.parse(localStorage.getItem('userdata'));
    settings = settings.filter(_entry=> (_entry.to !== (usrdata?.username!==undefined ? "/login" : "/logout"))); 
    settings = settings.filter(_entry=> (_entry.to !== (usrdata?.username!==undefined ? "/" : "/settings"))); 
} catch (e) {
  settings = settings.filter(_entry=> (_entry.to !== "/logout"));
  settings = settings.filter(_entry=> (_entry.to !== "/settings"));
  //console.log("Error: ",e);
}
 return(
  <ThemeProvider theme={theme}>
  <AppBar id="headerAppBar" position="static" style={{
    position:"fixed", zIndex:10, top:0,
    backgroundColor:"#483C46"
    // paddingLeft:"5vw", paddingRight:"5vw"
  }}>
      <Toolbar variant="dense">
        {state.isMobile && <Box sx={{ flexGrow: 0, marginRight:"10px" }}>
            <Tooltip title="Open page directory">
              <IconButton onClick={handleOpenNavMenu} sx={{ p: 0 }}>
                <MenuIcon style={{fill:"white"}}/>
              </IconButton>
            </Tooltip>
            <Drawer
              anchor={"left"}
              open={Boolean(anchorElNav)}
              //onClose={toggleDrawer("right", false)}
              onClose={handleCloseNavMenu}
            >
              {pageDirectory()}
            </Drawer>
          </Box> }

        <Typography style={{ flex: 1, fontWeight: "bold" }}>
          {/* need to fix this icons formatting */}
          <Link to="/home" style={{ color: "white", textDecoration: "none" }}>
            {/* <HomeIcon style={{ fontSize: "40px" }} /> */}
            <img id={"braydenLogoToGoHome"} src={BraydenThompsonLogoWhite} style={{height:"40px"}}/>
          </Link>
        </Typography>
        {state.isMobile ? null : generatedToolbarLinkRedirect}
        
        <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <SettingsIconDisplay/>
                {/* <MoreHorizIcon style={{fill:"white"}}/>
                <Avatar {...stringAvatar('Kent Dodds')} /> */}
              {/* localStorage.getItem('settings') */}
                {/* <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" /> */}
              </IconButton>
            </Tooltip>
            {/* <Menu
              sx={{ mt: '30px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting.name} onClick={handleCloseUserMenu} style={{width:"auto", 
                    //display:setting.to!=="/login" && setting.to!=="/logout" ? "block" : "none",
                    //display:state.userdata?.username!==undefined && setting.to!=="/logout" ? "block" : "none",
                }}>
                  <Link to={setting.to} style={{ color: "white", textDecoration: "none",display:"flex" }} onClick={() => setting?.onClickLogout ? window.localStorage.removeItem("userdata") : null}>
                    {setting.icon}
                    <Typography textAlign="center" marginLeft="10px">{setting.name}</Typography>
                  </Link>
                  
                </MenuItem>
              ))}
            </Menu> */}
            <Drawer
              anchor={"right"}
              open={Boolean(anchorElUser)}
              //onClose={toggleDrawer("right", false)}
              onClose={handleCloseUserMenu}
            >
              {list("right")}
            </Drawer>
          </Box>

      </Toolbar>
    </AppBar>
    <div id="headerSpacer"/>
    <div>

    <AuthProvider>
      {/* <Navigation/> */}
      
      <Routes>
        {/* #region General Paths */}
        <Route index element={<LandingPage setState={setState} state={state} />} />
        <Route path="home" element={<LandingPage setState={setState} state={state} />}/>
        <Route path="about" element={<AboutPage setState={setState} state={state} />} />
        {/* #endregion General Paths */}

        <Route path="settings" element={
          // <ProtectedRoute>
            <UserSettingsPage setState={setState} state={state} />
          /* </ProtectedRoute> */
        }/>
        <Route path="login" element={<LoginPage setState={setState} state={state} />} />
        <Route path="logout" element={
          // <ProtectedRoute>
            <LogoutPage setState={setState} state={state} />
          // </ProtectedRoute>
        }/>
        <Route path="signup" element={<SignupPage setState={setState} state={state} />} />
        
        <Route path="projects" >
          <Route index element={<ProjectsPage setState={setState} state={state} />} />
          <Route path="all" element={<AllProjectsPage setState={setState} state={state} />} />
          <Route path="fishbot" element={<Project_FishbotPage setState={setState} state={state} />} />
        </Route>
        {/* <Route path="/users/:UUID" element={<ProfilePageTemplate setState={setState} state={state} />} /> */}
        
        <Route path="users" /*element={ <DefaultUserPage setState={setState} state={state} users={users}/> }*/>
          {/* use the state to advantage; when loading using default page, set the 
              state with the grabbed db items and pass them through the outlet */}
          {/* <Route index element={<ProfilePageTemplate setState={setState} state={state} />} /> */}
          {/* <Route path=":UUID" element={<ProfilePageTemplate setState={setState} state={state}/>}/> */}
          <Route path=":UUID"> 
            <Route index element={ <DefaultUserPage setState={setState} state={state}/> } />
            <Route path="profile" element={ <ProfilePageTemplate setState={setState} state={state}/> }/> 
            <Route path="*" element={<Navigate to="profile" replace={true} />} />
            
          </Route>
          {/* This route will match /users/*, allowing more routing to happen in the <UsersSplat> component */}
          {/* <Route path="*" element={<UserNotFound setState={setState} state={state}/>} /> */}
        </Route>

        <Route path="userNotFound" element={<UserNotFound setState={setState} state={state} />} />
        {/* <Route path="_home" element={<Home />} />
        <Route path="_dashboard" element={
          <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
        } /> */}
        <Route path="*" element={<PageNotFound setState={setState} state={state} />}/>
         
      </Routes>
      </AuthProvider>
    </div>

    {/* You can't rely on the content of the badge to be announced correctly. You should provide a full description, for instance, with aria-label */}
    <IconButton /*aria-label={notificationsLabel(100)}*/ style={{backgroundColor:theme.palette.primary.main, position:"fixed", bottom:0,right:0,marginRight:"10px", marginTop:"10px",zIndex:9, }}>
      <Badge badgeContent={4} color="primary">
        <LiveHelpIcon style={{color:"white"}} fontSize="large"/>
      </Badge>
    </IconButton>
    <footer style={{ position: "sticky",}}>
    <GenerateLegalFooter/>
    </footer>
  </ThemeProvider>
 );
};

const AuthContext = React.createContext(null);
const useAuth = () => {
  return React.useContext(AuthContext);
};

const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [authToken, setAuthToken] = React.useState(null);

  /** @todo Replace with a back-end JWT token */
  const handleLogin = async () => {
    const token = "fakeTokenfakeTokenfakeTokenfakeToken";//await fakeAuth();
    
    setAuthToken(token);
    /** @note the "return to previous page after login success" page */
    const origin = location.state?.from?.pathname || '/home';
    navigate(origin);
  };

  const handleLogout = () => {
    setAuthToken(null);
  };

  const value = {
    authToken,
    onLogin: handleLogin,
    onLogout: handleLogout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

const ProtectedRoute = ({ children }) => {
  const { authToken, user } = useAuth();
  const location = useLocation();

  if (!authToken) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return children;
};

const Navigation = () => {
  const { onLogout, authToken } = useAuth();

  return (
    <nav>
      <NavLink style={{textDecoration:"none",color:"limegreen"}} to="/_home">Home</NavLink>
      <NavLink style={{textDecoration:"none",color:"limegreen"}} to="/_dashboard">Dashboard</NavLink>
      {authToken && (
        <button type="button" onClick={onLogout}>
          Sign Out
        </button>
      )}
    </nav>
  );
};

const Home = () => {
  const { onLogin } = useAuth();
  return (
    <>
      <h2>Home (Public)</h2>

      <button type="button" onClick={onLogin}>
        Sign In
      </button>
    </>
  );
};

const Dashboard = () => {
  const { authToken } = useAuth();

  return (
    <>
      <h2>Dashboard (Protected)</h2>

      <div>Authenticated as {authToken}</div>
      {console.log(`Authenticated as ${authToken}`)}
    </>
  );
};

/** Could be used for authentication */
const ValidateUser = ({ isLoggedIn, goTo, ...props }) => {
  const location = useLocation();
  console.log("Loc",location);
  return isLoggedIn? (
    // <Outlet />
    goTo
  ) : (
    <Navigate
      to={`/login/${location.search}`}
      replace
      state={{ location }}
    />
  )
};


/**
 * @note Unmounted - Will not be visible to search engines
 */
function UsersSplat({ setState, state, }) {

  
  // More routes here! These won't be defined until this component
  // mounts, preserving the dynamic routing semantics we had in v5.
  // All paths defined here are relative to /users since this element
  // renders inside /users/*
  return (
    <Routes>
      <Route path=":UUID" element={<ProfilePageTemplate setState={setState} state={state}/>}>
        <Route path="profile" element={<ProfilePageTemplate setState={setState} state={state}/>} />
        {/* <Route path="view" element={console.log("Why")} /> */}
        <Route path="*" element={<Navigate to="/profile" replace={true} /> } />
      </Route>
      {/* <Route path="*" element={<UserNotFound setState={setState} state={state} />} /> */}
    </Routes>
  );

}


export default App;