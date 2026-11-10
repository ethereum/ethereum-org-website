"use client"

import { useEffect } from "react"
import dynamic from "next/dynamic"
import { useTranslations } from "next-intl"
import { useAccount } from "wagmi"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

import ConnectToEthereumButton from "@/components/ConnectToEthereumButton"
import { Skeleton } from "@/components/ui/skeleton"

import { trackCustomEvent } from "@/lib/utils/matomo"

// Load Wagmi/RainbowKit only in the browser, where the connect modal runs
const WalletProviders = dynamic(() => import("@/components/WalletProviders"), {
  ssr: false,
  loading: () => <Skeleton className="h-10 w-56 rounded-base" />,
})

const queryClient = new QueryClient()

const ConnectStatus = () => {
  const { isConnected } = useAccount()
  const t = useTranslations("page-start")

  useEffect(() => {
    if (isConnected) {
      trackCustomEvent({
        eventCategory: "start page",
        eventAction: "sign in",
        eventName: "connected",
      })
    }
  }, [isConnected])

  return (
    <div className="flex flex-col items-start gap-3">
      {isConnected && (
        <p className="font-bold">
          {t("page-start-connect-wallet-account-message")}
        </p>
      )}
      <ConnectToEthereumButton
        onClick={() => {
          trackCustomEvent({
            eventCategory: "start page",
            eventAction: "connect wallet",
            eventName: "Connect to Ethereum",
          })
        }}
      />
    </div>
  )
}

const ConnectWallet = () => (
  <QueryClientProvider client={queryClient}>
    <WalletProviders>
      <ConnectStatus />
    </WalletProviders>
  </QueryClientProvider>
)

export default ConnectWallet
