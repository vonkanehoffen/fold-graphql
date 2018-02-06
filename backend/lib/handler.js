import { graphqlLambda } from 'apollo-server-lambda'
import { makeExecutableSchema } from 'graphql-tools';
import { mergeResolvers, mergeTypes } from 'merge-graphql-schemas';
import foldType from './types/fold'
import foldResolver from './resolvers/fold'

// https://7r4nx53sz1.execute-api.us-east-1.amazonaws.com/dev/graphql

// const typeDefs = mergeTypes([foldType]);
// const resolvers = mergeResolvers([foldResolver]);
//
// const schema = makeExecutableSchema({
//   typeDefs,
//   resolvers,
// })

const schema = makeExecutableSchema({
  typeDefs: foldType,
  resolvers: foldResolver,
})

exports.graphql = function(event, context, callback) {
  const callbackFilter = function(error, output) {
    output.headers['Access-Control-Allow-Origin'] = '*';
    callback(error, output);
  };
  const handler = graphqlLambda({ schema });

  return handler(event, context, callbackFilter);
};
