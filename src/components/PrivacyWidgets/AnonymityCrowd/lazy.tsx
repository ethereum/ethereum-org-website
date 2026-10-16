"use client"

import dynamic from "next/dynamic"

import { Skeleton } from "@/components/ui/skeleton"

// Canvas + browser APIs only, so it renders on the client. The skeleton
// reserves roughly the widget's height to avoid a layout jump.
const AnonymityCrowdLazy = dynamic(() => import("./anonymity-crowd-client"), {
  ssr: false,
  loading: () => <Skeleton className="h-[36rem] w-full rounded-base" />,
})

export default AnonymityCrowdLazy
