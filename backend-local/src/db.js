import AWS from 'aws-sdk';
import uuid from 'uuid/v1'
import _ from 'lodash'
import { fakeOwnerId } from './config'

AWS.config.update({
  region: 'us-east-1',
  endpoint: 'http://localhost:8000',
})

const dynamoDB = new AWS.DynamoDB.DocumentClient();

// https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/GettingStarted.NodeJs.04.html

const slugify = (str) => str.replace(/ +/g, '-').toLowerCase()

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
}).promise().then(data => {
  console.log(data)
  return data.Item
})

/**
 * Get all a user's folds
 * Again, pagination needed probably.
 * ...is scan the most efficient way to do this?
 * Query might be better as it doesn't access every item.
 *
 * actually scan IS most efficient - you can't query on sort key only.
 *
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
 * Get folds by tag
 * We scan because owner is just the sort key.
 * @param slug
 * @param ownerId
 */
export const getFoldsByTag = (slug, ownerId) => dynamoDB.scan({
  TableName: 'folds',
  FilterExpression: "contains (tags, :tag) AND #o = :owner",
  ExpressionAttributeNames: {
    "#o": "ownerId"
  },
  ExpressionAttributeValues: {
    ":tag": slug,
    ":owner": ownerId
  },
}).promise()

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
  tags = _.uniq(tags)
  const Item = {
    id: uuid(),
    ownerId: fakeOwnerId,
    title,
    address,
    tags: tags.map(tag => slugify(tag)),
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
              slug: slugify(tag), // Partition key
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

//
//
/**
 * Update fold
 * Note dynamoDB doesn't like empty attribute update keys, hence the for...in
 *
 * TODO: Validate that there has to be a tag?
 * TODO: Update tags table as well
 *
 * @param id
 * @param ownerId
 * @param title
 * @param address
 * @param tags
 */
export const updateFold = (id, ownerId, title, address, tags) => {
  let AttributeUpdates= {
    updatedAt: {Action: 'PUT', Value: new Date().getTime()},
  }
  const attrs = {title, address, tags}
  for(let k in attrs) {
    if(attrs[k]) {
      AttributeUpdates[k] = {Action: 'PUT', Value: attrs[k]}
    }
  }

  const params = {
    TableName: 'folds',
    Key: {
      id, ownerId,
    },
    AttributeUpdates,
    ReturnValues: 'ALL_NEW',
  }

  return dynamoDB.update(params).promise()
}

/**
 * Delete a fold
 *
 * @param id
 * @param ownerId
 */
export const deleteFold = (id, ownerId) => dynamoDB.delete({
  TableName: 'folds',
  Key: {
    id, ownerId,
  },
}).promise()


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