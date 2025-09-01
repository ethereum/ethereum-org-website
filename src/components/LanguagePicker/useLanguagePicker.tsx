import { useMemo } from "react"
import { useLocale } from "next-intl"

import type { Lang, LocaleDisplayInfo, MatomoEventOptions } from "@/lib/types"

import { trackCustomEvent } from "@/lib/utils/matomo"
import { filterRealLocales } from "@/lib/utils/translations"

import { LOCALES_CODES } from "@/lib/constants"

import { localeToDisplayInfo } from "./localeToDisplayInfo"

import { useDisclosure } from "@/hooks/useDisclosure"
import { useTranslation } from "@/hooks/useTranslation"

export const useLanguagePicker = (handleClose?: () => void) => {
  const { t } = useTranslation("common")
  const locale = useLocale()

  const locales = useMemo(() => filterRealLocales(LOCALES_CODES), [])

  // Find all matching browser language preferences in order
  const intlLocalePreferences = useMemo(() => {
    // Get the preferred languages for the users browser
    const navLangs = typeof navigator !== "undefined" ? navigator.languages : []
    const preferences: Lang[] = []

    for (const navLang of navLangs) {
      const match = locales?.find((locale) => {
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
  }, [locales])

  // Keep the first preference for backward compatibility
  const intlLocalePreference = intlLocalePreferences[0] || ""

  const languages = useMemo<LocaleDisplayInfo[]>(
    () =>
      (locales as Lang[])
        ?.map((localeOption) => {
          const displayInfo = localeToDisplayInfo(
            localeOption,
            locale as Lang,
            t
          )
          const isBrowserDefault = intlLocalePreferences.includes(
            localeOption as Lang
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
        }) || [],
    [intlLocalePreferences, locale, locales, t]
  )

  const intlLanguagePreference = languages.find(
    (lang) => lang.localeOption === intlLocalePreference
  )

  const { isOpen, setValue, ...menu } = useDisclosure()

  const eventBase: Pick<MatomoEventOptions, "eventCategory" | "eventAction"> = {
    eventCategory: `Language picker`,
    eventAction: "Open or close language picker",
  }

  const onOpen = () => {
    menu.onOpen()
    trackCustomEvent({
      ...eventBase,
      eventName: "Opened",
    } as MatomoEventOptions)
  }

  /**
   * When closing the menu, track whether this is following a link, or simply closing the menu
   * @param customMatomoEvent Optional custom event property overrides
   */
  const onClose = (
    customMatomoEvent?: Required<Pick<MatomoEventOptions, "eventName">> &
      Partial<MatomoEventOptions>
  ): void => {
    handleClose && handleClose()
    menu.onClose()
    trackCustomEvent(
      (customMatomoEvent
        ? { ...eventBase, ...customMatomoEvent }
        : { ...eventBase, eventName: "Closed" }) satisfies MatomoEventOptions
    )
  }

  return {
    disclosure: { isOpen, setValue, onOpen, onClose },
    languages,
    intlLanguagePreference,
  }
}
