"use client"

import dynamic from "next/dynamic"

import { SkeletonLines } from "@/components/ui/skeleton"

const Loading = () => (
  <div className="rounded-base border p-4">
    <SkeletonLines noOfLines={8} />
  </div>
)

/** Client-only: the graph measures its container and animates on interaction */
const WalletClusteringGraphLazy = dynamic(
  () => import("./wallet-clustering-graph-client"),
  { ssr: false, loading: Loading }
)

export default WalletClusteringGraphLazy
