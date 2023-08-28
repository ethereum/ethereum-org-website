import React from "react"
import { SimulatorStateProps } from "../interfaces"
import { ProgressCta, WalletHome } from "../"
import { ReceiveEther } from "./SendReceive/index"

export const SendReceive: React.FC<SimulatorStateProps> = ({ state }) => {
  const { step } = state
  return (
    <>
      {[0].includes(step) && (
        <WalletHome state={state} isEnabled={[false, true]} />
      )}
      {[1].includes(step) && <ReceiveEther />}
      {[1, 3, 5].includes(step) && <ProgressCta state={state} />}
    </>
  )
}
