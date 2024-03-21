import { Box, Flex, Link, Text } from "@chakra-ui/react"
import { ComponentProps, useState } from "react"

import { DEFAULT_GLOSSARY_NS } from "@/lib/constants"
import InlineLink from "@/components/Link"
import OldHeading from "@/components/OldHeading"
import Translation from "@/components/Translation"
import { VscLink } from "react-icons/vsc"

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
  const [showLink, setShowLink] = useState(false)
  const headingStyles =
    size === "sm"
      ? { fontSize: "md", mt: 0, mb: 2 }
      : { fontSize: { base: "xl", md: "2xl" } }

  const textStyles = size === "sm" ? { mb: 0 } : {}

  const linkStyles = {
    color: "inherit",
    textDecoration: "none",
  }

  const linkIconStyles = {
    left: "-1.5em",
    top: "0.8em",
    fontSize: "0.5em",
    color: "var(--eth-colors-primary-base)",
    display: showLink ? "" : "none",
    cursor: "pointer",
  }

  return (
    <Box textAlign="start" onMouseEnter={() => setShowLink(true)} onMouseLeave={() => setShowLink(false)}>
      <OldHeading as="h3" lineHeight={1.4} id={term} {...headingStyles}>
        <Link href={`#${term}`} {...linkStyles} _hover={{ border: 'none', textDecoration: 'none' }}>
          <Flex pos="relative">
            <Box pos="absolute" _hover={{ opacity: '0.8' }} {...linkIconStyles}>
              <VscLink />
            </Box>
            <Box>
              <Translation
                id={term + "-term"}
                options={options}
                transform={components}
              />
            </Box>
          </Flex>
        </Link>
      </OldHeading>

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
