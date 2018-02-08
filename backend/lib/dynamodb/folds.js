import uuid from 'uuid/v1'
import * as db from './dynamo'

const TableName = 'folds'

export function getFolds() {
  const params = {
    TableName,
    AttributesToGet: [
      'id',
      'title',
      'address',
      'createdAt',
      'updatedAt',
    ],
  };

  return db.scan(params)
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

export function createFold(args) {
  const timestamp = new Date().getTime()
  const params = {
    TableName,
    Item: {
      id: uuid(),
      title: args.title,
      address: args.address,
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
      ':updatedAt': new Date().getTime(),
    },
    UpdateExpression: 'SET title = :title, address = :address, updatedAt = :updatedAt',
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
