import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const HomeIntro = (props) => {
  return (
    <div>
      <h1>Fold.im</h1>
      <Link to="/signup">Sign Up</Link>
      <Link to="/login">Login</Link>

      <h3>and after that....</h3>
      <Link to="/folds">Folds</Link>
    </div>
  )
}

HomeIntro.propTypes = {}

export default HomeIntro