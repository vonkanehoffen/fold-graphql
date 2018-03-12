import React from 'react'
import styled from 'styled-components'

const Item = styled.div`
  position: relative;
  cursor: pointer;
  display: block;
  border: none;
  height: auto;
  text-align: left;
  background: darkgoldenrod;
  border-top: none;
  line-height: 1em;
  color: ${props => props.isActive ? 'blue' : 'green'};
  font-size: 1rem;
  text-transform: none;
  font-weight: ${props => props.isSelected ? '700' : '300'};
  box-shadow: none;
  padding: .8rem 1.1rem;
  white-space: normal;
  word-wrap: normal;
`

const Input = styled.input`
  width: 100%; // full width - icon width/2 - border
  font-size: 14px;
  word-wrap: break-word;
  line-height: 1em;
  outline: 0;
  white-space: normal;
  min-height: 2em;
  background: #ff0;
  display: inline-block;
  padding: 1em 2em 1em 1em;
  color: rgba(0,0,0,.87);
  box-shadow: none;
  border: 1px solid rgba(34,36,38,.15);
  border-radius: ${props => props.isOpen ? '.3rem .3rm 0 0' : '.30rem'};
  transition: box-shadow .1s ease,width .1s ease;
  &:hover, &:focus {
    border-color: #96c8da;
    box-shadow: 0 2px 3px 0 rgba(34,36,38,.15);
  }
`

const Label = styled.label`
  font-weight: bold;
  display: block;
  margin-bottom: 10px;
`

const InputValueWrapper = styled.div`
  display: flex;;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  flex: 1 1 auto;
  padding: 4px;
  border: 1px #c5c4c4 solid;
  border-radius: 4px;
`

const Menu = styled.div`
  max-height: 20rem;
  overflow-y: auto;
  overflow-x: hidden;
  border-top-width: 0;
  outline: 0;
  border-radius: 0 0 .28571429rem .28571429rem;
  transition: opacity .1s ease;
  box-shadow: 0 2px 3px 0 rgba(34,36,38,.15);
  border-color: #96c8da;
  border-right-width: 1px;
  border-bottom-width: 1px;
  border-left-width: 1px;
  border-style: solid;
`

const ControllerButton = styled.button`
  background-color: transparent;
  border: none;
  position: absolute;
  right: 0;
  top: 0;
  cursor: pointer;
  width: 47px;
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: center;
  align-items: center;
`

function ArrowIcon({isOpen}) {
  return (
    <svg
      viewBox="0 0 20 20"
      preserveAspectRatio="none"
      width={16}
      fill="transparent"
      stroke="#979797"
      strokeWidth="1.1px"
      transform={isOpen ? 'rotate(180)' : null}
    >
      <path d="M1,6 L10,15 L19,6" />
    </svg>
  )
}

function XIcon() {
  return (
    <svg
      viewBox="0 0 20 20"
      preserveAspectRatio="none"
      width={12}
      fill="transparent"
      stroke="#979797"
      strokeWidth="1.1px"
    >
      <path d="M1,1 L19,19" />
      <path d="M19,1 L1,19" />
    </svg>
  )
}

export { Menu, ControllerButton, Input, Item, ArrowIcon, XIcon, Label, InputValueWrapper}
