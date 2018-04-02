import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Button from 'material-ui/Button'
import {Auth} from 'aws-amplify'
import {NOT_LOGGED_IN} from '../helpers/constants'
import TagSelect from '../components/TagSelect'

class NavBar extends Component {

  static defaultProps = {}
  static propTypes = {
    session: PropTypes.object.isRequired,
    setSession: PropTypes.func.isRequired,
    filterTerms: PropTypes.array.isRequired,
    setFilter: PropTypes.func.isRequired,
  }
  state = {}

  signOut = () => {
    Auth.signOut()
      .then(data => {
        this.props.setSession(NOT_LOGGED_IN)
      })
      .catch(err => console.log(err));
  }

  render() {
    const { filterTerms, setFilter, session } = this.props
    return (
      <div>
        <h1>NavBar</h1>
        <TagSelect setTags={setFilter} selectedTags={filterTerms}/>
        <p>User: {session.idToken.payload.name}</p>
        <Button variant="flat" onClick={this.signOut}>Sign Out</Button>
      </div>
    )
  }

}


export default NavBar 
