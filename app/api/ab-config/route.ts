import { NextResponse } from "next/server"

type MatomoExperiment = {
  idexperiment: string
  name: string
  status: string
  variations: Array<{
    name: string
    percentage: number
  }>
}

type ABTestConfig = {
  id: string
  enabled: boolean
  variants: Array<{
    name: string
    weight: number
  }>
}

export async function GET() {
  try {
    const matomoUrl = process.env.NEXT_PUBLIC_MATOMO_URL
    const apiToken = process.env.MATOMO_API_TOKEN

    if (!matomoUrl || !apiToken) {
      return NextResponse.json(
        { error: "Matomo configuration missing" },
        { status: 500 }
      )
    }

    // Get the site ID from environment
    const siteId = process.env.NEXT_PUBLIC_MATOMO_SITE_ID || "1"

    // Try different API methods for A/B testing
    const apiMethods = [
      "ExperimentsPlatform.getExperiments",
      "AbTesting.getExperiments",
      "Experiments.getExperiments",
      `AbTesting.getAllExperiments&idSite=${siteId}`,
    ]

    let experiments: MatomoExperiment[] = []
    let apiError = null

    for (const method of apiMethods) {
      // Add cache busting for development
      const cacheBuster =
        process.env.NODE_ENV === "development" ? `&cb=${Date.now()}` : ""
      const matomoApiUrl = `${matomoUrl}/index.php?module=API&method=${method}&format=json&token_auth=${apiToken}${cacheBuster}`

      try {
        const response = await fetch(matomoApiUrl, {
          next: {
            revalidate: process.env.NODE_ENV === "development" ? 0 : 3600,
          }, // No cache in dev
          headers: { "User-Agent": "ethereum.org-ab-testing/1.0" },
        })

        const data = await response.json()

        if (data.result !== "error" && Array.isArray(data)) {
          experiments = data
          break
        } else if (data.result === "error") {
          apiError = data.message
        }
      } catch (error) {
        // Continue to next method
      }
    }

    // If no API method worked, use fallback
    if (experiments.length === 0) {
      console.warn(
        `[AB Config] All API methods failed. Last error: ${apiError}`
      )

      const fallbackConfig = {}

      return NextResponse.json(fallbackConfig, {
        headers: {
          "Cache-Control": "s-max-age=300, stale-while-revalidate=600",
        },
      })
    }

    // Transform Matomo experiments to our config format
    const config: Record<string, ABTestConfig> = {}

    experiments.forEach((exp) => {
      // Include running experiments (Matomo uses "running" not "active")
      if (
        exp.status === "running" &&
        exp.variations &&
        exp.variations.length > 0
      ) {
        // Calculate Original variant weight (100% - sum of all variations)
        const variationsTotalWeight = exp.variations.reduce(
          (sum, variation) => {
            return sum + (variation.percentage || 0)
          },
          0
        )
        const originalWeight = 100 - variationsTotalWeight

        // Build variants array starting with "Original"
        const variants = [{ name: "Original", weight: originalWeight }]

        // Add variations from Matomo (use actual percentages)
        exp.variations.forEach((variation) => {
          variants.push({
            name: variation.name,
            weight: variation.percentage || 0,
          })
        })

        config[exp.name] = {
          id: exp.idexperiment,
          enabled: true,
          variants: variants,
        }
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
