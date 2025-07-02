import { SITE_URL } from "@/lib/constants"

import { ABTestAssignment, ABTestConfig } from "./types"

export const getABTestConfigs = async (): Promise<
  Record<string, ABTestConfig>
> => {
  try {
    const response = await fetch(`${SITE_URL}/api/ab-config`, {
      next: { revalidate: 3600 },
    })

    if (!response.ok) return {}
    return await response.json()
  } catch (error) {
    console.error("[AB Config] Failed to fetch:", error)
    return {}
  }
}

export const getABTestAssignment = async (
  testKey: string
): Promise<ABTestAssignment | null> => {
  const configs = await getABTestConfigs()
  const testConfig = configs[testKey]

  if (!testConfig || !testConfig.enabled) return null

  // Create deterministic assignment using IP + User-Agent fingerprint
  const headers = await import("next/headers").then((m) => m.headers())
  const userAgent = headers.get("user-agent") || ""
  const forwardedFor =
    headers.get("x-forwarded-for") || headers.get("x-real-ip") || "unknown"
  const fingerprint = `${forwardedFor}-${userAgent}`

  const variant = assignVariantDeterministic(testConfig, fingerprint)

  return {
    experimentId: testConfig.id,
    experimentName: testConfig.name || testKey,
    variant: variant.name,
    assignedAt: Date.now(),
  }
}

export const getVariantIndex = (
  variantName: string,
  configs: Record<string, ABTestConfig>,
  testKey: string
): number => {
  const testConfig = configs[testKey]
  if (!testConfig) return 0

  const variantIndex = testConfig.variants.findIndex(
    (v) => v.name === variantName
  )
  return variantIndex >= 0 ? variantIndex : 0
}

// Deterministic assignment based on user fingerprint (cookie-less)
const assignVariantDeterministic = (
  config: ABTestConfig,
  fingerprint: string
) => {
  const totalWeight = config.variants.reduce(
    (sum, variant) => sum + variant.weight,
    0
  )

  // Handle case where total weight is 0
  if (totalWeight === 0) return config.variants[0]

  // Use a better hash function for more uniform distribution
  // This is a simple implementation of djb2 hash algorithm
  let hash = 5381
  for (let i = 0; i < fingerprint.length; i++) {
    hash = (hash << 5) + hash + fingerprint.charCodeAt(i)
  }

  // Ensure positive value and create uniform distribution
  const normalized = Math.abs(hash) / 0x7fffffff // Max 32-bit signed int
  const weighted = normalized * totalWeight

  let cumulativeWeight = 0
  for (const variant of config.variants) {
    cumulativeWeight += variant.weight
    if (weighted <= cumulativeWeight) {
      return variant
    }
  }

  return config.variants[0]
}
