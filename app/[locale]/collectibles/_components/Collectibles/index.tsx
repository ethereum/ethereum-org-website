"use client"

import React from "react"
import { useLocale } from "next-intl"
import { WagmiProvider } from "wagmi"
import { type Locale, RainbowKitProvider } from "@rainbow-me/rainbowkit"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

import { Badge } from "../../types"
import CollectiblesContent from "../CollectiblesContent/lazy"

import { rainbowkitConfig } from "@/config/rainbow-kit"

export type CollectiblesPageProps = {
  badges: Badge[]
}

const CollectiblesPage = ({ badges }: CollectiblesPageProps) => {
  const queryClient = new QueryClient()
  const locale = useLocale()

  return (
    <WagmiProvider config={rainbowkitConfig}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider locale={locale as Locale}>
          <CollectiblesContent badges={badges} />
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}

export default CollectiblesPage
