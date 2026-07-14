import { generatePermutations, getPrecomputed } from "flags/next"
import { notFound } from "next/navigation"
import { setRequestLocale } from "next-intl/server"

import type { Lang } from "@/lib/types"

import { DEFAULT_LOCALE } from "@/lib/constants"

import OriginalFindWalletPage from "../../../../wallets/find-wallet/page"

import { decodeABCode, encodeABCode } from "@/lib/ab-testing/constants"
import { findWalletFlags, findWalletHeroFlag } from "@/lib/ab-testing/flags"

export { generateMetadata } from "../../../../wallets/find-wallet/page"

/**
 * Generate a static page for each possible combination of flag values.
 * Falls back to on-demand rendering (dynamicParams) when permutations
 * can't be generated at build time (e.g. FLAGS_SECRET missing in CI).
 */
export async function generateStaticParams() {
  try {
    const codes = await generatePermutations(findWalletFlags)
    // Only the default locale is A/B tested. Codes are dot-encoded to keep
    // the URL segment directory-like (see encodeABCode).
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

interface PageProps {
  params: Promise<{ locale: string; code: string }>
}

/**
 * Precomputed find-wallet page with A/B test variants.
 * The proxy rewrites eligible requests to include the signed flags code,
 * which is used here to retrieve the precomputed flag values.
 * This route is internal-only: it is never linked and only reached via rewrite.
 */
export default async function PrecomputedFindWalletPage({ params }: PageProps) {
  const { locale, code } = await params

  // Only the default locale is A/B tested
  if (locale !== DEFAULT_LOCALE) notFound()

  // Enable static rendering
  setRequestLocale(locale)

  let heroVariant: number
  try {
    ;[heroVariant] = await getPrecomputed(
      [findWalletHeroFlag],
      findWalletFlags,
      decodeABCode(code)
    )
  } catch {
    // Invalid or tampered code - this route is only reachable via the proxy rewrite
    notFound()
  }

  return (
    <OriginalFindWalletPage
      params={Promise.resolve({ locale: locale as Lang })}
      heroVariant={heroVariant}
    />
  )
}
