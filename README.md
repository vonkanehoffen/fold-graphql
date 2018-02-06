# Folld.im

## GraphQL

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