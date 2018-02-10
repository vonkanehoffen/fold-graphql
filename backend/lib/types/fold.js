export default `
  # Root types...
  
  type Query {
    folds: [Fold]
    fold(id: ID!)
    : Fold
  }
  
  type Mutation {
  
    createFold(
      title: String!
      address: String!
      tags: [String!] # TODO: Actual tag type
    ): Fold!
    
    updateFold(
      id: ID!
      title: String
      address: String
      tags: [String]
#      subscribers: [String!]
    ): Fold!
    
    deleteFold(id: ID!): Fold!
    
  }
  
  # Normal types...
  type Fold {
    id: ID!
    title: String!
    address: String
    tags: [String!]!
    owner: String!
    #subscribers: [String!]!
    createdAt: String!
    updatedAt: String!
  }
  
#  type Tag {
#    title: String!
#    slug: String!
#    folds: [Fold]!
#  }
  
  #type: User {
  #  username: String!
  #  folds: [Fold]!
  #}
  `
