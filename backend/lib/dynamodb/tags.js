import uuid from 'uuid/v1'
import * as db from './dynamo'

const TableName = 'folds'

// TODO.... Will this be a GSI or something?


export function getTag(slug) {
  const params = {
    TableName,
    AttributesToGet: [
      'title',
      'slug',
      'folds',
    ],
  };

  return db.scan(params)
}