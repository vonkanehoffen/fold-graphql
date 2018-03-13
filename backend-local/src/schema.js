// Welcome to Launchpad!
// Log in to edit and save pads, run queries in GraphiQL on the right.
// Click "Download" above to get a zip with a standalone Node.js server.
// See docs and examples at https://github.com/apollographql/awesome-launchpad

// graphql-tools combines a schema string with resolvers.
import { makeExecutableSchema } from 'graphql-tools';

// Polyfill?!
if (!Array.prototype.includes) {
  Object.defineProperty(Array.prototype, 'includes', {
    value: function(searchElement, fromIndex) {

      if (this == null) {
        throw new TypeError('"this" is null or not defined');
      }

      // 1. Let O be ? ToObject(this value).
      var o = Object(this);

      // 2. Let len be ? ToLength(? Get(O, "length")).
      var len = o.length >>> 0;

      // 3. If len is 0, return false.
      if (len === 0) {
        return false;
      }

      // 4. Let n be ? ToInteger(fromIndex).
      //    (If fromIndex is undefined, this step produces the value 0.)
      var n = fromIndex | 0;

      // 5. If n ≥ 0, then
      //  a. Let k be n.
      // 6. Else n < 0,
      //  a. Let k be len + n.
      //  b. If k < 0, let k be 0.
      var k = Math.max(n >= 0 ? n : len - Math.abs(n), 0);

      function sameValueZero(x, y) {
        return x === y || (typeof x === 'number' && typeof y === 'number' && isNaN(x) && isNaN(y));
      }

      // 7. Repeat, while k < len
      while (k < len) {
        // a. Let elementK be the result of ? Get(O, ! ToString(k)).
        // b. If SameValueZero(searchElement, elementK) is true, return true.
        if (sameValueZero(o[k], searchElement)) {
          return true;
        }
        // c. Increase k by 1. 
        k++;
      }

      // 8. Return false
      return false;
    }
  });
}

// Construct a schema, using GraphQL schema language
const typeDefs = `
	type Fold {
		id: Int!
		ownerId: String!
    title: String
    address: String
    tags: [Tag]
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
  Fold: {
    tags: (root, args, context) => {
      return root.tags.map(t => tagsDB.find(tag => tag.slug === t))
    }
  },
  Tag: {
    folds: (tag) => {
    	return foldsDB.filter(f => {
        console.log("tags: ", f.tags[0])
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
