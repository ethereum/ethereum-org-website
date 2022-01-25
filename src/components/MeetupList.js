// Libraries
import React, { useState } from "react"
import styled from "styled-components"
import { sortBy } from "lodash"

// Components
import Emoji from "./Emoji"
import InfoBanner from "./InfoBanner"
import Link from "./Link"
import Translation from "../components/Translation"

// Data
import meetups from "../data/community-meetups.json"

const Table = styled.div`
  box-shadow: ${(props) => props.theme.colors.tableBoxShadow};
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

const ItemNumber = styled.div`
  margin-right: 1rem;
  opacity: 0.4;
`
const ItemTitle = styled.div``
const ItemDesc = styled.p`
  margin-bottom: 0;
  opacity: 0.6;
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

const StyledInput = styled.input`
  display: block;
  margin-right: auto;
  margin-left: auto;
  margin-bottom: 1.5rem;

  border: 1px solid ${(props) => props.theme.colors.searchBorder};
  color: ${(props) => props.theme.colors.text};
  background: ${(props) => props.theme.colors.searchBackground};
  padding: 0.5rem;
  border-radius: 0.25em;
  width: 100%;

  &:focus {
    outline: ${(props) => props.theme.colors.primary} auto 1px;
  }
  &:placeholder {
    color: ${(props) => props.theme.colors.text200};
  }
`

const filterMeetups = (query) => {
  if (!query) return sortedMeetups

  const lowercaseQuery = query.toLowerCase()

  return sortedMeetups.filter((meetup) => {
    return (
      meetup.title.toLowerCase().includes(lowercaseQuery) ||
      meetup.location.toLowerCase().includes(lowercaseQuery)
    )
  })
}

// sort meetups by country and then by city
const sortedMeetups = sortBy(meetups, ["emoji", "location"])

// TODO create generalized CardList / TableCard
// TODO prop if ordered list or unordered
const MeetupList = () => {
  const [searchField, setSearchField] = useState("")
  const filteredMeetups = filterMeetups(searchField)

  const handleSearch = (event) => setSearchField(event.target.value)

  return (
    <div>
      <StyledInput
        onChange={handleSearch}
        placeholder={"Search by meetup title or location"}
      />
      <Table>
        {filteredMeetups.length ? (
          filteredMeetups.map((meetup, idx) => (
            <Item key={idx} to={meetup.link}>
              <LeftContainer>
                <ItemNumber>{idx + 1}</ItemNumber>
                <ItemTitle>{meetup.title}</ItemTitle>
              </LeftContainer>
              <RightContainer>
                <Emoji text={meetup.emoji} size={1} mr={`0.5em`} />
                <ItemDesc>{meetup.location}</ItemDesc>
              </RightContainer>
            </Item>
          ))
        ) : (
          <InfoBanner emoji=":information_source:">
            <Translation id="page-community-meetuplist-no-meetups" />{" "}
            <Link to="https://github.com/ethereum/ethereum-org-website/blob/dev/src/data/community-meetups.json">
              <Translation id="page-community-please-add-to-page" />
            </Link>
          </InfoBanner>
        )}
      </Table>
    </div>
  )
}

export default MeetupList
