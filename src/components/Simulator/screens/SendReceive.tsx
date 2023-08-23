import React from "react"
import { Text } from "@chakra-ui/react"
import { SimulatorStateProps } from "../../../interfaces"

export const SendReceive: React.FC<SimulatorStateProps> = ({ state }) => {
  const { step } = state
  return <Text>SendReceive, step {step}</Text>
}
