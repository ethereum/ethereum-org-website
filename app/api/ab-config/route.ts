import { NextResponse } from "next/server"

import { IS_PREVIEW_DEPLOY, IS_PROD } from "@/lib/utils/env"

import type { ABTestConfig, MatomoExperiment } from "@/lib/ab-testing/types"

// Central, korrekt build-detektion (samma som övriga routes)
const isBuildTime =
  process.env.NETLIFY === "true" ||
  process.env.NETLIFY_BUILD === "true" ||
  process.env.NEXT_PHASE === "phase-production-build"

const isExperimentActive = (experiment: MatomoExperiment): boolean => {
  const now = new Date()

  if (experiment.start_date) {
    const startDate = new Date(experiment.start_date)
    if (now < startDate) return false
  }

  if (experiment.end_date) {
    const endDate = new Date(experiment.end_date)
    if (now > endDate) return false
  }

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
  /**
   * HARD STOP: denna route får aldrig köra logik under build
   * (fetch → cache → IncrementalCache)
   */
  if (isBuildTime) {
    return NextResponse.json(
      {},
      {
        headers: {
          "Cache-Control": "no-store",
        },
      }
    )
  }

  // Preview / non-prod: alltid deterministic config
  if (!IS_PROD || IS_PREVIEW_DEPLOY) {
    return NextResponse.json(getPreviewConfig(), {
      headers: {
        "Cache-Control": "no-store",
      },
    })
  }

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

    const cacheBuster =
      process.env.NODE_ENV === "development" ? `&cb=${Date.now()}` : ""

    const matomoApiUrl =
      `${matomoUrl}/index.php` +
      `?module=API` +
      `&method=AbTesting.getAllExperiments` +
      `&idSite=${siteId}` +
      `&format=json` +
      `&token_auth=${apiToken}` +
      cacheBuster

    // Alltid no-store → ingen Next IncrementalCache
    const response = await fetch(matomoApiUrl, {
      cache: "no-store",
      headers: {
        "User-Agent": "ethereum.org-ab-testing/1.0",
      },
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
    const config: Record<string, ABTestConfig> = {}

    experiments
      .filter((exp) => exp.variations && exp.variations.length > 0)
      .forEach((exp) => {
        const variationsTotalWeight = exp.variations.reduce(
          (sum, variation) => sum + (variation.percentage || 0),
          0
        )

        const originalWeight = 100 - variationsTotalWeight

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
