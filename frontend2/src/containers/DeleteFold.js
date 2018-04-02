import React from 'react'
import PropTypes from 'prop-types'
import IconButton from 'material-ui/IconButton'
import CloseIcon from 'material-ui-icons/Delete'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import {GET_FOLDS} from '../pages/Home'

const DELETE_FOLD = gql`
  mutation deleteFold($id: ID!) {
    deleteFold(id: $id) {
      id
    }
  }
`

const DeleteFold = ({id}) => {
  return (
    <Mutation
      mutation={DELETE_FOLD}
      variables={{id}}
      update={(cache, { data: { deleteFold } }) => {
        const { getAllMyFolds } = cache.readQuery({ query: GET_FOLDS })
        cache.writeQuery({
          query: GET_FOLDS,
          // If this is the optimistic response, give the deletion target a negative ID. If not, remove it.
          data: { getAllMyFolds: deleteFold.optimistic ?
              getAllMyFolds.map(f => f.id === deleteFold.id ? {...f, id: Math.round(Math.random() * -1000000)} : f) :
              getAllMyFolds.filter(f => f.id !== deleteFold.id) }
        })
      }}
      optimisticResponse={{
        deleteFold: {
          id,
          optimistic: true,
          __typename: "Fold"
        }
      }}
    >
      {mutate => (
        <IconButton onClick={() => mutate({variables: {id}})}>
          <CloseIcon/>
        </IconButton>
      )}
    </Mutation>
  )
}

DeleteFold.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
}

export default DeleteFold