# Better Fold Thing



This project was created with [Apollo Launchpad](https://launchpad.graphql.com)

You can see the original pad at [https://launchpad.graphql.com/w5xxzwj38z](https://launchpad.graphql.com/w5xxzwj38z)

### Quick start guide

```bash
npm install

npm start
```


# DynamoDB local:

```
java -Djava.library.path=./DynamoDBLocal_lib -jar DynamoDBLocal.jar -sharedDb
```
Setup tables:
```
babel-node src/setup/createTables.js
```

See [here](https://stackoverflow.com/questions/45842363/dynamodb-updateitem-ignore-null-values-in-expressionattributevalues) for enabling logging on local


#GraphQL sample queries
```
query allFolds {
  getAllFolds {
    id
    title
    address
    tags {
      name
      slug
    }
  }
}

query allTags {
  getAllTags {
    name
    slug
    ownerId
  }
}

query foldsByTag {
  getTag(slug: "cross-platform", ownerId: "2c") {
    name
    folds {
      id
      ownerId
      title
      address
      tags {
        name
        slug
      }
    }
  }
}

query single {
  getFold(id: "de604930-2aa6-11e8-989e-039771dd7c15", ownerId: "2c") {
    id
    title
    address
    tags { name slug ownerId}
  }
}

mutation create {
  createFold(title: "Ocelots of power", address: "ocelots.com", tags: ["Power", "anImAls are Coool"]) {
    id
    title
    address
    tags {
      name
      ownerId
      slug
    }
    createdAt
  }
}

mutation update {
  updateFold(
    id: "405faea0-284f-11e8-b871-3732805f0c2e", 
    ownerId: "2c"
  	title: "Updated funk group"
    address: "updatedaddress.com"
    tags: [ "extended", "application" ]
  ) {
    title
    tags {
      name
    }
  }
}

mutation delete {
  deleteFold(id: "40630a00-284f-11e8-b871-3732805f0c2e", ownerId: "2c") {
    id
  }
}
```

## Test Accounts

geoff / luzojapi@emailsy.info / badger123123