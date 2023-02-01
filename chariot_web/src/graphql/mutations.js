/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createReading = /* GraphQL */ `
  mutation CreateReading(
    $input: CreateReadingInput!
    $condition: ModelReadingConditionInput
  ) {
    createReading(input: $input, condition: $condition) {
      id
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
      time
      temperature
      humidity
      createdAt
      updatedAt
    }
  }
`;
