import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Query } from 'react-apollo'
import { gql } from 'apollo-boost'
import {SESSION_LOADING, SessionContext} from '../containers/SessionContext'

const GET_FOLDS = gql`
  query getAllFolds {
    getAllFolds {
      id
      title
      address
      tags {
        name
        slug
      }
    }
  }
`
const Home = (props) => {
  return (
    <SessionContext.Consumer>
      {session =>
        <div>
          <h1>Home</h1>
          <Query query={GET_FOLDS} variables={{ownerId: session}}>
            {({ loading, error, data }) => {
              if (loading) return <div>Loading...</div>;
              if (error) return <div>Error :(</div>;

              return (
                <pre>{JSON.stringify(data, null, 2)}</pre>
              )
            }}
          </Query>
        </div>
      }
    </SessionContext.Consumer>
  )
}

Home.propTypes = {}

export default Home