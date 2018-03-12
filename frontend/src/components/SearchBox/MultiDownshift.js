import React, { Component } from 'react'
import Downshift from 'downshift'
import AutosizeInput from 'react-input-autosize'
import {
  Label,
  Menu,
  ControllerButton,
  Input,
  Item,
  ArrowIcon,
  XIcon,
  InputValueWrapper,
} from './components'
import TagValue from './TagValue'

// Based on Downshift example. See:
// https://codesandbox.io/s/o4yp9vmm8z
// https://github.com/paypal/downshift#examples

class MultiDownshift extends Component {
  state = { inputValue: '' }

  handleStateChange = (changes, downshiftStateAndHelpers) => {
    if (!downshiftStateAndHelpers.isOpen) {
      this.setState({ inputValue: '' })
    }

    if (this.props.onChangedState) {
      this.props.onChangedState(changes, downshiftStateAndHelpers);
    }
  }

  onInputChange = (event) => {
    this.setState({ inputValue: event.target.value });
  };

  onTagBlur = (e, item) => {
    const { onItemChanged } = this.props;
    if (onItemChanged) {
      onItemChanged(item);
    }
  }

  onRemoveTag = (item) => {
    this.props.onRemoveItem(item);
  }

  onInputKeyDown = (event) => {
    const currentValue = event.target.value;
    switch (event.keyCode) {
      case 8: // backspace
        if (!currentValue) {
          event.preventDefault();
          this.popValue();
        }
        return;
      case 9: // tab
        if (this.state.inputValue) {
          this.props.onChange(this.state.inputValue);
          this.setState({ inputValue: '' });
        }

        event.preventDefault();
        event.stopPropagation();
        return;
      case 46: // backspace
        if (!this.state.inputValue && this.props.deleteRemoves) {
          event.preventDefault();
          this.popValue();
        }
        return;
      case 188: // comma
        if (!this.state.inputValue) {
          event.preventDefault();
        } else {
          this.props.onChange(this.state.inputValue);
          this.setState({ inputValue: '' });
        }
        break;
      default: return;
    }
    event.preventDefault();
  }

  popValue() {
    const { selectedItem, onRemoveItem } = this.props;
    if (onRemoveItem) {
      onRemoveItem({ value: selectedItem[selectedItem.length - 1], index: selectedItem.length - 1 });
    }
  }

  onWrapperClick = (e) => {
    if (this._inputWrapper === e.target || this._input === e.target) {
      this.focusOnInput();
      e.stopPropagation();
      e.preventDefault();
    }
  }

  focusOnInput() {
    this._input.focus();
    if (typeof this._input.getInput === 'function') {
      this._input.getInput().focus();
    }
  }

  inputRef = (c) => {
    this._input = c;
  }

  inputWrapperRef = (c) => {
    this._inputWrapper = c;
  }

  render() {
    const { itemToString, items, ...rest } = this.props;
    return (
      <Downshift
        onStateChange={this.handleStateChange}
        itemToString={itemToString}
        {...rest}>
        {({
            getLabelProps,
            getInputProps,
            getButtonProps,
            getItemProps,
            isOpen,
            toggleMenu,
            clearSelection,
            selectedItem,
            highlightedIndex,
          }) => {
          const _inputProps = getInputProps({
            value: this.state.inputValue,
            ref: this.inputRef,
            inputClassName: 'TODO',
            onChange: this.onInputChange,
            onKeyDown: this.onInputKeyDown
          });

          const tagItems = selectedItem.map((item, index) => {
            return { value: item, index };
          });

          return (
            <div style={{width: 300, margin: 'auto' }}>
              <Label {...getLabelProps() }>Find or create a Star Wars character</Label>
              <div style={{position: "relative"}}>
                <InputValueWrapper innerRef={this.inputWrapperRef} onClick={this.onWrapperClick} tabIndex="-1">
                  {tagItems.map(tag => (
                    <TagValue key={`Tag-${tag.index}`} onBlur={this.onTagBlur} onRemove={this.onRemoveTag} tag={tag} />
                  ))}
                  <AutosizeInput {..._inputProps} />
                </InputValueWrapper>

                <ControllerButton {...getButtonProps() }>
                  <ArrowIcon isOpen={isOpen} />
                </ControllerButton>
              </div>
              {!isOpen ? null : (
                <Menu>
                  {items.map((item, index) => (
                    <Item
                      key={`item-${index}`}
                      {...getItemProps({
                        item,
                        index,
                        isActive: highlightedIndex === index,
                        isSelected: selectedItem === item,
                      }) }
                    >
                      {item}
                    </Item>
                  ))}
                </Menu>
              )}
            </div>
          );
        }}
      </Downshift>
    )
  }
}

export default MultiDownshift;