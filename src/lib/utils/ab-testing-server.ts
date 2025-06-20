import { cookies } from "next/headers"

import { ABTestAssignment, ABTestConfig } from "@/lib/types/ab-testing"

import { getABTestConfigs } from "./ab-testing-config"

const AB_TEST_COOKIE_PREFIX = "pk_ab_test"
const COOKIE_MAX_AGE = 60 * 60 * 24 * 30 // 30 days

export async function getOrAssignABTest(
  testKey: string
): Promise<ABTestAssignment | null> {
  const configs = getABTestConfigs()
  const testConfig = configs[testKey]

  if (!testConfig || !testConfig.enabled) {
    return null
  }

  const cookieStore = await cookies()
  const cookieName = `${AB_TEST_COOKIE_PREFIX}${testKey}`
  const existingAssignment = cookieStore.get(cookieName)

  if (existingAssignment?.value) {
    try {
      const parsed: ABTestAssignment = JSON.parse(existingAssignment.value)
      // Validate that the variant still exists in current config
      if (testConfig.variants.some((v) => v.name === parsed.variant)) {
        return parsed
      }
    } catch {
      // Invalid cookie, will reassign below
    }
  }

  // Assign new variant based on weights
  const variant = assignVariant(testConfig)
  const assignment: ABTestAssignment = {
    experimentId: testConfig.id,
    experimentName: testConfig.name,
    variant: variant.name,
    assignedAt: Date.now(),
  }

  // Set cookie for future requests
  cookieStore.set(cookieName, JSON.stringify(assignment), {
    maxAge: COOKIE_MAX_AGE,
    httpOnly: false, // Needs to be accessible by client for potential debugging
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
  })

  return assignment
}

function assignVariant(config: ABTestConfig) {
  const totalWeight = config.variants.reduce(
    (sum, variant) => sum + variant.weight,
    0
  )

  // Handle case where total weight is 0
  if (totalWeight === 0) {
    return config.variants[0]
  }

  const random = Math.random() * totalWeight
  let cumulativeWeight = 0

  for (const variant of config.variants) {
    cumulativeWeight += variant.weight
    if (random <= cumulativeWeight) {
      return variant
    }
  }

  return config.variants[0]
}

function getVariantIndex(variantName: string, testKey: string): number {
  const configs = getABTestConfigs()
  const testConfig = configs[testKey]

  if (!testConfig) return 0

  const variantIndex = testConfig.variants.findIndex(
    (v) => v.name === variantName
  )
  return variantIndex >= 0 ? variantIndex : 0
}

export { getVariantIndex }
