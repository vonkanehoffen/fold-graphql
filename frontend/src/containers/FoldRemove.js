import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import foldsListQuery from '../graphql/foldsListQuery.graphql'

const FoldRemove = ({ foldId, mutate }) => {
  const deleteFold = (e) => {
    mutate({
      variables: {
        id: foldId,
      },
      update: (store, { data: { deleteFold }}) => {
        let data = store.readQuery({ query: foldsListQuery })
        data.folds = data.folds.filter(f => f.id !== deleteFold.id)
        store.writeQuery({ query: foldsListQuery, data})
      }
    })
  }
  
  return (
    <button onClick={deleteFold}>Remove</button>
  )
}

FoldRemove.propTypes = {}

const deleteFoldMutation = gql`
  mutation deleteFold($id: ID!) {
    deleteFold(id: $id) {
      id
    }
  }
`

export default graphql(deleteFoldMutation)(FoldRemove)
