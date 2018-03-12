import React, {Component} from 'react'
import matchSorter from 'match-sorter'
import MultiDownshift from './MultiDownshift';

class SearchBox extends Component {
  allItems = ['bear', 'badger', 'donkey', 'ocelot', 'dog', 'cat', 'emu']
  state = {items: this.allItems, selectedItems: [] }
  handleStateChange = (changes, downshiftState) => {
    if (changes.hasOwnProperty('inputValue')) {
      this.setState({items: this.getItems(changes.inputValue)})
    }
    // handle stuff here if you need to
    // this is especially useful if you need
    // to control some of the internal state yourself
  }

  handleChange = (selectedItem, downshiftState) => {
    this.setState({items: this.allItems})
  }

  getItems = value => {
    return value
      ? matchSorter(this.allItems, value)
      : this.allItems
  }

  onItemAdd = (selectedItem) => {
    this.setState({ selectedItems: [...this.state.selectedItems, selectedItem] })
  }

  onRemoveItem = (item) => {
    const copy = [...this.state.selectedItems]
    copy.splice(item.index, 1)
    this.setState({ selectedItems: copy })
  }

  onItemChanged = (item) => {
    const copy = [...this.state.selectedItems]
    copy.splice(item.index, 1, item.value)
    this.setState({ selectedItems: copy })
  }

  itemToString(i) {
    return i ? i.name : ''
  }

  render() {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column',
          textAlign: 'center',
        }}
      >
        <h2>Multi select creatable example</h2>
        <MultiDownshift
          selectedItem={this.state.selectedItems}
          onChangedState={this.handleStateChange}
          onChange={this.onItemAdd}
          onItemChanged={this.onItemChanged}
          onRemoveItem={this.onRemoveItem}
          items={this.state.items}
          itemToString={this.itemToString}
        />
      </div>
    )
  }
}

export default SearchBox