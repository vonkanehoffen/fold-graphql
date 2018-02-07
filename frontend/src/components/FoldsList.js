import React, {Component} from 'react'
import PropTypes from 'prop-types'
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import AddFold from './AddFold'

const FoldsList = ({ data: { loading, error, folds }}) => {
    if (loading) {
      return <p>Loading ...</p>;
    }
    if (error) {
      return <p>{error.message}</p>;
    }

    return (
      <div>
        <h1>FoldsList</h1>
        {folds.map(fold =>
          (<div key={fold.id} className={'fold ' + (fold.id < 0 ? 'optimistic' : '')}>
            <pre>{JSON.stringify(fold, null, 2)}</pre>
          </div>)
        )}
        <AddFold/>
      </div>
    )
}

export const foldsListQuery = gql`
  query foldsListQuery {
    folds {
      id
      title
      address
    }
  }
`

export default graphql(foldsListQuery)(FoldsList)
