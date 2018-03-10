import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import RaisedButton from 'material-ui/RaisedButton'
import SearchBox from '../../components/SearchBox'

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
          <SearchBox
            tags={['bear', 'badger', 'donkey', 'ocelot', 'dog', 'cat', 'emu']}
            onChange={(selection => console.log(selection))}
          />
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