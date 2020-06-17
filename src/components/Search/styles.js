// import React from "react"
import styled, { css } from "styled-components"

export const Root = styled.div`
  position: relative;
  display: grid;
  grid-gap: 1em;
`

const focus = css`
  background: white;
  color: ${(props) => props.theme.colors.primary};
  cursor: text;
  width: 5em;
`

const collapse = css`
  width: 0;
  cursor: pointer;
  color: ${(props) => props.theme.lightBlue};
  ${(props) => props.focus && focus}
  margin-left: ${(props) => (props.focus ? `-1.6em` : `-1em`)};
  padding-left: ${(props) => (props.focus ? `1.6em` : `1em`)};
  ::placeholder {
    color: ${(props) => props.theme.colors.textSecondary};
  }
`

export const Input = styled.input`
  outline: none;
  border: none;
  font-size: 1em;
  background: transparent;
  transition: all 1s ease-out;
  border-radius: 0.25em;
  background: gray;
  width: 6em;
  margin-left: -1.6em;
  padding-left: 1.6em;
`

export const Form = styled.form`
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
`

export const HitsWrapper = styled.div`
  display: ${(props) => (props.show ? `grid` : `none`)};
  max-height: 80vh;
  overflow: scroll;
  z-index: 2;
  -webkit-overflow-scrolling: touch;
  position: absolute;
  right: 0;
  top: calc(100% + 0.5em);
  width: 80vw;
  max-width: 30em;
  box-shadow: 0 0 5px 0;
  padding: 1rem;
  background: white;
  border-radius: 0.25em;
  > * + * {
    padding-top: 1em !important;
    border-top: 2px solid black;
  }
  li + li {
    margin-top: 0.7em;
    padding-top: 0.7em;
    border-top: 1px solid gray;
  }
  * {
    margin-top: 0;
    padding: 0;
  }
  ul {
    margin: 0;
    list-style: none;
  }
  mark {
    color: ${(props) => props.theme.colors.primary};
  }
  header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.3em;
    h3 {
      color: white;
      background: ${(props) => props.theme.colors.textSecondary};
      padding: 0.1em 0.4em;
      border-radius: 0.25em;
    }
  }
  h3 {
    margin: 0 0 0.5em;
  }
  h4 {
    margin-bottom: 0.3em;
  }
`
