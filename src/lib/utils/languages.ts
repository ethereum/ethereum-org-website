import i18nConfig from '../../../i18n.config.json'
import type { I18nLocale, Lang } from "@/lib/types"


export type Languages = {
    [lang in Lang]: I18nLocale
  }

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
