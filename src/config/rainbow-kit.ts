import { hardhat, mainnet, sepolia } from "wagmi/chains"
import { getDefaultConfig } from "@rainbow-me/rainbowkit"
import {
  coinbaseWallet,
  metaMaskWallet,
  oneKeyWallet,
  rainbowWallet,
  walletConnectWallet,
  zerionWallet,
} from "@rainbow-me/rainbowkit/wallets"

const CHAIN_MAP = {
  hardhat,
  sepolia,
  mainnet,
} as const

// Determine which chains to use based on env vars
export const getTargetChains = () => {
  const chainNames =
    process.env.NEXT_PUBLIC_CHAIN_NAMES?.split(",").map((name) =>
      name.trim()
    ) || []

  console.log("chainNames", chainNames)

  if (chainNames.length === 0) {
    return [hardhat]
  }

  // Map chain names to actual chain objects
  const validChains = chainNames
    .map((name) => CHAIN_MAP[name as keyof typeof CHAIN_MAP])
    .filter(Boolean)

  // If no valid chains found, fallback to just hardhat
  if (validChains.length === 0) {
    console.warn(
      `No valid chains found for: ${chainNames.join(", ")}. Falling back to hardhat.`
    )
    return [hardhat]
  }

  return validChains
}

export const rainbowkitConfig = getDefaultConfig({
  appName: "ethereum.org",
  projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID!,
  // @ts-expect-error - TODO: fix this
  chains: getTargetChains(),
  wallets: [
    {
      groupName: "New to crypto",
      wallets: [
        coinbaseWallet,
        rainbowWallet,
        metaMaskWallet,
        zerionWallet,
        oneKeyWallet,
        walletConnectWallet,
      ],
    },
  ],
})
