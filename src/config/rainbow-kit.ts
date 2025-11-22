import { http } from "wagmi"
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

import { IS_CI, IS_DEV } from "@/lib/utils/env"

import { mockWallet } from "../../tests/e2e/fixtures/mockWallet"

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

const getTransports = () => {
  const alchemyApiKey = process.env.NEXT_PUBLIC_ALCHEMY_API_KEY

  if (!alchemyApiKey) {
    console.warn(
      "NEXT_PUBLIC_ALCHEMY_API_KEY not found, falling back to public RPC"
    )
    return undefined
  }

  return {
    [mainnet.id]: http(`https://eth-mainnet.g.alchemy.com/v2/${alchemyApiKey}`),
    [sepolia.id]: http(`https://eth-sepolia.g.alchemy.com/v2/${alchemyApiKey}`),
    [hardhat.id]: http("http://127.0.0.1:8545"),
  }
}

const walletGroups = [
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
]

if (IS_DEV || IS_CI) {
  walletGroups.push({
    groupName: "Test",
    wallets: [mockWallet],
  })
}

export const rainbowkitConfig = getDefaultConfig({
  appName: "ethereum.org",
  projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID!,
  // @ts-expect-error - TODO: fix this
  chains: getTargetChains(),
  transports: getTransports(),
  wallets: walletGroups,
  ssr: true,
})
