import { Text, type TextProps } from "@chakra-ui/react"

/**
 * @deprecated To be removed in favor of new Chakra Text theme
 *
 * Renders body copy with a defined margin bottom for spacing (old theme)
 */
const OldText = (props: TextProps) => {
  const mb = props.as && props.as !== "p" ? 0 : "1.45rem"
  return <Text mb={mb} lineHeight="1.6rem" {...props} />
}

export default OldText
