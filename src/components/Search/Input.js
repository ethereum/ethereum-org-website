import React from "react"
import { useIntl } from "gatsby-plugin-intl"
import styled from "styled-components"
import { connectSearchBox } from "react-instantsearch-dom"

import { useKeyPress } from "../../hooks/useKeyPress"

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

  @media only screen and (min-width: ${(props) => props.theme.breakpoints.l}) {
    padding-left: 2rem;
  }
`

const SearchIcon = styled(Icon)`
  position: absolute;
  right: 6px;
  top: 50%;
  margin-top: -12px;

  @media only screen and (min-width: ${(props) => props.theme.breakpoints.l}) {
    left: 6px;
  }
`

const SearchSlash = styled.p`
  border: 1px solid ${(props) => props.theme.colors.searchBorder};
  border-radius: 0.25em;
  color: ${(props) => props.theme.colors.text};
  display: none;
  margin-bottom: 0;
  padding: 0 6px;
  position: absolute;
  right: 6px;
  top: 20%;

  @media only screen and (min-width: ${(props) => props.theme.breakpoints.l}) {
    display: inline-block;
  }
`

const Input = ({ query, setQuery, refine, ...rest }) => {
  const intl = useIntl()
  const searchString = translateMessageId("search", intl)

  const handleInputChange = (event) => {
    const value = event.target.value
    refine(value)
    setQuery(value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
  }

  const focusSearch = (event) => {
    const searchInput = document.getElementById("header-search")
    if (document.activeElement !== searchInput) {
      event.preventDefault()
      searchInput.focus()
    }
  }

  useKeyPress("/", focusSearch)

  return (
    <Form onSubmit={handleSubmit}>
      <StyledInput
        id="header-search"
        type="text"
        placeholder={searchString}
        value={query}
        aria-label={searchString}
        onChange={handleInputChange}
        {...rest}
      />
      <SearchSlash>/</SearchSlash>
      <SearchIcon name="search" />
    </Form>
  )
}

// HOC to interact with InstantSearch context, e.g. with refine()
// https://www.algolia.com/doc/api-reference/widgets/search-box/react/#connector
export default connectSearchBox(Input)
