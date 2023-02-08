import "@aws-amplify/ui-react/styles.css";
import React, { useState, useEffect } from "react";
import { API } from "aws-amplify";
import { listReadings, listProducts, listLiveData } from "../graphql/queries";
import { createReading } from "../graphql/mutations";

import {
  withAuthenticator,
  View,
  Flex,
  TextField,
  Button,
  Grid,
  useTheme,
  SelectField,
  Heading,
} from "@aws-amplify/ui-react";
import '../App.css';
import BarGraph from "../components/chart";
import { useNavigate } from "react-router-dom";
import { colours } from "../components/colours";

const defaultReadings = [
  { name:"Time1",
    productID: "default",
    temperature: 10,
    humidity: 10,
    pressure: 10,
    iso: 'ISO X',
    us_fed: 'Class X'
  },
  { name:"Time2",
    productID: "default",
    temperature: 10,
    humidity: 10,
    pressure: 10,
    iso: 'ISO X',
    us_fed: 'Class X' 
  }
]

const defaultLive = [
  { 
    productID: "default",
    temperature: 10,
    humidity: 10,
    pressure: 10,
    iso: 'ISO X',
    us_fed: 'Class X'
  }
]

function Dashboard() {
  const { tokens } = useTheme();

  // always set the default value to some defaults to avoid undefined errors in html build
  const [readings, setReadings] = useState([]);
  const [barData, setBarData] = useState(defaultReadings);
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState('');
  const [liveData, setLiveData] = useState(defaultLive); // TODO: still errors at some undefined behaviour TODO

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
    // fetchLiveData();
  }, []);

  useEffect(() => {
    fetchReadings();
    fetchProducts();
    // fetchLiveData();
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
              humidity: r.humidity,
              pressure: r.pressure,
              iso: r.iso,
              us_fed: r.us_fed
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
            humidity: r.humidity,
            pressure: r.pressure,
            iso: r.iso,
            us_fed: r.us_fed
          }
        );
      }
    })
    let sortFetchedData = fetchedData.sort(compare);
    // console.log(sortFetchedData)
    setBarData(sortFetchedData);
    getLiveData(sortFetchedData);
  }

  // NOT NEEDED ANYMORE <- fetching directly from database
  async function fetchLiveData() {
    const apiData = await API.graphql({ query: listLiveData });
    const dataAPI = apiData.data.listLiveData.items;
    setLiveData(dataAPI); // to get access to the raw temperatures data
    // console.log(dataAPI)
  }

  async function fetchProducts() {
    const apiData = await API.graphql({ query: listProducts });
    const productAPI = apiData.data.listProducts.items;
    setProducts(productAPI.sort(compareProduct)); // to get access to the raw temperatures data
  }

  function getLiveData(data) {
    // GET CURRENT/LAST VALUES FOR DATA
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
    setLiveData(distinctData);
  }

  // COMPARISON FOR SORTING
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

  const viewLive = (productLive) => {
    if (productLive != undefined){
      return(
      <View style={{display:'flex', flexDirection:'column', minHeight:'100%', justifyContent:'center', alignItems:'flex-start', paddingLeft:'15%'}}>
          <Heading className="App-text" >Live readings</Heading>
          <Heading className="App-text" level={2}>ISO14644-1: {productLive.iso}</Heading>
          <Heading className="App-text" level={2}>US FED STD 209E: {productLive.us_fed}</Heading>
          <Heading className="App-text" level={2}>Current Temperature: {productLive.temperature}</Heading>
          <Heading className="App-text" level={2}>Current Humidity: {productLive.humidity}</Heading>
          <Heading className="App-text" level={2}>Current Pressure: {productLive.pressure}</Heading>
      </View>
      );
    }
  }


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
                let productLive = liveData.length==0 ? defaultLive[0] : liveData.filter((r) => (r.productID[1] === p.product_name))[0]
                // console.log("product for one:", productLive)
                return(
                <div key={i} style={{paddingTop:'5vh'}}>
                  <Heading className="App-text" style={{paddingBottom:'2vh'}}> Readings from {p.product_name} </Heading>
                  <Grid
                      templateColumns="1fr 1fr"
                      // templateRows="10rem 10rem"
                      gap={tokens.space.small}
                    >
                      {viewLive(productLive)}
                      <BarGraph graphData={barData} product={p.product_name} type={"Hour"} className="App"/>
                      <BarGraph graphData={barData} product={p.product_name} type={"Hourly Average"} className="App"/>
                      <BarGraph graphData={barData} product={p.product_name} type={"Day Average"} className="App"/>
                  </Grid>
                </div>
                );
              }
            } else {
              // 2) SEE DASHBOARD WITH ALL DEVICES AND THEIR GRAPHS
              let productData = barData.filter((r) => (r.productID[1] === p.product_name))
              let productLive = liveData.filter((r) => (r.productID[1] === p.product_name))[0]
              // console.log("product for all devices:", productLive)
              return(
              <div key={i} style={{paddingTop:'5vh'}}>
                <Heading className="App-text" style={{paddingBottom:'2vh'}}> Readings from all devices shown </Heading>
                <Heading className="App-text" style={{paddingBottom:'2vh'}}> {i+1}) Readings from {p.product_name} </Heading>
                <Grid
                    templateColumns="1fr 1fr"
                    // templateRows="10rem 10rem"
                    gap={tokens.space.small}
                    
                  >
                  {viewLive(productLive)}
                  <BarGraph graphData={productData} product={p.product_name} type={"Hour"} className="App"/>
                  <BarGraph graphData={productData} product={p.product_name} type={"Hourly Average"} className="App"/>
                  <BarGraph graphData={productData} product={p.product_name} type={"Day Average"} className="App"/>
                </Grid>
              </div>
              );
              
            }
          })}
      </View>

      {/* <View as="form" margin="3rem 0" onSubmit={createReadingData}>
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
      </View> */}

    </View>
  );
}

export default withAuthenticator(Dashboard);