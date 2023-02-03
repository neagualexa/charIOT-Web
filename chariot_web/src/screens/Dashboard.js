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
  Grid,
  useTheme,
  // Card,
} from "@aws-amplify/ui-react";
import '../App.css';
import BarGraph from "../components/chart";

const defaultReadings = [
  { name:"Time1",
    productID: "default",
    temperature: 10,
    humidity: 10
  },
  { name:"Time2",
    productID: "default",
    temperature: 10,
    humidity: 10 
  }
]

const defaultDayData = [
  { name:"Day A average",
    productID: "default",
    temperature: 10,
    humidity: 4
  },
  { name:"Day B average",
    productID: "default",
    temperature: 5,
    humidity: 2 
  }
];


function Dashboard() {
  const { tokens } = useTheme();

  const [readings, setReadings] = useState([]);
  const [barData, setBarData] = useState(defaultReadings);

  let path = window.location.pathname
  let path_product_name = (path == '/dashboard') ? '' : path.replace('/dashboard/','');

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
      if (!(path_product_name == '')){
        if (path_product_name == r.productID[1]){
          fetchedTemp.push(
            {
              name: r.time,
              productID: r.productID,
              time: r.time,
              temperature: r.temperature,
              humidity: r.humidity
            }
          )
        }
      } else {
        fetchedTemp.push(
          {
            name: r.time,
            productID: r.productID,
            time: r.time,
            temperature: r.temperature,
            humidity: r.humidity
          }
        )
      }
    })
    setBarData(fetchedTemp.sort(compare));
  }

  function compare(a, b) {
    // Use toUpperCase() to ignore character casing
    const dataA = a.time;
    const dataB = b.time;

    let comparison = 0;
    if (dataA > dataB) {
      comparison = 1;
    } else if (dataA < dataB) {
      comparison = -1;
    }
    return comparison;
  }

  // CREATE database entry
  async function createReadingData(event) {
    event.preventDefault();
    const form = new FormData(event.target);
    const data = {
      // id: form.get("time"),
      time: form.get("time"),
      productID: [form.get("product_mac"), form.get("product_name")],
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
        <Grid
          templateColumns="1fr 1fr"
          // templateRows="10rem 10rem"
          gap={tokens.space.small}
        >
          {/* TODO: graph label should be the data productID specific to the graph and path */}
          <BarGraph graphData={barData} product={path_product_name} type={"Hour"} className="App"/>
          <BarGraph graphData={barData} product={path_product_name} type={"Hourly Average"} className="App"/>
          <BarGraph graphData={barData} product={path_product_name} type={"Day Average"} className="App"/>
        </Grid>
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
          <TextField
            name="product_mac"
            placeholder="Product MAC"
            label="Product MAC"
            labelHidden
            variation="quiet"
            required
          />
          <TextField
            name="product_name"
            placeholder="Product Name"
            label="Product Name"
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