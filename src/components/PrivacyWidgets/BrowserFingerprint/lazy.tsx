"use client"

import dynamic from "next/dynamic"

import { SkeletonLines } from "@/components/ui/skeleton"

/** Reads browser APIs, so it renders on the client only */
const BrowserFingerprintLazy = dynamic(
  () => import("./browser-fingerprint-client"),
  {
    ssr: false,
    loading: () => <SkeletonLines noOfLines={6} className="px-0" />,
  }
)

export default BrowserFingerprintLazy
