import React from 'react';
import logo from './assets/gold-circle.png'

import './App.css';
import Home from './screens/Home';
import Market from './screens/Market';
import NotFound from './screens/NotFound';

import { BrowserRouter as Router, Route, Routes, useNavigate } from "react-router-dom";

import SideNav, { NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
// Be sure to include styles at some point, probably during your bootstraping
import '@trendmicro/react-sidenav/dist/react-sidenav.css';

import { TiHomeOutline, TiLightbulb } from "react-icons/ti";
import { BsShop } from "react-icons/bs";

function PublicApp() {

  return (
    <div className="App">
      <Router>
        <SideBarMenu style={{ length: "100%" }} />
        <RoutesComponent />

        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>Welcome to charIOT</p>
        </header>
      </Router>

    </div>
  );
}

const RoutesComponent = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/market" element={<Market />} />
      <Route path="/*" element={<NotFound />} />
    </Routes>
  );
}

const SideBarMenu = () => {
  return (
    <React.Fragment>
    <SideNav>
      <SideNav.Toggle />
      <SideNav.Nav defaultSelected="home">
        <MenuItem props={{ key: "home", title: "Home", icon: <TiHomeOutline style={{ fontSize: '1.9em' }} /> }} />
        <MenuItem props={{ key: "market", title: "Market", icon: <BsShop style={{ fontSize: '1.75em' }} /> }} />
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


export default PublicApp;
