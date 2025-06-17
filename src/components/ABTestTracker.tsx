"use client"

import { useEffect } from "react"
import { push } from "@socialgouv/matomo-next"

import { ABTestAssignment } from "@/lib/types/ab-testing"

type ABTestTrackerProps = {
  assignment: ABTestAssignment
}

export function ABTestTracker({ assignment }: ABTestTrackerProps) {
  useEffect(() => {
    if (process.env.NODE_ENV !== "production") {
      console.debug(
        `[Matomo] A/B test tracked - Experiment: ${assignment.experimentName}, Variant: ${assignment.variant}`
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
  }, [assignment])

  return null // This component doesn't render anything
}
