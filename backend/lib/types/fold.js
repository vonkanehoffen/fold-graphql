export default `
  type Fold {
    id: ID!
    title: String
    address: String
  }
  
  type Query {
    folds: [Fold]    # "[]" means this is a list of channels
    fold(id: ID!): Fold
  }
  
  type Mutation {
    createFold(
      title: String!
      address: String!
    ): Fold
    updateFold(
      id: ID!
      title: String
      address: String
    ): Fold
    deleteFold(
      id: ID!
    ): Fold
  }
  `
