import { getLocale, getTranslations } from "next-intl/server"

import type { Lang, LocaleDisplayInfo } from "@/lib/types"

import type { NavSections } from "@/components/Nav/types"

import { filterRealLocales } from "@/lib/utils/translations"
import { isUpgradeShipped } from "@/lib/utils/upgrades"

import { upgrades } from "@/data/upgrades"

import { LOCALES_CODES } from "@/lib/constants"

import { buildNavigation, NAV_UPGRADES } from "@/lib/nav/buildNavigation"
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
  const t = await getTranslations("common")

  // Early return if no locales
  if (!FILTERED_LOCALES?.length) return []

  return (FILTERED_LOCALES as Lang[]).map((localeOption) => {
    return localeToDisplayInfo(localeOption, locale as Lang, t)
  })
}

/**
 * The upgrade on the Roadmap menu's next-upgrade card: the first in
 * `NAV_UPGRADES` that Forkcast doesn't show as shipped. Resolved here on the
 * server so the upgrade data stays out of the client bundle.
 */
export const getNextUpgradeSlug = () =>
  NAV_UPGRADES.find(({ slug }) => {
    const upgrade = slug ? upgrades[slug] : undefined
    return !!upgrade && !isUpgradeShipped(upgrade)
  })?.slug

export const getNavigation = async () => {
  const t = await getTranslations("common")

  const linkSections: NavSections = buildNavigation(t, getNextUpgradeSlug())

  return linkSections
}
