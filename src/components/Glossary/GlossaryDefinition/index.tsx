import React from "react"
import { Box, Heading, Text } from "@chakra-ui/react"

import Translation from "../../Translation"

interface IProps {
  term: string
  size?: "md" | "sm"
}

const GlossaryDefinition: React.FC<IProps> = ({ term, size = "md" }) => {
  const headingStyles =
    size === "sm"
      ? { fontSize: "md", mt: 0, mb: 2 }
      : { fontSize: { base: "xl", md: "2xl" } }

  const textStyles = size === "sm" ? { mb: 0 } : {}

  return (
    <Box>
      <Heading as="h3" lineHeight={1.4} id={term} {...headingStyles}>
        <Translation id={`${term}-term`} />
      </Heading>
      <Text {...textStyles}>
        <Translation id={`${term}-definition`} />
      </Text>
    </Box>
  )
}

export default GlossaryDefinition
