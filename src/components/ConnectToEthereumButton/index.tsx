import { ConnectButton } from "@rainbow-me/rainbowkit"

const ConnectToEthereumButton = () => {
  return (
    <ConnectButton
      showBalance={{
        smallScreen: true,
        largeScreen: true,
      }}
    />
  )
}

export default ConnectToEthereumButton
