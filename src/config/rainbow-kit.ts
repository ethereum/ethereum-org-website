import { getDefaultConfig } from "@rainbow-me/rainbowkit"
import {
  coinbaseWallet,
  metaMaskWallet,
  oneKeyWallet,
  rainbowWallet,
  walletConnectWallet,
  zerionWallet,
} from "@rainbow-me/rainbowkit/wallets"
import { http } from "wagmi"
import { hardhat, mainnet, sepolia } from "wagmi/chains"

const CHAIN_MAP = {
  hardhat,
  sepolia,
  mainnet,
} as const

type TargetChain = (typeof CHAIN_MAP)[keyof typeof CHAIN_MAP]
type TargetChains = readonly [TargetChain, ...TargetChain[]]

// Determine which chains to use based on env vars
export const getTargetChains = (): TargetChains => {
  const chainNames =
    process.env.NEXT_PUBLIC_CHAIN_NAMES?.split(",").map((name) =>
      name.trim()
    ) || []

  // Map chain names to actual chain objects
  const validChains = chainNames
    .map((name): TargetChain | undefined => CHAIN_MAP[name as keyof typeof CHAIN_MAP])
    .filter((chain): chain is TargetChain => chain !== undefined)

  // If no valid chains found, fallback to just hardhat
  if (validChains.length === 0) {
    if (chainNames.length > 0) {
      console.warn(
        `No valid chains found for: ${chainNames.join(", ")}. Falling back to hardhat.`
      )
    }

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