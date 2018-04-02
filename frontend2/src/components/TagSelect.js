import React from 'react';
import PropTypes from 'prop-types';
import keycode from 'keycode';
import Downshift from 'downshift';
import { withStyles } from 'material-ui/styles';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import { MenuItem } from 'material-ui/Menu';
import Chip from 'material-ui/Chip';
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

const GET_TAGS = gql`
  query getAllMyTags {
    getAllMyTags {
      name
    }
  }
`
// See https://material-ui-next.com/demos/autocomplete/

function renderInput(inputProps) {
  const { InputProps, classes, ref, ...other } = inputProps;

  return (
    <TextField
      InputProps={{
        inputRef: ref,
        classes: {
          root: classes.inputRoot,
        },
        ...InputProps,
      }}
      {...other}
    />
  );
}

function renderSuggestion({ suggestion, index, itemProps, highlightedIndex, selectedItem }) {
  const isHighlighted = highlightedIndex === index;
  const isSelected = (selectedItem || '').indexOf(suggestion.name) > -1;

  return (
    <MenuItem
      {...itemProps}
      key={suggestion.name}
      selected={isHighlighted}
      component="div"
      style={{
        fontWeight: isSelected ? 500 : 400,
      }}
    >
      {suggestion.name}
    </MenuItem>
  );
}
renderSuggestion.propTypes = {
  highlightedIndex: PropTypes.number,
  index: PropTypes.number,
  itemProps: PropTypes.object,
  selectedItem: PropTypes.string,
  suggestion: PropTypes.shape({ label: PropTypes.string }).isRequired,
};

function getSuggestions(inputValue, suggestions) {
  let count = 0;

  return suggestions.filter(suggestion => {
    const keep =
      (!inputValue || suggestion.name.toLowerCase().indexOf(inputValue.toLowerCase()) !== -1) &&
      count < 5;

    if (keep) {
      count += 1;
    }

    return keep;
  });
}

class TagSelect extends React.Component {
  state = {
    inputValue: '',
  };

  handleKeyDown = event => {
    const { inputValue } = this.state
    const { selectedTags, setTags } = this.props
    if (selectedTags.length && !inputValue.length && keycode(event) === 'backspace') {
      setTags(selectedTags.slice(0, selectedTags.length - 1))
    }
  }

  handleInputChange = event => {
    this.setState({ inputValue: event.target.value });
  };

  handleChange = item => {
    let { selectedTags } = this.props

    if (selectedTags.indexOf(item) === -1) {
      selectedTags = [...selectedTags, item];
    }

    this.setState({
      inputValue: '',
    });
    console.log('set tags...', selectedTags)
    this.props.setTags(selectedTags)
  };

  handleDelete = item => () => {
    const selectedTags = [...this.props.selectedTags];
    selectedTags.splice(selectedTags.indexOf(item), 1);
    this.props.setTags(selectedTags)
  };

  render() {
    const { classes, selectedTags } = this.props;
    const { inputValue } = this.state;

    return (
      <Query query={GET_TAGS}>
        {({ loading, error, data: { getAllMyTags } }) => {
          if (loading) return <div>Loading...</div>;
          if (error) return <div>Error :(</div>;
          return (
            <Downshift inputValue={inputValue} onChange={this.handleChange} selectedItem={selectedTags}>
              {({
                  getInputProps,
                  getItemProps,
                  isOpen,
                  inputValue,
                  selectedItem,
                  highlightedIndex,
                }) => (
                <div className={classes.container}>
                  {renderInput({
                    fullWidth: true,
                    classes,
                    InputProps: getInputProps({
                      startAdornment: selectedTags.map(item => (
                        <Chip
                          key={item}
                          tabIndex={-1}
                          label={item}
                          className={classes.chip}
                          onDelete={this.handleDelete(item)}
                        />
                      )),
                      onChange: this.handleInputChange,
                      onKeyDown: this.handleKeyDown,
                      placeholder: 'Select tags',
                    }),
                  })}
                  {isOpen ? (
                    <Paper className={classes.paper} square>
                      {getSuggestions(inputValue, getAllMyTags).map((suggestion, index) =>
                        renderSuggestion({
                          suggestion,
                          index,
                          itemProps: getItemProps({ item: suggestion.name }),
                          highlightedIndex,
                          selectedItem,
                        }),
                      )}
                    </Paper>
                  ) : null}
                </div>
              )}
            </Downshift>
          )}}
      </Query>
    );
  }
}

TagSelect.propTypes = {
  setTags: PropTypes.func.isRequired,
  selectedTags: PropTypes.array.isRequired,
  classes: PropTypes.object.isRequired,
};

const styles = theme => ({
  root: {
    flexGrow: 1,
    height: 250,
  },
  container: {
    flexGrow: 1,
    position: 'relative',
  },
  paper: {
    position: 'absolute',
    zIndex: 1,
    marginTop: theme.spacing.unit,
    left: 0,
    right: 0,
  },
  chip: {
    margin: `${theme.spacing.unit / 2}px ${theme.spacing.unit / 4}px`,
  },
  inputRoot: {
    flexWrap: 'wrap',
  },
});

export default withStyles(styles)(TagSelect);
