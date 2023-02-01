import "@aws-amplify/ui-react/styles.css";
import {
  withAuthenticator,
  // Button,
  Heading,
  Image,
  // View,
  Card,
} from "@aws-amplify/ui-react";
import React from 'react';
import '../App.css';
import logo from '../assets/gold-circle.png';

function Home() {
  return (
    <div className="App">
      <div className="App-text">HOME</div>
      <Card className="App-header">
            <Image src={logo} className="App-logo" alt="logo" />
            <Heading className="App-text" level={1}>We now have Auth!</Heading>
            <Heading className="App-text" level={1}>Welcome to charIOT</Heading>
        </Card>
    </div>
  );
}

export default withAuthenticator(Home);