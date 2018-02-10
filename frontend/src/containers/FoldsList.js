import React, {Component} from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import AddFold from './AddFold'
import FoldCard from "../components/FoldCard"

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  flex-wrap: wrap;
`
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
        <Wrapper>
          {folds.map(fold => <FoldCard fold={fold} key={fold.id}/>)}
        </Wrapper>
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
      tags
      owner
      createdAt
      updatedAt
    }
  }
`

export default graphql(foldsListQuery)(FoldsList)
