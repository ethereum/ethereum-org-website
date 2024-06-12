import React from "react"
import { PiPaperPlaneRightFill } from "react-icons/pi"
import { Flex } from "@chakra-ui/react"

import { QrCodeIcon } from "../icons"
import type { SimulatorNav } from "../interfaces"

import { SendReceiveButton } from "./SendReceiveButton"
import type { SendReceiveEnabled } from "./types"

type SendReceiveButtonsProps = {
  nav?: SimulatorNav
  isEnabled?: SendReceiveEnabled
}
export const SendReceiveButtons = ({
  nav,
  isEnabled = [false, false],
}: SendReceiveButtonsProps) => {
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
