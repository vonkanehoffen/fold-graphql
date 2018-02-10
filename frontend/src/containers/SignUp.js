import React, {Component} from 'react'
import PropTypes from 'prop-types'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import { signUpUser } from '../cognito'

class SignUp extends Component {

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

  signUp = async () => {
    const response = await signUpUser(this.state.email, this.state.password)
    this.setState({ response })
  }

  render() {
    return (
      <div>
        <h4>Signup</h4>
        <TextField label="Email" name="email" floatingLabelText="Email" value={this.state.email} onChange={this.setProperty}/>
        <TextField label="Password" name="password" floatingLabelText="Password" type="password" value={this.state.password} onChange={this.setProperty}/>
        <RaisedButton label="Sign Up" onClick={this.signUp}/>
        <pre>{JSON.stringify(this.state.response, null, 2)}</pre>
      </div>
    )
  }

}


export default SignUp 
