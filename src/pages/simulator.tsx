import { Flex } from "@chakra-ui/react"
import React from "react"
import { PathButton } from "../components/Simulator/"

const pathOptions = [
  {
    primaryText: "Create account",
    secondaryText: "How to?",
    iconName: "EthWalletIcon",
  },
  {
    primaryText: "Send/receive",
    secondaryText: "How to?",
    iconName: "WalletAppIcon",
  },
  {
    primaryText: "Connect to Web3",
    secondaryText: "How to?",
    iconName: "ConnectWeb3Icon",
  },
]
const SimulatorPage = () => (
  /* Button stack for path options */
  <Flex direction="column" gap={8} w="min(100%, 300px)">
    {pathOptions.map(({ primaryText, secondaryText, iconName }) => (
      <PathButton
        primaryText={primaryText}
        secondaryText={secondaryText}
        iconName={iconName}
      />
    ))}
  </Flex>
)

export default SimulatorPage
