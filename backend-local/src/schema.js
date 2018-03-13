// Welcome to Launchpad!
// Log in to edit and save pads, run queries in GraphiQL on the right.
// Click "Download" above to get a zip with a standalone Node.js server.
// See docs and examples at https://github.com/apollographql/awesome-launchpad

// graphql-tools combines a schema string with resolvers.
import { makeExecutableSchema } from 'graphql-tools';
import uuid from 'uuid/v1'

// Construct a schema, using GraphQL schema language
// language=GraphQL Schema
const typeDefs = `
	type Fold {
		id: Int!
		ownerId: String!
    title: String
    address: String
    tags: [Tag]
  }
  type Mutation {
    createFold(
      title: String!
      address: String!
      tags: [String!]
    ): Fold!
  }
  type Tag {
		slug: String!
    name: String!
		folds: [Fold]
  }
  type Author {
		id: String!
    name: String!
    email: String
    folds: [Fold]
  }

  type Query {
    getFold(id: Int!): Fold
    getTag(slug: String!): Tag
    getAuthor(id: String!): Author
  }
`;


// Provide resolver functions for your schema fields
const resolvers = {
  Query: {
    getFold: (root, args, context) => {
      return foldsDB.find(f => f.id == args.id)
    },
    getTag: (_, {slug}) => tagsDB.find(t => t.slug == slug),
    getAuthor: (_, {id}) => authorsDB.find(a => a.id == id),
  },
  Mutation: {
    createFold: (_, {title, address, tags}) => {
      const fold = {
        id: uuid(),
        ownerId: '1a',
        title,
        address,
        tags,
      }

      foldsDB.push(fold)
      console.log(foldsDB)
      return fold
    }
  },
  Fold: {
    tags: (root, args, context) => {
      return root.tags.map(t => tagsDB.find(tag => tag.slug === t))
    }
  },
  Tag: {
    folds: (tag) => {
    	return foldsDB.filter(f => {
        return f.tags.includes(tag.slug)
      })
    }
  },
  Author: {
    folds: (author) => foldsDB.filter(f => f.ownerId === author.id)
  }
};

const foldsDB = [
  { id: 1, ownerId: '1a', title: 'Lorem Ipsum', address: 'http://lipsum.com', tags: ['foo', 'bar'] },
  { id: 2, ownerId: '2c', title: 'Dolor Sit', address: 'http://dolor.com', tags: ['foo', 'sheep'] },
  { id: 3, ownerId: '2c', title: 'Quivactus Wotsit', address: 'http://wosit.com', tags: ['foo'] },
]
const tagsDB = [
  { slug: 'foo', name: 'Foo' },
  { slug: 'bar', name: 'Bar' },
  { slug: 'sheep', name: 'Sheep baaaa' },
]
const authorsDB = [
  { id: '1a', name: 'Kane', email: 'kane@kane.com' },
  { id: '2c', name: 'Bob', email: 'bob@bloke.com' },
  { id: 'a9', name: 'Freddy Fredderson', email: 'fred@bloke.com' },
]

// Required: Export the GraphQL.js schema object as "schema"
export const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

// Optional: Export a function to get context from the request. It accepts two
// parameters - headers (lowercased http headers) and secrets (secrets defined
// in secrets section). It must return an object (or a promise resolving to it).
export function context(headers, secrets) {
  return {
    headers,
    secrets,
  };
};

// Optional: Export a root value to be passed during execution
// export const rootValue = {};

// Optional: Export a root function, that returns root to be passed
// during execution, accepting headers and secrets. It can return a
// promise. rootFunction takes precedence over rootValue.
// export function rootFunction(headers, secrets) {
//   return {
//     headers,
//     secrets,
//   };
// };
