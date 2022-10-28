import type { Lang } from "./languages"
import type { Direction } from "../types"

import defaultStrings from "../../i18n/locales/en/index.json"

export type TranslationKey = keyof typeof defaultStrings

export const isTranslationKey = (key: string): key is TranslationKey =>
  Object.keys(defaultStrings).includes(key as TranslationKey)

export const isLangRightToLeft = (lang: Lang): boolean => {
  return lang === "ar" || lang === "fa"
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
