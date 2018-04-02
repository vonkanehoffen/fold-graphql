// Construct a schema, using GraphQL schema language
// language=GraphQL Schema
const typeDefs = `
	type Fold {
		id: ID!
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
    ): Fold

    updateFold(
      id: ID!
      title: String
      address: String
      tags: [String]
    ): Fold

    deleteFold(id: ID!): Fold
  }
  type Tag {
    name: String!
    slug: String!
    ownerId: String!
		folds: [Fold]
  }
  type Author {
		id: ID!
    name: String!
    email: String
    folds: [Fold]
  }

  type Query {
    getAllFolds: [Fold]
    getFold(id: ID!, ownerId: ID!): Fold
      
    getAllTags: [Tag]
    getTag(slug: String!, ownerId: ID!): Tag
      
    getAuthor(id: ID!): Author
    
    getAllMyFolds: [Fold]
    getAllMyTags: [Tag]
  }
`;

export default typeDefs