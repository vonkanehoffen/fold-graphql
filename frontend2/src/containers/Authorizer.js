import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Button from 'material-ui/Button'
import TextField from 'material-ui/TextField'
import {Auth} from 'aws-amplify'
import Error from '../components/Error'
import Loading from '../components/Loading'


const SIGN_IN = 'SIGN_IN'
const SIGN_UP = 'SIGN_UP'
const CONFIRM = 'CONFIRM'

class Authorizer extends Component {

  static defaultProps = {}
  static propTypes = {
    setSession: PropTypes.func.isRequired,
  }
  state = {
    view: SIGN_IN,
    loading: false,
    username: '',
    password: '',
    email: '',
    verificationCode: '',
    error: false,
  }

  setView = (view) => this.setState({ view, loading: false })
  setLoading = () => this.setState({ loading: true, error: false })
  setError = (error) => this.setState({ error, loading: false })
  resetError = () => this.setState({error: false})
  setTextInput = (e) => this.setState({[e.target.name]: e.target.value})

  signIn = () => {
    this.setLoading()
    Auth.signIn(
      this.state.username,
      this.state.password,
    )
      .then(user => {
        console.log(user)
        this.props.setSession(user.signInUserSession)
      })
      .catch(e => this.setError(e.message))
  }

  signUp = () => {
    this.setLoading()
    const {
      username, password, email,
    } = this.state
    Auth.signUp({
      username,
      password,
      attributes: {
        name: username, // TODO: remove. Need to regenerate user pool tho.
        email,          // optional
      },
    })
      .then(data => this.setView(CONFIRM))
      .catch(e => this.setError(e.message))
  }

  confirm = () => {
    this.setLoading()
    Auth.confirmSignUp(this.state.username, this.state.verificationCode)
      .then(data => {
        console.log(data)
        if(data === 'SUCCESS') {
          console.log('Now login...')
        }
      })
      .catch(e => this.setError(e.message))
  }
  render() {
    switch(this.state.view) {
      case SIGN_IN: return (
        <div>
          <h1>Login</h1>
          <TextField label="User name" name="username" value={this.state.username} onChange={this.setTextInput}/>
          <TextField label="Password" type="password" name="password" value={this.state.password} onChange={this.setTextInput}/>
          <Button variant="raised" onClick={this.signIn}>Login</Button>
          <Button variant="flat" onClick={() => this.setView(SIGN_UP)}>Sign up</Button>
          <pre>{JSON.stringify(this.state, null, 2)}</pre>
          {this.state.loading && <Loading/>}
          {this.state.error && <Error message={this.state.error} reset={this.resetError}/>}
        </div>
      )
      case SIGN_UP: return (
        <div>
          <h1>Sign up</h1>
          <TextField label="User name" name="username" value={this.state.username} onChange={this.setTextInput}/>
          <TextField label="Password" type="password" name="password" value={this.state.password} onChange={this.setTextInput}/>
          <TextField label="Email" type="email" name="email" value={this.state.email} onChange={this.setTextInput}/>
          <Button variant="raised" onClick={this.signUp}>Sign Up</Button>
          <Button variant="flat" onClick={() => this.setView(SIGN_IN)}>Sign In</Button>
          <Button variant="flat" onClick={() => this.setView(CONFIRM)}>Confirm</Button>
        </div>
      )
      case CONFIRM: return (
        <div>
          <h1>Confirm</h1>
          <TextField label="User name" name="username" value={this.state.username} onChange={this.setTextInput}/>
          <TextField label="Verification Code" name="verificationCode" value={this.state.verificationCode} onChange={this.setTextInput}/>
          <Button variant="raised" onClick={this.confirm}>Confirm</Button>
          <Button variant="flat" onClick={() => this.setView(SIGN_IN)}>Sign In</Button>
        </div>
      )
    }
  }

}


export default Authorizer 
