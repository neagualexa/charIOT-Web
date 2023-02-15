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


export default function SpecificLineGraph({graphData, product, type, dataKey}) {
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

  const colourGraph = (dataKey) => {
    if (dataKey == "temperature"){
      return colours.dark_grey
    } else if (dataKey == "humidity"){
      return colours.light_brown
    } else if (dataKey == "pressure"){
      return colours.red
    } else {
      return colours.dark_grey
    }
  }

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
          <YAxis stroke={colours.dark_grey} domain={[dataMin => (Math.round(dataMin)-0.5), dataMax => (Math.round(dataMax)+0.5)]}/>
          <Tooltip stroke={colours.dark_grey}/>
          <Legend />
          {/* <Brush dataKey="name" height={30} width={graph_width/1.3} stroke={colourGraph(dataKey)}/> */}
          <Line dataKey={dataKey} fill={colourGraph(dataKey)} stroke={colourGraph(dataKey)} strokeWidth={2} fillOpacity={0} dot={false}/>
        </LineChart>
      </View>
  );
}
