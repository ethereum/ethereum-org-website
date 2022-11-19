import React, { useEffect, useState } from "react"
import styled from "@emotion/styled"
import { shuffle } from "lodash"

import Link from "./Link"

import { Box, Flex, Image, LinkBox, LinkOverlay, Text } from "@chakra-ui/react"

import ActionCard from "./ActionCard"
import data from "../data/contributors.json"
import { borderRadius } from "polished"

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
`

const ContributorCard = styled(ActionCard)`
  max-width: 132px;
  margin: 0.5rem;

  .action-card-image-wrapper {
    min-height: 100px;
  }
  .action-card-image {
    width: 132px;
    height: 132px;
  }
  .action-card-content {
    padding: 1rem;
    h3 {
      font-size: ${(props) => props.theme.fontSizes.m};
    }
    p {
      margin-bottom: 0;
    }
  }
`

export interface IProps {}

export interface Contributor {
  login: string
  name: string
  avatar_url: string
  profile: string
  contributions: Array<string>
}

const Contributors: React.FC<IProps> = () => {
  const [contributorsList, setContributorsList] = useState<Array<Contributor>>(
    []
  )

  useEffect(() => {
    const list = shuffle(data.contributors)
    setContributorsList(list)
  }, [])

  return (
    <>
      <p>
        Thanks to our {contributorsList.length} Ethereum community members who
        have contributed so far!
      </p>

      <Flex flexWrap="wrap">
        {contributorsList.map((contributor, idx) => (
          // <ActionCard
          //   key={idx}
          //   image={contributor.avatar_url}
          //   to={contributor.profile}
          //   title={contributor.name}
          //   alt={contributor.name}
          // />

          <LinkBox
            as="div"
            maxWidth="132px"
            margin="0.5rem"
            boxShadow="0px 14px 66px rgba(0, 0, 0, 0.07), 0px 10px 17px rgba(0, 0, 0, 0.03), 0px 4px 7px rgba(0, 0, 0, 0.05)"
            _hover={{
              textDecoration: "none",
              borderRadius: "4px",
              boxShadow: "0px 8px 17px rgba(0, 0, 0, 0.15)",
              background: "tableBackgroundHover",
              transition: "transform 0.1s",
              transform: "scale(1.02)",
            }}
            _focus={{
              textDecoration: "none",
              borderRadius: "4px",
              boxShadow: "0px 8px 17px rgba(0, 0, 0, 0.15)",
              background: "tableBackgroundHover",
              transition: "transform 0.1s",
              transform: "scale(1.02)",
            }}
          >
            <Box display="flex" flexDirection="row" minHeight="100px">
              <Image
                width="132px"
                height="132px"
                src={contributor.avatar_url}
                alt={contributor.name}
              />
            </Box>
            <Box padding="1rem">
              <Text
                as="h3"
                fontSize="md"
                marginTop="0.5rem"
                marginBottom="1rem"
              >
                <LinkOverlay
                  as={Link}
                  href={contributor.profile}
                  hideArrow
                  color="text"
                  textDecoration="none"
                  _hover={{ textDecoration: "none" }}
                  isExternal={true}
                >
                  {contributor.name}
                </LinkOverlay>
              </Text>
            </Box>
          </LinkBox>
        ))}
      </Flex>
    </>
  )
}

export default Contributors
