import React, {Component} from 'react'
import PropTypes from 'prop-types'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
// import ChipInput from 'material-ui-chip-input'
import TextField from 'material-ui/TextField'
import Button from 'material-ui/Button'
import TagSelect from '../components/TagSelect'
import { Mutation } from 'react-apollo'
import { GET_FOLDS } from '../pages/Home'

const CREATE_FOLD = gql`
  mutation createFold($title: String!, $address: String!, $tags: [String!]) {
    createFold(title: $title, address: $address, tags: $tags) {
      id
      title
      address
      ownerId
      tags {
        name
        slug
      }
      createdAt
      updatedAt
    }
  }
`

class CreateFold extends Component {

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

  setTags = (tags) => this.setState({tags})

  render() {

    const { title, address, tags } = this.state
    const ownerId = this.props.session.idToken.payload['cognito:username']

    return (
      <Mutation
        mutation={CREATE_FOLD}
        variables={this.state}
        update={(cache, { data: { createFold }}) => {
          const { getAllMyFolds } = cache.readQuery({ query: GET_FOLDS })
          cache.writeQuery({
            query: GET_FOLDS,
            data: { getAllMyFolds: getAllMyFolds.concat([createFold]) }
          })
          this.setState({ title: '', address: '', tags: []})
        }}
        optimisticResponse={{
          createFold: {
            title,
            address,
            tags: tags.map(t => ({
              name: t,
              slug: t.replace(/ +/g, '-').toLowerCase(),
              ownerId,
              __typename: 'Tag',
            })),
            id: Math.round(Math.random() * -1000000),
            ownerId,
            createdAt: new Date().getTime(),
            updatedAt: new Date().getTime(),
            __typename: 'Fold',
          }
        }}
      >
        {(createFold, { data }) => (
          <div>
            <h3>Create Fold</h3>
            <TextField
              type="text"
              name="title"
              label="Title"
              value={this.state.title}
              onChange={this.setProperty}
            />
            <TextField
              type="text"
              name="address"
              label="Address"
              value={this.state.address}
              onChange={this.setProperty}
            />
            <TagSelect selectedTags={this.state.tags} setTags={this.setTags}/>
            <Button variant="raised" onClick={createFold}>Save</Button>
            <h3>returned data</h3>
            <pre>{JSON.stringify(data, null, 2)}</pre>
            <h3>state</h3>
            <pre>{JSON.stringify(this.state, null, 2)}</pre>
          </div>
        )}
      </Mutation>
    )
  }

}

export default CreateFold
