import uuid from 'uuid/v1'
import * as db from './dynamo'

const TableName = 'folds'

export function getFolds() {
  const params = {
    TableName,
    AttributesToGet: [
      'id',
      'title',
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