import AWS from 'aws-sdk'
import uuid from 'uuid/v1'

AWS.config.update({
  region: 'us-east-1',
  endpoint: 'http://localhost:8000',
})

const docClient = new AWS.DynamoDB.DocumentClient();

const params = {
  TableName: "folds",
  Item: {
    "id": "2a",
    "ownerId": "11b",
    "title": "Wotsit2",
    "address":  "thingy2.com",
  }
};

docClient.put(params, function(err, data) {
  if (err) {
    console.error("Unable to add movie", params.Item.title, ". Error JSON:", JSON.stringify(err, null, 2));
  } else {
    console.log("PutItem succeeded:", params.Item.title);
  }
});