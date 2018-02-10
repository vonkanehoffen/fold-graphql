import React, {Component} from 'react'
import PropTypes from 'prop-types'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import {confirmUser} from '../cognito'

class Login extends Component {

  static defaultProps = {}
  static propTypes = {}
  state = {
    email: '',
    code: '',
    response: '',
  }

  setProperty = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    })
  }

  signUp = async () => {
    const response = await confirmUser(this.state.email, this.state.code)
    this.setState({ response })
  }

  render() {
    return (
      <div>
        <h4>Confirm User</h4>
        <TextField floatingLabelText="Email" name="email" value={this.state.email} onChange={this.setProperty}/>
        <TextField floatingLabelText="Verification Code" name="code" type="password" value={this.state.code} onChange={this.setProperty}/>
        <RaisedButton label="Login" onClick={this.signUp}/>
        <pre>{JSON.stringify(this.state.response, null, 2)}</pre>
      </div>
    )
  }

}


export default Login
