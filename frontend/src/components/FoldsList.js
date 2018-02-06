import React, {Component} from 'react'
import PropTypes from 'prop-types'
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

class FoldsList extends Component {

  static defaultProps = {}
  static propTypes = {}
  state = {}

  render() {
    const { data: { loading, error, folds }} = this.props

    // return <pre>{JSON.stringify(this.props, null, 2)}</pre>
    if (loading) {
      return <p>Loading ...</p>;
    }
    if (error) {
      return <p>{error.message}</p>;
    }

    return (
      <div>
        <h1>FoldsList</h1>
        {folds.map(fold =>
          (<div key={fold.id} className={'fold ' + (fold.id < 0 ? 'optimistic' : '')}>
            <pre>{JSON.stringify(fold, null, 2)}</pre>
          </div>)
        )}
      </div>
    )
  }

}

const foldsListQuery = gql`
  query FoldsListQuery {
    folds {
      id
      title
      address
    }
  }
`

export default graphql(foldsListQuery)(FoldsList)
