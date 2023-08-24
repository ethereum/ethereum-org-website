import { Box, Text } from "@chakra-ui/react"
import React from "react"
import { WordList } from "./index"

interface IProps {
  words: Array<string>
}
export const InitialWordDisplay: React.FC<IProps> = ({ words }) => {
  console.log("inside InitialWordDisplay")
  return (
    <Box bg="background.highlight">
      <Box py={8}>
        <Text
          fontSize="2xl"
          lineHeight={8}
          fontWeight="bold"
          px={{ base: 4, md: 8 }}
        >
          Recovery phrase example
        </Text>
      </Box>
      <WordList words={words} />
    </Box>
  )
}
