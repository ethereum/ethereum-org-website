import { NextResponse } from "next/server"

import { IS_PREVIEW_DEPLOY, IS_PROD } from "@/lib/utils/env"

import type { ABTestConfig, MatomoExperiment } from "@/lib/ab-testing/types"

const isExperimentActive = (experiment: MatomoExperiment): boolean => {
  const now = new Date()

  // Check start date - if scheduled for future, not active yet
  if (experiment.start_date) {
    const startDate = new Date(experiment.start_date)
    if (now < startDate) return false
  }

  // Check end date - if past end date, not active anymore
  if (experiment.end_date) {
    const endDate = new Date(experiment.end_date)
    if (now > endDate) return false
  }

  // If no scheduling constraints, enabled if created or running
  return ["created", "running"].includes(experiment.status)
}

const getPreviewConfig = () => ({
  AppTest: {
    id: "preview",
    enabled: true,
    variants: [{ name: "Original", weight: 100 }],
  },
})

export async function GET() {
  // Preview mode: Show menu with original default
  if (!IS_PROD || IS_PREVIEW_DEPLOY)
    return NextResponse.json(getPreviewConfig())

  try {
    const matomoUrl = process.env.NEXT_PUBLIC_MATOMO_URL
    const apiToken = process.env.MATOMO_API_TOKEN

    if (!matomoUrl || !apiToken) {
      return NextResponse.json(
        { error: "Matomo configuration missing" },
        { status: 500 }
      )
    }

    const siteId = process.env.NEXT_PUBLIC_MATOMO_SITE_ID || "4"

    // Add cache busting for development
    const cacheBuster =
      process.env.NODE_ENV === "development" ? `&cb=${Date.now()}` : ""
    const matomoApiUrl = `${matomoUrl}/index.php?module=API&method=AbTesting.getAllExperiments&idSite=${siteId}&format=json&token_auth=${apiToken}${cacheBuster}`

    const response = await fetch(matomoApiUrl, {
      next: { revalidate: process.env.NODE_ENV === "development" ? 0 : 3600 },
      headers: { "User-Agent": "ethereum.org-ab-testing/1.0" },
    })

    const data = await response.json()

    if (data.result === "error" || !Array.isArray(data)) {
      console.error(
        "[AB Config] Matomo API error:",
        data.message || "Invalid response"
      )
      return NextResponse.json(
        {},
        {
          headers: {
            "Cache-Control": "s-max-age=300, stale-while-revalidate=600",
          },
        }
      )
    }

    const experiments: MatomoExperiment[] = data

    // Transform Matomo experiments to our config format
    const config: Record<string, ABTestConfig> = {}

    experiments
      .filter((exp) => exp.variations && exp.variations.length > 0)
      .forEach((exp) => {
        // Calculate Original variant weight (100% - sum of all variations)
        const variationsTotalWeight = exp.variations.reduce(
          (sum, variation) => sum + (variation.percentage || 0),
          0
        )
        const originalWeight = 100 - variationsTotalWeight

        // Build variants array starting with "Original"
        const variants = [
          { name: "Original", weight: originalWeight },
          ...exp.variations.map((variation) => ({
            name: variation.name,
            weight: variation.percentage || 0,
          })),
        ]

        config[exp.name] = {
          name: exp.name,
          id: exp.idexperiment,
          enabled: isExperimentActive(exp),
          variants,
        }
      })

    return NextResponse.json(config, {
      headers: {
        "Cache-Control": "s-max-age=3600, stale-while-revalidate=7200",
      },
    })
  } catch (error) {
    console.error("[AB Config] Failed to fetch AB test configuration:", error)

    return NextResponse.json(
      {},
      {
        headers: {
          "Cache-Control": "no-cache",
        },
      }
    )
  }
}
