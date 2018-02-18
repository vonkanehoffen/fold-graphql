import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import RaisedButton from 'material-ui/RaisedButton'

const NavBar = ({ session, doSignOut }) => {
  return (
    <nav>
      <Link to="/" className="navbar">
        Fold.im
      </Link>
      {session.idToken ?
        <div>
          <span>User: {session.idToken.payload.name}</span>
          <RaisedButton label="Sign out" onClick={doSignOut}/>
        </div>
        :
        <div>Not logged in</div>
      }
    </nav>
  )
}

NavBar.propTypes = {
}

export default NavBar