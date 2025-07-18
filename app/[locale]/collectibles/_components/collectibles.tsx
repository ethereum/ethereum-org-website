"use client"

import React from "react"
import { WagmiProvider } from "wagmi"
import { type Locale, RainbowKitProvider } from "@rainbow-me/rainbowkit"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

import { Badge, Stats } from "../page"

import CollectiblesContent from "./CollectiblesContent"

import { rainbowkitConfig } from "@/config/rainbow-kit"

export interface CollectiblesPageProps {
  badges: Badge[]
  stats: Stats
  locale: string
}

const CollectiblesPage: React.FC<CollectiblesPageProps> = ({
  badges,
  stats,
  locale,
}) => {
  const queryClient = new QueryClient()

  return (
    <WagmiProvider config={rainbowkitConfig}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider locale={locale as Locale}>
          <CollectiblesContent badges={badges} stats={stats} locale={locale} />
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}

export default CollectiblesPage
