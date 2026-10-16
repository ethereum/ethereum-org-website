"use client"

import dynamic from "next/dynamic"

import { SkeletonLines } from "@/components/ui/skeleton"

// Client-only: the sample data is built from the reader's clock and time zone
export const ChainExplorerLazy = dynamic(() => import("./chain-explorer"), {
  ssr: false,
  loading: () => <SkeletonLines noOfLines={10} />,
})

export const ChainClockLazy = dynamic(() => import("./chain-clock"), {
  ssr: false,
  loading: () => <SkeletonLines noOfLines={6} />,
})

export const AddressPoisoningQuizLazy = dynamic(
  () =>
    import(
      "@/components/PrivacyWidgets/AddressPoisoningQuiz/address-poisoning-quiz-client"
    ),
  { ssr: false, loading: () => <SkeletonLines noOfLines={8} /> }
)
