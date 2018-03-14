// Construct a schema, using GraphQL schema language
// language=GraphQL Schema
const typeDefs = `
	type Fold {
		id: String!
		ownerId: String!
    title: String
    address: String
    tags: [Tag]
    createdAt: String
    updatedAt: String
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
    ownerId: String!
		folds: [Fold]
  }
  type Author {
		id: String!
    name: String!
    email: String
    folds: [Fold]
  }

  type Query {
    getAllFolds: [Fold]
    getFold(id: String!, ownerId: String!): Fold
      
    getAllTags: [Tag]
    getTag(slug: String!, ownerId: String!): Tag
      
    getAuthor(id: String!): Author
  }
`;

export default typeDefs