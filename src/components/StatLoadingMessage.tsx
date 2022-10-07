import React from "react"
import { Text } from "@chakra-ui/react"

import Translation from "./Translation"

export interface IProps {}

const StatLoadingMessage: React.FC<IProps> = (props) => (
  <Text as="span" fontSize="2rem" {...props}>
    <Translation id="loading" />
  </Text>
)

export default StatLoadingMessage
