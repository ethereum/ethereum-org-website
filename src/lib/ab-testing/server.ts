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

  const variantIndex = assignVariantIndexDeterministic(testConfig, fingerprint)
  const variant = testConfig.variants[variantIndex]

  return {
    experimentId: testConfig.id,
    experimentName: testConfig.name || testKey,
    variant: variant.name,
    variantIndex,
    assignedAt: Date.now(),
  }
}

// Deterministic assignment based on user fingerprint (cookie-less)
const assignVariantIndexDeterministic = (
  config: ABTestConfig,
  fingerprint: string
): number => {
  const totalWeight = config.variants.reduce(
    (sum, variant) => sum + variant.weight,
    0
  )

  // Handle case where total weight is 0
  if (totalWeight === 0) return 0

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
  for (let i = 0; i < config.variants.length; i++) {
    cumulativeWeight += config.variants[i].weight
    if (weighted <= cumulativeWeight) {
      return i
    }
  }

  return 0
}
