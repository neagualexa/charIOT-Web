import "@aws-amplify/ui-react/styles.css";
import React, { useState, useEffect } from "react";
import { API } from "aws-amplify";
import { listReadings, listProducts, listLiveData,listDeviceSettings  } from "../graphql/queries";
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
import LineGraph from "../components/chart_line";
import SpecificBarGraph from "../components/specific_bar_chart";
import SpecificLineGraph from "../components/specific_line_chart";
import { useNavigate } from "react-router-dom";
import { colours } from "../components/colours";
import { FormControlLabel, FormGroup, Switch, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import {AiFillCheckCircle, AiFillAlert} from "react-icons/ai";

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
  let path = window.location.pathname
  let path_product_name = (path == '/dashboard') ? '' : path.replace('/dashboard/','');

  // always set the default value to some defaults to avoid undefined errors in html build
  const [readings, setReadings] = useState([]);
  const [barData, setBarData] = useState(defaultReadings);
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(path_product_name);
  const [liveData, setLiveData] = useState(defaultLive); 
  const [switchState, setSwitchState] = useState(false);
  const [settings, setSettings] = useState([]);
  
  const navigate = useNavigate();
  const handleClick = (path) => navigate(path);

  const handleChange = (event) => {
    setSelectedProduct(event.target.value);
    // console.log(event.target.value);
    let to = event.target.value=='' ? '/dashboard' : '/dashboard/' + event.target.value;
    handleClick(to);
  };

  const handleChangeSwitch = (event) => {
    setSwitchState(!switchState);
  };

  useEffect(() => {
    fetchReadings();
    fetchProducts();
    fetchSettings();
    // fetchLiveData();
  }, []);

  useEffect(() => {
    fetchReadings();
    fetchProducts();
    fetchSettings();
    // fetchLiveData();
    setSelectedProduct((path_product_name == '') ? 'All devices' : path_product_name);
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
  // async function fetchLiveData() {
  //   const apiData = await API.graphql({ query: listLiveData });
  //   const dataAPI = apiData.data.listLiveData.items;
  //   setLiveData(dataAPI); // to get access to the raw temperatures data
  //   // console.log(dataAPI)
  // }

  async function fetchProducts() {
    const apiData = await API.graphql({ query: listProducts });
    const productAPI = apiData.data.listProducts.items;
    setProducts(productAPI.sort(compareProduct)); // to get access to the raw temperatures data
  }

  async function fetchSettings() {
    const apiData = await API.graphql({ query: listDeviceSettings });
    const settingsAPI = apiData.data.listDeviceSettings.items;
    setSettings(settingsAPI);
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

    let status = {
      iso: "good",
      us_fed: "good",
      temperature: "good",
      humidity: "good",
      pressure: "good"
    }

    let styleGood = {color:"green"}
    let styleBad = {color:"red"}
    let styleWarning = {fontSize:12, color:"red"}

    let setting = {}
    if (productLive != undefined && settings != undefined) {
      setting = settings.filter(s => s.productID[1] == productLive.productID[1])[0];
    }
    // console.log(setting)

    settings.map((expected) => {
      if (productLive != undefined && expected != undefined){
        if(productLive.productID != undefined && expected.productID != undefined){
          // console.log(expected.productID, expected[type], productLive.productID, productLive[type])
          if(expected.productID[1] == productLive.productID[1]){
            // console.log("found same device")
            status.iso = (expected.iso === productLive.iso) ? "good" : "bad";
            status.us_fed = (expected.us_fed === productLive.us_fed) ? "good" : "bad";
            status.temperature = (expected.temperature[0] <= productLive.temperature &&
                                  productLive.temperature <= expected.temperature[1]) ? "good" : "bad";
            status.humidity = (expected.humidity[0] <= productLive.humidity &&
                                productLive.humidity <= expected.humidity[1]) ? "good" : "bad";
            status.pressure = (expected.pressure[0] <= productLive.pressure &&
                                productLive.pressure <= expected.pressure[1]) ? "good" : "bad";
          }
        }
      }
    })

    
    if (productLive != undefined && setting != undefined){
      return(
      <View style={{display:'flex', flexDirection:'column', minHeight:'100%', justifyContent:'center', alignItems:'flex-start', paddingLeft:'15%'}}>
          <Heading className="App-text" >Live readings</Heading>

          <Heading className="App-text" level={2}>
          {(status.iso=="good") ? (<AiFillCheckCircle style={styleGood}/>) 
                                : (<AiFillAlert style={styleBad}/>)} ISO14644-1: <b>{productLive.iso} 
                                {(status.iso == "bad") ? (<b style={styleWarning}>( Expected {setting.iso} )</b>) : (<></>)} </b></Heading>
          <Heading className="App-text" level={2}>
          {(status.us_fed=="good") ? (<AiFillCheckCircle style={styleGood}/>) 
                                    : (<AiFillAlert style={styleBad}/>)} US FED STD 209E: <b>{productLive.us_fed} 
                                    {(status.us_fed == "bad") ? (<b style={styleWarning}>( Expected {setting.us_fed} )</b>) : (<></>)}</b></Heading>
          <Heading className="App-text" level={2}>
          {(status.temperature=="good") ? (<AiFillCheckCircle style={styleGood}/>) 
                                        : (<AiFillAlert style={styleBad}/>)} Temperature: <b>{productLive.temperature} 
                                        {(status.temperature == "bad") ? (<b style={styleWarning}>( Expected between [{setting.temperature[0]},{setting.temperature[1]}] )</b>) : (<></>)}</b></Heading>
          <Heading className="App-text" level={2}>
          {(status.humidity=="good") ? (<AiFillCheckCircle style={styleGood}/>) 
                                      : (<AiFillAlert style={styleBad}/>)} Humidity: <b>{productLive.humidity} 
                                      {(status.humidity == "bad") ? (<b style={styleWarning}>( Expected between [{setting.humidity[0]},{setting.humidity[1]}] )</b>) : (<></>)}</b></Heading>
          <Heading className="App-text" level={2}>
          {(status.pressure=="good") ? (<AiFillCheckCircle style={styleGood}/>) 
                                      : (<AiFillAlert style={styleBad}/>)} Pressure: <b>{productLive.pressure} 
                                      {(status.pressure == "bad") ? (<b style={styleWarning}>( Expected between [{setting.pressure[0]},{setting.pressure[1]}] )</b>) : (<></>)}</b></Heading>
      </View>
      );
    } else {
      return(
      <View style={{display:'flex', flexDirection:'column', minHeight:'100%', justifyContent:'center', paddingLeft:'15%'}}>
          <Heading className="App-text" >No Data for this device.</Heading>
          <Heading className="App-text" level={2}>Once the device will start reading, data will be shown.</Heading>
      </View>
      );
    }
  }

  const changeGraphType = (p,productData) => {
    if(switchState){
      return(
        <>
        {/* <BarGraph graphData={productData} product={p.product_name} type={"All"} className="App"/> */}
        <SpecificBarGraph graphData={productData} product={p.product_name} type={"Temperature"} className="App" dataKey={"temperature"}/>
        <SpecificBarGraph graphData={productData} product={p.product_name} type={"Humidity"} className="App" dataKey={"humidity"}/>
        <SpecificBarGraph graphData={productData} product={p.product_name} type={"Pressure"} className="App" dataKey={"pressure"}/>
        </>
      );
    }else{
      return(
        <>
        {/* <LineGraph graphData={productData} product={p.product_name} type={"All"} className="App"/> */}
        {/* <LineGraph graphData={productData} product={p.product_name} type={"Hourly Average"} className="App"/> */}
        {/* <LineGraph graphData={productData} product={p.product_name} type={"Day Average"} className="App"/> */}
        <SpecificLineGraph graphData={productData} product={p.product_name} type={"Temperature"} className="App" dataKey={"temperature"}/>
        <SpecificLineGraph graphData={productData} product={p.product_name} type={"Humidity"} className="App" dataKey={"humidity"}/>
        <SpecificLineGraph graphData={productData} product={p.product_name} type={"Pressure"} className="App" dataKey={"pressure"}/>
        </>
      );
    }
  }


  return (
    <View style={{paddingLeft:'7%', alignItems:'center', minHeight:'100vh', paddingBottom:'4%'}}>
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

        <Typography paddingTop='3%'>Choose charts type</Typography>
        <Stack direction="row" alignItems="center" justifyContent="center">
          <Typography>Line</Typography>
          <Switch checked={switchState} onChange={handleChangeSwitch} color="default" />
          <Typography>Bar</Typography>
        </Stack>
      </View>

      <View className="Dashboard" style={{paddingTop:'5vh'}}>
          {products.map((p,i) => {
            if (path_product_name != ''){
              if(p.product_name == path_product_name){
                // 1) SEE DASHBOARD FOR ONLY ONE DEVICE
                let productLive = liveData.filter((r) => (r.productID[1] === p.product_name))[0]
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
                      {changeGraphType(p,barData)}
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
                  {changeGraphType(p,productData)}
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