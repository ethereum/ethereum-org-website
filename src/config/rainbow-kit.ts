import { http } from "wagmi"
import { hardhat, mainnet, sepolia } from "wagmi/chains"
import { getDefaultConfig } from "@rainbow-me/rainbowkit"
import type { Chain } from "viem"
import {
  coinbaseWallet,
  metaMaskWallet,
  oneKeyWallet,
  rainbowWallet,
  walletConnectWallet,
  zerionWallet,
} from "@rainbow-me/rainbowkit/wallets"

type TargetChains = [Chain, ...Chain[]]

const CHAIN_MAP = {
  hardhat,
  sepolia,
  mainnet,
} as const

type ChainName = keyof typeof CHAIN_MAP

const isChainName = (name: string): name is ChainName => name in CHAIN_MAP

// Determine which chains to use based on env vars
export const getTargetChains = (): TargetChains => {
  const chainNames =
    process.env.NEXT_PUBLIC_CHAIN_NAMES?.split(",").map((name) =>
      name.trim()
    ) || []

  if (chainNames.length === 0) {
    return [hardhat]
  }

  // Map chain names to actual chain objects
  const validChains: Chain[] = chainNames
    .filter(isChainName)
    .map((name) => CHAIN_MAP[name])

  // If no valid chains found, fallback to just hardhat
  if (validChains.length === 0) {
    console.warn(
      `No valid chains found for: ${chainNames.join(", ")}. Falling back to hardhat.`
    )
    return [hardhat]
  }

  return [validChains[0], ...validChains.slice(1)]
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

export const rainbowkitConfig = getDefaultConfig({
  appName: "ethereum.org",
  projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID!,
  chains: getTargetChains(),
  transports: getTransports(),
  wallets: walletGroups,
  ssr: true,
})
