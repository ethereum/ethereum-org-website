import React from "react"
import { Box, Heading, Text } from "@chakra-ui/react"

// TODO: Re-enable with translations once intl implemented
// import Translation from "../../Translation"

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

  // TODO: Re-enable with translations once intl implemented
  return (
    <Box>
      <Heading as="h3" lineHeight={1.4} id={term} {...headingStyles}>
        {/* <Translation id={`${term}-term`} /> */}
        {term}-term
      </Heading>
      <Text {...textStyles}>
        {/* <Translation id={`${term}-definition`} /> */}
        {term}-definition
      </Text>
    </Box>
  )
}

export default GlossaryDefinition
