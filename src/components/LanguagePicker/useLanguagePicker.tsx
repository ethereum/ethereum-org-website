import { useMemo } from "react"
import { useRouter } from "next/router"
import { useTranslation } from "next-i18next"

import type { Lang, LocaleDisplayInfo } from "@/lib/types"

import { MatomoEventOptions, trackCustomEvent } from "@/lib/utils/matomo"
import { filterRealLocales } from "@/lib/utils/translations"

import { localeToDisplayInfo } from "./localeToDisplayInfo"

import { useDisclosure } from "@/hooks/useDisclosure"

export const useLanguagePicker = (handleClose?: () => void) => {
  const { t } = useTranslation("common")
  const { locale, locales: rawLocales } = useRouter()

  const languages = useMemo<LocaleDisplayInfo[]>(() => {
    const locales = filterRealLocales(rawLocales)

    // Get the preferred languages for the users browser
    const navLangs = typeof navigator !== "undefined" ? navigator.languages : []

    // For each browser preference, reduce to the most specific match found in `locales` array
    const allBrowserLocales: Lang[] = navLangs
      .map(
        (navLang) =>
          locales?.reduce((acc, cur) => {
            if (cur.toLowerCase() === navLang.toLowerCase()) return cur
            if (
              navLang.toLowerCase().startsWith(cur.toLowerCase()) &&
              acc !== navLang
            )
              return cur
            return acc
          }, "") as Lang
      )
      .filter((i) => !!i) // Remove those without matches

    // Remove duplicate matches
    const browserLocales = Array.from(new Set(allBrowserLocales))

    return (
      (locales as Lang[])
        ?.map((localeOption) => {
          const displayInfo = localeToDisplayInfo(
            localeOption,
            locale as Lang,
            t
          )
          const isBrowserDefault = browserLocales.includes(localeOption)
          return { ...displayInfo, isBrowserDefault }
        })
        .sort((a, b) => {
          const indexA = browserLocales.indexOf(a.localeOption as Lang)
          const indexB = browserLocales.indexOf(b.localeOption as Lang)
          if (indexA >= 0 && indexB >= 0) return indexA - indexB
          if (indexA >= 0) return -1
          if (indexB >= 0) return 1
          return b.approvalProgress - a.approvalProgress
        }) || []
    )
  }, [locale, rawLocales, t])

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
  }
}
