import type {
  I18nLocale,
  Lang,
  LocaleDisplayInfo,
  ProjectProgressData,
} from "@/lib/types"

import { languages } from "@/lib/utils/translations"

import progressDataJson from "@/data/translationProgress.json"

import { DEFAULT_LOCALE } from "@/lib/constants"

const progressData = progressDataJson satisfies ProjectProgressData[]

export const localeToDisplayInfo = (
  localeOption: Lang,
  sourceLocale: Lang,
  t: (key: string) => string
): LocaleDisplayInfo => {
  const i18nItem: I18nLocale = languages[localeOption]
  const englishName = i18nItem.name

  // Get "source" display name (Language choice displayed in language of current locale)
  const intlSource = new Intl.DisplayNames([sourceLocale], {
    type: "language",
  }).of(localeOption)
  // For languages that do not have an Intl display name, use English name as fallback
  const fallbackSource = intlSource !== localeOption ? intlSource : englishName
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
      : Math.floor((dataItem!.words.approved / dataItem!.words.total) * 100) ||
        0

  const returnData: Partial<LocaleDisplayInfo> = {
    localeOption,
    sourceName: sourceName ?? localeOption,
    targetName: targetName ?? localeOption,
    englishName,
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
