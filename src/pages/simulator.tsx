import { Flex } from "@chakra-ui/react"
import React from "react"
import { PathButton } from "../components/Simulator/"
import type { PathOption } from "../interfaces"

const pathOptions: Array<PathOption> = [
  {
    primaryText: "Create account",
    secondaryText: "How to?",
    iconName: "EthWalletIcon",
    onClick: () => console.log("clicked Create Account"),
  },
  {
    primaryText: "Send/receive",
    secondaryText: "How to?",
    iconName: "WalletAppIcon",
    onClick: () => console.log("clicked Send/Receive"),
  },
  {
    primaryText: "Connect to Web3",
    secondaryText: "How to?",
    iconName: "ConnectWeb3Icon",
    onClick: () => console.log("clicked Connect to Web3"),
  },
]
const SimulatorPage = () => (
  /* Button stack for path options */
  <Flex direction="column" gap={8} w="min(100%, 300px)">
    {pathOptions.map((pathOption) => (
      <PathButton pathOption={pathOption} />
    ))}
  </Flex>
)

export default SimulatorPage
