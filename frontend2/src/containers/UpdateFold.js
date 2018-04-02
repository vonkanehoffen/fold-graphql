import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import IconButton from 'material-ui/IconButton'
import EditIcon from 'material-ui-icons/Edit'
import CloseIcon from 'material-ui-icons/Close'
import TextField from 'material-ui/TextField'
import Button from 'material-ui/Button'
import TagSelect from '../components/TagSelect'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'


const UPDATE_FOLD = gql`
  mutation updateFold($id: ID!, $title: String, $address: String, $tags: [String!]) {
    updateFold(id: $id, title: $title, address: $address, tags: $tags) {
      id
      title
      address
      ownerId
      tags {
        name
        ownerId
        slug
      }
      createdAt
      updatedAt    
    }
  }
`
class UpdateFold extends React.Component {

  state = {
    active: false,
    title: this.props.fold.title,
    address: this.props.fold.address,
    tags: this.props.fold.tags,
  }

  setProperty = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    })
  }

  setTags = (tags) => this.setState({
    // TODO: Awkward - make tag format same in get and set endpoints?
    tags: tags.map(t => ({name: t, slug: t.replace(/ +/g, '-').toLowerCase()}))
  })

  render() {
    const { active, title, address } = this.state
    const tags = this.state.tags.map(t => t.name)

    if(active) {
      return (
        <Mutation
          mutation={UPDATE_FOLD}
          variables={{
            id: this.props.fold.id,
            title, address, tags
          }}>
          {(updateFold, { data }) => (
            <div>
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
              <TagSelect selectedTags={tags} setTags={this.setTags}/>
              <Button variant="raised" onClick={updateFold}>Save</Button>

              <IconButton onClick={() => {this.setState({active: false})}}>
                <CloseIcon/>
              </IconButton>

            </div>
          )}
        </Mutation>
      )
    } else {
      return (
        <IconButton onClick={() => {this.setState({active: true})}}>
          <EditIcon/>
        </IconButton>
      )
    }


  }
}

UpdateFold.propTypes = {
  fold: PropTypes.object.isRequired,
}

export default UpdateFold