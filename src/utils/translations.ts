import { IntlShape } from "gatsby-plugin-intl"

import languages, { Lang } from "../data/languages"

export const defaultLanguage = `en`

const buildLangs = (process.env.GATSBY_BUILD_LANGS || "")
  .split(",")
  .filter(Boolean)

const consoleError = (message: string): void => {
  const { NODE_ENV } = process.env
  if (NODE_ENV === "development") {
    console.error(message)
  }
}

// will take the same shape as `languages`. Only thing we are doing
// here is filtering the desired langs to be built
export const languageMetadata = Object.fromEntries(
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

// Returns the en.json value
export const getDefaultMessage = (key: string): string => {
  const defaultStrings = require("../intl/en.json")
  const defaultMessage = defaultStrings[key]
  if (defaultMessage === undefined) {
    consoleError(
      `No key "${key}" in en.json. Cannot provide a default message.`
    )
  }
  return defaultMessage || ""
}

export const isLangRightToLeft = (lang: Lang): boolean => {
  return lang === "ar" || lang === "fa"
}

export const translateMessageId = (id: string, intl: IntlShape): string => {
  if (!id) {
    consoleError(`No id provided for translation.`)
    return ""
  }
  if (!intl || !intl.formatMessage) {
    consoleError(`Invalid/no intl provided for translation id ${id}`)
    return ""
  }
  const translation = intl.formatMessage({
    id,
    defaultMessage: getDefaultMessage(id),
  })
  if (translation === id) {
    consoleError(
      `Intl ID string "${id}" has no match. Default message of "" returned.`
    )
    return ""
  }
  return translation
}

// Overwrites the default Persian numbering of the Farsi language to use Hindu-Arabic numerals (0-9)
// Context: https://github.com/ethereum/ethereum-org-website/pull/5490#pullrequestreview-892596553
export const getLocaleForNumberFormat = (locale: Lang) => {
  if (locale === "fa") {
    return "en"
  }

  return locale
}
