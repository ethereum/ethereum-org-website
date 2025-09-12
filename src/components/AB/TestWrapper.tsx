import { getLocale } from "next-intl/server"
import type { ReactNode } from "react"

import { IS_PREVIEW_DEPLOY, IS_PROD } from "@/lib/utils/env"

import { DEFAULT_LOCALE } from "@/lib/constants"

import { ClientABTestWrapper } from "./ClientABTestWrapper"
import { ABTestDebugPanel } from "./TestDebugPanel"
import { ABTestTracker } from "./TestTracker"

import { getABTestAssignment } from "@/lib/ab-testing/server"
import type { ABTestVariants } from "@/lib/ab-testing/types"

type ABTestWrapperProps = {
  testKey: string
  variants: ABTestVariants
  fallback?: ReactNode
  enableAllLocales?: boolean
}

const ABTestWrapper = async ({
  testKey,
  variants,
  fallback,
  enableAllLocales,
}: ABTestWrapperProps) => {
  const locale = await getLocale()
  if (locale !== DEFAULT_LOCALE && !enableAllLocales)
    return <>{fallback || variants[0]}</>

  try {
    // Get deterministic assignment
    const assignment = await getABTestAssignment(testKey)

    if (!assignment) throw new Error("No AB test assignment found")

    // Use assignment's variant index directly
    const variantIndex = assignment.variantIndex

    // Extract labels from React element keys or fall back to defaults
    const availableVariants = variants.map((variant, i) => {
      if (
        variant &&
        typeof variant === "object" &&
        "key" in variant &&
        variant.key
      ) {
        return String(variant.key)
          .replace(/-/g, " ")
          .replace(/\b\w/g, (l) => l.toUpperCase())
      }
      return `Variant ${i}`
    })

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
