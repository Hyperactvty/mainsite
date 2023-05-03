import React from "react";
import { Route, Link, Routes } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import {
  Toolbar,
  Autocomplete,
  TextField,
  Card,
  AppBar,
  CardHeader,
  CardContent,
  Typography,
  Box,
  Stack,
  Button,
  Fab, SvgIcon,
  IconButton, Chip,
  Zoom,FormControlLabel,
  Grid, Switch,
} from "@mui/material";
import theme from "../theme";

//import fishbotImage from "../media/discordbot_Fishbot_noHyper.png"; /** Grab from db */
import fishbotImage from "../media/discordbot_Fishbot2022.png"; /** Grab from db */
import DiscordIcon from '@mui/icons-material/ShieldMoon';
import EntertainmentIcon from '@mui/icons-material/Tv';
import GameIcon from '@mui/icons-material/SportsEsports';
import UtilityIcon from '@mui/icons-material/Engineering';
import SchoolIcon from '@mui/icons-material/School';

//const CATEGORIES = [{title:"Discord Bot", isSearchParam:false}, {title:"Entertainment", isSearchParam:false}, {title:"Game", isSearchParam:false}, {title:"Utility", isSearchParam:false}, {title:"School", isSearchParam:false}];
const CATEGORIES = ["Discord Bot","Entertainment", "Game","Utility","School",];

const projects = [ /** Pull from database */
  {
    id:0,
    categories: ["Discord Bot", "Entertainment", "Utility"],
    name: "Fishbot",
    subtitle: "Discord Bot",
    description: "Fishbot is a text-based fishing game.",
    imageURI: fishbotImage,
    redirect:"fishbot",
    isActive: false,
    isFeatured: true
  },
  {
    id:1,
    categories: ["Discord Bot","Utility"],
    name: "Project 1",
    subtitle: "Sub",
    description: "",
    redirect:"",
    isActive: false,
    isFeatured: false
  },
  {
    id:2,
    categories: ["Utility"],
    name: "Project 2",
    subtitle: "Subtitle",
    description: "",
    imageURI: fishbotImage,
    redirect:"",
    isActive: false,
    isFeatured: false
  },
  {
    id:3,
    categories: ["Discord Bot"],
    name: "Project 3",
    subtitle: "Title of Subs",
    description: "",
    redirect:"",
    isActive: true,
    isFeatured: false
  },
  {
    id:4,
    categories: [],
    name: "Project 4",
    subtitle: "",
    description: "",
    redirect:"",
    isActive: false,
    isFeatured: false
  },
];

const pulledProjects = projects;
let filteredProjects = pulledProjects; /* default */
let filters = [];
const noneFoundFaces = ["(ノಠ益ಠ)ノ彡┻━┻ ", "┻━┻＼(｀0´)／┻━┻","(V) (°,,,,°) (V)","(︶︹︶)","(╯°□°）╯︵ ┻━┻"];

const availableBadges = [
  {name: "Discord Bot", content: <DiscordIcon style={{color:"white", backgroundColor:"#5865F2", borderRadius:"100%", padding:"4px"}} fontSize="small"/>},
  {name: "Entertainment", content:<EntertainmentIcon style={{color:"white", backgroundColor:"#F26430", borderRadius:"100%", padding:"4px"}} fontSize="small"/>}, 
  {name: "Game", content:<GameIcon style={{color:"white", backgroundColor:"#C7EF00", borderRadius:"100%", padding:"4px"}} fontSize="small"/>},
  {name: "Utility", content:<UtilityIcon style={{color:"white", backgroundColor:"#C0FDFB", borderRadius:"100%", padding:"4px"}} fontSize="small"/>},
  {name: "School", content:<SchoolIcon style={{color:"white", backgroundColor:"#BEEE62", borderRadius:"100%", padding:"4px"}} fontSize="small"/>},];

const GenerateProjectBadges = (state, _projectData) => {
  try {
    if(_projectData===undefined) { console.log("Projectdata is undefined"); return; }
    if(_projectData.categories===undefined) { console.log("categories is undefined"); return; }
    
    let _givenBadges = [];
    availableBadges.forEach(_category => {
      console.log("Has Category: ",_projectData.categories.includes(_category.name));
      // console.log(availableBadges.map((_data) => {
      //   return _data[_category];
      // }));
      //if(_projectData.categories.includes(_category)) {
      if(_projectData.categories.includes(_category.name)) {
        _givenBadges.push(_category.content);
      }
    });
    console.warn("Badges: ",_givenBadges);
    return (
      // If mobile, limit to only 3 before doing the `+2`, ect
      <Stack direction="row" style={{flexFlow:"wrap", position:"absolute", bottom:0}} spacing={1}>
        {/* {_givenBadges.map(ele=> ele)} */}
        {_givenBadges}
        {/* <DiscordIcon style={{color:"white", backgroundColor:"blueviolet", borderRadius:"100%"}} fontSize="small"/>
        <DiscordIcon style={{color:"white", backgroundColor:"blueviolet", borderRadius:"100%"}} fontSize="small"/> */}
        {/* <SvgIcon component={Discord_Icon} style={{color:"white", backgroundColor:"blueviolet", borderRadius:"100%"}} fontSize="small"/> */}
        {/* <DiscordIcon style={{color:"white", backgroundColor:"blueviolet", borderRadius:"100%"}} fontSize="small"/>
        <Typography variant="body1" color="white">+2</Typography> */}
        {/* <Chip icon={<DiscordIcon />} label="+2"></Chip> */}
      </Stack>
    );
  } catch (e) {
    console.warn("Error: ",e)
  }
};

const GenerateProjectCard = ({state, _projectData}) => {
  return (
    <Card 
      class="imageContainer" /*fullwidth*/ style={{ /*marginLeft:"5vw", marginRight:"5vw", marginTop:"10px"*/ }}>
        <Link to={`/projects/${_projectData.redirect}`} /* Have `projects` be dynamic, like {parentPage} */ style={{textDecoration:"none"}}>
      <div style={
        {
          backgroundImage: ` linear-gradient(rgba(35, 39, 42, 1), rgba(35, 39, 42, 0), rgba(35, 39, 42, 1)), url(${_projectData.imageURI})`,
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          "position": "relative", 
          minHeight:"250px"
        }}>
        <Typography variant="h2" color="white" style={{
          fontSize:!state.isMobile ? "6vw" : "10vw", textAlign:"center",
          background: "linear-gradient(rgba(35, 39, 42, 1), rgba(35, 39, 42, 0))",
          textShadow: "0 0 10px rgba(35, 39, 42,1)",
          // "text-shadow": "0 0 10px rgba(35, 39, 42,1)",
        }}>{_projectData.name}</Typography>
        <Typography variant="subtitle1" color="white" style={{marginBottom:"10px", textShadow: "0 0 10px rgba(35, 39, 42,1)",fontSize:!state.isMobile ? "3vw" : "6vw", textAlign:"center"}}>{_projectData.subtitle}</Typography>
          <Typography variant="body1" color="white" style={{marginTop:"10px", margin:"5%", 
          textShadow: "0 0 10px rgba(35, 39, 42,1)",
          /*background: "linear-gradient(rgba(35, 39, 42, 0), rgba(35, 39, 42, 1))",*/}}>
          {_projectData.description}
          </Typography> 
          {/* This is where the tags are going to be. Have more available on desktop per card. */}
          {GenerateProjectBadges(state, _projectData)}
      </div></Link>
    </Card>
  );
};

const FilterProjects = (_filter, _filterExclusive) => {
  try {
    console.log("filter:",_filter);
    filteredProjects=[];
    if(_filter===undefined){ filteredProjects = _filterExclusive ? [] : pulledProjects; console.log("Empty and Undefined:",filteredProjects); return []; }
    if(_filter.length===0){ filteredProjects = _filterExclusive ? [] : pulledProjects; console.log("Empty:",_filterExclusive,filteredProjects); return filteredProjects; }
    
    _filter.forEach(_category => {
      pulledProjects.forEach(element => {
        console.log(element.categories.includes(_category));
      });
    });
    let _tempFiltered = [];
    _filter.forEach(_category => {
      filteredProjects = pulledProjects.filter(_project => _project.categories.includes(_category) );
    });

    /** IF EXCLUSIVE */
    if(_filterExclusive) {
      // _tempFiltered=filteredProjects;
      filteredProjects.forEach(_fproject => {
        if(_fproject.categories.length===_filter.length) { console.warn("Added ",_fproject.name); _tempFiltered.push(_fproject); }
      });
      _filter.forEach(_category => {
        filteredProjects = _tempFiltered.filter(_project => _project.categories.includes(_category) );
      });
    }

    console.log(filteredProjects);
    // filteredProjects = pulledProjects.filter(_project => _project.categories.includes() );
    return filteredProjects;
  } 
  catch(e){
    console.warn("Error:",e);
  }
  finally {
    return [];
  }
};

let prevFaceIndex = 0;
// const noResultsFace = () => {
//   let newFaceIndex = Math.floor(Math.random() * noneFoundFaces.length);
//   for (let index = 0; index < 10; index++) {
//     if(newFaceIndex === prevFaceIndex) {
//       newFaceIndex = Math.floor(Math.random() * noneFoundFaces.length);
//     } else {
//       prevFaceIndex = newFaceIndex;
//       break;
//     }
//   }
//   let _face = noneFoundFaces[newFaceIndex];
//   console.log(_face);
//   return _face;
// };

const AllProjectsPage = ({ setState, state }) => {

  const [filterTogetherSwitch, setFilterTogetherSwitch] = React.useState(false);
  const [filteredResults, setFilteredResults] = React.useState([]);
  const handleFilterTogetherSwitchChange = (event) => {
    setFilterTogetherSwitch(event.target.checked);
    FilterProjects(filters, event.target.checked);
  };

  const handleSearchParamsChange = (event, value) => {
    filters = value;
    setFilteredResults(FilterProjects(value, filterTogetherSwitch));
    console.log(value);
  };

  const noResultsFace = () => {
    let newFaceIndex = Math.floor(Math.random() * noneFoundFaces.length);
    // console.log("Old: ",prevFaceIndex," | New: ",newFaceIndex);
    if(newFaceIndex === prevFaceIndex) {
      let pickNew = [];
      // console.log("OVERTIME!");
      for (let index = 0; index < noneFoundFaces.length; index++) {
        if(index !== prevFaceIndex) {
          pickNew.push(index);
        }
      }
      // console.log("Array: ",pickNew);
      return noneFoundFaces[pickNew[Math.floor(Math.random() * pickNew.length)]];
    } else {
      prevFaceIndex = newFaceIndex;
      return noneFoundFaces[newFaceIndex];
    }
  };

  return (
    <ThemeProvider theme={theme}> 
      <Box style={{
        backgroundColor:theme.palette.background.default,
        marginLeft:"5vw", marginRight:"5vw",marginTop:"10px", paddingBottom:"10px"}}>
          <Grid container>
            <Grid item xs={!state.isMobile ? 7 : 12} style={{paddingLeft: !state.isMobile ? "20px" : "10px",
              paddingRight: !state.isMobile ? "20px" : "10px",marginTop:"10px", //backgroundColor:"red"
            }}>
              <Autocomplete
                multiple
                limitTags={2}
                id="search-for-project-using-categories"
                options={CATEGORIES}
                //getOptionLabel={(option) => option.title}
                style={{paddingLeft: !state.isMobile ? "20px" : "10px", paddingRight: !state.isMobile ? "20px" : "10px", color:"#ffffff", height:"50px"}}
                onChange={handleSearchParamsChange}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="standard"
                    label="Search by Categories"
                    placeholder="Categories"
                  />
                )}
              />
            </Grid>
            <Grid item sm={4} style={{paddingLeft: !state.isMobile ? "20px" : "10px", //backgroundColor:"green",
            paddingRight: !state.isMobile ? "20px" : "10px",marginTop:"10px", height:"50px",display:"flex"}}>
              <FormControlLabel
                value="filter-search-inclusive-exclusive"
                control={<Switch
                  checked={filterTogetherSwitch}
                  onChange={handleFilterTogetherSwitchChange}
                  inputProps={{ 'aria-label': 'Filter Search Together' }}
                  color="primary"
                />}
                label={<Typography variant="body1" color="white">Search: {!filterTogetherSwitch ? "Inclusive" : "Exclusive"}</Typography>}
                labelPlacement="start"
              />

              </Grid>
           
          </Grid>
      </Box>
      
      <Box style={{
        /* Have (min 2, have check screen size, maybe max 3) grid if desktop, rows if mobile */
        backgroundColor:theme.palette.background.default,
        marginLeft:"5vw", marginRight:"5vw",marginTop:"10px", paddingBottom:"10px", minHeight:"350px"
      }} /*onMouseEnter={handleMouseEnterProject} onMouseLeave={handleMouseLeaveProject}*/>
        {filteredProjects.length != 0 &&<Grid container>
        {filteredProjects.map((_project, index) => (
          <Grid item xs={!state.isMobile ? 3 : 4} style={{paddingLeft: !state.isMobile ? "20px" : "10px",
          paddingRight: !state.isMobile ? "20px" : "10px",marginTop:"10px"}}>
            <GenerateProjectCard state={state} _projectData={_project}/>
          </Grid>
        ))}
        </Grid>}
        {filteredProjects.length === 0 && <Box>
        <Typography variant="h6" color="white" style={{fontSize:30, textAlign:"center"}}>
              No results found
        </Typography> 
        <Typography variant="h6" color="white" style={{fontSize:"x-large", textAlign:"center"}}>
        {filteredProjects.length===0 && noResultsFace()}
        </Typography> 
      </Box>}
      </Box>
    </ThemeProvider>
  );
};
export default AllProjectsPage;
