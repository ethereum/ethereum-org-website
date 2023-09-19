import React from "react"
import { graphql } from "gatsby"
import { Box, Container, Divider, useToken } from "@chakra-ui/react"

import InlineLink from "../components/Link"
import Emoji from "../components/Emoji"
import { ButtonLink } from "../components/Buttons"
import OldHeading from "../components/OldHeading"

const StudioRedirectPage = () => {
  const largeBp = useToken("breakpoints", "lg")

  return (
    <Container
      w="full"
      display="flex"
      maxW={largeBp}
      flexDirection="column"
      alignItems="center"
      alignSelf="flex-start"
      my={16}
      p={0}
    >
      <Box px={8} py={4} w="full">
        <Emoji fontSize="8xl" mb={10} text=":sunset_over_buildings:" />
        <OldHeading
          fontSize={{ base: "5xl", lg: "6xl" }}
          fontStyle="normal"
          fontWeight="bold"
          letterSpacing="normal"
          as="h1"
          textAlign="left"
        >
          We've sunset Studio
        </OldHeading>
        <p>
          Ethereum Studio is no longer actively maintained. We'd like to thank
          the <InlineLink to="https://superblocks.com/">Superblocks</InlineLink>
          team and the many open source contributors who generously helped
          support this project.
        </p>
        <p>
          You can find the source code for this project here:
          <ul>
            <li>
              <InlineLink to="https://github.com/SuperblocksHQ/ethereum-studio">
                Web IDE
              </InlineLink>
            </li>
            <li>
              <InlineLink to="https://github.com/SuperblocksHQ/studio-api-services-project">
                API server
              </InlineLink>
            </li>
          </ul>
        </p>
        <Divider
          my={16}
          w="10%"
          h="1"
          opacity="1"
          backgroundColor="homeDivider"
        />
        <OldHeading
          fontSize="3xl"
          fontStyle="normal"
          fontWeight="bold"
          letterSpacing="normal"
          textAlign="left"
          as="h2"
        >
          What to use instead
        </OldHeading>
        <p>
          We recommend using Remix as an alternative web IDE for your Solidity
          development. Additionally, we encourage you to consider{" "}
          <InlineLink to="/developers/local-environment/">
            setting up a local development environment
          </InlineLink>
          . Check out our developer portal for tools, documentation, and more.
        </p>
        <ButtonLink mr={1} variant="outline" to="https://remix.ethereum.org">
          Use Remix
        </ButtonLink>
        <ButtonLink variant="outline" to="/developers/">
          Developer portal
        </ButtonLink>
      </Box>
    </Container>
  )
}

export const query = graphql`
  query StudioPage($languagesToFetch: [String!]!) {
    locales: allLocale(
      filter: { language: { in: $languagesToFetch }, ns: { in: ["common"] } }
    ) {
      edges {
        node {
          ns
          data
          language
        }
      }
    }
  }
`

export default StudioRedirectPage
