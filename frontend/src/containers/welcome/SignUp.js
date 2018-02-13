import React, {Component} from 'react'
import PropTypes from 'prop-types'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import ButtonLink from '../../components/ButtonLink'
import { signUpUser } from '../../cognito'

class SignUp extends Component {

  static defaultProps = {}
  static propTypes = {}
  state = {
    name: '',
    email: '',
    password: '',
    response: '',
  }

  setProperty = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    })
  }

  usernameValid = () => {
    // Cognito says [\p{L}\p{M}\p{S}\p{N}\p{P}]+ is the pattern, but dunno how that works...
    const regexp = /^[a-zA-Z0-9-_]+$/
    const { name } = this.state
    if(name.length < 1) return false
    return (regexp.test(name) && name.length < 64) ? false : 'Username must be alphanumeric characters only.'
  }

  signUp = async () => {
    const response = await signUpUser(this.state.name, this.state.email, this.state.password)
    this.setState({ response })
  }

  // TODO: Hmm... aliases: https://docs.aws.amazon.com/cognito/latest/developerguide/user-pool-settings-attributes.html#user-pool-settings-aliases
  // Username is not the same as "name" or "preferred name"
  render() {
    return (
      <div>
        <h4>Signup</h4>
        <TextField name="name" floatingLabelText="Name" value={this.state.name} onChange={this.setProperty} errorText={this.usernameValid()}/>
        <TextField name="email" floatingLabelText="Email" value={this.state.email} onChange={this.setProperty}/>
        <TextField name="password" floatingLabelText="Password" type="password" value={this.state.password} onChange={this.setProperty}/>
        <RaisedButton label="Sign Up" onClick={this.signUp}/>
        <pre>{JSON.stringify(this.state.response, null, 2)}</pre>
        <ButtonLink to="/welcome">Back</ButtonLink>
      </div>
    )
  }

}


export default SignUp 
