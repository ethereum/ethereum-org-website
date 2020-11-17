import React, { useState, createRef } from "react"
import styled from "styled-components"
import Emoji from "./Emoji"
import Link from "./Link"
import Icon from "./Icon"
import meetups from "../data/community/meetups.json"
import { useOnClickOutside } from "../hooks/useOnClickOutside"

const Container = styled.div`
  width: 100%;
`

const Form = styled.form`
  margin-bottom: 2rem;
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

const Table = styled.div`
  box-shadow: ${(props) => props.theme.colors.tableBoxShadow};
  display: ${(props) => (props.show ? `grid` : `none`)};
  max-height: 50vh;
  overflow: scroll;
  z-index: 2;
  position: absolute;
  width: 85%;
  background: ${(props) => props.theme.colors.background};
  border-radius: 4px;
`

const Item = styled(Link)`
  text-decoration: none;
  display: flex;
  justify-content: space-between;
  color: ${(props) => props.theme.colors.text} !important;
  box-shadow: 0 1px 1px ${(props) => props.theme.colors.tableItemBoxShadow};
  margin-bottom: 1px;
  padding: 1rem;
  width: 100%;
  color: #000;

  &:hover {
    border-radius: 4px;
    box-shadow: 0 0 1px ${(props) => props.theme.colors.primary};
    background: ${(props) => props.theme.colors.tableBackgroundHover};
  }
`

const RightContainer = styled.div`
  display: flex;
  align-items: right;
  align-content: flex-start;
  flex: 1 1 25%;
  margin-right: 1rem;
  flex-wrap: wrap;
`

const LeftContainer = styled.div`
  display: flex;
  flex: 1 1 75%;
  margin-right: 1rem;
`

const MeetupList = () => {
  const ref = createRef()
  const [query, setQuery] = useState(``)
  const [focus, setFocus] = useState(false)
  const searchString = "Search for Meetups..."

  useOnClickOutside(ref, () => setFocus(false))

  return (
    <Container ref={ref}>
      <Form>
        <StyledInput
          type="text"
          placeholder={searchString}
          value={query}
          aria-label={searchString}
          onChange={(event) =>
            setQuery(event.target.value.replace(/[^0-9\w\s]/g, ""))
          }
          onFocus={() => setFocus(true)}
          onSubmit={(e) => e.preventDefault()}
        />
        <SearchIcon name="search" />
      </Form>
      {/* TODO: Place tags/pills of each available region/flag, clickable to filter */}
      {query && (
        <Table show={query && query.length > 0 && focus}>
          {meetups
            .filter(({ title, emoji, location }) => {
              return (
                title.match(RegExp(query, "gi")) ||
                emoji.match(RegExp(query, "gi")) ||
                location.match(RegExp(query, "gi"))
              )
            })
            .map(({ title, emoji, location, link }, idx) => {
              return (
                <Item key={idx} to={link}>
                  <LeftContainer>{title}</LeftContainer>
                  <RightContainer>
                    <Emoji text={emoji} size={1} mr={`0.5em`} />
                    {location}
                  </RightContainer>
                </Item>
              )
            })}
        </Table>
      )}
    </Container>
  )
}

export default MeetupList
