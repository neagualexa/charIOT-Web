import "@aws-amplify/ui-react/styles.css";
import {
  withAuthenticator,
  // Button,
  Heading,
  Image,
  View,
  Card,
  Button,
} from "@aws-amplify/ui-react";
import { API } from "aws-amplify";
import { listProducts } from "../graphql/queries";
import { createProduct } from "../graphql/mutations";
import React, { useState, useEffect } from "react";
import '../App.css';
import { useNavigate } from "react-router-dom";
import RangeSlider from "../components/slider";

import { colours } from "../components/colours";

function Settings() {

  const navigate = useNavigate();
  const handleClick = (path) => navigate(path);

  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  // FETCH DATABASE ENTRIES
  async function fetchProducts() {
    const apiData = await API.graphql({ query: listProducts });
    const productAPI = apiData.data.listProducts.items;
    setProducts(productAPI.sort(compareProduct)); // to get access to the raw temperatures data
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
  async function createProductItem(event) {
    event.preventDefault();
    const form = new FormData(event.target);
    const data = {
      time: form.get("time"),
      MAC_address: form.get("mac"),
      product_name: form.get("name"),
    };
    await API.graphql({
      query: createProduct,
      variables: { input: data },
    });
    fetchProducts();
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
    <div className="App" style={{display:'flex', justifyContent:'center', flexDirection:'column'}}>
      <Card className="App-background">
          <Heading className="App-text" level={5}>Settings</Heading>
          <Heading className="App-text" level={2}>Update the settings of the senors in the IOT devices</Heading>
      </Card>
      
      <View className="Dashboard">          
      {products.map((p,i) => {
        return(
          <Card className="App-background" key={i}>
              <Heading className="App-text" level={5}>Device {p.product_name}</Heading>
              <RangeSlider className="App-background"/>
              <Button backgroundColor={(i%2==1)? colours.light_brown : colours.gold} 
              onClick={() => {
                let to = '/dashboard/' + p.product_name;
                console.log(to)
                handleClick(to);
              }}
              color={colours.dark_red} variation='primary' className="App-text"> Check readings of {p.product_name} </Button>
          </Card>
        );
      })}
      </View>
    </div>
  );
}

export default withAuthenticator(Settings);