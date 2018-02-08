import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import FoldRemove from '../containers/FoldRemove'

const Card = styled.div`
  background:palevioletred;
  margin: 1rem;
  padding: 1rem;
`
const FoldCard = ({fold}) => {
  return (
    <Card>
      <h3>
        {fold.title}
        <Link to={`/fold/${fold.id}`}>
          <i className="material-icons">link</i>
        </Link>
      </h3>
      <Link to={`/edit/${fold.id}`}>Edit</Link>
      <FoldRemove foldId={fold.id}/>
    </Card>
  )
}

FoldCard.propTypes = {
  fold: PropTypes.object.isRequired,
}

export default FoldCard