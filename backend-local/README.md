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

Happy hacking!

The Apollo team :)
