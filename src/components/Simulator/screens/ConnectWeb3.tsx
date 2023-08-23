import React from "react"
import { Text } from "@chakra-ui/react"
import { SimulatorStateProps } from "../../../interfaces"

export const ConnectWeb3: React.FC<SimulatorStateProps> = ({ state }) => {
  const { step } = state
  return <Text>ConnectWeb3, step {step}</Text>
}
