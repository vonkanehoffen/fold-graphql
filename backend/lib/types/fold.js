export default `
  type Fold {
    id: ID!
    title: String
  }
  
  type Query {
    folds: [Fold]    # "[]" means this is a list of channels
    fold(id: ID!): Fold
  }
  
  #type Mutation {
  #  addFold(name: String!): Fold
  #}
  `
