import AWS from 'aws-sdk';
import uuid from 'uuid/v1'
import { fakeOwnerId } from './config'

AWS.config.update({
  region: 'us-east-1',
  endpoint: 'http://localhost:8000',
})

const dynamoDB = new AWS.DynamoDB.DocumentClient();

// https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/GettingStarted.NodeJs.04.html

/**
 * Get all folds in existence.
 * Should probably limit this...
 */
export const allFolds = () => dynamoDB.scan({
  TableName: 'folds'
}).promise().then(data => data.Items)

/**
 * Get a single fold
 * ID and ownerID are both needed as they form the composite primary key on the table.
 * @param id
 * @param ownerId
 */
export const getSingleFold = (id, ownerId) => dynamoDB.get({
  TableName: 'folds',
  Key: {
    id,
    ownerId,
  }
}).promise().then(data => data.Item)

/**
 * Get all a user's folds
 * Again, pagination needed probably.
 * @param ownerId
 */
export const getFoldsByOwner = (ownerId) => dynamoDB.scan({
  TableName: 'folds',
  FilterExpression: "ownerId = :o",
  ExpressionAttributeValues: {
    ":o": ownerId
  }
}).promise().then(data => data.Items)

/**
 * Get all tags
 * We'd use this for auto complete? irrespective of author though?
 */
export const allTags = () => dynamoDB.scan({
  TableName: 'tags'
}).promise().then(data => data.Items)

/**
 * Get a single tag.
 * slug and ownerID are both needed - composite primary key again.
 * @param slug
 * @param ownerId
 */
export const getSingleTag = (slug, ownerId) => dynamoDB.get({
  TableName: 'tags',
  Key: {
    slug,
    ownerId,
  }
}).promise().then(data => data.Item)

export const getMultipleTags = (tags, ownerId) => {
  const params = {
    RequestItems: {
      'tags': {
        Keys: tags.map(tag => ({
          slug: tag,
          ownerId
        }))
      }
    }
  }
  return dynamoDB.batchGet(params).promise()
}

/**
 * Create a new fold.
 * Writes to the item table and makes / updates any tags in the tags table.
 * @param title
 * @param address
 * @param tags
 */
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
      tags: tags.map(tag => ( // TODO: This overwrites if slug matches... good or bad? Drop the slug? Case sensitivity tho
        {
          PutRequest: {
            Item: {
              slug: tag.replace(/ +/g, '-').toLowerCase(), // Partition key
              ownerId: fakeOwnerId, // Sort key
              name: tag,
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