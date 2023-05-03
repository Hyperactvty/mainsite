import { createTheme } from "@mui/material/styles";
export default createTheme({
  typography: {
    useNextVariants: true,
    fontFamily: [
      //'-apple-system',
      // 'BlinkMacSystemFont',
      // '"Segoe UI"',
      // 'Roboto',
      // '"Helvetica Neue"',
      // 'Arial',
      '"Roboto Condensed"',
       'sans-serif',
      // '"Apple Color Emoji"',
      // '"Segoe UI Emoji"',
      // '"Segoe UI Symbol"',
    ].join(','),
    h2: {
      fontFamily: [
        '"Bebas Neue"', 
        'cursive',
      ].join(','),
    },
    subtitle1: {
      fontFamily: [
        '"Segoe UI"', 
        'sans-serif',
      ].join(','),
    },
    body3: {
      fontFamily: [
        'Abel', 
        'sans-serif',
      ].join(','),
    },
    
  },
  palette: {
    common: { black: "rgba(0, 0, 0, 1)", white: "rgba(255, 255, 255, 1)" },
    background: {
      paper: "rgba(35, 39, 42, 1)",
      default: "rgba(44, 47, 51, 1)",
      jet: "#2D2D2A",
      davygray: "#4C4C47",
    },
    primary: {
      light: "rgba(179, 95, 253, 1)",
      _main: "rgba(144, 19, 254, 1)",
      __main: "#483C46",
      // Blue Main
      main: "#22AED1",
      green: "#CBFF8C",
      blurple: "#BCB6FF",
      periwinkle: "#B8E1FF",
      dark: "rgba(109, 3, 202, 1)",
      contrastText: "rgba(255, 255, 255, 1)",
    },
    secondary: {
      _light: "rgba(213, 46, 247, 1)",
      _main: "rgba(189, 16, 224, 1)",
      _dark: "rgba(143, 5, 171, 1)",
      light: "#00BFB3",
      main: "#049A8F",
      dark: "#037971",
      contrastText: "#fff",
    },
    error: {
      light: "rgba(214, 174, 107, 1)",
      main: "rgba(245, 166, 35, 1)",
      dark: "rgba(204, 147, 52, 1)",
      contrastText: "#fff",
    },
    text: {
      primary: "rgba(255, 255, 255, 0.87)",
      secondary: "rgba(119, 119, 119, 0.54)",
      disabled: "rgba(80, 80, 80, 0.38)",
      hint: "rgba(0, 0, 0, 0.38)",
    },
  },
});
