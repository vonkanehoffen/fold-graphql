import * as dynamoDb from './dynamodb'

// https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/GettingStarted.NodeJs.04.html
const TableName = 'folds'

export function getFoldById(id, ownerId) {
  const params = {
    TableName,
    KeyConditionExpression: "#f = :foldId",
    ExpressionAttributeNames: {
      "#f": "id"
    },
    ExpressionAttributeValues: {
      ":foldId": id
    }
  }

  return dynamoDb.query(params);
}