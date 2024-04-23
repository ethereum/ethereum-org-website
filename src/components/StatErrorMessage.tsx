import type { TextProps } from "@chakra-ui/react"

import Text from "./OldText"
import Translation from "./Translation"

const StatErrorMessage = (props: TextProps) => (
  <Text as="span" fontSize="2rem" {...props}>
    <Translation id="loading-error-refresh" />
  </Text>
)

export default StatErrorMessage
