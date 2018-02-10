import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import FoldRemove from '../containers/FoldRemove'

const Card = styled.div`
  background:palevioletred;
  opacity: ${props => props.optimistic ? 0.5 : 1};
  margin: 1rem;
  padding: 1rem;
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
          Tags: {fold.tags.map((t, i) => <Tag key={i}>{t}</Tag>)}
        </div>
        <div>
          Owner: {fold.owner}
        </div>
      </h3>
      <FoldRemove foldId={fold.id}/>
    </Card>
  )
}

FoldCard.propTypes = {
  fold: PropTypes.object.isRequired,
}

export default FoldCard