"use client"

import dynamic from "next/dynamic"

import { SkeletonLines } from "@/components/ui/skeleton"

// Client-only: the layout depends on the viewport width, so rendering it on
// the server would swap layouts on hydration.
const GossipNetworkLazy = dynamic(() => import("./gossip-network"), {
  ssr: false,
  loading: () => (
    <div className="aspect-[4/3] rounded-base border p-4 md:aspect-[16/11]">
      <SkeletonLines noOfLines={6} />
    </div>
  ),
})

export default GossipNetworkLazy
