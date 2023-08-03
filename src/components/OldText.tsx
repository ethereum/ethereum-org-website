import * as React from "react"
import { Text, TextProps } from "@chakra-ui/react"

/**
 * @deprecated To be removed in favor of new Chakra Text theme
 *
 * Renders body copy with a defined margin bottom for spacing (old theme)
 */
const OldText = (props: TextProps) => <Text mb="1.45rem" {...props} />

export default OldText
