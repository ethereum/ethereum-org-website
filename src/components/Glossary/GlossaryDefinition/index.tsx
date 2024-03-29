import { ComponentProps } from "react"
import { CiLink } from "react-icons/ci"
import { Box, type HeadingProps, Icon, Link, Text } from "@chakra-ui/react"

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

  const IdAnchor = ({ id }: { id?: string }) => {
    if (!id) return null
    return (
      <Link
        href={"#" + id}
        position="absolute"
        insetInlineEnd="100%"
        aria-label={id.replaceAll("-", " ") + " permalink"}
        opacity={0}
        _groupHover={{ opacity: 1 }}
        _focus={{ opacity: 1 }}
        transition="opacity 0.1s ease-in-out"
      >
        <Icon as={CiLink} fontSize="xl" me="1" />
      </Link>
    )
  }
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

      <Text {...textStyles}>
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
