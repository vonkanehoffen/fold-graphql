import AWS from 'aws-sdk';

AWS.config.update({
  region: 'us-east-1',
  endpoint: 'http://localhost:8000',
})

const dynamoDB = new AWS.DynamoDB.DocumentClient();

// https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/GettingStarted.NodeJs.04.html

export const allFolds = () => dynamoDB.scan({
  TableName: 'folds'
}).promise().then(data => data.Items)

export const getSingleFold = (id, ownerId) => dynamoDB.get({
  TableName: 'folds',
  Key: {
    id,
    ownerId,
  }
}).promise().then(data => data.Item)

// KeyConditionExpression is to get around reserved words. See:
// https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_Query.html
export const getFoldsByOwner = (ownerId) => dynamoDB.scan({
  TableName: 'folds',
  FilterExpression: "ownerId = :o",
  ExpressionAttributeValues: {
    ":o": ownerId
  }
}).promise().then(data => data.Items)

// this works...
// export function getFoldById(id, ownerId) {
//   const params = {
//     TableName,
//     KeyConditionExpression: "#f = :foldId",
//     ExpressionAttributeNames: {
//       "#f": "id"
//     },
//     ExpressionAttributeValues: {
//       ":foldId": id
//     }
//   }
//
//   return dynamoDb.query(params);
// }