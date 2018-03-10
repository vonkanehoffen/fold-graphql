import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Downshift from 'downshift'

const SearchBox = ({ tags, onChange }) => {
  return (
    <Downshift
      onChange={onChange}
      render={({
                 getInputProps,
                 getItemProps,
                 isOpen,
                 inputValue,
                 selectedItem,
                 highlightedIndex,
               }) => (
        <div>
          <input {...getInputProps({placeholder: 'Favorite animal ?'})} />
          {isOpen ? (
            <div style={{border: '2px solid #111'}}>
              {tags
                .filter(
                  i =>
                    !inputValue ||
                    i.toLowerCase().includes(inputValue.toLowerCase()),
                )
                .map((item, index) => (
                  <div
                    {...getItemProps({item})}
                    key={item}
                    style={{
                      backgroundColor:
                        highlightedIndex === index ? '#f00' : '#0f0',
                      fontWeight: selectedItem === item ? 'bold' : 'normal',
                    }}
                  >
                    {item}
                  </div>
                ))}
            </div>
          ) : null}
        </div>
      )}
    />
  )
}

SearchBox.propTypes = {}

export default SearchBox