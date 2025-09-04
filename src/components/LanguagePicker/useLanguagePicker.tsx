import { useMemo } from "react"
import { useLocale } from "next-intl"

import type { Lang, LocaleDisplayInfo } from "@/lib/types"

import { filterRealLocales } from "@/lib/utils/translations"

import { LOCALES_CODES } from "@/lib/constants"

// Move locales computation outside component to make it stable
const FILTERED_LOCALES = filterRealLocales(LOCALES_CODES)

export const useLanguagePicker = (languages: LocaleDisplayInfo[]) => {
  const locale = useLocale()

  // Find all matching browser language preferences in order
  const intlLocalePreferences = useMemo(() => {
    // Get the preferred languages for the users browser
    const navLangs = typeof navigator !== "undefined" ? navigator.languages : []
    const preferences: Lang[] = []

    for (const navLang of navLangs) {
      const match = FILTERED_LOCALES?.find((locale) => {
        // Exact match first
        if (locale.toLowerCase() === navLang.toLowerCase()) return true
        // Then partial match (e.g., 'en-US' matches 'en')
        if (navLang.toLowerCase().startsWith(locale.toLowerCase())) return true
        return false
      }) as Lang | undefined

      if (match && !preferences.includes(match)) {
        preferences.push(match)
      }
    }

    return preferences
  }, [])

  // Keep the first preference for backward compatibility
  const intlLocalePreference = intlLocalePreferences[0] || ""

  // Sort languages client-side to prioritize browser preference
  const sortedLanguages = useMemo<LocaleDisplayInfo[]>(() => {
    return [...languages]
      .map((displayInfo) => {
        const isBrowserDefault = intlLocalePreferences.includes(
          displayInfo.localeOption as Lang
        )
        return {
          ...displayInfo,
          isBrowserDefault,
        }
      })
      .sort((a, b) => {
        const aPreferenceIndex = intlLocalePreferences.indexOf(
          a.localeOption as Lang
        )
        const bPreferenceIndex = intlLocalePreferences.indexOf(
          b.localeOption as Lang
        )

        // First, sort by browser preferences (all browser preferences come first)
        if (a.isBrowserDefault && !b.isBrowserDefault) return -1
        if (!a.isBrowserDefault && b.isBrowserDefault) return 1

        // If both are browser preferences, sort by preference order
        if (a.isBrowserDefault && b.isBrowserDefault) {
          return aPreferenceIndex - bPreferenceIndex
        }

        // Otherwise, sort alphabetically by source name using localeCompare
        return a.sourceName.localeCompare(b.sourceName, locale)
      })
  }, [languages, intlLocalePreferences, locale])

  const intlLanguagePreference = sortedLanguages.find(
    (lang) => lang.localeOption === intlLocalePreference
  )

  return {
    languages: sortedLanguages,
    intlLanguagePreference,
  }
}
