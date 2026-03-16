"use client"

import dynamic from "next/dynamic"

import { Spinner } from "@/components/ui/spinner"

export const SlotCountdownChart = dynamic(() => import("./SlotCountdown"), {
  ssr: false,
  loading: () => (
    <div className="grid h-32 place-items-center">
      <Spinner />
    </div>
  ),
})

export const UpgradeCountdownFigure = dynamic(
  () => import("./UpgradeCountdown"),
  {
    ssr: false,
    loading: () => (
      <div className="grid h-32 place-items-center">
        <Spinner />
      </div>
    ),
  }
)
