import type { Lang } from "./languages"
import type { Direction } from "../types"

export type TranslationKey = string

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
