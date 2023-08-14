import React from "react"
import { Box, Heading, Text } from "@chakra-ui/react"

import Translation from "../../Translation"

interface IProps {
  term: string
  tooltip?: boolean
}

const GlossaryDefinition: React.FC<IProps> = ({ term, tooltip = false }) => {
  const styles = tooltip
    ? { fontSize: "md", mt: 0, mb: 2 }
    : { fontSize: { base: "xl", md: "2xl" } }

  return (
    <Box>
      <Heading as="h3" lineHeight={1.4} id={term} {...styles}>
        <Translation id={`${term}-term`} />
      </Heading>
      <Text>
        <Translation id={`${term}-definition`} />
      </Text>
    </Box>
  )
}

export default GlossaryDefinition
