import { WagmiProvider } from "wagmi"
import { type Locale, RainbowKitProvider } from "@rainbow-me/rainbowkit"

import { ButtonLink } from "@/components/ui/buttons/Button"

import { rainbowkitConfig } from "@/config/rainbow-kit"

interface WalletProvidersProps {
  children: React.ReactNode
  locale: string | undefined
}

const Disclaimer = () => {
  return (
    <div className="flex flex-col gap-2">
      <div>
        <p className="text-md font-bold">What is a wallet?</p>
        <p className="leading text-sm text-body-medium">
          A wallet is used to send, receive, store, and display digital assets.
          It&apos;s a new way to log in, without needing to create new accounts
          and passwords on every website.
        </p>
      </div>
      <div className="flex flex-row justify-center gap-4">
        <ButtonLink href="/wallets/find-wallet" size="sm" variant="outline">
          Get a wallet
        </ButtonLink>
        <ButtonLink href="/wallets/" size="sm" variant="outline">
          Learn more
        </ButtonLink>
      </div>
    </div>
  )
}

const WalletProviders = ({ children, locale }: WalletProvidersProps) => {
  return (
    <WagmiProvider config={rainbowkitConfig}>
      <RainbowKitProvider
        locale={locale as Locale}
        appInfo={{
          appName: "RainbowKit Demo",
          disclaimer: Disclaimer,
        }}
        modalSize="compact"
      >
        {children}
      </RainbowKitProvider>
    </WagmiProvider>
  )
}

export default WalletProviders
