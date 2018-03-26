import { graphqlLambda } from 'apollo-server-lambda'
import { schema } from './schema'

exports.graphql = function(event, context, callback) {
  const callbackFilter = function(error, output) {
    output.headers['Access-Control-Allow-Origin'] = '*';
    callback(error, output);
  };
  const handler = graphqlLambda({
    schema,
    context: { event },
  });

  return handler(event, context, callbackFilter);
};
