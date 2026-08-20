import { generatePermutations, getPrecomputed } from "flags/next"
import { notFound } from "next/navigation"

import type { Lang } from "@/lib/types"

import { DEFAULT_LOCALE } from "@/lib/constants"

import LegacyWalletsBody from "../../_components/LegacyWalletsBody"
import OriginalFindWalletPage from "../../page"

import { decodeABCode, encodeABCode } from "@/lib/ab-testing/constants"
import { findWalletCatalogFlag, findWalletFlags } from "@/lib/ab-testing/flags"

export { generateMetadata } from "../../page"

// Matches the page it renders: wallet data only changes at deploy time.
export const revalidate = false

/**
 * Render codes that weren't prerendered instead of 404ing. Without this the
 * route only serves the exact permutations generateStaticParams enumerated, so
 * a build that couldn't sign them (no FLAGS_SECRET, returning an empty list)
 * would 404 every A/B request rather than falling back to on-demand rendering.
 */
export const dynamicParams = true

/**
 * One static page per flag permutation. Falls back to on-demand rendering when
 * permutations can't be generated at build time (e.g. no FLAGS_SECRET in CI).
 */
export async function generateStaticParams() {
  try {
    const codes = await generatePermutations(findWalletFlags)
    // Only the default locale is A/B tested. Codes are dot-encoded to keep the
    // URL segment directory-like (see encodeABCode).
    return codes.map((code) => ({
      locale: DEFAULT_LOCALE,
      code: encodeABCode(code),
    }))
  } catch (error) {
    console.warn(
      "[A/B Testing] generatePermutations failed (missing FLAGS_SECRET?):",
      error instanceof Error ? error.message : error
    )
    return []
  }
}

/**
 * Find-wallet index with the A/B variant resolved from the signed code the
 * proxy rewrote in. Internal-only: never linked, only reached via that rewrite.
 *
 * Deliberately nested under find-wallet/ rather than at the app root so the
 * parent layout - and with it the @modal slot the catalog arm relies on for
 * wallet detail interception - stays active.
 */
export default async function PrecomputedFindWalletPage(props: {
  params: Promise<{ locale: string; code: string }>
}) {
  const { locale, code } = await props.params

  if (locale !== DEFAULT_LOCALE) notFound()

  let catalogVariant: number
  try {
    ;[catalogVariant] = await getPrecomputed(
      [findWalletCatalogFlag],
      findWalletFlags,
      decodeABCode(code)
    )
  } catch (error) {
    // Invalid or tampered code
    console.warn(
      "[A/B Testing] getPrecomputed failed for code",
      code,
      "-",
      error instanceof Error ? error.message : error
    )
    notFound()
  }

  return (
    <OriginalFindWalletPage
      params={Promise.resolve({ locale: locale as Lang })}
      catalogVariant={catalogVariant}
      // Injected from here so the legacy table only ever enters this route's
      // bundle. The key becomes the Matomo variation name verbatim.
      legacyBody={<LegacyWalletsBody key="Original" locale={locale} />}
    />
  )
}
