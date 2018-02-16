import React, {Component} from 'react'
import PropTypes from 'prop-types'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import ChipInput from 'material-ui-chip-input'
import updateFoldMutation from '../graphql/updateFoldMutation.graphql'

class FoldEdit extends Component {

  static defaultProps = {}
  static propTypes = {
    fold: PropTypes.object.isRequired,
  }
  state = {
    title: this.props.fold.title,
    address: this.props.fold.address,
    tags: this.props.fold.tags,
  }

  render() {
    const { mutate, fold } = this.props
    return (
      <div>
        <h2>Edit Fold</h2>
        <pre>{JSON.stringify(this.props, null, 2)}</pre>
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
    this.props.mutate({
      variables: {
        foldId: this.props.fold.id,
        ...this.state,
      }
    })
  }

}

export default graphql(updateFoldMutation,
  // {
  //   props: ({mutate}) => ({
  //     update: (foldId, title, address) => mutate({variables: foldId, title, address})
  //   })
  // }
)(FoldEdit)
