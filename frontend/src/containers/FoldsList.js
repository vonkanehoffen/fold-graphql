import React, {Component} from 'react'
import PropTypes from 'prop-types'
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import AddFold from './AddFold'
import FoldCard from "../components/FoldCard"

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
        {folds.map(fold => <FoldCard fold={fold} remove={() => false} key={fold.id}/>)}
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
