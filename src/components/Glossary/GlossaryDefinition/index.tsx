import { ComponentProps } from "react"
import { Box, type HeadingProps, Text } from "@chakra-ui/react"

import IdAnchor from "@/components/IdAnchor"
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
  const commonHeadingProps = (id?: string): HeadingProps => ({
    fontWeight: 700,
    lineHeight: 1.4,
    ...headingPropsForAnchor(id),
  })
  const Heading3 = ({ id, children, ...rest }: HeadingProps) => (
    <OldHeading as="h3" {...commonHeadingProps(id)} fontSize="2xl" {...rest}>
      <IdAnchor id={id} />
      {children}
    </OldHeading>
  )

  return (
    <Box textAlign="start">
      <Heading3 id={term}>
        <Translation
          id={term + "-term"}
          options={options}
          transform={components}
        />
      </Heading3>
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
