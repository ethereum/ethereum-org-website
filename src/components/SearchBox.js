import React from "react"
import { useIntl } from "gatsby-plugin-intl"
import styled from "styled-components"

import Icon from "./Icon"
import { getDefaultMessage } from "../utils/translations"

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

const SearchBox = () => {
  const intl = useIntl()

  return (
    <div>
      <Form action="">
        <Input
          placeholder={intl.formatMessage({
            id: "search",
            defaultMessage: getDefaultMessage("search"),
          })}
          type="text"
        />
        <SearchIcon name="search" />
      </Form>
    </div>
  )
}

export default SearchBox
