import type { ReadonlyHeaders, ReadonlyRequestCookies } from "flags"
import { dedupe, flag } from "flags/next"

import { FLAG_OVERRIDE_COOKIE_PREFIX } from "./constants"
import { createMatomoAdapter, type MatomoEntities } from "./matomo-adapter"

/** Check if debug overrides are allowed (dev or preview deploys only) */
const ALLOW_DEBUG_OVERRIDES =
  process.env.NODE_ENV !== "production" ||
  process.env.NEXT_PUBLIC_IS_PREVIEW_DEPLOY === "true"

/**
 * Deduplicated identify function - runs once per request.
 * Creates a fingerprint from request headers for deterministic variant assignment.
 * In dev/preview, also reads debug override cookies.
 */
const identify = dedupe(
  async ({
    headers,
    cookies,
  }: {
    headers: ReadonlyHeaders
    cookies: ReadonlyRequestCookies
  }): Promise<MatomoEntities> => {
    // Build fingerprint matching current implementation
    const forwardedFor =
      headers.get("x-forwarded-for") || headers.get("x-real-ip") || "unknown"
    const userAgent = headers.get("user-agent") || ""
    const acceptLanguage = headers.get("accept-language") || ""
    const acceptEncoding = headers.get("accept-encoding") || ""

    const fingerprint = [
      forwardedFor,
      userAgent,
      acceptLanguage,
      acceptEncoding,
    ].join("|")

    // Read debug overrides from cookies (dev/preview only)
    let overrides: Record<string, number> | undefined
    if (ALLOW_DEBUG_OVERRIDES) {
      const allCookies = cookies.getAll()
      for (const cookie of allCookies) {
        if (cookie.name.startsWith(FLAG_OVERRIDE_COOKIE_PREFIX)) {
          const flagKey = cookie.name.slice(FLAG_OVERRIDE_COOKIE_PREFIX.length)
          const value = parseInt(cookie.value, 10)
          if (!isNaN(value) && value >= 0) {
            overrides = overrides || {}
            overrides[flagKey] = value
          }
        }
      }
    }

    return { fingerprint, overrides }
  }
)

/**
 * Homepage Hero A/B test flag.
 * This is an example flag - replace with actual experiments as needed.
 */
export const homepageHeroFlag = flag<number, MatomoEntities>({
  key: "HomepageHero",
  defaultValue: 0,
  description: "Homepage hero A/B test variant index",
  options: [
    { value: 0, label: "Original" },
    { value: 1, label: "Variant A" },
  ],
  identify,
  adapter: createMatomoAdapter("HomepageHero"),
})

/**
 * All A/B test flags for precomputation.
 * Add new flags here as experiments are created in Matomo.
 * The middleware will precompute all these flags and generate static variants.
 */
export const abTestFlags = [homepageHeroFlag] as const
