import { ComponentProps } from "react"
import { Box, Text } from "@chakra-ui/react"

import InlineLink from "@/components/Link"
import OldHeading from "@/components/OldHeading"
import Translation from "@/components/Translation"

import { DEFAULT_GLOSSARY_NS } from "@/lib/constants"

interface GlossaryDefinitionProps {
  term: string
  size?: "md" | "sm"
  options?: ComponentProps<typeof Translation>["options"]
}

// Override the default `a` mapping to prevent displaying the glossary tooltip
// in the glossary definition
const components = {
  a: InlineLink,
}

const GlossaryDefinition = ({
  term,
  size = "md",
  options = { ns: DEFAULT_GLOSSARY_NS },
}: GlossaryDefinitionProps) => {
  const headingStyles =
    size === "sm"
      ? { fontSize: "md", mt: 0, mb: 2 }
      : { fontSize: { base: "xl", md: "2xl" } }

  const textStyles = size === "sm" ? { mb: 0 } : {}

  return (
    <Box textAlign="start">
      <OldHeading as="h3" lineHeight={1.4} id={term} {...headingStyles}>
        <Translation
          id={term + "-term"}
          options={options}
          transform={components}
        />
      </OldHeading>
      {/**
       * `as="span"` prevents hydration warnings for strings that contain
       * elements that cannot be nested inside `p` tags, like `ul` tags
       * (found in some Glossary definition).
       * TODO: Develop a better solution to handle this case.
       */}
      <Text as="span" {...textStyles}>
        <Translation
          id={term + "-definition"}
          options={options}
          transform={components}
        />
      </Text>
    </Box>
  )
}

export default GlossaryDefinition
