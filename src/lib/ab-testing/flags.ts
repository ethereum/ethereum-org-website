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

/** An A/B experiment flag resolving to a variant index (0 = original) */
export type ABFlag = ReturnType<typeof flag<number, MatomoEntities>>

/**
 * Define an A/B experiment flag.
 *
 * @param key Must exactly match the experiment name in Matomo - a mismatch
 *   doesn't error, everyone silently gets the original variant.
 * @param description Human-readable summary shown in Flags SDK tooling.
 * @param numVariants Total variant count including the original (default 2).
 */
export const defineABFlag = (
  key: string,
  description: string,
  numVariants = 2
): ABFlag =>
  flag<number, MatomoEntities>({
    key,
    defaultValue: 0,
    description,
    options: Array.from({ length: numVariants }, (_, value) => ({
      value,
      label: value === 0 ? "Original" : `Variant ${value}`,
    })),
    identify,
    adapter: createMatomoAdapter(key),
  })

/**
 * A/B-tested routes and the flags precomputed for each.
 *
 * Keys are locale-less canonical paths: English URLs are unprefixed
 * (localePrefix: "as-needed"), and non-root paths carry the trailing slash
 * per trailingSlash: true. Only the default locale is A/B tested.
 *
 * Each route gets its own flag group so permutations don't multiply across
 * pages. Every route registered here needs a matching coded page under
 * app/[locale]/ab-code/[code]/<path> - see docs/ab-testing.md for the recipe.
 */
/**
 * Homepage Hero A/B test flag.
 * Demo flag - replace with a real experiment.
 */
export const homepageHeroFlag = defineABFlag(
  "HomepageHero",
  "Homepage hero A/B test variant index"
)

/**
 * Find wallet Hero A/B test flag.
 * Demo flag for the /wallets/find-wallet redesign test.
 */
export const findWalletHeroFlag = defineABFlag(
  "FindWalletHero",
  "Find wallet hero A/B test variant index"
)

/** Flags precomputed for the homepage */
export const homepageFlags = [homepageHeroFlag] as const

/** Flags precomputed for /wallets/find-wallet */
export const findWalletFlags = [findWalletHeroFlag] as const

export const abTestRoutes: Record<string, readonly ABFlag[]> = {
  "/": homepageFlags,
  "/wallets/find-wallet/": findWalletFlags,
}
