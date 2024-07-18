import { ComponentProps } from "react"
import { type HeadingProps, Text, VStack } from "@chakra-ui/react"

import Heading from "@/components/Heading"
import IdAnchor from "@/components/IdAnchor"
import InlineLink from "@/components/Link"
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
  const textStyles = size === "sm" ? { mb: 0 } : {}

  const headingPropsForAnchor = (id?: string): HeadingProps => {
    if (!id) return {}
    return {
      scrollMarginTop: 28,
      id,
      "data-group": true,
      position: "relative",
    } as HeadingProps
  }

  return (
    <VStack spacing={4} align="stretch" textAlign="start" mb={8}>
      <Heading size="md" {...headingPropsForAnchor(term)}>
        <IdAnchor id={term} />
        <Translation
          id={term + "-term"}
          options={options}
          transform={components}
        />
      </Heading>
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
    </VStack>
  )
}

export default GlossaryDefinition
