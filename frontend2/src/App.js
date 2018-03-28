import React, { Component } from 'react';
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Amplify, {Auth} from 'aws-amplify'
import config from './config'
import 'normalize.css';
import './App.css';
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import {SESSION_LOADING, NOT_LOGGED_IN} from './helpers/constants'
import Loading from './components/Loading'
import Authorizer from './containers/Authorizer'
import NavBar from './containers/NavBar'

// Configure AWS Cognito
Amplify.configure({Auth: config.Auth})

// Setup GraphQL Client
const client = new ApolloClient({
  uri: config.gqlEndpoint,
  request: async (operation) => {
    const session = await Auth.currentSession()
    console.log(session)
    operation.setContext({
      headers: {
        authorization: session.idToken.jwtToken,
      }
    })
  }
})

class App extends Component {

  state = {
    session: SESSION_LOADING
  }

  setSession = (session) => this.setState({session})

  // setSession = async () => {
  //   let session
  //   try {
  //     session = await Auth.currentSession()
  //     console.log(session)
  //   } catch(e) {
  //     session = NOT_LOGGED_IN
  //   }
  //   this.setState({ session })
  // }

  componentDidMount() {
    Auth.currentSession()
      .then(session => this.setSession(session))
      .catch(e => this.setSession(NOT_LOGGED_IN))
  }

  render() {

    if(this.state.session === SESSION_LOADING) return (
      <Loading/>
    )

    if(this.state.session === NOT_LOGGED_IN) return (
      <Authorizer setSession={this.setSession}/>
    )
    
    return (
      <ApolloProvider client={client}>
        <BrowserRouter>
          <div id="App">
            <NavBar session={this.state.session} setSession={this.setSession}/>
            <Switch>
              <Route path="/" component={Home} />{/* Logged in users */}
              <Route component={NotFound} />
            </Switch>
          </div>
        </BrowserRouter>
      </ApolloProvider>
    );
  }
}

export default App;
