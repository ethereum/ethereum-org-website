import React from "react"
import { graphql, PageProps } from "gatsby"
import { Box, Flex, Heading, Text } from "@chakra-ui/react"

import InlineLink from "../components/Link"
import Translation from "../components/Translation"

const NotFoundPage = (props: PageProps) => (
  <Flex flexDir="column" align="center" w="full" mt={16} mb={0} mx="auto">
    <Box py={4} px={8} w="full">
      <Heading as="h1" size="2xl" my={8}>
        <Translation id="we-couldnt-find-that-page" />
      </Heading>
      <Text mb={8}>
        <Translation id="try-using-search" />{" "}
        <InlineLink to="/">
          <Translation id="return-home" />
        </InlineLink>
        .
      </Text>
    </Box>
  </Flex>
)

export default NotFoundPage

export const query = graphql`
  query NotFoundPage($languagesToFetch: [String!]!) {
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
