import { getLocale, getTranslations } from "next-intl/server"

import type { Lang, LocaleDisplayInfo } from "@/lib/types"

import type { NavSections } from "@/components/Nav/types"

import { filterRealLocales } from "@/lib/utils/translations"

import { LOCALES_CODES } from "@/lib/constants"

import { buildNavigation } from "@/lib/nav/buildNavigation"
import { localeToDisplayInfo } from "@/lib/nav/localeToDisplayInfo"

// Pre-filtered locales for server use
const FILTERED_LOCALES = filterRealLocales(LOCALES_CODES)

/**
 * Server-side function to generate language display information
 * Processes all locale data on the server without client-side hooks
 */
export const getLanguagesDisplayInfo = async (): Promise<
  LocaleDisplayInfo[]
> => {
  const locale = await getLocale()
  const t = await getTranslations({ locale, namespace: "common" })

  // Early return if no locales
  if (!FILTERED_LOCALES?.length) return []

  return (FILTERED_LOCALES as Lang[]).map((localeOption) => {
    return localeToDisplayInfo(localeOption, locale as Lang, t)
  })
}

export const getNavigation = async () => {
  const t = await getTranslations({
    namespace: "common",
  })

  const linkSections: NavSections = buildNavigation(t)

  return linkSections
}
