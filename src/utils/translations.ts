import type { Lang } from "./languages"
import type { Direction } from "../types"

import i18nConfigs from "../../i18n/config.json"

export type TranslationKey = string

export const isLangRightToLeft = (lang: Lang): boolean => {
  const langConfig = i18nConfigs.filter((language) => language.code === lang)

  if (!langConfig.length)
    throw new Error("Language code not found in isLangRightToLeft")

  return langConfig[0].langDir === "rtl"
}

export const getDirection = (lang?: Lang): Direction => {
  if (!lang) {
    return "auto"
  }

  return isLangRightToLeft(lang) ? "rtl" : "ltr"
}

// Overwrites the default Persian numbering of the Farsi language to use Hindu-Arabic numerals (0-9)
// Context: https://github.com/ethereum/ethereum-org-website/pull/5490#pullrequestreview-892596553
export const getLocaleForNumberFormat = (locale: Lang): Lang => {
  if (locale === "fa") {
    return "en"
  }

  return locale
}
