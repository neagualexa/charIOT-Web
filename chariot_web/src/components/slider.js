import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { colours } from "./colours";
import { Button, Grid, useTheme, View } from "@aws-amplify/ui-react";
import { listDeviceSettings } from '../graphql/queries';
import { updateDeviceSetting } from "../graphql/mutations";
import { API } from 'aws-amplify';
import { Heading } from '@aws-amplify/ui-react';
import { useNavigate } from 'react-router-dom';
import { Divider } from '@mui/material';

function valuetextTemp(value) {
  return `${value}°C`;
}

function valuetextHum(value) {
  return `${value}%`;
}

export default function RangeSlider({product}) {
  const [setting, setSetting] = React.useState({});
  const [valueTemp, setValueTemp] = React.useState([20, 37]);
  const [valueHum, setValueHum] = React.useState([10, 27]);

  const { tokens } = useTheme();
  const navigate = useNavigate();
  const handleClick = (path) => navigate(path);

  React.useEffect(() => {
    fetchSettings();
  }, [])

  const handleChangeTemp = (event, newValue) => {
    setValueTemp(newValue);
  };

  const handleChangeHum = (event, newValue) => {
    setValueHum(newValue);
  };

  async function fetchSettings() {
    const apiData = await API.graphql({ query: listDeviceSettings });
    const settingsAPI = apiData.data.listDeviceSettings.items;
    let settingFiltered = settingsAPI.filter((s) => s.productID[1] == product)[0];
    setSetting(settingFiltered); // to get access to the raw temperatures data
    setValueTemp(settingFiltered.temperature)
    setValueHum(settingFiltered.humidity)
  }

  async function updateSettings(s) {
    if (!s.id) return;
    const data = {
      id: s.id,
      productID: s.productID,
      temperature: valueTemp,
      humidity: valueHum,
    };
    // console.log(data)
    await API.graphql({
      query: updateDeviceSetting,
      variables: { input: data },
    });
    fetchSettings();
  }

  return (
    <Box sx={{ width: '100%', paddingTop:'2%', paddingBottom:'5%'  }} className="App-background">
      <Grid
          templateColumns="1fr 1fr"
          // templateRows="10rem 10rem"
          gap={tokens.space.small}
          style={{paddingBottom:'3%'}}
        >
        <Heading className="App-text" level={7}>Temperature Range</Heading>
        <Slider
          getAriaLabel={() => 'Temperature range'}
          value={valueTemp}
          onChange={handleChangeTemp}
          valueLabelDisplay="auto"
          getAriaValueText={valuetextTemp}
          // color={colours.dark_blue} // TODO: to change the color of the line
        />
        <Heading className="App-text" level={7}>Humidity Range</Heading>
        <Slider
          getAriaLabel={() => 'Humidity range'}
          value={valueHum}
          onChange={handleChangeHum}
          valueLabelDisplay="auto"
          getAriaValueText={valuetextHum}
          // color={colours.dark_blue} // TODO: to change the color of the line
        />
      </Grid>
      <View style={{display:'flex', flexDirection:'row', justifyContent:'center'}}>
        <Button onClick={() => updateSettings(setting)} backgroundColor={colours.dark_blue} color={colours.white}
        variation='primary'>Update Settings</Button>
        <View style={{paddingLeft:'5%'}}>
          <Button onClick={() => {
                        let to = '/dashboard/' + product;
                        console.log(to)
                        handleClick(to);
                      }}
            backgroundColor={colours.dark_blue} color={colours.white} variation='primary'
            > Check readings of {product} </Button>
          </View>
      </View>
    </Box>
  );
}