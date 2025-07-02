"use server"

import { getABTestConfigs } from "./config"
import { ABTestAssignment } from "./types"

// Server action to create a specific variant assignment for debug panel testing
// Note: This doesn't persist anywhere - it's just for debug panel state
export async function forceABTestVariant(testKey: string, variantName: string) {
  const configs = await getABTestConfigs()
  const testConfig = configs[testKey]

  if (!testConfig) {
    throw new Error(`Test ${testKey} not found`)
  }

  const variant = testConfig.variants.find((v) => v.name === variantName)
  if (!variant) {
    throw new Error(`Variant ${variantName} not found for test ${testKey}`)
  }

  const assignment: ABTestAssignment = {
    experimentId: testConfig.id,
    experimentName: testConfig.name || testKey,
    variant: variantName,
    assignedAt: Date.now(),
  }

  return assignment
}
