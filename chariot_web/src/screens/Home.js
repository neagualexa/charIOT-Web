import "@aws-amplify/ui-react/styles.css";
// import {
//   withAuthenticator,
//   Button,
//   Heading,
//   Image,
//   View,
//   Card,
// } from "@aws-amplify/ui-react";
import React from 'react';
import '../App.css';
import BarGraph from "../components/chart";

function Home() {
  return (
    <div className="App">
      <div className="App-text">HOME</div>
      <BarGraph className="App"/>
    </div>
  );
}

export default Home;