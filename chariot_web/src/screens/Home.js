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
import logo from '../assets/gold-circle.png';
import { useNavigate } from "react-router-dom";

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
    setProducts(productAPI); // to get access to the raw temperatures data
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
      <View className="App-text">HOME</View>
      <Card className="App-background">
          <Image src={logo} className="App-logo" alt="logo" />
          <Heading className="App-text" level={1}>We now have Auth!</Heading>
          <Heading className="App-text" level={1}>Welcome to charIOT</Heading>

          <Heading className="App-text" level={1}>Choose which Product to view:</Heading>
      </Card>
      {products.map((p,i) => {
        return(
          <Card className="App-background" key={i}>
            <Button backgroundColor={(i%2==1)? colours.red : colours.gold} 
              onClick={() => {
                let to = '/dashboard/' + p.product_name;
                console.log(to)
                handleClick(to);
              }}
              color="white" variation='primary' className="App-text"> Product {p.product_name} ( {p.MAC_address} ) </Button>
          </Card>
        );
      })}
    </div>
  );
}

const colours = {
  red:"#db3d44",
  gold:"#eac846"
}

export default withAuthenticator(Home);