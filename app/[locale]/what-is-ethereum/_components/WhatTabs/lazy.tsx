import dynamic from "next/dynamic"

import { Skeleton, SkeletonLines } from "@/components/ui/skeleton"

const WhatTabsLazy = dynamic(() => import("."), {
  ssr: false,
  loading: () => (
    <>
      <div className="mb-4 flex w-2/3 gap-4 border-b py-4">
        <Skeleton className="flex-1" />
        <Skeleton className="flex-1" />
      </div>
      <div className="h-fit rounded-lg border p-8">
        <SkeletonLines noOfLines={5} className="pt-0" />
      </div>
    </>
  ),
})

export default WhatTabsLazy
