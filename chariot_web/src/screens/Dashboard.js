import "@aws-amplify/ui-react/styles.css";
import React, { useState, useEffect } from "react";
import { API } from "aws-amplify";
import { listReadings, listProducts } from "../graphql/queries";
import { createReading } from "../graphql/mutations";
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

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
  SelectField,
  Heading,
  // Card,
} from "@aws-amplify/ui-react";
import '../App.css';
import BarGraph from "../components/chart";
import { useNavigate } from "react-router-dom";
import { Chip } from "@mui/material";

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
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState('');
  const [currentDeviceReadings, setCurrentDeviceReadings] = useState([])

  let path = window.location.pathname
  let path_product_name = (path == '/dashboard') ? '' : path.replace('/dashboard/','');
  const navigate = useNavigate();
  const handleClick = (path) => navigate(path);
  const handleChange = (event) => {
    setSelectedProduct(event.target.value);
    // console.log(event.target.value);
    let to = event.target.value=='' ? '/dashboard' : '/dashboard/' + event.target.value;
    handleClick(to);
  };
  useEffect(() => {
    fetchReadings();
    fetchProducts();
  }, []);

  useEffect(() => {
    fetchReadings();
    fetchProducts();
  }, [path]);

  // FETCH DATABASE ENTRIES
  async function fetchReadings() {
    const apiData = await API.graphql({ query: listReadings });
    const readingAPI = apiData.data.listReadings.items;

    setReadings(readingAPI); // to get access to the raw temperatures data

    let fetchedData = [];
    readingAPI.map((r) => {
      if (path_product_name != ''){
        // console.log(path_product_name, r.productID[1])
        if (path_product_name == r.productID[1]){
          fetchedData.push(
            {
              name: r.time,
              productID: r.productID,
              time: r.time,
              temperature: r.temperature,
              humidity: r.humidity
            }
          );
        }
      } else {
        fetchedData.push(
          {
            name: r.time,
            productID: r.productID,
            time: r.time,
            temperature: r.temperature,
            humidity: r.humidity
          }
        );
      }
    })
    let sortFetchedData = fetchedData.sort(compare);

    setBarData(sortFetchedData);

    // GET CURRENT/LAST VALUES FOR DATA
    var reversedData = sortFetchedData;
    // reversedData.reverse();
    var unique = [];
    var distinctData = [];
    for( let i = 0; i < reversedData.length; i++ ){
      if( !unique[reversedData[i].productID]){
        distinctData.push(reversedData[i]);
        unique[reversedData[i].productID] = 1;
      }
    }
    // console.log(distinctData);
    setCurrentDeviceReadings(distinctData);
  }

  async function fetchProducts() {
    const apiData = await API.graphql({ query: listProducts });
    const productAPI = apiData.data.listProducts.items;
    setProducts(productAPI.sort(compareProduct)); // to get access to the raw temperatures data
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

  function compareProduct(a, b) {
    // Use toUpperCase() to ignore character casing
    const dataA = a.product_name;
    const dataB = b.product_name;

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
      <View style={{position:'absolute', top:'2%', right:'2%', width:'20vh'}}>
        <SelectField
          // label="Filter by device"
          // descriptiveText="Filter by product"
          inputStyles={{
            backgroundColor: '#eac846',
            border: `1px solid #eac846`,
          }}
          value={selectedProduct}
          onChange={handleChange}
        >
          <option value={''} > All devices </option>
          {products.map((p,i) => {
            return(
              <option value={p.product_name} key={i} > {p.product_name} </option>
            );
          })}
        </SelectField>
      </View>

      <View className="Dashboard" style={{paddingTop:'5vh'}}>
          {products.map((p,i) => {
            if (path_product_name != ''){
              if(p.product_name == path_product_name){
                // see product graphs
                let liveData = barData.at(-1)
                return(
                <div key={i} style={{paddingTop:'5vh'}}>
                  <Heading className="App-text" style={{paddingBottom:'2vh'}}> Readings from {p.product_name} </Heading>
                  <Grid
                      templateColumns="1fr 1fr"
                      // templateRows="10rem 10rem"
                      gap={tokens.space.small}
                    >
                      <View>
                        <Chip label={liveData.temperature} color="success"/>
                      </View>
                      <BarGraph graphData={barData} product={p.product_name} type={"Hour"} className="App"/>
                      <BarGraph graphData={barData} product={p.product_name} type={"Hourly Average"} className="App"/>
                      <BarGraph graphData={barData} product={p.product_name} type={"Day Average"} className="App"/>
                  </Grid>
                </div>
                );
              }
            } else {
              // see all graphs
              let productData = barData.filter((r) => (r.productID[1] === p.product_name))
              let liveData = productData.at(-1)
              // console.log(productData)
              return(
              <div key={i} style={{paddingTop:'5vh'}}>
                <Heading className="App-text" style={{paddingBottom:'2vh'}}> Readings from all devices shown </Heading>
                <Heading className="App-text" style={{paddingBottom:'2vh'}}> {i+1}) Readings from {p.product_name} </Heading>
                <Grid
                    templateColumns="1fr 1fr"
                    // templateRows="10rem 10rem"
                    gap={tokens.space.small}
                    
                  >
                  <View style={{display:'flex', flexDirection:'column'}}>
                    {/* TODO: it errors sometimes, when changing from device to all devices view */}
                    <Chip label={"Current Temperature: "+liveData.temperature} color="success" style={{padding:'0.5vh'}}/>
                    <Chip label={"Current Humidity: "+liveData.humidity} color="success" style={{padding:'0.5vh'}}/>
                  </View>
                  <BarGraph graphData={productData} product={p.product_name} type={"Hour"} className="App"/>
                  <BarGraph graphData={productData} product={p.product_name} type={"Hourly Average"} className="App"/>
                  <BarGraph graphData={productData} product={p.product_name} type={"Day Average"} className="App"/>
                </Grid>
              </div>
              );
              
            }
          })}
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

export default withAuthenticator(Dashboard);