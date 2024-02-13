import { Heading, type HeadingProps } from "@chakra-ui/react"

/**
 * @deprecated To be removed in favor of new Chakra Heading theme
 *
 * Renders a heading with the styles from the old theme.
 */
const OldHeading = (props: HeadingProps) => {
  let mt = 8

  if (typeof props.as === "undefined" || props.as === "h2") {
    mt = 12
  }

  if (props.as === "h3") {
    mt = 10
  }

  return <Heading mt={mt} mb={8} lineHeight={1.4} {...props} />
}

export default OldHeading
