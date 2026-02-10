import { generatePermutations, getPrecomputed } from "flags/next"
import { notFound } from "next/navigation"
import { setRequestLocale } from "next-intl/server"

import type { Lang } from "@/lib/types"

import { DEFAULT_LOCALE, LOCALES_CODES } from "@/lib/constants"

// Re-export homepage content (the actual homepage component will be imported)
// For now, we import the page content directly from the locale folder
import OriginalHomePage from "../page"

import { abTestFlags, homepageHeroFlag } from "@/lib/ab-testing/flags"

/**
 * Generate static params for all flag permutations.
 * This creates a static page for each possible combination of flag values.
 */
export async function generateStaticParams() {
  const codes = await generatePermutations(abTestFlags)

  // Only generate for English locale (matching current enableAllLocales: false default)
  return codes.map((code) => ({
    locale: DEFAULT_LOCALE,
    code,
  }))
}

interface PageProps {
  params: Promise<{ locale: string; code: string }>
}

/**
 * Precomputed homepage with A/B test variants.
 * The middleware rewrites requests to include the signed code,
 * which is then used to retrieve the precomputed flag values.
 *
 * Debug overrides: Use the debug panel (dev/preview only) to force variants via cookies.
 */
export default async function PrecomputedHomePage({ params }: PageProps) {
  const { locale, code } = await params

  // Validate locale
  if (!LOCALES_CODES.includes(locale)) {
    notFound()
  }

  // Enable static rendering
  setRequestLocale(locale)

  // Get precomputed flag values from the code
  // Note: Debug overrides are handled in middleware via cookies,
  // which affect the precomputed code before reaching this page.
  const [heroVariant] = await getPrecomputed(
    [homepageHeroFlag],
    abTestFlags,
    code
  )

  console.log("heroVariant", heroVariant)

  return (
    <OriginalHomePage
      params={{ locale: locale as Lang }}
      heroVariant={heroVariant}
    />
  )
}
