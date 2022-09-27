// Libraries
import React, { useState } from "react"
import { sortBy } from "lodash"
import { Box, Flex, Input, Text } from "@chakra-ui/react"

// Components
import Emoji from "./OldEmoji"
import InfoBanner from "./InfoBanner"
import Link from "./Link"
import Translation from "./Translation"

// Data
import meetups from "../data/community-meetups.json"

export interface Meetup {
  title: string
  emoji: string
  location: string
  link: string
}

const filterMeetups = (query: string): Array<Meetup> => {
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
const sortedMeetups: Array<Meetup> = sortBy(meetups, ["emoji", "location"])

export interface IProps {}

// TODO create generalized CardList / TableCard
// TODO prop if ordered list or unordered
const MeetupList: React.FC<IProps> = () => {
  const [searchField, setSearchField] = useState<string>("")
  const filteredMeetups = filterMeetups(searchField)

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>): void =>
    setSearchField(event.target.value)

  return (
    <Box>
      <Input
        onChange={handleSearch}
        placeholder={"Search by meetup title or location"}
        display="block"
        mr="auto"
        ml="auto"
        mb={6}
        border="1px solid"
        borderColor="searchBorder"
        color="text"
        p={2}
        borderRadius={1}
        w="100%"
        _focus={{ outline: "primary solid 1px" }}
        _placeholder={{ color: "text200" }}
      />
      <Box boxShadow="tableBoxShadow">
        {filteredMeetups.length ? (
          filteredMeetups.map((meetup, idx) => (
            <Link
              key={idx}
              to={meetup.link}
              textDecoration="none"
              display="flex"
              justifyContent="space-between"
              color="text"
              boxShadow="0 1px 1px tableItemBoxShadow"
              mb={0.25}
              p={4}
              w="100%"
              _hover={{
                textDecoration: "none",
                borderRadius: 1,
                boxShadow: "0 0 1px primary",
                bg: "tableBackgroundHover",
              }}
            >
              <Flex flex="1 1 75%" mr={4}>
                <Box mr={4} opacity="0.4">
                  {idx + 1}
                </Box>
                <Box>{meetup.title}</Box>
              </Flex>
              <Flex
                textAlign={"right"}
                alignContent={"flex-start"}
                flex="1 1 25%"
                mr={4}
                flexWrap="wrap"
              >
                <Emoji text={meetup.emoji} size={1} mr={`0.5em`} />
                <Text mb={0} opacity={"0.6"}>
                  {meetup.location}
                </Text>
              </Flex>
            </Link>
          ))
        ) : (
          <InfoBanner emoji=":information_source:">
            <Translation id="page-community-meetuplist-no-meetups" />{" "}
            <Link to="https://github.com/ethereum/ethereum-org-website/blob/dev/src/data/community-meetups.json">
              <Translation id="page-community-please-add-to-page" />
            </Link>
          </InfoBanner>
        )}
      </Box>
    </Box>
  )
}

export default MeetupList
