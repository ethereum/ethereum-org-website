import React from "react"
import { useIntl } from "gatsby-plugin-intl"
import styled from "styled-components"
import { connectSearchBox } from "react-instantsearch-dom"

import Icon from "../Icon"
import { translateMessageId } from "../../utils/translations"

const Form = styled.form`
  margin: 0;
  position: relative;
  border-radius: 0.25em;
`

const StyledInput = styled.input`
  border: 1px solid ${(props) => props.theme.colors.searchBorder};
  color: ${(props) => props.theme.colors.text};
  background: ${(props) => props.theme.colors.searchBackground};
  padding: 0.5rem;
  padding-right: 2rem;
  border-radius: 0.25em;
  width: 100%;

  &:focus {
    outline: ${(props) => props.theme.colors.primary} auto 1px;
  }
`

const SearchIcon = styled(Icon)`
  position: absolute;
  top: 50%;
  margin-top: -12px;
  right: 6px;
  fill: ${(props) => props.theme.colors.text};
`

const Input = ({ query, setQuery, refine, ...rest }) => {
  const handleInputChange = (event) => {
    const value = event.target.value
    refine(value)
    setQuery(value)
  }
  
  const handleSubmit = (event) => {
    event.preventDefault()
  }

  const intl = useIntl()
  const searchString = translateMessageId("search", intl)

  return (
    <Form onSubmit={handleSubmit}>
      <StyledInput
        type="text"
        placeholder={searchString}
        value={query}
        aria-label={searchString}
        onChange={handleInputChange}
        {...rest}
      />
      <SearchIcon name="search" />
    </Form>
  )
}

// HOC to interact with InstantSearch context, e.g. with refine()
// https://www.algolia.com/doc/api-reference/widgets/search-box/react/#connector
export default connectSearchBox(Input)
