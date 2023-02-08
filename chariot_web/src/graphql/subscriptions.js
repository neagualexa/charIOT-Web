/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateProduct = /* GraphQL */ `
  subscription OnCreateProduct($filter: ModelSubscriptionProductFilterInput) {
    onCreateProduct(filter: $filter) {
      id
      MAC_address
      product_name
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateProduct = /* GraphQL */ `
  subscription OnUpdateProduct($filter: ModelSubscriptionProductFilterInput) {
    onUpdateProduct(filter: $filter) {
      id
      MAC_address
      product_name
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteProduct = /* GraphQL */ `
  subscription OnDeleteProduct($filter: ModelSubscriptionProductFilterInput) {
    onDeleteProduct(filter: $filter) {
      id
      MAC_address
      product_name
      createdAt
      updatedAt
    }
  }
`;
export const onCreateLiveData = /* GraphQL */ `
  subscription OnCreateLiveData($filter: ModelSubscriptionLiveDataFilterInput) {
    onCreateLiveData(filter: $filter) {
      id
      productID
      temperature
      humidity
      pressure
      iso
      us_fed
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateLiveData = /* GraphQL */ `
  subscription OnUpdateLiveData($filter: ModelSubscriptionLiveDataFilterInput) {
    onUpdateLiveData(filter: $filter) {
      id
      productID
      temperature
      humidity
      pressure
      iso
      us_fed
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteLiveData = /* GraphQL */ `
  subscription OnDeleteLiveData($filter: ModelSubscriptionLiveDataFilterInput) {
    onDeleteLiveData(filter: $filter) {
      id
      productID
      temperature
      humidity
      pressure
      iso
      us_fed
      createdAt
      updatedAt
    }
  }
`;
export const onCreateReading = /* GraphQL */ `
  subscription OnCreateReading($filter: ModelSubscriptionReadingFilterInput) {
    onCreateReading(filter: $filter) {
      id
      productID
      time
      temperature
      humidity
      pressure
      iso
      us_fed
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateReading = /* GraphQL */ `
  subscription OnUpdateReading($filter: ModelSubscriptionReadingFilterInput) {
    onUpdateReading(filter: $filter) {
      id
      productID
      time
      temperature
      humidity
      pressure
      iso
      us_fed
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteReading = /* GraphQL */ `
  subscription OnDeleteReading($filter: ModelSubscriptionReadingFilterInput) {
    onDeleteReading(filter: $filter) {
      id
      productID
      time
      temperature
      humidity
      pressure
      iso
      us_fed
      createdAt
      updatedAt
    }
  }
`;
export const onCreateAverageHourReading = /* GraphQL */ `
  subscription OnCreateAverageHourReading(
    $filter: ModelSubscriptionAverageHourReadingFilterInput
  ) {
    onCreateAverageHourReading(filter: $filter) {
      id
      productID
      time
      temperature
      humidity
      pressure
      iso
      us_fed
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateAverageHourReading = /* GraphQL */ `
  subscription OnUpdateAverageHourReading(
    $filter: ModelSubscriptionAverageHourReadingFilterInput
  ) {
    onUpdateAverageHourReading(filter: $filter) {
      id
      productID
      time
      temperature
      humidity
      pressure
      iso
      us_fed
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteAverageHourReading = /* GraphQL */ `
  subscription OnDeleteAverageHourReading(
    $filter: ModelSubscriptionAverageHourReadingFilterInput
  ) {
    onDeleteAverageHourReading(filter: $filter) {
      id
      productID
      time
      temperature
      humidity
      pressure
      iso
      us_fed
      createdAt
      updatedAt
    }
  }
`;
export const onCreateAverageDayReading = /* GraphQL */ `
  subscription OnCreateAverageDayReading(
    $filter: ModelSubscriptionAverageDayReadingFilterInput
  ) {
    onCreateAverageDayReading(filter: $filter) {
      id
      productID
      time
      temperature
      humidity
      pressure
      iso
      us_fed
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateAverageDayReading = /* GraphQL */ `
  subscription OnUpdateAverageDayReading(
    $filter: ModelSubscriptionAverageDayReadingFilterInput
  ) {
    onUpdateAverageDayReading(filter: $filter) {
      id
      productID
      time
      temperature
      humidity
      pressure
      iso
      us_fed
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteAverageDayReading = /* GraphQL */ `
  subscription OnDeleteAverageDayReading(
    $filter: ModelSubscriptionAverageDayReadingFilterInput
  ) {
    onDeleteAverageDayReading(filter: $filter) {
      id
      productID
      time
      temperature
      humidity
      pressure
      iso
      us_fed
      createdAt
      updatedAt
    }
  }
`;
export const onCreateDeviceSetting = /* GraphQL */ `
  subscription OnCreateDeviceSetting(
    $filter: ModelSubscriptionDeviceSettingFilterInput
  ) {
    onCreateDeviceSetting(filter: $filter) {
      id
      productID
      temperature
      humidity
      pressure
      iso
      us_fed
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateDeviceSetting = /* GraphQL */ `
  subscription OnUpdateDeviceSetting(
    $filter: ModelSubscriptionDeviceSettingFilterInput
  ) {
    onUpdateDeviceSetting(filter: $filter) {
      id
      productID
      temperature
      humidity
      pressure
      iso
      us_fed
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteDeviceSetting = /* GraphQL */ `
  subscription OnDeleteDeviceSetting(
    $filter: ModelSubscriptionDeviceSettingFilterInput
  ) {
    onDeleteDeviceSetting(filter: $filter) {
      id
      productID
      temperature
      humidity
      pressure
      iso
      us_fed
      createdAt
      updatedAt
    }
  }
`;
