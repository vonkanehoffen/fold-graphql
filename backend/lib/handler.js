import { graphqlLambda } from 'apollo-server-lambda'
import { makeExecutableSchema } from 'graphql-tools';
import { mergeResolvers, mergeTypes } from 'merge-graphql-schemas';
import foldType from './types/fold'
import foldResolver from './resolvers/fold'


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

exports.graphql = graphqlLambda({
  schema
})