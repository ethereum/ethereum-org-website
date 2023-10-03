import React from "react"
import { Flex, Heading } from "@chakra-ui/react"
import Emoji from "./Emoji"
// TODO: Re-enable after intl implemented
// import Translation from "./Translation"

export interface IProps {
  children?: React.ReactNode
}

const SectionNav: React.FC<IProps> = ({ children }) => (
  <Flex
    direction="column"
    color="textTableOfContents"
    marginTop={12}
    justify="space-between"
    background="searchBackground"
    borderRadius="base"
    border="1px solid"
    borderColor="lightBorder"
    padding={6}
    paddingBottom={0}
  >
    <Flex align="flex-start">
      <Emoji text=":point_right:" mb={4} />
      <Heading
        as="h2"
        fontSize="md"
        lineHeight={7 / 5}
        letterSpacing="wider"
        marginLeft={6}
        textTransform="uppercase"
      >
        {/* TODO: Re-enable after intl implemented */}
        {/* <Translation id="in-this-section" /> */}
        In this section
      </Heading>
    </Flex>
    {children}
  </Flex>
)

export default SectionNav
