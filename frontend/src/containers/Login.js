import React, {Component} from 'react'
import PropTypes from 'prop-types'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import { authenticateUser, signOut } from '../cognito'

class Login extends Component {

  static defaultProps = {}
  static propTypes = {}
  state = {
    email: '',
    password: '',
    response: '',
  }

  setProperty = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    })
  }

  login = async () => {
    const response = await authenticateUser(this.state.email, this.state.password)
    this.setState({ response })
  }

  doSignOut = () => {
    signOut()
  }

  render() {
    return (
      <div>
        <h4>Login</h4>
        <TextField label="Email" name="email" floatingLabelText="Email" value={this.state.email} onChange={this.setProperty}/>
        <TextField label="Password" name="password" floatingLabelText="Password" type="password" value={this.state.password} onChange={this.setProperty}/>
        <RaisedButton label="Login" onClick={this.login}/>
        <pre>{JSON.stringify(this.state.response, null, 2)}</pre>

        <h5>or signout</h5>
        <RaisedButton label="Sign out" onClick={this.doSignOut}/>
      </div>
    )
  }

}


export default Login 
