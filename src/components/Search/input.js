import React from "react"
import styled from "styled-components"
import { connectSearchBox } from "react-instantsearch-dom"

import Icon from "../Icon"
// import { SearchIcon, Form, Input } from "./styles"
// import { Form, Input } from "./styles"

const Form = styled.form`
  margin: 0;
  position: relative;
  border-radius: 0.25em;
`

const Input = styled.input`
  border: 1px solid ${(props) => props.theme.colors.searchBorder};
  color: ${(props) => props.theme.colors.text};
  background: ${(props) => props.theme.colors.searchBackground};
  padding: 0.5rem;
  padding-right: 2rem;
  border-radius: 0.25em;
  width: 100%;
`

const SearchIcon = styled(Icon)`
  position: absolute;
  top: 50%;
  margin-top: -12px;
  right: 6px;
  fill: ${(props) => props.theme.colors.text};
`

export default connectSearchBox(({ refine, ...rest }) => (
  <Form>
    <Input
      type="text"
      placeholder="Search"
      aria-label="Search"
      onChange={(e) => refine(e.target.value)}
      {...rest}
    />
    <SearchIcon />
  </Form>
))
