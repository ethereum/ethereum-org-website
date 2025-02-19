import { mainnet } from "wagmi/chains"
import { getDefaultConfig } from "@rainbow-me/rainbowkit"

export const rainbowkitConfig = getDefaultConfig({
  appName: "ethereum.org",
  projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID!,
  chains: [mainnet],
  ssr: true,
})
