import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const Card = styled.div`
  background:palevioletred;
  margin: 1rem;
  padding: 1rem;
`
const FoldCard = ({fold, remove}) => {
  return (
    <Card>
      <h3>
        {fold.title}
        <Link to={`/fold/${fold.id}`}>
          <i className="material-icons">link</i>
        </Link>
      </h3>
      <Link to={`/edit/${fold.id}`}>Edit</Link>
      <button onClick={remove}>Remove</button>
    </Card>
  )
}

FoldCard.propTypes = {
  fold: PropTypes.object.isRequired,
  remove: PropTypes.func.isRequired,
}

export default FoldCard