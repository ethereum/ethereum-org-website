import { cookies } from "next/headers"

import { AB_TEST_COOKIE_PREFIX } from "../constants"
import { IS_PROD } from "../utils/env"

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

  const cookieStore = cookies()
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

  // If no valid existing assignment, create a new one and set cookie immediately
  const variant = assignVariant(testConfig)
  const newAssignment: ABTestAssignment = {
    experimentId: testConfig.id,
    experimentName: testConfig.name,
    variant: variant.name,
    assignedAt: Date.now(),
  }

  // Set cookie synchronously to avoid re-render loops
  const maxAge = 60 * 60 * 24 * 30 // 30 days
  try {
    cookieStore.set(cookieName, JSON.stringify(newAssignment), {
      maxAge,
      httpOnly: false, // Needs to be accessible by client for debugging
      secure: IS_PROD,
      sameSite: "lax",
      path: "/",
    })
  } catch (error) {
    // Cookie setting might fail during SSR, that's okay
    if (process.env.NODE_ENV === "development") {
      console.log(
        `[AB Test] ${testKey}: Cookie setting failed during SSR`,
        error
      )
    }
  }

  if (process.env.NODE_ENV === "development") {
    console.log(`[AB Test] ${testKey}: New assignment - ${variant.name}`)
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
