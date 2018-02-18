import uuid from 'uuid/v1'
import * as db from './dynamo'

const TableName = 'folds'

export function getFolds(args) {
  // TODO: More efficient ways to do this? eg.
  // https://aws.amazon.com/blogs/database/querying-on-multiple-attributes-in-amazon-dynamodb/
  return db.scan(filterParams(args))
}

const filterParams = (args) => {
  let params = { TableName }

  if(args.tag && args.owner) {
    params.FilterExpression = "contains (tags, :tag) AND #o = :owner"
    params.ExpressionAttributeValues = {":tag": args.tag, ":owner": args.owner}
    // Reserved keyword. See https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/ReservedWords.html
    params.ExpressionAttributeNames = {"#o": "owner"}
    return params
  }

  if(args.tag) {
    params.FilterExpression = "contains (tags, :tag)"
    params.ExpressionAttributeValues = {":tag": args.tag }
    return params
  }

  if(args.owner) {
    params.FilterExpression = "contains (#o, :owner)"
    params.ExpressionAttributeValues = {":owner": args.owner }
    params.ExpressionAttributeNames = {"#o": "owner"}
    return params
  }

  return params
}

export function getFoldById(id) {
  const params = {
    TableName,
    Key: {
      id,
    },
  };

  return db.get(params);
}

export function createFold(args, context) {
  const timestamp = new Date().getTime()
  const params = {
    TableName,
    Item: {
      id: uuid(),
      title: args.title,
      address: args.address,
      tags: args.tags,
      owner: context.event.requestContext.authorizer.claims['cognito:username'],
      createdAt: timestamp,
      updatedAt: timestamp,
    },
  };

  return db.createItem(params);
}

export function updateFold(args) {
  const params = {
    TableName,
    Key: {
      id: args.id,
    },
    ExpressionAttributeValues: {
      ':title': args.title,
      ':address': args.address,
      ':tags': args.tags,
      ':updatedAt': new Date().getTime(),
    },
    UpdateExpression: 'SET title = :title, address = :address, tags = :tags, updatedAt = :updatedAt',
    ReturnValues: 'ALL_NEW',
  };

  return db.updateItem(params, args);
}

export function deleteFold(args) {
  const params = {
    TableName,
    Key: {
      id: args.id,
    },
  };

  return db.deleteItem(params, args);
}
