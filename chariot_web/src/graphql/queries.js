/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getProduct = /* GraphQL */ `
  query GetProduct($id: ID!) {
    getProduct(id: $id) {
      id
      MAC_address
      product_name
      createdAt
      updatedAt
    }
  }
`;
export const listProducts = /* GraphQL */ `
  query ListProducts(
    $filter: ModelProductFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listProducts(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        MAC_address
        product_name
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getLiveData = /* GraphQL */ `
  query GetLiveData($id: ID!) {
    getLiveData(id: $id) {
      id
      productID
      temperature
      humidity
      iso
      createdAt
      updatedAt
    }
  }
`;
export const listLiveData = /* GraphQL */ `
  query ListLiveData(
    $filter: ModelLiveDataFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listLiveData(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        productID
        temperature
        humidity
        iso
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getReading = /* GraphQL */ `
  query GetReading($id: ID!) {
    getReading(id: $id) {
      id
      productID
      time
      temperature
      humidity
      createdAt
      updatedAt
    }
  }
`;
export const listReadings = /* GraphQL */ `
  query ListReadings(
    $filter: ModelReadingFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listReadings(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        productID
        time
        temperature
        humidity
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getAverageHourReading = /* GraphQL */ `
  query GetAverageHourReading($id: ID!) {
    getAverageHourReading(id: $id) {
      id
      productID
      time
      temperature
      humidity
      createdAt
      updatedAt
    }
  }
`;
export const listAverageHourReadings = /* GraphQL */ `
  query ListAverageHourReadings(
    $filter: ModelAverageHourReadingFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listAverageHourReadings(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        productID
        time
        temperature
        humidity
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getAverageDayReading = /* GraphQL */ `
  query GetAverageDayReading($id: ID!) {
    getAverageDayReading(id: $id) {
      id
      productID
      time
      temperature
      humidity
      createdAt
      updatedAt
    }
  }
`;
export const listAverageDayReadings = /* GraphQL */ `
  query ListAverageDayReadings(
    $filter: ModelAverageDayReadingFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listAverageDayReadings(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        productID
        time
        temperature
        humidity
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getDeviceSetting = /* GraphQL */ `
  query GetDeviceSetting($id: ID!) {
    getDeviceSetting(id: $id) {
      id
      productID
      temperature
      humidity
      createdAt
      updatedAt
    }
  }
`;
export const listDeviceSettings = /* GraphQL */ `
  query ListDeviceSettings(
    $filter: ModelDeviceSettingFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listDeviceSettings(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        productID
        temperature
        humidity
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
