import { WagmiProvider } from "wagmi"
import { type Locale, RainbowKitProvider } from "@rainbow-me/rainbowkit"

import { rainbowkitConfig } from "@/config/rainbow-kit"

interface WalletProvidersProps {
  children: React.ReactNode
  locale: string | undefined
}

const WalletProviders = ({ children, locale }: WalletProvidersProps) => {
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
