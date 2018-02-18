import React, {Component} from 'react'
import PropTypes from 'prop-types'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import ChipInput from 'material-ui-chip-input'
import foldsListQuery from '../graphql/foldsListQuery.graphql'
import addFoldMutation from '../graphql/addFoldMutation.graphql'

class AddFold extends Component {

  static defaultProps = {}
  static propTypes = {
    session: PropTypes.object.isRequired,
  }
  state = {
    title: '',
    address: '',
    tags: [],
  }

  setProperty = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    })
  }

  addTag = (tag) => {
    this.setState({
      tags: [...this.state.tags, tag]
    })
  }

  removeTag = (tag, index) => {
    this.setState({
      tags: this.state.tags.filter(t => t !== tag),
    })
  }

  save = () => {
    const { mutate, session } = this.props
    mutate({
      variables: this.state,
      optimisticResponse: {
        createFold: {
          ...this.state,
          id: Math.round(Math.random() * -1000000),
          owner: session.idToken.payload['cognito:username'],
          createdAt: new Date().getTime(),
          updatedAt: new Date().getTime(),
          __typename: 'Fold',
        },
      },

      // https://www.apollographql.com/docs/react/features/cache-updates.html
      // Do we need to use fragments? https://www.apollographql.com/docs/react/features/fragments.html
      update: (store, { data: { createFold } }) => {
        const data = store.readQuery({ query: foldsListQuery, variables: this.props.variables });
        data.folds.push(createFold);
        store.writeQuery({ query: foldsListQuery, data, variables: this.props.variables });
        this.setState({ title: '', address: '', tags: []})
      },
    })
  }

  render() {
    return (
      <div>
        <h3>Add Fold</h3>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={this.state.title}
          onChange={this.setProperty}
        />
        <input
          type="text"
          name="address"
          placeholder="Address"
          value={this.state.address}
          onChange={this.setProperty}
        />
        <ChipInput
          value={this.state.tags}
          onRequestAdd={this.addTag}
          onRequestDelete={this.removeTag}
        />
        <button onClick={this.save}>Save</button>
      </div>
    )
  }

}

export default graphql(addFoldMutation)(AddFold)
