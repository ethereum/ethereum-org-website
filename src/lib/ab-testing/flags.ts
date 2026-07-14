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
 * Find wallet Hero A/B test flag.
 * Spike example flag for the /wallets/find-wallet redesign test.
 */
export const findWalletHeroFlag = flag<number, MatomoEntities>({
  key: "FindWalletHero",
  defaultValue: 0,
  description: "Find wallet hero A/B test variant index",
  options: [
    { value: 0, label: "Original" },
    { value: 1, label: "Variant A" },
  ],
  identify,
  adapter: createMatomoAdapter("FindWalletHero"),
})

/** Flags precomputed for the homepage */
export const homepageFlags = [homepageHeroFlag] as const

/** Flags precomputed for /wallets/find-wallet */
export const findWalletFlags = [findWalletHeroFlag] as const

/**
 * A/B-tested routes and the flags precomputed for each.
 * Keys are locale-less canonical paths (English URLs are unprefixed, and
 * non-root paths carry the trailing slash per trailingSlash: true).
 * Each route gets its own flag group so permutations don't multiply
 * across pages. Add entries as experiments are created in Matomo.
 */
export const abTestRoutes: Record<
  string,
  readonly (typeof homepageHeroFlag)[]
> = {
  "/": homepageFlags,
  "/wallets/find-wallet/": findWalletFlags,
}
