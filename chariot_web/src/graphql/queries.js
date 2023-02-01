/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getReading = /* GraphQL */ `
  query GetReading($id: ID!) {
    getReading(id: $id) {
      id
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
