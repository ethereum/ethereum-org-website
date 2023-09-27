import React from "react"
import { TextProps } from "@chakra-ui/react"

import Translation from "./Translation"
import Text from "./OldText"

export interface IProps extends TextProps {}

const StatErrorMessage: React.FC<IProps> = (props) => (
  <Text as="span" fontSize="2rem" {...props}>
    <Translation id="loading-error-refresh" />
  </Text>
)

export default StatErrorMessage
