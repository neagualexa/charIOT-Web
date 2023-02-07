import "@aws-amplify/ui-react/styles.css";
import {
  withAuthenticator,
  Heading,
  Image,
  Card,
  Button,
  View
} from "@aws-amplify/ui-react";
import { API } from "aws-amplify";
import { listProducts } from "../graphql/queries";
import { createProduct } from "../graphql/mutations";
import React, { useState, useEffect } from "react";
import '../App.css';
import logo from '../assets/gold-circle.png';
import { useNavigate } from "react-router-dom";

import { colours } from "../components/colours";
import { Divider } from "@mui/material";

function Home() {

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
          <Image src={logo} className="App-logo" alt="logo" />
          <Heading className="App-text" level={5}>Welcome to charIOT</Heading>
          <Heading className="App-text" level={5} style={{padding:'2%'}}>Charioteering towards the future!</Heading>
          <Heading className="App-text" level={2}>Choose which device data to view:</Heading>
      </Card>
      <Card className="App-background">
        <Button backgroundColor={colours.light_brown} 
          onClick={() => {
            let to = '/dashboard';
            console.log(to)
            handleClick(to);
          }}
          color={colours.dark_red} variation='primary' className="App-text"> All Products </Button>
      
        <Card className="App-background"> 
          {products.map((p,i) => {
            return(
              <View style={{padding:'1%'}} key={i}>
                <Button backgroundColor={(i%2==1)? colours.light_brown : colours.gold} 
                  onClick={() => {
                    let to = '/dashboard/' + p.product_name;
                    console.log(to)
                    handleClick(to);
                  }}
                  color={colours.dark_red} variation='primary' className="App-text"> Product {p.product_name} ( {p.MAC_address} ) </Button>
              </View>
            );
          })}
        </Card>
      </Card>
    </div>
  );
}

export default withAuthenticator(Home);