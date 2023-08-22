import React from "react"
import { Text } from "@chakra-ui/react"
import { SimulatorStateProps } from "../../../interfaces"

export const SendReceiveScreens: React.FC<SimulatorStateProps> = ({
  state,
}) => {
  const { step } = state
  return <Text>SendReceiveScreens, step {step}</Text>
}
