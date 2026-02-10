import type { ReactNode } from "react"

import { IS_PREVIEW_DEPLOY, IS_PROD } from "@/lib/utils/env"

import { ABTestDebugPanel } from "./TestDebugPanel"
import { ABTestTracker } from "./TestTracker"

type ABTestVariants = [ReactNode, ReactNode, ...ReactNode[]]

interface ABTestProps {
  /** Unique key for the A/B test (must match Matomo experiment name) */
  testKey: string
  /** Precomputed variant index from the Flags SDK */
  variantIndex: number
  /** Array of variant components to render (index 0 = original) */
  variants: ABTestVariants
}

/**
 * A/B Test component for use with precomputed flag values.
 *
 * This component is designed to work with the Flags SDK precomputation pattern.
 * Unlike the legacy ABTestWrapper, this component receives the variant index
 * directly from server-side precomputation rather than calling an API.
 *
 * @example
 * ```tsx
 * // In a server component with precomputed flag value
 * const [heroVariant] = await getPrecomputed([homepageHeroFlag], abTestFlags, code)
 *
 * <ABTest
 *   testKey="HomepageHero"
 *   variantIndex={heroVariant}
 *   variants={[
 *     <OriginalHero key="original" />,
 *     <VariantAHero key="variant-a" />,
 *   ]}
 * />
 * ```
 */
export function ABTest({ testKey, variantIndex, variants }: ABTestProps) {
  const safeIndex = Math.max(0, Math.min(variantIndex, variants.length - 1))

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
      {/* Track the A/B test assignment with Matomo */}
      <ABTestTracker
        assignment={{
          experimentId: testKey,
          experimentName: testKey,
          variant: availableVariants[safeIndex],
          variantIndex: safeIndex,
          assignedAt: Date.now(),
        }}
      />

      {/* Preview panel for development and preview deploys */}
      {(!IS_PROD || IS_PREVIEW_DEPLOY) && (
        <ABTestDebugPanel
          testKey={testKey}
          availableVariants={availableVariants}
        />
      )}

      {/* Render the selected variant */}
      {variants[safeIndex]}
    </>
  )
}
