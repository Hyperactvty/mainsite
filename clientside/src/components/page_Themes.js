import React from "react";
import { ThemeProvider } from "@mui/material/styles";
import {
  Toolbar,
  Card,
  AppBar,
  CardHeader,
  CardContent,
  Typography,
  Switch,
  FormGroup,
  FormControlLabel,
} from "@mui/material";
import { styled } from '@mui/material/styles';
import theme from "../theme";
import LooksIcon from '@mui/icons-material/Looks';

const MaterialUISwitch = styled(Switch)(({ theme }) => ({
  width: 62,
  height: 34,
  padding: 7,
  '& .MuiSwitch-switchBase': {
    margin: 1,
    padding: 0,
    transform: 'translateX(6px)',
    '&.Mui-checked': {
      color: '#fff',
      transform: 'translateX(22px)',
      '& .MuiSwitch-thumb:before': {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
          '#fff',
        )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
      },
      '& + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
      },
    },
  },
  '& .MuiSwitch-thumb': {
    backgroundColor: theme.palette.mode === 'dark' ? '#003892' : '#001e3c',
    width: 32,
    height: 32,
    '&:before': {
      content: "''",
      position: 'absolute',
      width: '100%',
      height: '100%',
      left: 0,
      top: 0,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      backgroundImage: 
      `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
        '#fff',
      )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
    },
  },
  '& .MuiSwitch-track': {
    opacity: 1,
    backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
    borderRadius: 20 / 2,
  },
}));

const ColourWall = ({_title,_args}/*=[]*/) => {
    const _colr = [];
    if(_args!==undefined) {
        _args.forEach(element => {
            element = element[0]==="#" ? element : "#"+element;
            _colr.push(
                <div style={{backgroundColor:element, height:"50px", flex:"auto",verticalAlign: "middle"}}>
                    <div style={{textAlign:"center",mixBlendMode:"exclusion",marginTop:"15px",fontSize:15}}>{element}</div>
                </div>
            ); // have element here
        });
    }
    console.warn(_colr);
    return (
      <Card style={{marginLeft:"5%"}}>
        <CardHeader title={_title} style={{ textAlign: "center" }} />
        <CardContent>
            <div style={{display:"flex"}}>
                {_colr}
                {/* <div style={{backgroundColor:_args[0], width:"50px", height:"50px"}}>{_args[0]}</div> */}
                {/* {_args!==undefined && (
                    <div style={{backgroundColor:_args[0]}}>{_args[0]}</div>
                )} */}
            </div>
        </CardContent>
      </Card>
    );
};

const PageThemes = () => {
  return (
    <ThemeProvider theme={theme}>
      {/* <AppBar color="primary">
        <Toolbar>
          <Typography variant="h6" color="inherit">
            INFO3139 - MaterialUI
          </Typography> 
        </Toolbar>
      </AppBar> */}
      <ColourWall _title="Thanksgiving" _args={["2E1F27","854D27","DD7230","F4C95D","E7E393"]}/>
      <ColourWall _title="Simple Mk. II" _args={["54494B","F1F7ED","91C7B1","B33951","E3D081"]}/>
      <ColourWall _title="Greensticle" _args={["483C46","3C6E71","70AE6E","BEEE62","F4743B"]}/>
      
      <Card style={{backgroundColor:theme.palette.background.default, margin: "5% 5%"}}>
        <FormGroup>
          <FormControlLabel
            control={<MaterialUISwitch sx={{ m: 1 }}  />}
            label="Neon Mode"
          />
        </FormGroup>
      </Card>
    </ThemeProvider>
  );
};
export default PageThemes;
