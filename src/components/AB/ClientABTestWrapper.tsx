"use client"

import { IS_PREVIEW_DEPLOY, IS_PROD } from "@/lib/utils/env"

import { useIsClient } from "@/hooks/useIsClient"
import { useLocalStorage } from "@/hooks/useLocalStorage"
import type { ABTestVariants } from "@/lib/ab-testing/types"

type ClientABTestWrapperProps = {
  testKey: string
  variants: ABTestVariants
  serverVariantIndex: number
}

export function ClientABTestWrapper({
  testKey,
  variants,
  serverVariantIndex,
}: ClientABTestWrapperProps) {
  const [localOverride] = useLocalStorage<number | null>(
    `ab-test-${testKey}`,
    null
  )
  const isClient = useIsClient()

  // Dev mode or preview deploy: use localStorage override or default to original (index 0)
  if (!IS_PROD || IS_PREVIEW_DEPLOY) {
    if (isClient && localOverride !== null && localOverride < variants.length) {
      return <>{variants[localOverride]}</>
    }
    return <>{variants[0]}</> // Always default to original in dev/preview
  }

  // Production: use server-determined variant
  return <>{variants[serverVariantIndex] || variants[0]}</>
}
