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
import { colours } from "../components/colours";

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
    // getLiveData();
  }, []);

  useEffect(() => {
    fetchReadings();
    fetchProducts();
    // getLiveData();
  }, [path]);

  // FETCH DATABASE ENTRIES
  async function fetchReadings() {
    const apiData = await API.graphql({ query: listReadings });
    const readingAPI = apiData.data.listReadings.items;

    setReadings(readingAPI); // to get access to the raw temperatures data

    let fetchedData = [];
    // let setData = new Set([]);
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
          // if (setData.has(e => e.productID === r.productID).length > 0) {
          //   setData.delete(r);
          //   setData.add(r);
          // }
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
        // if (setData.has(e => e.productID === r.productID).length > 0) {
        //   setData.delete(r);
        //   setData.add(r);
        // }
      }
    })
    let sortFetchedData = fetchedData.sort(compare);

    setBarData(sortFetchedData);
    // console.log(setData)
    // getLiveData(sortFetchedData);
  }

  function getLiveData(data) {
    // GET CURRENT/LAST VALUES FOR DATA

    var unique = [];
    data.map((d,i) => {
      if (unique.filter(e => e.productID === d.productID).length > 0) {
        unique.filter(e => e.productID === d.productID).delete();
        unique.push(d);
      } else {
        unique.push(d);
      }
    })
    
    console.log(unique)

    var reversedData = data;
    var unique = [];
    var distinctData = [];
    for( let i = reversedData.length-1; i >=0 ; i-- ){
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
    <View style={{paddingLeft:'10%', alignItems:'center', minHeight:'100vh'}}>
      <View style={{position:'absolute', top:'2%', right:'2%', width:'20vh'}}>
        <SelectField
          // label="Filter by device"
          // descriptiveText="Filter by product"
          inputStyles={{
            backgroundColor: '#F2A154',
            border: `1px solid #F2A154`,
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
                // 1) SEE DASHBOARD FOR ONLY ONE DEVICE
                return(
                <div key={i} style={{paddingTop:'5vh'}}>
                  <Heading className="App-text" style={{paddingBottom:'2vh'}}> Readings from {p.product_name} </Heading>
                  <Grid
                      templateColumns="1fr 1fr"
                      // templateRows="10rem 10rem"
                      gap={tokens.space.small}
                    >
                      {/* TODO: KEEPS ERRORING AS livedata IS UNDEFINED */}
                      {/* <View style={{display:'flex', flexDirection:'column', minHeight:'100%', justifyContent:'center', alignItems:'flex-start', paddingLeft:'15%'}}> */}
                        {/* <Heading className="App-text" >Live readings</Heading> */}
                        {/* <Heading className="App-text" level={2}>Current Temperature: {currentDeviceReadings[0].temperature}</Heading> */}
                        {/* <Heading className="App-text" level={2}>Current Humidity: {currentDeviceReadings[0].humidity}</Heading> */}
                      {/* </View> */}
                      <BarGraph graphData={barData} product={p.product_name} type={"Hour"} className="App"/>
                      <BarGraph graphData={barData} product={p.product_name} type={"Hourly Average"} className="App"/>
                      <BarGraph graphData={barData} product={p.product_name} type={"Day Average"} className="App"/>
                  </Grid>
                </div>
                );
              }
            } else {
              // SEE DASHBOARD WITH ALL DEVICES AND THEIR GRAPHS
              let productData = barData.filter((r) => (r.productID[1] === p.product_name))
              let liveData = currentDeviceReadings!=undefined ? currentDeviceReadings[i] : 
              console.log(liveData, currentDeviceReadings)
              return(
              <div key={i} style={{paddingTop:'5vh'}}>
                <Heading className="App-text" style={{paddingBottom:'2vh'}}> Readings from all devices shown </Heading>
                <Heading className="App-text" style={{paddingBottom:'2vh'}}> {i+1}) Readings from {p.product_name} </Heading>
                <Grid
                    templateColumns="1fr 1fr"
                    // templateRows="10rem 10rem"
                    gap={tokens.space.small}
                    
                  >
                    {/* TODO: NOT WORKING KEEPS ERRORING AS livedata IS UNDEFINED */}
                  {/* <View style={{display:'flex', flexDirection:'column', minHeight:'100%', justifyContent:'center', alignItems:'flex-start', paddingLeft:'15%'}}>
                      <Heading className="App-text" >Live readings</Heading>
                      <Heading className="App-text" level={2}>Current Temperature: {liveData.temperature}</Heading>
                      <Heading className="App-text" level={2}>Current Humidity: {liveData.humidity}</Heading>
                  </View> */}
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