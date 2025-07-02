import { IS_PREVIEW_DEPLOY } from "@/lib/utils/env"

import { ABTestConfig } from "./types"

// Cache for API responses to avoid repeated fetches
let configCache: Record<string, ABTestConfig> | null = null
let cacheTimestamp = 0
const CACHE_DURATION = 60 * 60 * 1000 // 1 hour in milliseconds

async function fetchConfigFromAPI(): Promise<Record<string, ABTestConfig>> {
  try {
    // Build the full URL for the API route
    const baseUrl = process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"

    const response = await fetch(`${baseUrl}/api/ab-config`, {
      next: { revalidate: 3600 }, // Next.js cache for 1 hour
    })

    if (!response.ok) {
      console.error(
        `[AB Config] API returned ${response.status}: ${response.statusText}`
      )
      return {}
    }

    return await response.json()
  } catch (error) {
    console.error("[AB Config] Failed to fetch from API:", error)
    return {}
  }
}

function getFallbackConfig(): Record<string, ABTestConfig> {
  // Fallback configuration when API fails - show original 100% of the time
  return {}
}

function getPreviewConfig(): Record<string, ABTestConfig> {
  // Preview mode: Show original variant with menu available
  return {
    AppTest: {
      name: "AppTest",
      id: "preview",
      enabled: true,
      variants: [
        { name: "Original", weight: 100 },
        { name: "Variation1", weight: 0 }, // Available in menu but not randomly assigned
      ],
    },
  }
}

export const getABTestConfigs = async (): Promise<
  Record<string, ABTestConfig>
> => {
  // Preview mode: Show menu with original default
  if (IS_PREVIEW_DEPLOY) {
    return getPreviewConfig()
  }

  // Check cache first
  const now = Date.now()
  if (configCache && now - cacheTimestamp < CACHE_DURATION) {
    return configCache
  }

  // Fetch from API
  const apiConfig = await fetchConfigFromAPI()

  // If API returned empty config, use fallback
  const finalConfig =
    Object.keys(apiConfig).length > 0 ? apiConfig : getFallbackConfig()

  if (Object.keys(apiConfig).length === 0) {
    console.warn("[AB Config] Using fallback configuration due to API failure")
  }

  // Update cache
  configCache = finalConfig
  cacheTimestamp = now

  return finalConfig
}

// Synchronous version for backward compatibility (uses cache)
export const getABTestConfigsSync = (): Record<string, ABTestConfig> => {
  if (IS_PREVIEW_DEPLOY) {
    return getPreviewConfig()
  }

  return configCache || getFallbackConfig()
}
