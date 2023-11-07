import { Flex } from "@chakra-ui/react"
import React from "react"
import { PiPaperPlaneRightFill } from "react-icons/pi"
import { SendReceiveButton } from "./SendRecieveButton"
import type { SimulatorNav } from "../interfaces"
import type { SendReceiveEnabled } from "./types"
import { QrCodeIcon } from "../icons"

interface SendReceiveButtonsProps {
  nav?: SimulatorNav
  isEnabled?: SendReceiveEnabled
}
export const SendReceiveButtons: React.FC<SendReceiveButtonsProps> = ({
  nav,
  isEnabled = [false, false],
}) => {
  const [isSendEnabled, isReceiveEnabled] = isEnabled
  if (nav && isSendEnabled && isReceiveEnabled)
    throw new Error(
      "Send and receive buttons cannot both be enabled while nav available."
    )
  const disableSend = !nav || !isSendEnabled
  const disableReceive = !nav || !isReceiveEnabled
  const highlightSend = !nav || !disableSend
  const highlightReceive = !nav || !disableReceive
  return (
    <Flex justify="space-around" w="full" gap={4}>
      <SendReceiveButton
        onClick={nav?.progressStepper}
        isDisabled={disableSend}
        isHighlighted={highlightSend}
        icon={PiPaperPlaneRightFill}
      >
        Send
      </SendReceiveButton>
      <SendReceiveButton
        onClick={nav?.progressStepper}
        isDisabled={disableReceive}
        isHighlighted={highlightReceive}
        icon={QrCodeIcon}
        isAnimated
      >
        Receive
      </SendReceiveButton>
    </Flex>
  )
}
