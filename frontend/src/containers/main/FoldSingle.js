import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import FoldCard from '../../components/FoldCard'
import FoldEdit from '../FoldEdit'
import singleFoldQuery from '../../graphql/singleFoldQuery.graphql'

const FoldSingle = ({ data: { loading, error, fold }}) => {
  if (loading) {
    return <p>Loading ...</p>;
  }
  if (error) {
    return <p>{error.message}</p>;
  }
  return (
    <div>
      <h1>FoldSingle</h1>
      <FoldCard fold={fold}/>
      <FoldEdit fold={fold}/>
    </div>
  )
}

FoldSingle.propTypes = {}

export default graphql(singleFoldQuery, {
  options: (props) => ({
    variables: {
      foldId: props.match.params.foldId,
    },
  })
})(FoldSingle)
