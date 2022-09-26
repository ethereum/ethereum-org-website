import React from "react"
import { Flex, Heading } from "@chakra-ui/react"
import Emoji from "./Emoji"
import Translation from "./Translation"

export interface IProps {
  children?: React.ReactNode
}

const SectionNav: React.FC<IProps> = ({ children }) => (
  <Flex
    flexDirection="column"
    color="textTableOfContents"
    marginTop={12}
    justifyContent="space-between"
    background="searchBackground"
    borderRadius="2xl"
    border="1px solid"
    borderColor="lightBorder"
    padding={6}
    paddingBottom={0}
  >
    <Flex display="flex" alignItems="flex-start">
      <Emoji text=":point_right:" mb={4} />
      <Heading
        as="h2"
        fontSize="md"
        lineHeight={7 / 5}
        letterSpacing="wider"
        marginLeft={6}
        textTransform="uppercase"
      >
        <Translation id="in-this-section" />
      </Heading>
    </Flex>
    {children}
  </Flex>
)

export default SectionNav
