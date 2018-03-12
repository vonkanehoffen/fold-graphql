import React from 'react';
import AutosizeInput from 'react-input-autosize';
import styled from 'styled-components'

const XButton = styled.span({
  cursor: 'pointer'
})

class TagValue extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      editing: false,
      value: props.tag.value
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.tag !== this.props.tag) {
      this.setState({ value: nextProps.tag.value });
    }
  }

  onDoubleClick = () => {
    this.setState({ editing: true });
  }

  onBlur = (e) => {
    const { onBlur, tag } = this.props;
    this.setState({ editing: false });
    if (onBlur) {
      onBlur(e, { ...tag, value: this.state.value });
    }
  }

  onChange = (e) => {
    this.setState({ value: e.target.value });
  }

  onRemove = (e) => {
    const { onRemove, tag } = this.props;
    e.preventDefault();
    e.stopPropagation();
    if (onRemove) {
      onRemove({ ...tag, value: this.state.value });
    }
  }

  inputRef = (c) => {
    this._input = c;
  }

  render() {
    const { value, editing } = this.state;

    const inputProps = {
      type: 'text',
      value,
      ref: this.inputRef,
      inputClassName: 'TODO',
      onChange: this.onChange,
      onBlur: this.onBlur
    };

    return editing ? (
      <AutosizeInput {...inputProps} />
    ) : (
      <div style={{marginRight: 4, backgroundColor: '#ccc'}} onDoubleClick={this.onDoubleClick}>
        {value}{' '}
        <XButton onClick={this.onRemove}>x</XButton>
      </div>
    )
  }
}

export default TagValue;