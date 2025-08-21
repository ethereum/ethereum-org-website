import { useMemo } from "react"
import { useLocale } from "next-intl"

import type { Lang, LocaleDisplayInfo } from "@/lib/types"

import { MatomoEventOptions, trackCustomEvent } from "@/lib/utils/matomo"
import { filterRealLocales } from "@/lib/utils/translations"

import { LOCALES_CODES } from "@/lib/constants"

import { useDisclosure } from "@/hooks/useDisclosure"

// Move locales computation outside component to make it stable
const FILTERED_LOCALES = filterRealLocales(LOCALES_CODES)

export const useLanguagePicker = (
  languages: LocaleDisplayInfo[],
  handleClose?: () => void
) => {
  const locale = useLocale()

  // Get the preferred language for the users browser
  const [navLang] = typeof navigator !== "undefined" ? navigator.languages : []
  const intlLocalePreference = useMemo(
    () =>
      FILTERED_LOCALES?.reduce((acc, cur) => {
        if (cur.toLowerCase() === navLang.toLowerCase()) return cur
        if (
          navLang.toLowerCase().startsWith(cur.toLowerCase()) &&
          acc !== navLang
        )
          return cur
        return acc
      }, "") as Lang,
    [navLang]
  )

  // Sort languages client-side to prioritize browser preference
  const sortedLanguages = useMemo<LocaleDisplayInfo[]>(() => {
    return [...languages]
      .map((displayInfo) => {
        const isBrowserDefault =
          intlLocalePreference === displayInfo.localeOption
        return { ...displayInfo, isBrowserDefault }
      })
      .sort((a, b) => {
        // Always put the browser's preferred language first
        if (a.localeOption === intlLocalePreference) return -1
        if (b.localeOption === intlLocalePreference) return 1
        // Otherwise, sort alphabetically by source name using localeCompare
        return a.sourceName.localeCompare(b.sourceName, locale)
      })
  }, [languages, intlLocalePreference, locale])

  const intlLanguagePreference = sortedLanguages.find(
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
    languages: sortedLanguages,
    intlLanguagePreference,
  }
}
