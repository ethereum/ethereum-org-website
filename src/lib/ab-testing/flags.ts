import type { ReadonlyHeaders, ReadonlyRequestCookies } from "flags"
import { dedupe, flag } from "flags/next"

import { IS_PREVIEW_DEPLOY, IS_PROD } from "@/lib/utils/env"

import { FLAG_OVERRIDE_COOKIE_PREFIX } from "./constants"
import { createMatomoAdapter, type MatomoEntities } from "./matomo-adapter"

/** Debug overrides are only honored in dev and preview deploys */
const ALLOW_DEBUG_OVERRIDES = !IS_PROD || IS_PREVIEW_DEPLOY

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
    // x-forwarded-for contains "client_ip, proxy1, ..." - only the first entry
    // is stable across requests behind Cloudflare (see #17612)
    const forwardedFor =
      headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      headers.get("x-real-ip") ||
      "unknown"
    const userAgent = headers.get("user-agent") || ""
    const acceptLanguage = headers.get("accept-language") || ""
    const acceptEncoding = headers.get("accept-encoding") || ""

    const fingerprint = [
      forwardedFor,
      userAgent,
      acceptLanguage,
      acceptEncoding,
    ].join("|")

    let overrides: Record<string, number> | undefined
    if (ALLOW_DEBUG_OVERRIDES) {
      for (const cookie of cookies.getAll()) {
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
 * Spike example flag - replace with actual experiments as needed.
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
 * The middleware precomputes all of these and rewrites to the coded route.
 */
export const abTestFlags = [homepageHeroFlag] as const
