import { ReactNode } from "react"

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
  assignedAt: number
}

// Type-safe tuple for at least 2 variants
type Element = ReactNode | JSX.Element | string
export type ABTestVariants = [Element, Element, ...Element[]]
