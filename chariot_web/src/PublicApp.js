import React, { useEffect, useState } from 'react';
import "@aws-amplify/ui-react/styles.css";
import {
  withAuthenticator,
  Button,
  // Heading,
  // Image,
  // View,
  // Card,
} from "@aws-amplify/ui-react";

// import logo from './assets/gold-circle.png';
import './App.css';
import Home from './screens/Home';
import Dashboard from './screens/Dashboard';
import NotFound from './screens/NotFound';

import { BrowserRouter as Router, Route, Routes, useNavigate } from "react-router-dom";
import SideNav, { NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
// Be sure to include styles at some point, probably during your bootstraping
import '@trendmicro/react-sidenav/dist/react-sidenav.css';

import { TiHomeOutline, TiLightbulb } from "react-icons/ti";
import { MdOutlineSpaceDashboard } from "react-icons/md";

function PublicApp({ signOut }) {

  // const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

  // useEffect(() => {
  //   // console.log(window.location.pathname)
  //   function handleResize() {
  //     setWindowDimensions(getWindowDimensions());
  //     // console.log(windowDimensions)
  //   }
  //   window.addEventListener('resize', handleResize);
  //   return () => window.removeEventListener('resize', handleResize);
  // },[])

  // let height = windowDimensions.height;   
  // let width = windowDimensions.width;     
  

  return (
    <div>
      <div className="App">
        <Router>
          <SideBarMenu />
          <RoutesComponent />
        </Router>
      </div>
      <Button onClick={signOut} backgroundColor="#db3d44" color="white" variation='primary'
        style={{position: "fixed", bottom:'2%', right:'2%'}}>Sign Out</Button>
    </div>
  );
}

const RoutesComponent = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/*" element={<NotFound />} />
    </Routes>
  );
}

const SideBarMenu = () => {
  return (
    <React.Fragment>
      <SideNav style={{position: "fixed", top:0, left:0, height:'100vh'}}>
        <SideNav.Toggle />
        <SideNav.Nav defaultSelected="home" >
          <MenuItem props={{ key: "home", title: "Home", icon: <TiHomeOutline style={{ fontSize: '1.9em' }} /> }} />
          <MenuItem props={{ key: "dashboard", title: "Dashboard", icon: <MdOutlineSpaceDashboard style={{ fontSize: '1.75em' }} /> }} />
          <MenuItem props={{ key: "aboutus", title: "About Us", icon: <TiLightbulb style={{ fontSize: '1.9em' }} /> }} />
        </SideNav.Nav>
      </SideNav>
    </React.Fragment>
  );
}

const MenuItem = (props) => {
  let key = props.props.key;
  let title = props.props.title
  let icon = props.props.icon
  let to = "/";

  const navigate = useNavigate();
  const handleClick = (path) => navigate(path);

  return (
    <NavItem eventKey={key}
      onSelect={(selected) => {
        to = '/' + selected;
        console.log(to)
        handleClick(to);
      }}
    >
      <NavIcon style={{ paddingTop: '0.3em' }}>
        {icon}
      </NavIcon>
      <NavText>
        {title}
      </NavText>
    </NavItem>
  );
}

// WINDOW DIMENSIONS
function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height
  };
}

export default withAuthenticator(PublicApp);
