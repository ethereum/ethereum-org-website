"use client"

import { useEffect } from "react"
import { push } from "@socialgouv/matomo-next"

import { IS_PREVIEW_DEPLOY, IS_PROD } from "@/lib/utils/env"

import { ABTestAssignment } from "@/lib/ab-testing/types"

type ABTestTrackerProps = {
  assignment: ABTestAssignment
}

export function ABTestTracker({ assignment }: ABTestTrackerProps) {
  useEffect(() => {
    if (!IS_PROD || IS_PREVIEW_DEPLOY) {
      console.debug(
        `DEV [Matomo] A/B test logged - Experiment: ${assignment.experimentName}, Variant: ${assignment.variant}`
      )
      return
    }

    // Check if user has opted out (following existing pattern)
    let isOptedOut = false
    try {
      const optedOutValue = localStorage.getItem("ethereum-org.matomo-opt-out")
      if (optedOutValue) {
        isOptedOut = JSON.parse(optedOutValue)
      }
    } catch {
      // Invalid JSON in localStorage, default to not opted out
      isOptedOut = false
    }
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
  }, [assignment])

  return null // This component doesn't render anything
}
