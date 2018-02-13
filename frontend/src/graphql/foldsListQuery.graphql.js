import gql from 'graphql-tag'

// TODO: Add the `graphql-tag/loader` loader like GitHunt
export default gql`query foldsListQuery {
  folds {
    id
    title
    address
    tags
    owner
    createdAt
    updatedAt
  }
}`
