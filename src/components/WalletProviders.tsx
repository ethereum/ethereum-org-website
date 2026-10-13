"use client"

import { useLocale } from "next-intl"
import { WagmiProvider } from "wagmi"
import { type Locale, RainbowKitProvider } from "@rainbow-me/rainbowkit"

// Scoped here rather than in the root layout so only routes that render wallet
// UI download RainbowKit's stylesheet
import "@rainbow-me/rainbowkit/styles.css"

import { rainbowkitConfig } from "@/config/rainbow-kit"

interface WalletProvidersProps {
  children: React.ReactNode
}

const WalletProviders = ({ children }: WalletProvidersProps) => {
  const locale = useLocale()
  return (
    <WagmiProvider config={rainbowkitConfig}>
      <RainbowKitProvider
        locale={locale as Locale}
        appInfo={{
          appName: "RainbowKit Demo",
          learnMoreUrl: "/wallets",
        }}
      >
        {children}
      </RainbowKitProvider>
    </WagmiProvider>
  )
}

export default WalletProviders
