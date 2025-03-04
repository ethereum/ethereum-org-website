import { mainnet } from "wagmi/chains"
import { getDefaultConfig } from "@rainbow-me/rainbowkit"
import {
  coinbaseWallet,
  mewWallet,
  oneKeyWallet,
  rainbowWallet,
  zerionWallet,
} from "@rainbow-me/rainbowkit/wallets"

export const rainbowkitConfig = getDefaultConfig({
  appName: "ethereum.org",
  projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID!,
  chains: [mainnet],
  wallets: [
    {
      groupName: "New to crypto",
      wallets: [
        coinbaseWallet,
        rainbowWallet,
        mewWallet,
        zerionWallet,
        oneKeyWallet,
      ],
    },
  ],
})
