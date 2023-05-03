import React from "react";
import { ThemeProvider } from "@mui/material/styles";
import {
  Toolbar,
  Card,
  AppBar,
  CardHeader,
  CardContent,
  Typography,
} from "@mui/material";
import theme from "../../theme";


const SearchUserPage = () => {
  return (
    <ThemeProvider theme={theme}>
      {/* <AppBar color="primary">
        <Toolbar>
          <Typography variant="h6" color="inherit">
            INFO3139 - MaterialUI
          </Typography> 
        </Toolbar>
      </AppBar> */}
      <Typography variant="h6" color="white" style={{fontSize:30, textAlign:"center"}}>
            404: User Not Found
      </Typography> 
      <Typography variant="h6" color="white" style={{fontSize:60, textAlign:"center"}}>
      ¯\_(ツ)_/¯
      </Typography> 
    </ThemeProvider>
  );
};
export default SearchUserPage;
