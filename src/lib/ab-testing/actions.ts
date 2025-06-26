"use server"

import { cookies } from "next/headers"

import { AB_TEST_COOKIE_PREFIX } from "../constants"
import { IS_PROD } from "../utils/env"

import { getABTestConfigs } from "./config"
import { ABTestAssignment } from "./types"

// Server Action to set AB test assignment cookie
export async function setABTestCookie(
  testKey: string,
  assignment: ABTestAssignment
) {
  const cookieStore = await cookies()
  const cookieName = AB_TEST_COOKIE_PREFIX + testKey
  const maxAge = 60 * 60 * 24 * 30 // 30 days

  cookieStore.set(cookieName, JSON.stringify(assignment), {
    maxAge,
    httpOnly: false, // Needs to be accessible by client for potential debugging
    secure: IS_PROD,
    sameSite: "lax",
    path: "/",
  })
}

// Server action to manually set a specific variant for testing
export async function forceABTestVariant(testKey: string, variantName: string) {
  const configs = getABTestConfigs()
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
    experimentName: testConfig.name,
    variant: variantName,
    assignedAt: Date.now(),
  }

  const cookieStore = await cookies()
  const cookieName = `${AB_TEST_COOKIE_PREFIX}${testKey}`
  const maxAge = 60 * 60 * 24 * 30 // 30 days

  cookieStore.set(cookieName, JSON.stringify(assignment), {
    maxAge,
    httpOnly: false,
    secure: IS_PROD,
    sameSite: "lax",
    path: "/",
  })

  if (process.env.NODE_ENV === "development") {
    console.log(`[AB Test] Forced variant ${variantName} for test ${testKey}`)
  }
  return assignment
}

// Server action to clear AB test cookie
export async function clearABTestCookie(testKey: string) {
  const cookieStore = await cookies()
  const cookieName = `${AB_TEST_COOKIE_PREFIX}${testKey}`

  cookieStore.delete(cookieName)
  if (process.env.NODE_ENV === "development") {
    console.log(`[AB Test] Cleared cookie for test ${testKey}`)
  }
}
