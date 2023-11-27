import { Lang } from "../types"

import { Language } from "../interfaces"

import i18nConfig from "../../../i18n.config.json"

export type Languages = {
  [lang in Lang]: Language
}

export const defaultLanguage: Lang = "en"

// same data as in the `config.json` but indexed by language code
const languages: Languages = i18nConfig.reduce((result, config) => {
  return { ...result, [config.code]: config }
}, {} as Languages)

const buildLangs = (process.env.GATSBY_BUILD_LANGS || "")
  .split(",")
  .filter(Boolean)

// will take the same shape as `languages`. Only thing we are doing
// here is filtering the desired langs to be built
export const languageMetadata: {
  [lang: string]: Language
} = Object.fromEntries(
  Object.entries(languages).filter(([lang]) => {
    // BUILD_LANGS === empty means to build all the langs
    if (!buildLangs.length) {
      return true
    }

    return buildLangs.includes(lang)
  })
)

export const supportedLanguages = Object.keys(languageMetadata) as Array<Lang>

export const ignoreLanguages = (Object.keys(languages) as Array<Lang>).filter(
  (lang) => !supportedLanguages.includes(lang)
)

export const isLang = (lang: string): lang is Lang =>
  supportedLanguages.includes(lang as Lang)
