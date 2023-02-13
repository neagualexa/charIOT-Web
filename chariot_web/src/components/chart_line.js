// import "./styles.css";
import { Heading, View } from "@aws-amplify/ui-react";
import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Brush
} from "recharts";

import { colours } from "./colours";

// WINDOW DIMENSIONS
function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height
  };
}


export default function LineGraph({graphData, product, type}) {
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
      // console.log(windowDimensions)
    }
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  let graph_height = windowDimensions.height*0.5;   //300
  let graph_width = windowDimensions.width*0.4;     //500

  return (
    <View>
      <Heading className="App-text">Device {product}</Heading>
      <Heading className="App-text">- {type} -</Heading>
        <LineChart 
          width={graph_width}
          height={graph_height}
          data={graphData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" stroke={colours.dark_grey}/>
          <YAxis stroke={colours.dark_grey}/>
          <Tooltip stroke={colours.dark_grey}/>
          <Legend />
          <Brush dataKey="name" height={30} width={graph_width/1.3} stroke={colours.dark_grey}/>
          <Line dataKey="temperature" fill={colours.dark_blue} strokeWidth={2} stroke={colours.dark_blue}/>
          <Line dataKey="humidity" fill={colours.light_brown} strokeWidth={2} stroke={colours.light_brown}/>
          <Line dataKey="pressure" fill={colours.red} strokeWidth={2} stroke={colours.red}/>
        </LineChart>
      </View>
  );
}
