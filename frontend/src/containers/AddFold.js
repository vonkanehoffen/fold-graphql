import React, {Component} from 'react'
import PropTypes from 'prop-types'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import { foldsListQuery } from './FoldsList'

class AddFold extends Component {

  static defaultProps = {}
  static propTypes = {}
  state = {
    title: '',
    address: '',
  }

  setProperty = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    })
  }

  save = () => {
    this.props.mutate({
      variables: this.state,
      optimisticResponse: {
        createFold: {
          ...this.state,
          id: Math.round(Math.random() * -1000000),
          createdAt: new Date().getTime(),
          updatedAt: new Date().getTime(),
          __typename: 'Fold',
        },
      },
      // https://www.apollographql.com/docs/react/features/cache-updates.html
      update: (store, { data: { createFold } }) => {
        const data = store.readQuery({ query: foldsListQuery });
        data.folds.push(createFold);
        store.writeQuery({ query: foldsListQuery, data });
        this.setState({ title: '', address: ''})
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
        <button onClick={this.save}>Save</button>
      </div>
    )
  }

}

const addFoldMutation = gql`
  mutation createFold($title: String!, $address: String!) {
    createFold(title: $title, address: $address) {
      id
      title
      address
      createdAt
      updatedAt
    }
  }
`

export default graphql(addFoldMutation)(AddFold)
