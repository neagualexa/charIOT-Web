// import "./styles.css";
import { Heading, View } from "@aws-amplify/ui-react";
import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";

// WINDOW DIMENSIONS
function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height
  };
}


export default function BarGraph({graphData, product, type}) {
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
      <Heading className="App-text">Product {product}</Heading>
      <Heading className="App-text">- {type} -</Heading>
      <BarChart
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
        <XAxis dataKey="name" stroke="white"/>
        <YAxis stroke="white"/>
        <Tooltip stroke="white"/>
        <Legend />
        <Bar dataKey="temperature" fill={colours.red} />
        <Bar dataKey="humidity" fill={colours.gold} />
      </BarChart>
      </View>
  );
}

const colours = {
  red:"#db3d44",
  gold:"#eac846"
}
