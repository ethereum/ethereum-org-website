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
  try {
    // Get deterministic assignment (cookie-less, based on fingerprint)
    const assignment = await getABTestAssignment(testKey)

    if (!assignment) {
      // If no assignment, render fallback
      return <>{fallback || variants[0]}</>
    }

    // Find the variant index based on the assignment
    const variantIndex = getVariantIndex(assignment.variant, testKey)
    const selectedVariant = variants[variantIndex] || variants[0]

    // Get available variants for debug panel
    const configs = await getABTestConfigs()
    const availableVariants =
      configs[testKey]?.variants.map((v) => v.name) || []

    return (
      <>
        {/* Track assignment - only in production, not in preview */}
        {!IS_PREVIEW_DEPLOY && (
          <ABTestTracker assignment={assignment} testKey={testKey} />
        )}

        {/* Preview panel for development and preview deploys */}
        {(!IS_PROD || IS_PREVIEW_DEPLOY) && (
          <ABTestDebugPanel
            testKey={testKey}
            currentAssignment={assignment}
            availableVariants={availableVariants}
          />
        )}

        {/* Render selected variant */}
        {selectedVariant}
      </>
    )
  } catch (error) {
    // If AB testing fails, render original variant
    if (process.env.NODE_ENV === "development") {
      console.warn(
        `[AB Test] ${testKey}: Error occurred, falling back to original variant`,
        error
      )
    }
    return <>{fallback || variants[0]}</>
  }
}

export default ABTestWrapper
