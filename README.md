# Fold.im

Work in progress... Learning GraphQL!

Copyright Kane Clover 2018.
All rights reserved.

For now...

## Notes

### GraphQL

Get folds:
```
{
  folds {
    id
    title
  }
}
```

Create one:
```
mutation CreateFold($title: String!, $url: String!) {
  createFold(title: $title, url: $url) {
    id
    title
    url
  }
}
```
Update:
```
mutation UpdateFold($id: ID!, $title: String, $address: String) {
  updateFold(id: $id, title: $title, address: $address) {
    id
    title
    address
  }
}
```
Delete:
```
mutation DeleteFold($id: ID!) {
  deleteFold(id: $id) {
    id
  }
}
```

### Hmmm

Problems with apollo store update when unused tags in the query:
https://github.com/apollographql/react-apollo/issues/708
https://github.com/apollographql/apollo-client/issues/2051
https://stackoverflow.com/questions/44348225/apollo-client-react-container-add-created-element-to-paginated-list-of-elements
https://www.apollographql.com/docs/react/features/cache-updates.html#fetchMore

Possible autocomplete component for filter?
http://downshift.netlify.com/

Do pagination:
https://www.apollographql.com/docs/react/recipes/pagination.html
https://www.apollographql.com/docs/react/basics/queries.html#graphql-query-data-fetchMore
also... the The @connection directive from above.
Could solve the problem of getting new records into multiple views?

http://graphql.org/learn/queries/



### DynamoDB

https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Scan.html

Scan with filter... right way to do it? Or query on GSI

Reserved words.... already used owner...
https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/ReservedWords.html

Get started with JS API:
https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/GettingStarted.NodeJs.01.html

Document Client: 
https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB/DocumentClient.html

Could (CloudSearch)[https://docs.aws.amazon.com/cloudsearch/latest/developerguide/searching-dynamodb-data.html] be good?
No. That and Elastic search are basically EC2 instances, not billed per request.

Stream user info to dynaodb table?
(Cognito Kinesis Streams)[https://docs.aws.amazon.com/cognito/latest/developerguide/cognito-streams.html]

```
aws dynamodb scan \
--table-name folds \
--filter-expression "contains (tags, :tag)" \
--expression-attribute-values '{":tag":{"S":"Things"}}
```