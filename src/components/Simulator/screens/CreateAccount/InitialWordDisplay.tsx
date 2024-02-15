import React from "react"
import { Box, Text } from "@chakra-ui/react"

import { WordList } from "./WordList"

type InitialWordDisplayProps = {
  words: Array<string>
}
export const InitialWordDisplay = ({ words }: InitialWordDisplayProps) => (
  <Box bg="background.highlight">
    <Box py={8}>
      <Text
        fontSize={{ base: "xl", md: "2xl" }}
        lineHeight={8}
        fontWeight="bold"
        px={{ base: 4, md: 8 }}
        mb={{ base: 0, md: 6 }}
      >
        Recovery phrase example
      </Text>
    </Box>
    <WordList words={words} />
  </Box>
)
