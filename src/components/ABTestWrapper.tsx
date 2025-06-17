import { ReactNode } from "react"

import { ABTestVariants } from "@/lib/types/ab-testing"

import {
  getOrAssignABTest,
  getVariantIndex,
} from "@/lib/utils/ab-testing-server"

import { ABTestTracker } from "./ABTestTracker"

type ABTestWrapperProps = {
  testKey: string
  variants: ABTestVariants
  fallback?: ReactNode
}

const ABTestWrapper = async ({
  testKey,
  variants,
  fallback,
}: ABTestWrapperProps) => {
  const assignment = await getOrAssignABTest(testKey)

  if (!assignment) {
    return <>{fallback || variants[0]}</>
  }

  // Find the variant index based on the assignment
  const variantIndex = getVariantIndex(assignment.variant, testKey)
  const selectedVariant = variants[variantIndex] || variants[0]

  return (
    <>
      <ABTestTracker assignment={assignment} />
      {selectedVariant}
    </>
  )
}

export default ABTestWrapper
