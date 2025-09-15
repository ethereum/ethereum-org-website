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

import { IS_CI, IS_DEV } from "@/lib/utils/env"

import { mockWallet } from "../../tests/e2e/fixtures/mockWallet"

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
  chains: [mainnet],
  wallets: walletGroups,
  ssr: true,
})
