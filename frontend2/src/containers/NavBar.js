import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Button from 'material-ui/Button'
import {Auth} from 'aws-amplify'
import {NOT_LOGGED_IN} from '../helpers/constants'

class NavBar extends Component {

  static defaultProps = {}
  static propTypes = {
    session: PropTypes.object.isRequired,
    setSession: PropTypes.func.isRequired,
  }
  state = {}

  signOut = () => {
    Auth.signOut()
      .then(data => {
        console.log(data)
        this.props.setSession(NOT_LOGGED_IN)
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div>
        <h1>NavBar</h1>
        <p>User: {this.props.session.idToken.payload.name}</p>
        <Button variant="flat" onClick={this.signOut}>Sign Out</Button>
      </div>
    )
  }

}


export default NavBar 
