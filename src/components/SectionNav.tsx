import React from "react"
import { Flex } from "@chakra-ui/react"
import Emoji from "./Emoji"
import Translation from "./Translation"
import OldHeading from "./OldHeading"

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
      <OldHeading
        as="h2"
        fontSize="md"
        lineHeight={7 / 5}
        letterSpacing="wider"
        marginLeft={6}
        textTransform="uppercase"
      >
        <Translation id="in-this-section" />
      </OldHeading>
    </Flex>
    {children}
  </Flex>
)

export default SectionNav
