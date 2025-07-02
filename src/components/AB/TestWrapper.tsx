import { ReactNode } from "react"

import { IS_PREVIEW_DEPLOY, IS_PROD } from "@/lib/utils/env"

import { ClientABTestWrapper } from "./ClientABTestWrapper"
import { ABTestDebugPanel } from "./TestDebugPanel"
import { ABTestTracker } from "./TestTracker"

import {
  getABTestAssignment,
  getABTestConfigs,
  getVariantIndex,
} from "@/lib/ab-testing/server"
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
    // Get deterministic assignment and configs
    const [assignment, configs] = await Promise.all([
      getABTestAssignment(testKey),
      getABTestConfigs(),
    ])

    if (!assignment) throw new Error("No AB test assignment found")

    // Find the variant index based on the assignment
    const variantIndex = getVariantIndex(assignment.variant, configs, testKey)
    const availableVariants =
      configs[testKey]?.variants.map((v) => v.name) || []

    return (
      <>
        {/* Analogous to <Matomo /> at app layout level, pushes "AbTesting::enter" in production */}
        <ABTestTracker assignment={assignment} />

        {/* Preview panel for development and preview deploys */}
        {(!IS_PROD || IS_PREVIEW_DEPLOY) && (
          <ABTestDebugPanel
            testKey={testKey}
            availableVariants={availableVariants}
          />
        )}

        {/* Render variant with client-side override support */}
        <ClientABTestWrapper
          testKey={testKey}
          variants={variants}
          serverVariantIndex={variantIndex}
        />
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
