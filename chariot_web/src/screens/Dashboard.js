import "@aws-amplify/ui-react/styles.css";
import {
  withAuthenticator,
  // Button,
  // Heading,
  // Image,
  View,
  // Card,
} from "@aws-amplify/ui-react";
import React from 'react';
import '../App.css';
import BarGraph from "../components/chart";


function Dashboard() {
  return (
    <View style={{paddingLeft:'10%', alignItems:'center', backgroundColor:'#1e0303'}}>
      <div className="App-text">DASHBOARD CHECK</div>

      <View className="Dashboard">
        <BarGraph graphData={data} className="App"/>
        <BarGraph graphData={data} className="App"/>
      </View>
    </View>
  );
}

const data = [
  {
    name: "Page 1",
    uv: 4000,
    pv: 2400,
    amt: 2400
  },
  {
    name: "Page 2",
    uv: 3000,
    pv: 1398,
    amt: 2210
  },
  {
    name: "Page 3",
    uv: 2000,
    pv: 9800,
    amt: 2290
  }
];

export default withAuthenticator(Dashboard);