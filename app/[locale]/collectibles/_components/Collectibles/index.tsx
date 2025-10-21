"use client"

import React from "react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

import WalletProviders from "@/components/WalletProviders"

import type { Badge } from "../../types"
import CollectiblesContent from "../CollectiblesContent/lazy"

export type CollectiblesPageProps = {
  badges: Badge[]
}

const queryClient = new QueryClient()

const CollectiblesPage = ({ badges }: CollectiblesPageProps) => (
  <QueryClientProvider client={queryClient}>
    <WalletProviders>
      <CollectiblesContent badges={badges} />
    </WalletProviders>
  </QueryClientProvider>
)

export default CollectiblesPage
