import React from "react"
import { Text, TextProps } from "@chakra-ui/react"

import Translation from "./Translation"

export interface IProps extends TextProps {}

const StatLoadingMessage: React.FC<IProps> = (props) => (
  <Text as="span" fontSize="2rem" {...props}>
    <Translation id="loading" />
  </Text>
)

export default StatLoadingMessage
