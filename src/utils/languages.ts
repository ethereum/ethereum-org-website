import i18nConfigs from "../../i18n/config.json"
import type { Direction } from "../types"

export type Lang =
  | "en"
  | "ar"
  | "az"
  | "bg"
  | "bn"
  | "ca"
  | "cs"
  | "da"
  | "de"
  | "el"
  | "es"
  | "fa"
  | "fi"
  | "fr"
  | "gl"
  | "gu"
  | "he"
  | "hi"
  | "hr"
  | "hu"
  | "id"
  | "ig"
  | "it"
  | "ja"
  | "ka"
  | "kk"
  | "km"
  | "ko"
  | "lt"
  | "ml"
  | "mr"
  | "ms"
  | "nl"
  | "nb"
  | "pcm"
  | "ph"
  | "pl"
  | "pt"
  | "pt-br"
  | "ro"
  | "ru"
  | "se"
  | "sk"
  | "sl"
  | "sr"
  | "sw"
  | "ta"
  | "th"
  | "tr"
  | "uk"
  | "ur"
  | "uz"
  | "vi"
  | "zh"
  | "zh-tw"

export interface Language {
  code: Lang
  crowdinCode: string
  name: string
  localName: string
  langDir: Direction
  dateFormat: string
}

export type Languages = {
  [lang in Lang]: Language
}

export const defaultLanguage: Lang = "en"

// same data as in the `config.json` but indexed by language code
const languages: Languages = i18nConfigs.reduce((result, config) => {
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

export default languages
