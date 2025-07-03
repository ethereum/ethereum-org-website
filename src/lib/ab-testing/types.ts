import type { ReactNode } from "react"

export type MatomoExperiment = {
  idexperiment: string
  name: string
  status: string
  start_date?: string
  end_date?: string
  variations: {
    name: string
    percentage: number
  }[]
}

export type ABTestConfig = {
  name: string
  id: string
  variants: {
    name: string
    weight: number
  }[]
  enabled: boolean
}

export type ABTestAssignment = {
  experimentId: string
  experimentName: string
  variant: string
  variantIndex: number
  assignedAt: number
}

// Type-safe tuple for at least 2 variants
type Element = ReactNode | JSX.Element | string
export type ABTestVariants = [Element, Element, ...Element[]]
