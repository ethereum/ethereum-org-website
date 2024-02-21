import { Box, Text } from "@chakra-ui/react"

import OldHeading from "@/components/OldHeading"
import Translation from "@/components/Translation"

interface GlossaryDefinitionProps {
  term: string
  size?: "md" | "sm"
}

const GlossaryDefinition = ({ term, size = "md" }: GlossaryDefinitionProps) => {
  const headingStyles =
    size === "sm"
      ? { fontSize: "md", mt: 0, mb: 2 }
      : { fontSize: { base: "xl", md: "2xl" } }

  const textStyles = size === "sm" ? { mb: 0 } : {}

  return (
    <Box>
      <OldHeading as="h3" lineHeight={1.4} id={term} {...headingStyles}>
        <Translation id={"glossary:" + term + "-term"} />
      </OldHeading>
      {/**
       * `as="span"` prevents hydration warnings for strings that contain
       * elements that cannot be nested inside `p` tags, like `ul` tags
       * (found in some Glossary definition).
       * TODO: Develop a better solution to handle this case.
       */}
      <Text as="span" {...textStyles}>
        <Translation id={"glossary:" + term + "-definition"} />
      </Text>
    </Box>
  )
}

export default GlossaryDefinition
