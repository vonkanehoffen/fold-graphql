import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Link, Redirect } from 'react-router-dom'
import RaisedButton from 'material-ui/RaisedButton'
import { withApollo } from 'react-apollo'
import { getUserSession, signOut } from '../../cognito'

class NavBar extends Component {

  state = {
    user: null,
  }

  async componentDidMount() {
    let session = false
    try {
      session = await getUserSession()
    } catch(e) {
      console.log(e)
    }
    if(session) {
      this.setState({ user: session.idToken.payload })
    } else {
      this.setState({ user: false })
    }
  }

  doSignOut = () => {
    signOut()
    this.setState({ user: false })
    this.props.client.resetStore()
  }

  render() {
    const { client } = this.props
    const { user } = this.state
    if(user === false) return <Redirect to="/welcome"/>
    return (
      <nav>
        <Link to="/" className="navbar">
          Fold.im
        </Link>
        {user ?
          <div>
            <span>User: {user.name}</span>
            <RaisedButton label="Sign out" onClick={this.doSignOut}/>
          </div>
          :
          <div>Not logged in</div>
        }
        <button onClick={client.resetStore}>ResetStore</button>
      </nav>
    )
  }
}

NavBar.propTypes = {}

export default withApollo(NavBar)