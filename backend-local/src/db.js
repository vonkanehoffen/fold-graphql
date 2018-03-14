import * as dynamoDb from './dynamodb'

// https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/GettingStarted.NodeJs.04.html

export const allFolds = () => dynamoDb.scan({
  TableName: 'folds'
})

export function getSingleFold(id, ownerId) {
  console.log("exec")
  const params = {
    TableName: 'folds',
    Key: {
      id,
      ownerId,
    }
  }
  return dynamoDb.get(params);
}

// KeyConditionExpression is to get around reserved words. See:
// https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_Query.html
export function getFoldsByOwner(ownerId) {
  const params = {
    TableName: 'folds',
    KeyConditionExpression: "#o = :owner",
    ExpressionAttributeNames: {
      "#o": "ownerId"
    },
    ExpressionAttributeValues: {
      ":owner": ownerId
    }
  }
  return dynamoDb.query(params);
}

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