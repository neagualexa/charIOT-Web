import "@aws-amplify/ui-react/styles.css";
import React, { useState, useEffect } from "react";
import { API } from "aws-amplify";
import { listReadings } from "../graphql/queries";
import { createReading } from "../graphql/mutations";

import {
  withAuthenticator,
  // Heading,
  // Image,
  View,
  Flex,
  TextField,
  Button,
  // Card,
} from "@aws-amplify/ui-react";
import '../App.css';
import BarGraph from "../components/chart";

const defaultReadings = [
  { name:"Time1",
    temperature: 10,
    humidity: 10
  },
  { name:"Time2",
    temperature: 10,
    humidity: 10 
  }
]

const defaultDayData = [
  { name:"Day A average",
    temperature: 10,
    humidity: 4
  },
  { name:"Day B average",
    temperature: 5,
    humidity: 2 
  }
];


function Dashboard() {

  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

  useEffect(() => {
    // console.log(window.location.pathname)
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
      // console.log(windowDimensions)
    }
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  },[])

  let height = windowDimensions.height;   
  let width = windowDimensions.width;

  const [readings, setReadings] = useState([]);
  const [barData, setBarData] = useState(defaultReadings);

  useEffect(() => {
    fetchReadings();
  }, []);

  // FETCH DATABASE ENTRIES
  async function fetchReadings() {
    const apiData = await API.graphql({ query: listReadings });
    const readingAPI = apiData.data.listReadings.items;
    setReadings(readingAPI); // to get access to the raw temperatures data

    let fetchedTemp = [];
    readingAPI.map((r) => {
      fetchedTemp.push(
        {
          name: r.time,
          temperature: r.temperature,
          humidity: r.humidity
        }
      )
    })
    setBarData(fetchedTemp);
  }

  // CREATE database entry
  async function createReadingData(event) {
    event.preventDefault();
    const form = new FormData(event.target);
    const data = {
      time: form.get("time"),
      temperature: form.get("temp"),
      humidity: form.get("hum"),
    };
    await API.graphql({
      query: createReading,
      variables: { input: data },
    });
    fetchReadings();
    event.target.reset();
  }

  // async function deleteReadingData({ id }) {
  //   const newTemp = readings.filter((r) => r.id !== id);
  //   setReadings(newTemp);
  //   await API.graphql({
  //     query: deleteReading,
  //     variables: { input: { id } },
  //   });
  // }


  return (
    <View style={{paddingLeft:'10%', alignItems:'center', backgroundColor:'#1e0303', minHeight:'100vh'}}>
      <div className="App-text">DASHBOARD CHECK</div>

      <View className="Dashboard">
        <BarGraph graphData={barData} className="App"/>
        <BarGraph graphData={defaultDayData} className="App"/>
      </View>

      <View as="form" margin="3rem 0" onSubmit={createReadingData}>
        <Flex direction="row" justifyContent="center" backgroundColor={'white'}>
          <TextField
            name="time"
            placeholder="Time"
            label="Time"
            labelHidden
            variation="quiet"
            required
          />
          <TextField
            name="temp"
            placeholder="Temperature"
            label="Temperature"
            labelHidden
            variation="quiet"
            required
          />
          <TextField
            name="hum"
            placeholder="Humidity"
            label="Humidity"
            labelHidden
            variation="quiet"
            required
          />
          <Button type="submit" variation="primary">
            Create Data
          </Button>
        </Flex>
      </View>

    </View>
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

export default withAuthenticator(Dashboard);