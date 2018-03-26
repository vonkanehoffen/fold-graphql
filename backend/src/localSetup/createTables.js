import AWS from 'aws-sdk';

AWS.config.update({
  region: 'us-east-1',
  endpoint: 'http://localhost:8000',
})

const dynamoDB = new AWS.DynamoDB

dynamoDB.deleteTable({ TableName: 'folds' }).promise()
  .then(res => console.log(res))
  .finally(() => {
    dynamoDB.createTable({
      TableName : 'folds',
      KeySchema: [
        { AttributeName: 'id', KeyType: 'HASH'},  // Partition key
        { AttributeName: 'ownerId', KeyType: 'RANGE' }  // Sort key
      ],
      AttributeDefinitions: [
        { AttributeName: 'id', AttributeType: 'S' },
        { AttributeName: 'ownerId', AttributeType: 'S' }
      ],
      ProvisionedThroughput: {
        ReadCapacityUnits: 10,
        WriteCapacityUnits: 10
      }
    }).promise().then(res => console.log(res))
  })

dynamoDB.deleteTable({ TableName: 'tags' }).promise()
  .then(res => console.log(res))
  .finally(() => {
    dynamoDB.createTable({
      TableName : 'tags',
      KeySchema: [
        { AttributeName: 'name', KeyType: 'HASH'},  // Partition key
        { AttributeName: 'ownerId', KeyType: 'RANGE' }  // Sort key
      ],
      AttributeDefinitions: [
        { AttributeName: 'name', AttributeType: 'S' },
        { AttributeName: 'ownerId', AttributeType: 'S' }
      ],
      ProvisionedThroughput: {
        ReadCapacityUnits: 10,
        WriteCapacityUnits: 10
      }
    }).promise().then(res => console.log(res))
  })

// dynamoDB.deleteTable({ TableName: 'users' }).promise().then(res => console.log(res))



