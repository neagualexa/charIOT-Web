![charIOT_png_logo_white](https://user-images.githubusercontent.com/33195033/219667226-dd629b06-5053-4bb3-844f-c9c3ff54ae39.png)

## Description
CharIOT is an embedded system containing IoT devices based on Raspberry Pi. The goal of CharIOT is to motinor the quality and reliability of a research space, such as a cleanroom for microchip design. 

![image](https://user-images.githubusercontent.com/33195033/219664868-e8c6e34d-451f-4ce4-bfb4-a503b5631ca5.png)

Each IoT device under the CharIOT enviroment can measure the following characteristics of the clean room:
- Temperature
- Humidity
- Pressure
- Airborne Particulate Cleanliness through the ISO and US FED Standards

This is a project to the course ELEC60013 Embedded System Project at Imperial College London.

## This Repo

This repo contains the web platform where the users can monitor the readings from the devices through multiple dashboards and live warning animations. The user can set specific expected settings for each specific device, considering that they could be positioned in set locations in the cleanroom and require specific accepted measurement ranges.

The webite is run publicly though AWS Amplify, which sets up a CI/CD pipeline that updates and builds the website whenever this git repository is updated. The Webapp uses Amplify's backend services, such as the authorisation API and the GraphQL API to create data accounts for specific users and let them live access the measurements stored in the DynamoDB database.

If you want to build the website locally, you can follow the steps in the README file in the subfolder.

## The Architecture Datagram

![diagram-Copy of Page-1](https://user-images.githubusercontent.com/33195033/219667289-e2e850ad-40c4-400b-9083-eeff82336af6.png)

## Screenshots from the Webpage

![Home_01](https://user-images.githubusercontent.com/33195033/219667422-597b680c-0584-4b53-97af-4ff03162d08d.png)
![chariotpic1](https://user-images.githubusercontent.com/33195033/219667736-3fd2440f-5d6e-40da-94d5-09c1589703b6.png)
![chariotpic2](https://user-images.githubusercontent.com/33195033/219667746-be9eea0d-781e-4288-97b1-aabf77f983c6.png)



## The Hub repo 

The repository containing the code for the IoT devices and the data gathering and manipulation can be found on:
``https://github.com/JoachimSand/charIOT-Hub.git`` 
