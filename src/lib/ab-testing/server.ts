import { cookies } from "next/headers"

import { AB_TEST_COOKIE_PREFIX } from "../constants"

import { getABTestConfigs } from "./config"
import { ABTestAssignment, ABTestConfig } from "./types"

export async function getABTestAssignment(
  testKey: string
): Promise<ABTestAssignment | null> {
  const configs = getABTestConfigs()
  const testConfig = configs[testKey]

  if (!testConfig || !testConfig.enabled) {
    if (process.env.NODE_ENV === "development") {
      console.log(`[AB Test] ${testKey} is disabled or not found`)
    }
    return null
  }

  const cookieStore = await cookies()
  const cookieName = AB_TEST_COOKIE_PREFIX + testKey
  const existingAssignment = cookieStore.get(cookieName)

  if (existingAssignment?.value) {
    try {
      const parsed: ABTestAssignment = JSON.parse(existingAssignment.value)
      // Validate that the variant still exists in current config
      if (testConfig.variants.some((v) => v.name === parsed.variant)) {
        return parsed
      } else {
        if (process.env.NODE_ENV === "development") {
          console.log(
            `[AB Test] ${testKey}: Variant ${parsed.variant} no longer exists, reassigning`
          )
        }
      }
    } catch (error) {
      if (process.env.NODE_ENV === "development") {
        console.log(`[AB Test] ${testKey}: Invalid cookie format, reassigning`)
      }
    }
  }

  // If no valid existing assignment, create deterministic assignment
  // Use IP + User-Agent as fingerprint for consistent assignment (cookieless)
  const headers = await import("next/headers").then((m) => m.headers())
  const userAgent = headers.get("user-agent") || ""
  const forwardedFor =
    headers.get("x-forwarded-for") || headers.get("x-real-ip") || "unknown"
  const fingerprint = `${forwardedFor}-${userAgent}`

  // Use deterministic assignment to ensure consistency across requests
  const variant = assignVariantDeterministic(testConfig, fingerprint)
  const newAssignment: ABTestAssignment = {
    experimentId: testConfig.id,
    experimentName: testConfig.name,
    variant: variant.name,
    assignedAt: Date.now(),
  }

  if (process.env.NODE_ENV === "development") {
    console.log(
      `[AB Test] ${testKey}: New deterministic assignment - ${variant.name} (fingerprint: ${fingerprint.slice(0, 20)}...)`
    )
  }

  return newAssignment
}

export function getABTestConfig(testKey: string): ABTestConfig | null {
  const configs = getABTestConfigs()
  const testConfig = configs[testKey]

  if (!testConfig || !testConfig.enabled) {
    return null
  }

  return testConfig
}

export function getVariantIndex(variantName: string, testKey: string): number {
  const configs = getABTestConfigs()
  const testConfig = configs[testKey]

  if (!testConfig) return 0

  const variantIndex = testConfig.variants.findIndex(
    (v) => v.name === variantName
  )
  return variantIndex >= 0 ? variantIndex : 0
}

// Deterministic assignment based on user fingerprint (cookieless)
function assignVariantDeterministic(config: ABTestConfig, fingerprint: string) {
  const totalWeight = config.variants.reduce(
    (sum, variant) => sum + variant.weight,
    0
  )

  // Handle case where total weight is 0
  if (totalWeight === 0) {
    return config.variants[0]
  }

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
