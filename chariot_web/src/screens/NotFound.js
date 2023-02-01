import "@aws-amplify/ui-react/styles.css";
import React from 'react';
import {
  withAuthenticator,
//   Button,
//   Heading,
//   Image,
//   View,
//   Card,
} from "@aws-amplify/ui-react";
import '../App.css';

// function NotFound({ signOut }) {
function NotFound() {
  return (
    <div className="App">
      <div className="App-text">Page not found :[</div>
    </div>
  );
}

export default withAuthenticator(NotFound);