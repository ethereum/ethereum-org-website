import { Flex } from "@chakra-ui/react"
import React from "react"
import { PiPaperPlaneRightFill } from "react-icons/pi"
import { SendReceiveButton } from "./"
import type { SimulatorState } from "../interfaces"
import type { SendReceiveEnabled } from "./types"
import { QrCodeIcon } from "../icons"

interface SendReceiveButtonsProps {
  state?: SimulatorState
  isEnabled?: SendReceiveEnabled
}
export const SendReceiveButtons: React.FC<SendReceiveButtonsProps> = ({
  state,
  isEnabled = [false, false],
}) => {
  const [isSendEnabled, isReceiveEnabled] = isEnabled
  if (state && isSendEnabled === isReceiveEnabled)
    throw new Error(
      "Send and receive buttons cannot both be enabled or disabled. To disable both, do not pass state"
    )
  const disableSend = !state || !isSendEnabled
  const disableReceive = !state || !isReceiveEnabled
  const highlightSend = !state || !disableSend
  const highlightReceive = !state || !disableReceive
  return (
    <Flex justify="space-around" w="full" gap={4}>
      <SendReceiveButton
        onClick={state?.progressStepper}
        isDisabled={disableSend}
        isHighlighted={highlightSend}
        icon={PiPaperPlaneRightFill}
      >
        Send
      </SendReceiveButton>
      <SendReceiveButton
        onClick={state?.progressStepper}
        isDisabled={disableReceive}
        isHighlighted={highlightReceive}
        icon={QrCodeIcon}
      >
        Receive
      </SendReceiveButton>
    </Flex>
  )
}
