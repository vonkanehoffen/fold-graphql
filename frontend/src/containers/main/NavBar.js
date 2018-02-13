import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { withApollo } from 'react-apollo'

const NavBar = ({client}) => {
  return (
    <nav>
      <Link to="/" className="navbar">
        Fold.im
      </Link>
      <button onClick={client.resetStore}>ResetStore</button>
    </nav>
  )
}

NavBar.propTypes = {}

export default withApollo(NavBar)