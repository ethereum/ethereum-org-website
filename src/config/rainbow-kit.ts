import { mainnet } from "wagmi/chains"
import { getDefaultConfig } from "@rainbow-me/rainbowkit"
import {
  coinbaseWallet,
  metaMaskWallet,
  oneKeyWallet,
  rainbowWallet,
  walletConnectWallet,
  zerionWallet,
} from "@rainbow-me/rainbowkit/wallets"

import { mockWallet } from "@/config/mockWallet"

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

const isLocalhost =
  typeof window !== "undefined" && window.location.hostname === "localhost"

// Add mock wallet only when running on localhost
if (isLocalhost) {
  walletGroups.push({
    groupName: "Test",
    wallets: [mockWallet],
  })
}

export const rainbowkitConfig = getDefaultConfig({
  appName: "ethereum.org",
  projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID!,
  chains: [mainnet],
  wallets: walletGroups,
  ssr: isLocalhost,
})
