import * as dynamoDb from './dynamodb'

const TableName = 'folds'

export function getFoldById(id, ownerId) {
  const params = {
    TableName,
    Key: {
      id,
      ownerId,
    },
  };

  return dynamoDb.get(params);
}