"use client"

import dynamic from "next/dynamic"

import { SkeletonLines } from "@/components/ui/skeleton"

const AddressPoisoningQuizLazy = dynamic(
  () => import("./address-poisoning-quiz-client"),
  {
    ssr: false,
    loading: () => <SkeletonLines noOfLines={8} />,
  }
)

export default AddressPoisoningQuizLazy
