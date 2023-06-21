import React from "react"
import { graphql, PageProps } from "gatsby"
import { Box, Flex } from "@chakra-ui/react"

import Link from "../components/Link"
import Translation from "../components/Translation"

const NotFoundPage = (props: PageProps) => (
  <Flex flexDir="column" align="center" w="full" mt={16} mb={0} mx="auto">
    <Box py={4} px={8} w="full">
      <h1>
        <Translation id="we-couldnt-find-that-page" />
      </h1>
      <p>
        <Translation id="try-using-search" />{" "}
        <Link to="/">
          <Translation id="return-home" />
        </Link>
        .
      </p>
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
