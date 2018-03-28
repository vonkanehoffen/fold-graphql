import React from 'react'
import {Auth} from 'aws-amplify'

export const SESSION_LOADING = 'SESSION_LOADING'
export const SessionContext = React.createContext(SESSION_LOADING) // init value

export class SessionProvider extends React.Component {
  state = { session: SESSION_LOADING }

  async componentDidMount() {
    let session
    try {
      session = await Auth.currentSession()
    } catch(e) {
      session = false
    }
    this.setState({ session })
  }

  render() {
    return (
      <SessionContext.Provider value={this.state.session}>
        {this.props.children}
      </SessionContext.Provider>
    )
  }
}
