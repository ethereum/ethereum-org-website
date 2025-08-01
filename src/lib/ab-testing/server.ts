import { SITE_URL } from "@/lib/constants"

import type { ABTestAssignment, ABTestConfig } from "./types"

const getABTestConfigs = async (): Promise<Record<string, ABTestConfig>> => {
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

  // Create deterministic assignment using enhanced fingerprint
  const headers = await import("next/headers").then((m) => m.headers())

  // Get IP and user agent (primary identifier)
  const forwardedFor =
    headers.get("x-forwarded-for") || headers.get("x-real-ip") || "unknown"
  const userAgent = headers.get("user-agent") || ""

  // Add privacy-preserving entropy sources
  const acceptLanguage = headers.get("accept-language") || ""
  const acceptEncoding = headers.get("accept-encoding") || ""

  // Create enhanced fingerprint with more entropy
  const fingerprint = [
    forwardedFor,
    userAgent,
    acceptLanguage,
    acceptEncoding,
    testKey, // Include test key to ensure different tests get different distributions
  ].join("|")

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

  // Hash function to evenly distribute fingerprints amongst assignments
  // Implementation of FNV-1a hash algorithm
  let hash = 2166136261 // FNV offset basis
  for (let i = 0; i < fingerprint.length; i++) {
    hash ^= fingerprint.charCodeAt(i) // XOR
    hash = (hash * 16777619) >>> 0 // FNV prime, ensure 32-bit unsigned
  }

  // Convert to uniform distribution [0, 1)
  const normalized = hash / 0x100000000 // 2^32 for full 32-bit range
  const weighted = normalized * totalWeight

  let cumulativeWeight = 0
  for (let i = 0; i < config.variants.length; i++) {
    cumulativeWeight += config.variants[i].weight
    if (weighted <= cumulativeWeight) return i
  }

  return 0
}
