import { useCallback, useEffect, useRef, useState } from "react"
import { useRouter } from "next/router"
import { useTranslation } from "next-i18next"

import type {
  I18nLocale,
  Lang,
  LocaleDisplayInfo,
  TranslationProgressDataItem,
} from "@/lib/types"

import { languages } from "@/lib/utils/translations"

import progressData from "@/data/translationProgress.json"

import { DEFAULT_LOCALE } from "@/lib/constants"

const data = progressData as TranslationProgressDataItem[]

export const useLanguagePicker = () => {
  const { t } = useTranslation("page-languages")
  const { locale, locales } = useRouter()
  const inputRef = useRef<HTMLInputElement>(null)
  const firstItemRef = useRef<HTMLAnchorElement>(null)
  const [filterValue, setFilterValue] = useState("")

  const [filteredNames, setFilteredNames] = useState<LocaleDisplayInfo[]>([])
  const [browserLocalesInfo, setBrowserLocalesInfo] = useState<
    LocaleDisplayInfo[]
  >([])

  const localeToDisplayInfo = useCallback(
    (localeOption: Lang): LocaleDisplayInfo => {
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
      const i18nSource = t(i18nKey)
      const sourceName = i18nSource === i18nKey ? fallbackSource : i18nSource

      // Get "target" display name (Language choice displayed in that language)
      const fallbackTarget = new Intl.DisplayNames([localeOption], {
        type: "language",
      }).of(localeOption)
      const i18nConfigTarget = i18nItem.localName
      const targetName = i18nConfigTarget || fallbackTarget

      if (!sourceName || !targetName) {
        throw new Error(
          "Missing language display name, locale: " + localeOption
        )
      }

      // English will not have a dataItem
      const dataItem = data.find(
        ({ languageId }) =>
          i18nItem.crowdinCode.toLowerCase() === languageId.toLowerCase()
      )

      const approvalProgress =
        localeOption === DEFAULT_LOCALE ? 100 : dataItem?.approvalProgress || 0

      if (data.length === 0)
        throw new Error(
          "Missing translation progress data; check GitHub action"
        )

      const totalWords = data[0].words.total

      const wordsApproved =
        localeOption === DEFAULT_LOCALE
          ? totalWords || 0
          : dataItem?.words.approved || 0

      return {
        localeOption,
        approvalProgress,
        sourceName,
        targetName,
        englishName,
        wordsApproved,
      }
    },
    [locale, t]
  )

  // perform all the filtering and mapping when the filter value change
  useEffect(() => {
    // Get the preferred languages for the users browser
    const navLangs = typeof navigator !== "undefined" ? navigator.languages : []

    // For each browser preference, reduce to the most specific match found in `locales` array
    const allBrowserLocales: Lang[] = navLangs
      .map(
        (navLang) =>
          locales?.reduce((acc, cur) => {
            if (cur.toLowerCase() === navLang) return cur
            if (navLang.includes(cur.toLowerCase()) && acc !== navLang)
              return cur
            return acc
          }, "") as Lang
      )
      .filter((i) => !!i) // Remove those without matches

    // Remove duplicate matches
    const browserLocales: Lang[] = Array.from(new Set(allBrowserLocales))

    const displayNames: LocaleDisplayInfo[] =
      (locales as Lang[])
        ?.map(localeToDisplayInfo)
        .sort((a, b) => b.approvalProgress - a.approvalProgress) || []

    setFilteredNames(
      displayNames.filter(
        ({ localeOption, sourceName, targetName, englishName }) =>
          (localeOption + sourceName + targetName + englishName)
            .toLowerCase()
            .includes(filterValue.toLowerCase())
      )
    )
    // Get display info for each browser locale
    setBrowserLocalesInfo(
      browserLocales.map((browserLocale) => {
        const item = displayNames.find(
          ({ localeOption }) => localeOption === browserLocale
        )
        if (!item)
          throw new Error("Missing browser locale info for " + browserLocale)
        return item
      })
    )
  }, [filterValue, localeToDisplayInfo, locales])

  return {
    inputRef,
    firstItemRef,
    filterValue,
    setFilterValue,
    browserLocalesInfo,
    filteredNames,
  }
}
