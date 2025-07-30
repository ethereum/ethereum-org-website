"use client"

import dynamic from "next/dynamic"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

import { Skeleton } from "@/components/ui/skeleton"

// Dynamically import Wagmi/RainbowKit components
const WalletProviders = dynamic(() => import("@/components/WalletProviders"), {
  ssr: false,
  loading: () => (
    <Skeleton className="h-[420px] w-[420px] rounded-3xl bg-primary/20" />
  ),
})

const NFTMintCard = dynamic(() => import("./NFTMintCard"), {
  ssr: false,
  loading: () => (
    <Skeleton className="h-[420px] w-[420px] rounded-3xl bg-primary/20" />
  ),
})

const queryClient = new QueryClient()

interface NFTMintCardWrapperProps {
  className?: string
  locale?: string
}

const NFTMintCardWrapper = ({ className, locale }: NFTMintCardWrapperProps) => {
  return (
    <QueryClientProvider client={queryClient}>
      <WalletProviders locale={locale}>
        <NFTMintCard className={className} />
      </WalletProviders>
    </QueryClientProvider>
  )
}

export default NFTMintCardWrapper
