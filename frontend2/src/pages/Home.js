import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Query } from 'react-apollo'
import { gql } from 'apollo-boost'
import {SESSION_LOADING, SessionContext} from '../containers/SessionContext'
import CreateFold from '../containers/CreateFold'
import FoldCard from '../components/FoldCard'

export const GET_FOLDS = gql`
  query getAllMyFolds {
    getAllMyFolds {
      id
      ownerId
      title
      address
      tags {
        name
        slug
      }
    }
  }
`
const Home = ({session, filterTerms}) => {
  return (
    <div>
      <h1>Home</h1>
      <Query query={GET_FOLDS}>
        {({ loading, error, data }) => {
          if (loading) return <div>Loading...</div>;
          if (error) return <div>Error :(</div>;

          console.log(data)
          return (
            <div>
              {data.getAllMyFolds
                // Filter folds out that don't match every supplied term
                .filter(fold => filterTerms.every(term =>
                  fold.tags.find(tag => tag.name === term)
                ))
                .map(f => <FoldCard fold={f} key={f.id}/> )
              }
            </div>
          )
        }}
      </Query>
      <CreateFold session={session}/>
    </div>
  )
}

Home.propTypes = {
  session: PropTypes.object.isRequired,
  filterTerms: PropTypes.array.isRequired,
}

export default Home