import { useEffect, useRef, useState } from "react"
import { useRouter } from "next/router"
import { useTranslation } from "next-i18next"
import { useDisclosure, type UseDisclosureReturn } from "@chakra-ui/react"

import type {
  I18nLocale,
  Lang,
  LocaleDisplayInfo,
  ProjectProgressData,
} from "@/lib/types"

import { MatomoEventOptions, trackCustomEvent } from "@/lib/utils/matomo"
import { filterRealLocales, languages } from "@/lib/utils/translations"

import progressDataJson from "@/data/translationProgress.json"

import { DEFAULT_LOCALE } from "@/lib/constants"

const progressData = progressDataJson satisfies ProjectProgressData[]

export const useLanguagePicker = (
  handleClose?: () => void,
  menuState?: UseDisclosureReturn
) => {
  const { t } = useTranslation("common")
  const { locale, locales: rawLocales } = useRouter()
  const refs = {
    inputRef: useRef<HTMLInputElement>(null),
    firstItemRef: useRef<HTMLAnchorElement>(null),
    noResultsRef: useRef<HTMLAnchorElement>(null),
    footerRef: useRef<HTMLAnchorElement>(null),
  }
  const [filterValue, setFilterValue] = useState("")

  const [filteredNames, setFilteredNames] = useState<LocaleDisplayInfo[]>([])

  // Used to only send one matomo event for users who focus the filter input
  const [hasFocusedInput, setHasFocusedInput] = useState(false)

  // Reset if user switches languages
  useEffect(() => {
    setHasFocusedInput(false)
  }, [locale])

  // perform all the filtering and mapping when the filter value change
  useEffect(() => {
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

    const localeToDisplayInfo = (localeOption: Lang): LocaleDisplayInfo => {
      const i18nItem: I18nLocale = languages[localeOption]
      const englishName = i18nItem.name

      // Get "source" display name (Language choice displayed in language of current locale)
      const intlSource = new Intl.DisplayNames([locale!], {
        type: "language",
      }).of(localeOption)
      // For languages that do not have an Intl display name, use English name as fallback
      const fallbackSource =
        intlSource !== localeOption ? intlSource : englishName
      const i18nKey = "language-" + localeOption.toLowerCase()
      const i18nSource = t(i18nKey) // Falls back to English namespace if not found

      // If i18nSource (fetched from `language-{locale}` in current namespace)
      // is not translated (output === englishName), or not available
      // (output === i18nKey), use the Intl.DisplayNames result as fallback
      const sourceName = [i18nKey, englishName].includes(i18nSource)
        ? fallbackSource
        : i18nSource

      // Get "target" display name (Language choice displayed in that language)
      const fallbackTarget = new Intl.DisplayNames([localeOption], {
        type: "language",
      }).of(localeOption)
      const i18nConfigTarget = i18nItem.localName
      const targetName = i18nConfigTarget || fallbackTarget

      if (!sourceName || !targetName) {
        console.warn("Missing language display name:", {
          localeOption,
          sourceName,
          targetName,
        })
      }

      // English will not have a dataItem
      const dataItem = progressData.find(
        ({ languageId }) =>
          i18nItem.crowdinCode.toLowerCase() === languageId.toLowerCase()
      )

      const approvalProgress =
        localeOption === DEFAULT_LOCALE
          ? 100
          : Math.floor(
              (dataItem!.words.approved / dataItem!.words.total) * 100
            ) || 0

      const isBrowserDefault = browserLocales.includes(localeOption)

      const returnData: Partial<LocaleDisplayInfo> = {
        localeOption,
        sourceName: sourceName ?? localeOption,
        targetName: targetName ?? localeOption,
        englishName,
        isBrowserDefault,
      }

      if (progressData.length < 1) {
        console.warn(`Missing translation progress data; check GitHub action`)
        return {
          ...returnData,
          approvalProgress: 0,
          wordsApproved: 0,
        } as LocaleDisplayInfo
      }

      const totalWords = progressData[0].words.total

      const wordsApproved =
        localeOption === DEFAULT_LOCALE
          ? totalWords || 0
          : dataItem?.words.approved || 0

      return {
        ...returnData,
        approvalProgress,
        wordsApproved,
      } as LocaleDisplayInfo
    }

    const displayNames: LocaleDisplayInfo[] =
      (locales as Lang[])?.map(localeToDisplayInfo).sort((a, b) => {
        const indexA = browserLocales.indexOf(a.localeOption as Lang)
        const indexB = browserLocales.indexOf(b.localeOption as Lang)
        if (indexA >= 0 && indexB >= 0) return indexA - indexB
        if (indexA >= 0) return -1
        if (indexB >= 0) return 1
        return b.approvalProgress - a.approvalProgress
      }) || []

    setFilteredNames(
      displayNames.filter(
        ({ localeOption, sourceName, targetName, englishName }) =>
          (localeOption + sourceName + targetName + englishName)
            .toLowerCase()
            .includes(filterValue.toLowerCase())
      )
    )
  }, [filterValue, locale, rawLocales, t])

  const { isOpen, ...menu } = useDisclosure()

  const eventBase: Pick<MatomoEventOptions, "eventCategory" | "eventAction"> = {
    eventCategory: `Language picker`,
    eventAction: "Open or close language picker",
  }

  const onOpen = () => {
    menu.onOpen()
    menuState?.onOpen()
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
    setFilterValue("")
    handleClose && handleClose()
    menu.onClose()
    menuState?.onClose()
    trackCustomEvent(
      (customMatomoEvent
        ? { ...eventBase, ...customMatomoEvent }
        : { ...eventBase, eventName: "Closed" }) satisfies MatomoEventOptions
    )
  }

  /**
   * Send Matomo event when user focuses in the filter input.
   * Only send once per user per session per language
   * @returns void
   */
  const handleInputFocus = (): void => {
    if (hasFocusedInput) return
    trackCustomEvent({
      ...eventBase,
      eventAction: "Filter input",
      eventName: "Focused inside filter input",
    })
    setHasFocusedInput(true)
  }

  return {
    t,
    refs,
    disclosure: { isOpen, onOpen, onClose },
    filterValue,
    setFilterValue,
    filteredNames,
    handleInputFocus,
  }
}
