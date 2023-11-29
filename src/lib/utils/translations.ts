import i18nConfig from "../../../i18n.config.json"

import { I18nLocale, Lang } from "../types"

import { DEFAULT_LOCALE } from "../constants"

export type Languages = {
  [lang in Lang]: I18nLocale
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
  [lang: string]: I18nLocale
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

export const isLangRightToLeft = (lang: Lang): boolean => {
  const langConfig = i18nConfig.filter((language) => language.code === lang)

  if (!langConfig.length)
    throw new Error("Language code not found in isLangRightToLeft")

  return langConfig[0].langDir === "rtl"
}

// Overwrites the default Persian numbering of the Farsi language to use Hindu-Arabic numerals (0-9)
// Context: https://github.com/ethereum/ethereum-org-website/pull/5490#pullrequestreview-892596553
export const getLocaleForNumberFormat = (locale: Lang): Lang =>
  locale === "fa" ? DEFAULT_LOCALE : locale

export const isLang = (lang: string) => {
  return i18nConfig.map((language) => language.code).includes(lang)
}

export const getRequiredNamespacesForPage = (
  path: string,
  layout?: string | undefined
) => {
  const baseNamespaces = ["common"]

  const requiredNamespacesForPath = getRequiredNamespacesForPath(path)
  const requiredNamespacesForLayout = getRequiredNamespacesForLayout(layout)

  return [
    ...baseNamespaces,
    ...requiredNamespacesForPath,
    ...requiredNamespacesForLayout,
  ]
}

const getRequiredNamespacesForPath = (path: string) => {
  let requiredNamespaces: string[] = []

  if (path.startsWith("/community")) {
    requiredNamespaces = [...requiredNamespaces, "page-community"]
  }

  if (path.startsWith("/energy-consumption")) {
    requiredNamespaces = [
      ...requiredNamespaces,
      "page-about",
      "page-what-is-ethereum",
    ]
  }

  if (path.startsWith("/glossary")) {
    requiredNamespaces = [...requiredNamespaces, "glossary"]
  }

  if (path.startsWith("/history")) {
    requiredNamespaces = [...requiredNamespaces, "page-history"]
  }

  if (path.startsWith("/nft")) {
    requiredNamespaces = [...requiredNamespaces, "learn-quizzes"]
  }

  if (path.startsWith("/staking")) {
    requiredNamespaces = [...requiredNamespaces, "page-staking"]
  }

  if (path.startsWith("/developers/docs/scaling")) {
    requiredNamespaces = [...requiredNamespaces, "page-layer-2"]
  }

  if (path.startsWith("/languages")) {
    requiredNamespaces = [...requiredNamespaces, "page-languages"]
  }

  // Quizzes
  // Note: Add any URL paths that have quizzes here
  if (
    path.startsWith("/nft") ||
    path.startsWith("/roadmap/merge") ||
    path.startsWith("/security")
  ) {
    requiredNamespaces = [...requiredNamespaces, "learn-quizzes"]
  }

  return requiredNamespaces
}

const getRequiredNamespacesForLayout = (layout?: string) => {
  let requiredNamespaces: string[] = []

  if (layout === "docs") {
    requiredNamespaces = [...requiredNamespaces, "page-developers-docs"]
  }

  if (layout === "use-cases") {
    requiredNamespaces = [
      ...requiredNamespaces,
      "template-usecase",
      "learn-quizzes",
    ]
  }

  if (layout === "upgrade") {
    requiredNamespaces = [
      ...requiredNamespaces,
      "page-upgrades",
      "page-upgrades-index",
    ]
  }

  if (layout === "tutorial") {
    requiredNamespaces = [...requiredNamespaces, "page-developers-tutorials"]
  }

  return requiredNamespaces
}
