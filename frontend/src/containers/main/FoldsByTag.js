import React, {Component} from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { graphql } from 'react-apollo';
import AddFold from '../AddFold'
import FoldCard from "../../components/FoldCard"
import foldsListQuery from '../../graphql/foldsListQuery.graphql'

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  flex-wrap: wrap;
`
const FoldsByTag = ({ data: { loading, error, folds, variables }, session}) => {
  if (loading) {
    return <p>Loading ...</p>;
  }
  if (error) {
    return <p>{error.message}</p>;
  }

  return (
    <div>
      <h1>FoldsByTag</h1>
      <Wrapper>
        {folds.map(fold => <FoldCard fold={fold} key={fold.id}/>)}
      </Wrapper>
      <AddFold {...{session, variables}}/>
    </div>
  )
}

export default graphql(foldsListQuery, {
  options: (props) => ({
    variables: {
      owner: props.session.idToken.payload['cognito:username'],
      tag: props.match.params.tag,
    },
  })
})(FoldsByTag)
