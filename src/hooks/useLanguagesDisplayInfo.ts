"use client"

import { useLocale } from "next-intl"

import type { Lang, LocaleDisplayInfo } from "@/lib/types"

import { filterRealLocales } from "@/lib/utils/translations"

import { LOCALES_CODES } from "@/lib/constants"

import useTranslation from "@/hooks/useTranslation"
import { localeToDisplayInfo } from "@/lib/nav/localeToDisplayInfo"

// Pre-filtered locales
const FILTERED_LOCALES = filterRealLocales(LOCALES_CODES)

/**
 * Client-side hook to generate language display information
 * Uses Intl.DisplayNames as fallback when translations aren't available
 */
export const useLanguagesDisplayInfo = (): LocaleDisplayInfo[] => {
  const locale = useLocale()
  // Use common namespace - translations may not exist, but localeToDisplayInfo
  // has fallbacks using Intl.DisplayNames
  const { t } = useTranslation("common")

  if (!FILTERED_LOCALES?.length) return []

  return (FILTERED_LOCALES as Lang[]).map((localeOption) => {
    return localeToDisplayInfo(localeOption, locale as Lang, t)
  })
}
