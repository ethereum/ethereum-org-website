import i18nConfigs from "../../../i18n.config.json"
import { DEFAULT_LOCALE } from "../constants"
import { Lang } from "../types"

export const isLangRightToLeft = (lang: Lang): boolean => {
  const langConfig = i18nConfigs.filter((language) => language.code === lang)

  if (!langConfig.length)
    throw new Error("Language code not found in isLangRightToLeft")

  return langConfig[0].langDir === "rtl"
}

// Overwrites the default Persian numbering of the Farsi language to use Hindu-Arabic numerals (0-9)
// Context: https://github.com/ethereum/ethereum-org-website/pull/5490#pullrequestreview-892596553
export const getLocaleForNumberFormat = (locale: Lang): Lang =>
  locale === "fa" ? DEFAULT_LOCALE : locale
