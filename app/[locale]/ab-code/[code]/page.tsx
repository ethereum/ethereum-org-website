import { generatePermutations, getPrecomputed } from "flags/next"
import { notFound } from "next/navigation"
import { setRequestLocale } from "next-intl/server"

import type { Lang } from "@/lib/types"

import { DEFAULT_LOCALE } from "@/lib/constants"

import OriginalHomePage from "../../page"

import { decodeABCode, encodeABCode } from "@/lib/ab-testing/constants"
import { homepageFlags, homeSearchCtaFlag } from "@/lib/ab-testing/flags"

export { generateMetadata } from "../../page"

export async function generateStaticParams() {
  try {
    const codes = await generatePermutations(homepageFlags)
    return codes.map((code) => ({
      locale: DEFAULT_LOCALE,
      code: encodeABCode(code),
    }))
  } catch {
    return [] // CI builds without FLAGS_SECRET fall back to on-demand rendering
  }
}

export default async function PrecomputedHomePage({
  params,
}: {
  params: Promise<{ locale: string; code: string }>
}) {
  const { locale, code } = await params
  if (locale !== DEFAULT_LOCALE) notFound()
  setRequestLocale(locale)

  let searchCtaVariant: number
  try {
    ;[searchCtaVariant] = await getPrecomputed(
      [homeSearchCtaFlag],
      homepageFlags,
      decodeABCode(code)
    )
  } catch {
    notFound() // invalid or tampered code
  }

  return (
    <OriginalHomePage
      params={Promise.resolve({ locale: locale as Lang })}
      searchCtaVariant={searchCtaVariant}
    />
  )
}
