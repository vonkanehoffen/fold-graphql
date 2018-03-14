import AWS from 'aws-sdk';
import uuid from 'uuid/v1'

AWS.config.update({
  region: 'us-east-1',
  endpoint: 'http://localhost:8000',
})

const dynamoDB = new AWS.DynamoDB.DocumentClient();

const fakeOwnerId = '2c' // TODO: This would be cognito.

// https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/GettingStarted.NodeJs.04.html

export const allFolds = () => dynamoDB.scan({
  TableName: 'folds'
}).promise().then(data => data.Items)

export const allTags = () => dynamoDB.scan({
  TableName: 'tags'
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

export const createFold = (title, address, tags) => {
  const timestamp = new Date().getTime()
  const Item = {
    id: uuid(),
    ownerId: fakeOwnerId,
    title,
    address,
    tags,
    createdAt: timestamp,
    updatedAt: timestamp,
  }
  const params = {
    RequestItems: {
      folds: [
        {
          PutRequest: {
            Item
          }
        }
      ],
      tags: tags.map(tag => ( // TODO: This overwrites if slug matches... good or bad? Drop the slug?
        {
          PutRequest: {
            Item: {
              slug: tag.replace(/ +/g, '-').toLowerCase(), // TODO: Strip non alphanumeric?
              name: tag,
              ownerId: fakeOwnerId,
            }
          }
        }
      ))
    }
  }

  return dynamoDB.batchWrite(params).promise().then(data => {
    console.log(data)
    if(Object.keys(data.UnprocessedItems).length === 0) {
      return Item
    } else {
      return data
    }
  })
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