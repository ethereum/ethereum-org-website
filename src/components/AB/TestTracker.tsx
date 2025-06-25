"use client"

import { useEffect } from "react"
import { push } from "@socialgouv/matomo-next"

import { IS_PREVIEW_DEPLOY, IS_PROD } from "@/lib/utils/env"

import { ABTestAssignment } from "@/lib/ab-testing/types"

type ABTestTrackerProps = {
  assignment: ABTestAssignment
  testKey?: string
}

export function ABTestTracker({ assignment, testKey }: ABTestTrackerProps) {
  useEffect(() => {
    // Don't set cookies here - let server handle cookie persistence
    // This component only handles Matomo tracking

    if (!IS_PROD || IS_PREVIEW_DEPLOY) {
      console.debug(
        `DEV [Matomo] A/B test logged - Experiment: ${assignment.experimentName}, Variant: ${assignment.variant}`
      )
      return
    }

    // Check if user has opted out (following existing pattern)
    const optedOutValue =
      localStorage.getItem("ethereum-org.matomo-opt-out") || "false"
    const isOptedOut = JSON.parse(optedOutValue)
    if (isOptedOut) return

    // Track the A/B test variant with Matomo
    // Using the AbTesting::enter method as specified in Matomo docs
    push([
      "AbTesting::enter",
      {
        experiment: assignment.experimentName,
        variation: assignment.variant,
      },
    ] as [string, Record<string, string>])
  }, [assignment, testKey])

  return null // This component doesn't render anything
}
