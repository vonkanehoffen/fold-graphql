import AWS from 'aws-sdk'
import uuid from 'uuid/v1'
import faker from 'faker'

AWS.config.update({
  region: 'us-east-1',
  endpoint: 'http://localhost:8000',
})

const docClient = new AWS.DynamoDB.DocumentClient();

const params = {
  TableName: "folds",
  Item: {
    "id": uuid(),
    "ownerId": "a9",
    "title": faker.company.companyName(),
    "address":  faker.internet.url(),
    "tags": ['meat', 'pies']
  }
};

docClient.put(params, function(err, data) {
  if (err) {
    console.error("Unable to add movie", params.Item, ". Error JSON:", JSON.stringify(err, null, 2));
  } else {
    console.log("PutItem succeeded:", params.Item);
  }
});
