import React from "react"
import { Box, Heading, Text } from "@chakra-ui/react"

import Translation from "../../Translation"

interface IProps {
  term: string
}

const GlossaryDefinition: React.FC<IProps> = ({ term }) => {
  return (
    <Box>
      <Heading
        as="h3"
        fontSize={{ base: "xl", md: "2xl" }}
        lineHeight={1.4}
        id={term}
      >
        <Translation id={`${term}-term`} />
      </Heading>
      <Text>
        <Translation id={`${term}-definition`} />
      </Text>
    </Box>
  )
}

export default GlossaryDefinition
