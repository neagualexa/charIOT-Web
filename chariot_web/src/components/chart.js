// import "./styles.css";
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

const data_test = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400
  }
]

// WINDOW DIMENSIONS
function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height
  };
}


export default function BarGraph({graphData}) {
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
        <Bar dataKey="pv" fill={colours.red} />
        <Bar dataKey="uv" fill={colours.gold} />
      </BarChart>
  );
}

const colours = {
  red:"#db3d44",
  gold:"#eac846"
}
