import type { I18nLocale, Lang, LocaleDisplayInfo } from "@/lib/types"

import { languages } from "@/lib/utils/translations"

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
  const sourceName =
    [i18nKey, englishName].includes(i18nSource) && !i18nItem.forceLocalName
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

  return {
    localeOption,
    sourceName: sourceName ?? localeOption,
    targetName: targetName ?? localeOption,
    englishName,
  }
}
