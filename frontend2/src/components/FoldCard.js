import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import DeleteFold from '../containers/DeleteFold'

const Card = styled.div`
  background:palevioletred;
  opacity: ${props => props.optimistic ? 0.5 : 1};
  margin: .5rem;
  padding: .5rem;
`

const Tag = styled.div`
  background:yellow;
  padding: .2rem;
  display: inline-block;
  margin: .2rem;
`
const FoldCard = ({fold}) => {
  return (
    <Card optimistic={fold.id < 0}>
      <h3>
        {fold.title}
        <Link to={`/fold/${fold.id}`}>
          <i className="material-icons">link</i>
        </Link>
        <div>
          Tags: {fold.tags.map((t, i) => <Link key={i} to={`/tag/${t.slug}`}>{t.name}</Link>)}
        </div>
        <div>
          {/*Owner: {fold.owner}*/}
        </div>
      </h3>
      <DeleteFold id={fold.id}/>
    </Card>
  )
}

FoldCard.propTypes = {
  fold: PropTypes.object.isRequired,
}

export default FoldCard