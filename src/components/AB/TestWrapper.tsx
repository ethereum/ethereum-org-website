import { ReactNode } from "react"

import { IS_PREVIEW_DEPLOY, IS_PROD } from "@/lib/utils/env"

import { ABTestDebugPanel } from "./TestDebugPanel"
import { ABTestTracker } from "./TestTracker"

import { getABTestConfigs } from "@/lib/ab-testing/config"
import { getABTestAssignment, getVariantIndex } from "@/lib/ab-testing/server"
import { ABTestVariants } from "@/lib/ab-testing/types"

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
  // Get assignment from cookie or create new one (handled server-side)
  const assignment = await getABTestAssignment(testKey)

  if (!assignment) {
    // If no assignment, render fallback
    return <>{fallback || variants[0]}</>
  }

  // Find the variant index based on the assignment
  const variantIndex = getVariantIndex(assignment.variant, testKey)
  const selectedVariant = variants[variantIndex] || variants[0]

  return (
    <>
      <ABTestTracker assignment={assignment} testKey={testKey} />
      {(!IS_PROD || IS_PREVIEW_DEPLOY) && (
        <ABTestDebugPanel
          testKey={testKey}
          currentAssignment={assignment}
          availableVariants={
            getABTestConfigs()[testKey]?.variants.map((v) => v.name) || []
          }
        />
      )}
      {selectedVariant}
    </>
  )
}

export default ABTestWrapper
