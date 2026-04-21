"use client"

import { type ReactNode } from "react"

import { Simulator } from "@/components/Simulator"

import { useWalletOnboardingSimData } from "@/data/WalletSimulatorData"

export function WalletSimulator({ children }: { children: ReactNode }) {
  const data = useWalletOnboardingSimData()
  return <Simulator data={data}>{children}</Simulator>
}
