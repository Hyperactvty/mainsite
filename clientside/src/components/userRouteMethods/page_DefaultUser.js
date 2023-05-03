import React, { useEffect, useState } from "react";
import { ThemeProvider } from "@mui/material/styles";
import { Route, Link, Routes, Navigate, NavLink, useNavigate, useParams, Outlet, } from "react-router-dom";
import {
  Toolbar,
  Card,
  AppBar,
  CardHeader,
  CardContent,
  Typography, Button
} from "@mui/material";
import theme from "../../theme";
import qdb from "../queryDB";
import ProfilePageTemplate from "../methods/profilePageTemplate";

function ValidPage({state, setState}) {
  let { UUID } = useParams();
  // console.log(window.location.pathname.slice(7).slice(0,31));
  const [pd, setPd] = useState(undefined);
  const [d, setD] = useState(undefined);
  const [timeoutCount, setTimeoutCount] = useState(0);
  const [calledDB, setCalledDB] = useState(false);
  const timeoutLimit = 1; const [displayUNF, setDisplayUNF] = useState(false);

  useEffect(() => {
    let timer = setTimeout(() => {
      setPd(()=> {
        if(!calledDB) {
          let dbGrab = qdb(
              "query",
              "grabProfileData",
              `UUID: "${UUID}"`, 
              "username, country, firstname, lastname, verified, profilepictureURI"
          );
          dbGrab.then(r=>{
            setCalledDB(true);
            if(r.errors || UUID.length!=31) {
              console.log("Display the UserNotFound page",r.errors);
              setDisplayUNF(true);
            } else {
              console.log("User exists...",r);
              setD(r.data.grabProfileData);
              // Limits the count time to 2 times
              setTimeoutCount((timeoutCount) => timeoutCount < timeoutLimit ? timeoutCount + 1 : timeoutCount);
            }
          }).catch(e=>{
            console.log("Error in ValidPages",e);
            setDisplayUNF(true);
          });
        }
        
      });
  }, 250 /* 500 */);

  return () => {
    clearTimeout(timer);
    console.log("Cleared Timeout");
  }
  }, [calledDB]);
  // }, [timeoutCount]);

  /** @note early working validation. Only supports going to profile or user not found if otherwise. */
  // return <Typography style={{overflowWrap:"anywhere", color:"white"}}>{timeoutCount < timeoutLimit && !displayUNF ? null : (d ? <Navigate to="profile" replace={true} /> : <Navigate to="/userNotFound" replace={true} />)}</Typography>;

  return timeoutCount < timeoutLimit && !displayUNF ? null : (d ? <ProfilePageTemplate setState={setState} state={state}/> : <Navigate to="/userNotFound" replace={true} />);
};

let setState=undefined;
/** The default page */
const DefaultUserPage = ({ setState, state }) => {
  let { UUID } = useParams();
  return (
    <ThemeProvider theme={theme}>
      
      <ValidPage state={state} setState={setState}/>
      <Outlet />
 
    </ThemeProvider>
  );
};

export default DefaultUserPage;
