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

### DynamoDB

https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Scan.html

Scan with filter... right way to do it? Or query on GSI

```
aws dynamodb scan \
--table-name folds \
--filter-expression "contains (tags, :tag)" \
--expression-attribute-values '{":tag":{"S":"Things"}}
```