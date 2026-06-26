"use client"

import dynamic from "next/dynamic"

import { Skeleton } from "@/components/ui/skeleton"

const CentralizedExchanges = dynamic(
  () => import("@/components/CentralizedExchanges").then((mod) => mod.default),
  {
    ssr: false,
    loading: () => (
      <div className="mb-6 flex w-full max-w-screen-sm flex-col items-center gap-y-10">
        <div className="flex w-full justify-between rounded border p-3">
          <Skeleton className="h-5 w-60" />
          <Skeleton className="aspect-square" />
        </div>
        <Skeleton className="mt-6 size-20 rounded-3xl" />
        <div className="flex w-full max-w-screen-sm flex-col items-center gap-2">
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-1/2" />
        </div>
      </div>
    ),
  }
)

export default CentralizedExchanges
