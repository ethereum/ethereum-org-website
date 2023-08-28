import React from "react"
import { Text } from "@chakra-ui/react"
import { SimulatorStateProps } from "../interfaces"
import { WalletHome } from "../"

export const SendReceive: React.FC<SimulatorStateProps> = ({ state }) => {
  const { step } = state
  return (
    <>
      {[0].includes(step) && (
        <WalletHome state={state} isEnabled={[false, true]} />
      )}
      {[1].includes(step) && (
        <Text>Send Receive screen component, step: {step + 1}</Text>
      )}
    </>
  )
}
