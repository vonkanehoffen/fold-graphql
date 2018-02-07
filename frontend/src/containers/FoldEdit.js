import React, {Component} from 'react'
import PropTypes from 'prop-types'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'

class FoldEdit extends Component {

  static defaultProps = {}
  static propTypes = {
    fold: PropTypes.object.isRequired,
  }
  state = {
    title: this.props.fold.title,
    address: this.props.fold.address,
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
        <button onClick={this.save}>Save</button>
      </div>
    )
  }

  setProperty = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
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

const updateFoldMutation = gql`
  mutation updateFold($foldId: ID! $title: String, $address: String) {
    updateFold(id: $foldId, title: $title, address: $address) {
      id
      title
      address
    }
  }
`


export default graphql(updateFoldMutation,
  // {
  //   props: ({mutate}) => ({
  //     update: (foldId, title, address) => mutate({variables: foldId, title, address})
  //   })
  // }
)(FoldEdit)
