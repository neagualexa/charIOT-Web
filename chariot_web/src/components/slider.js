import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { colours } from "./colours";
import { Button, Grid, SelectField, useTheme, View } from "@aws-amplify/ui-react";
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

function valuetextPress(value) {
  return `${value}kPa`;
}

function valuetext(value) {
  return `${value}`;
}

const marksTemp = [ { value: 0, label: '0°C', }, { value: 100, label: '100°C', }]
const marksHum = [ { value: 0, label: '0%', }, { value: 100, label: '100%', }]
const marksPress = [ { value: 0, label: '0kPa', }, { value: 200, label: '200kPa', }]

const isoStandards = ["ISO 1", "ISO 2", "ISO 3", "ISO 4", "ISO 5", "ISO 6", "ISO 7", "ISO 8", "ISO 9"];
const usfedStandards = ["< Class 1", "Class 1", "Class 10", "Class 100", "Class 1,000", "Class 10,000", "Class 100,000", "Room air"];

export default function RangeSlider({product}) {
  const [setting, setSetting] = React.useState({});
  const [valueTemp, setValueTemp] = React.useState([20, 37]);
  const [valueHum, setValueHum] = React.useState([10, 27]);
  const [valuePress, setValuePress] = React.useState([0, 10]);
  const [standards, setStandards] = React.useState(["",""]);

  const { tokens } = useTheme();
  const navigate = useNavigate();
  const handleClick = (path) => navigate(path);

  React.useEffect(() => {
    fetchSettings();
  }, [])

  const handleChangeTemp = (event, newValue) => { setValueTemp(newValue); };
  const handleChangeHum = (event, newValue) => {  setValueHum(newValue); };
  const handleChangePress = (event, newValue) => { setValuePress(newValue); };
  const handleChangeISO = (event, newValue) => { 
    setStandards([event.target.value, equivalenceStandard(event.target.value,"iso")]); 
  };
  const handleChangeUSFED = (event, newValue) => { 
    setStandards([equivalenceStandard(event.target.value,"us_fed"), event.target.value]); 
  };

  const equivalenceStandard = (value, standard) => {
    if(standard = "iso"){
      switch(value){
        case("ISO 1"):  return("< Class 1");
                        break; 
        case("ISO 2"):  return("< Class 1");
                        break; 
        case("ISO 3"):  return("Class 1");
                        break; 
        case("ISO 4"):  return("Class 10");
                        break; 
        case("ISO 5"):  return("Class 100");
                        break;
        case("ISO 6"):  return("Class 1,000");
                        break; 
        case("ISO 7"):  return("Class 10,000");
                        break; 
        case("ISO 8"):  return("Class 100,000");
                        break;         
        case("ISO 9"):  return("Room air");
                        break;       
      } 
    } 
    if(standard = "us_fed"){
      switch(value){
        case("< Class 1"):      return("ISO 2");
                        break;
        case("Class 1"):        return("ISO 3");
                        break; 
        case("Class 10"):       return("ISO 4");
                        break; 
        case("Class 100"):      return("ISO 5");
                        break;
        case("Class 1,000"):    return("ISO 6");
                        break; 
        case("Class 10,000"):   return("ISO 7");
                        break; 
        case("Class 100,000"):  return("ISO 8");
                        break;         
        case("Room air"):       return("ISO 9");
                        break;       
      }
  }}

  async function fetchSettings() {
    const apiData = await API.graphql({ query: listDeviceSettings });
    const settingsAPI = apiData.data.listDeviceSettings.items;
    let settingFiltered = settingsAPI.filter((s) => s.productID[1] == product)[0];
    setSetting(settingFiltered); // to get access to the raw temperatures data
    setValueTemp(settingFiltered.temperature);
    setValueHum(settingFiltered.humidity);
    setValuePress(settingFiltered.pressure);
    setStandards([settingFiltered.iso, settingFiltered.us_fed])
  }

  async function updateSettings(s) {
    if (!s.id) return;
    const data = {
      id: s.id,
      productID: s.productID,
      temperature: valueTemp,
      humidity: valueHum,
      pressure: valuePress,
      iso: standards[0],
      us_fed: standards[1]
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
        <Heading className="App-text" level={4}>Temperature Range</Heading>
        <Slider
          getAriaLabel={() => 'Temperature range'}
          value={valueTemp}
          onChange={handleChangeTemp}
          getAriaValueText={valuetextTemp}
          valueLabelDisplay="auto"
          marks={marksTemp}
          // color={colours.dark_blue} // TODO: to change the color of the line
        />
        <Heading className="App-text" level={4}>Humidity Range</Heading>
        <Slider
          getAriaLabel={() => 'Humidity range'}
          value={valueHum}
          onChange={handleChangeHum}
          getAriaValueText={valuetextHum}
          valueLabelDisplay="auto"
          marks={marksHum}
          // color={colours.dark_blue} // TODO: to change the color of the line
        />
        <Heading className="App-text" level={4}>Pressure Range</Heading>
        <Slider
          getAriaLabel={() => 'Pressure range'}
          value={valuePress}
          onChange={handleChangePress}
          getAriaValueText={valuetextPress}
          valueLabelDisplay="auto"
          marks={marksPress}
          max={200}
          // color={colours.dark_blue} // TODO: to change the color of the line
        />
        <Heading className="App-text" level={4}>Standards</Heading>
        <Heading className="App-text" level={4}>PM level</Heading>
        <Heading className="App-text" level={7}>ISO 14644-1</Heading>
        <SelectField
          inputStyles={{
            backgroundColor: '#F2A154',
            border: `1px solid #F2A154`,
          }}
          value={standards[0]}
          onChange={handleChangeISO}
        >
          {isoStandards.map((s,i) => {
            return(
              <option value={s} key={i} > {s} </option>
            );
          })}
        </SelectField>
        <Heading className="App-text" level={7}>US FED STR 209E</Heading>
        <SelectField
          inputStyles={{
            backgroundColor: '#F2A154',
            border: `1px solid #F2A154`,
          }}
          value={standards[1]}
          onChange={handleChangeUSFED}
        >
          {usfedStandards.map((s,i) => {
            return(
              <option value={s} key={i} > {s} </option>
            );
          })}
        </SelectField>
      </Grid>
      <View style={{display:'flex', flexDirection:'row', justifyContent:'center'}}>
        <Button onClick={() => updateSettings(setting)} backgroundColor={colours.dark_blue} color={colours.white}
        variation='primary'>Update Settings</Button>
        <View style={{paddingLeft:'5%'}}>
          <Button onClick={() => {
                        let to = '/dashboard/' + product;
                        // console.log(to)
                        handleClick(to);
                      }}
            backgroundColor={colours.dark_blue} color={colours.white} variation='primary'
            > Check readings of {product} </Button>
          </View>
      </View>
    </Box>
  );
}