/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createProduct = /* GraphQL */ `
  mutation CreateProduct(
    $input: CreateProductInput!
    $condition: ModelProductConditionInput
  ) {
    createProduct(input: $input, condition: $condition) {
      id
      MAC_address
      product_name
      createdAt
      updatedAt
    }
  }
`;
export const updateProduct = /* GraphQL */ `
  mutation UpdateProduct(
    $input: UpdateProductInput!
    $condition: ModelProductConditionInput
  ) {
    updateProduct(input: $input, condition: $condition) {
      id
      MAC_address
      product_name
      createdAt
      updatedAt
    }
  }
`;
export const deleteProduct = /* GraphQL */ `
  mutation DeleteProduct(
    $input: DeleteProductInput!
    $condition: ModelProductConditionInput
  ) {
    deleteProduct(input: $input, condition: $condition) {
      id
      MAC_address
      product_name
      createdAt
      updatedAt
    }
  }
`;
export const createReading = /* GraphQL */ `
  mutation CreateReading(
    $input: CreateReadingInput!
    $condition: ModelReadingConditionInput
  ) {
    createReading(input: $input, condition: $condition) {
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
export const updateReading = /* GraphQL */ `
  mutation UpdateReading(
    $input: UpdateReadingInput!
    $condition: ModelReadingConditionInput
  ) {
    updateReading(input: $input, condition: $condition) {
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
export const deleteReading = /* GraphQL */ `
  mutation DeleteReading(
    $input: DeleteReadingInput!
    $condition: ModelReadingConditionInput
  ) {
    deleteReading(input: $input, condition: $condition) {
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
export const createAverageHourReading = /* GraphQL */ `
  mutation CreateAverageHourReading(
    $input: CreateAverageHourReadingInput!
    $condition: ModelAverageHourReadingConditionInput
  ) {
    createAverageHourReading(input: $input, condition: $condition) {
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
export const updateAverageHourReading = /* GraphQL */ `
  mutation UpdateAverageHourReading(
    $input: UpdateAverageHourReadingInput!
    $condition: ModelAverageHourReadingConditionInput
  ) {
    updateAverageHourReading(input: $input, condition: $condition) {
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
export const deleteAverageHourReading = /* GraphQL */ `
  mutation DeleteAverageHourReading(
    $input: DeleteAverageHourReadingInput!
    $condition: ModelAverageHourReadingConditionInput
  ) {
    deleteAverageHourReading(input: $input, condition: $condition) {
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
export const createAverageDayReading = /* GraphQL */ `
  mutation CreateAverageDayReading(
    $input: CreateAverageDayReadingInput!
    $condition: ModelAverageDayReadingConditionInput
  ) {
    createAverageDayReading(input: $input, condition: $condition) {
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
export const updateAverageDayReading = /* GraphQL */ `
  mutation UpdateAverageDayReading(
    $input: UpdateAverageDayReadingInput!
    $condition: ModelAverageDayReadingConditionInput
  ) {
    updateAverageDayReading(input: $input, condition: $condition) {
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
export const deleteAverageDayReading = /* GraphQL */ `
  mutation DeleteAverageDayReading(
    $input: DeleteAverageDayReadingInput!
    $condition: ModelAverageDayReadingConditionInput
  ) {
    deleteAverageDayReading(input: $input, condition: $condition) {
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
