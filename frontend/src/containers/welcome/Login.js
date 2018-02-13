import React, {Component} from 'react'
import PropTypes from 'prop-types'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import { authenticateUser, signOut } from '../../cognito'
import { Link } from 'react-router-dom'
import ButtonLink from '../../components/ButtonLink'
import { withApollo, graphql } from 'react-apollo'
import { foldsListQuery } from '../main/FoldsList'

class Login extends Component {

  static defaultProps = {}
  static propTypes = {}
  state = {
    username: '',
    password: '',
    response: '',
  }

  setProperty = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    })
  }

  login = async () => {
    const response = await authenticateUser(this.state.username, this.state.password)
    this.setState({ response })
    this.props.client.resetStore() // TODO: This doesn't work for login following auth error on folds list :-(
  }

  doSignOut = () => {
    signOut()
    this.props.client.resetStore()
  }

  render() {
    return (
      <div>
        <h4>Login</h4>
        <TextField name="username" floatingLabelText="User Name" value={this.state.username} onChange={this.setProperty}/>
        <TextField name="password" floatingLabelText="Password" type="password" value={this.state.password} onChange={this.setProperty}/>
        <RaisedButton label="Login" onClick={this.login}/>
        <pre>{JSON.stringify(this.state.response, null, 2)}</pre>

        <h5><Link to="/confirm">Confirm user</Link></h5>
        <h5>or signout</h5>
        <RaisedButton label="Sign out" onClick={this.doSignOut}/>
        <ButtonLink to="/welcome">Back</ButtonLink>
      </div>
    )
  }

}

// https://www.apollographql.com/docs/react/features/cache-updates.html#reset-store ?

export default withApollo(Login)
