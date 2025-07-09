import { useMemo } from "react"
import { useLocale } from "next-intl"

import type { Lang, LocaleDisplayInfo } from "@/lib/types"

import { MatomoEventOptions, trackCustomEvent } from "@/lib/utils/matomo"
import { filterRealLocales } from "@/lib/utils/translations"

import { LOCALES_CODES } from "@/lib/constants"

import { localeToDisplayInfo } from "./localeToDisplayInfo"

import { useDisclosure } from "@/hooks/useDisclosure"
import { useTranslation } from "@/hooks/useTranslation"

export const useLanguagePicker = (handleClose?: () => void) => {
  const { t } = useTranslation("common")
  const locale = useLocale()

  // Get the preferred language for the users browser
  const [navLang] = typeof navigator !== "undefined" ? navigator.languages : []
  const locales = useMemo(() => filterRealLocales(LOCALES_CODES), [])
  const intlLocalePreference = useMemo(
    () =>
      locales?.reduce((acc, cur) => {
        if (cur.toLowerCase() === navLang.toLowerCase()) return cur
        if (
          navLang.toLowerCase().startsWith(cur.toLowerCase()) &&
          acc !== navLang
        )
          return cur
        return acc
      }, "") as Lang,
    [navLang, locales]
  )

  const languages = useMemo<LocaleDisplayInfo[]>(
    () =>
      (locales as Lang[])
        ?.map((localeOption) => {
          const displayInfo = localeToDisplayInfo(
            localeOption,
            locale as Lang,
            t
          )
          const isBrowserDefault = intlLocalePreference === localeOption
          return { ...displayInfo, isBrowserDefault }
        })
        .sort((a, b) => {
          // Always put the browser's preferred language first
          if (a.localeOption === intlLocalePreference) return -1
          if (b.localeOption === intlLocalePreference) return 1
          // Otherwise, sort by wordsApproved descending
          return (b.wordsApproved ?? 0) - (a.wordsApproved ?? 0)
        }) || [],
    [intlLocalePreference, locale, locales, t]
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
