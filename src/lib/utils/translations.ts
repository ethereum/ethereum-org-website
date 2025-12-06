import { Lang, Languages } from "@/lib/types"

import * as url from "@/lib/utils/url"

import { DEFAULT_LOCALE, FAKE_LOCALE } from "@/lib/constants"

import i18nConfig from "../../../i18n.config.json"

// Same data as in the `config.json` but indexed by language code
export const languages: Languages = i18nConfig.reduce((result, config) => {
  return { ...result, [config.code]: config }
}, {} as Languages)

export const EXACT_PATH_NAMESPACE_MAP: Record<string, string> = {
  "/": "page-index",
  "/assets/": "page-assets",
  "/collectibles/": "page-collectibles",
  "/contributing/translation-program/acknowledgements/":
    "page-contributing-translation-program-acknowledgements",
  "/contributing/translation-program/contributors/":
    "page-contributing-translation-program-contributors",
  "/get-eth/": "page-get-eth",
  "/bug-bounty/": "page-bug-bounty",
  "/wallets/find-wallet/": "page-wallets-find-wallet",
  "/wallets/": "page-wallets",
}

export const PREFIX_PATH_NAMESPACE_MAP: Array<[string, string]> = [
  ["/staking/deposit-contract/", "page-staking-deposit-contract"],
  ["/staking/", "page-staking"],
  ["/layer-2/networks/", "page-layer-2-networks"],
  ["/layer-2/learn/", "page-layer-2-learn"],
  ["/layer-2/", "page-layer-2"],
  ["/developers/local-environment/", "page-developers-local-environment"],
  ["/developers/learning-tools/", "page-developers-learning-tools"],
  ["/developers/tutorials/", "page-developers-tutorials"],
  ["/developers/", "page-developers-index"],
  ["/contributing/translation-program/translatathon/", "page-translatathon"],
  ["/community/", "page-community"],
  ["/apps/", "page-apps"],
  ["/energy-consumption/", "page-energy-consumption"],
  ["/eth/", "page-eth"],
  ["/ethereum-forks/", "page-history"],
  ["/resources/", "page-resources"],
  ["/stablecoins/", "page-stablecoins"],
  ["/learn/", "page-learn"],
  ["/gas/", "page-gas"],
  ["/what-is-ethereum/", "page-what-is-ethereum"],
  ["/run-a-node/", "page-run-a-node"],
  ["/roadmap/", "page-roadmap"],
  ["/start/", "page-start"],
]

const EXACT_PATH_ADDITIONAL_NAMESPACES: Record<string, string[]> = {
  "/": ["page-10-year-anniversary"],
}

const PREFIX_PATH_ADDITIONAL_NAMESPACES: Array<[string, string[]]> = [
  ["/developers/docs/scaling/", ["page-layer-2"]],
  ["/roadmap/vision/", ["page-upgrades-index", "page-roadmap-vision"]],
  ["/gas/", ["page-gas", "page-community"]],
  ["/layer-2/networks/", ["table"]],
  ["/energy-consumption/", ["page-about"]],
  ["/glossary/", ["glossary"]],
  ["/10years/", ["page-10-year-anniversary"]],
]

const SUFFIX_PATH_ADDITIONAL_NAMESPACES: Array<[string, string[]]> = [
  ["/wallets/find-wallet/", ["page-wallets", "table"]],
]

const GLOSSARY_TOOLTIP_PREFIXES: string[] = [
  "/layer-2/learn/",
  "/layer-2/",
  "/apps/",
  "/get-eth/",
  "/stablecoins/",
  "/staking/",
  "/run-a-node/",
  "/what-is-ethereum/",
  "/eth/",
  "/wallets/",
  "/gas/",
]

const QUIZZES_PREFIXES: string[] = [
  "/layer-2/learn/",
  "/layer-2/",
  "/roadmap/merge/",
  "/roadmap/scaling/",
  "/staking/solo/",
  "/defi/",
  "/eth/",
  "/gas/",
  "/nft/",
  "/quizzes/",
  "/run-a-node/",
  "/security/",
  "/smart-contracts/",
  "/stablecoins/",
  "/wallets/",
  "/web3/",
  "/what-is-ethereum/",
]

const LAYOUT_NAMESPACES: Record<string, string[]> = {
  docs: ["page-developers-docs"],
  "use-cases": ["template-usecase", "learn-quizzes"],
  upgrade: ["page-upgrades", "page-upgrades-index"],
  tutorial: ["page-developers-tutorials"],
}

export const isLangRightToLeft = (lang: Lang): boolean => {
  const langConfig = i18nConfig.filter((language) => language.code === lang)

  if (!langConfig.length) {
    return false
  }

  return langConfig[0].langDir === "rtl"
}

export const filterRealLocales = (locales: string[] | undefined) => {
  return locales?.filter((locale) => locale !== FAKE_LOCALE) || []
}

export const isLocaleValidISO639_1 = (locale: string) => {
  return i18nConfig.find((language) => language.code === locale)?.validISO639_1
}

// Overwrites the default Persian numbering of the Farsi language to use Hindu-Arabic numerals (0-9)
// Context: https://github.com/ethereum/ethereum-org-website/pull/5490#pullrequestreview-892596553
export const getLocaleForNumberFormat = (locale: Lang): Lang =>
  locale === "fa" ? DEFAULT_LOCALE : locale

export const isLang = (lang: string) => {
  return i18nConfig.map((language) => language.code).includes(lang)
}

/**
 * Convert language codes to full language names using the i18n config
 * @param languageCodes Array of language codes (e.g., ['en', 'es', 'fr'])
 * @returns Array of full language names (e.g., ['English', 'Spanish', 'French'])
 */
export const formatLanguageNames = (languageCodes: string[]): string[] => {
  return languageCodes
    .map((code) => {
      const langConfig = i18nConfig.find((lang) => lang.code === code)
      return langConfig?.name || code
    })
    .filter(Boolean)
}

export const getPrimaryNamespaceForPath = (
  relativePath: string
): string | undefined => {
  const path = url.addSlashes(relativePath)

  if (EXACT_PATH_NAMESPACE_MAP[path]) {
    return EXACT_PATH_NAMESPACE_MAP[path]
  }

  for (const [prefix, ns] of PREFIX_PATH_NAMESPACE_MAP) {
    if (path.startsWith(prefix)) {
      return ns
    }
  }

  return undefined
}

export const getAllIntlPagePaths = (): string[] => {
  return [
    ...Object.keys(EXACT_PATH_NAMESPACE_MAP),
    ...PREFIX_PATH_NAMESPACE_MAP.map(([path]) => path),
  ]
}

const getRequiredNamespacesForPath = (relativePath: string) => {
  const path = url.addSlashes(relativePath)

  const primaryNamespace = getPrimaryNamespaceForPath(path)
  const requiredNamespaces: string[] = []

  if (EXACT_PATH_ADDITIONAL_NAMESPACES[path]) {
    requiredNamespaces.push(...EXACT_PATH_ADDITIONAL_NAMESPACES[path])
  }

  for (const [prefix, namespaces] of PREFIX_PATH_ADDITIONAL_NAMESPACES) {
    if (path.startsWith(prefix)) {
      requiredNamespaces.push(...namespaces)
      break
    }
  }

  for (const [suffix, namespaces] of SUFFIX_PATH_ADDITIONAL_NAMESPACES) {
    if (path.endsWith(suffix)) {
      requiredNamespaces.push(...namespaces)
      break
    }
  }

  for (const prefix of GLOSSARY_TOOLTIP_PREFIXES) {
    if (path.startsWith(prefix)) {
      requiredNamespaces.push("glossary-tooltip")
      break
    }
  }

  for (const prefix of QUIZZES_PREFIXES) {
    if (path.startsWith(prefix)) {
      requiredNamespaces.push("learn-quizzes")
      break
    }
  }

  return primaryNamespace
    ? [primaryNamespace, ...requiredNamespaces]
    : [...requiredNamespaces]
}

const getRequiredNamespacesForLayout = (layout?: string) => {
  const requiredNamespaces: string[] = []

  if (layout) {
    requiredNamespaces.push("glossary-tooltip")
  }

  if (layout && LAYOUT_NAMESPACES[layout]) {
    requiredNamespaces.push(...LAYOUT_NAMESPACES[layout])
  }

  return requiredNamespaces
}

export const getRequiredNamespacesForPage = (
  path: string,
  layout?: string | undefined
) => {
  const baseNamespaces = ["common"]
  const requiredNamespacesForPath = getRequiredNamespacesForPath(path)
  // TODO remove layout case since we can't use it anymore
  const requiredNamespacesForLayout = getRequiredNamespacesForLayout(layout)

  return [
    ...baseNamespaces,
    ...requiredNamespacesForPath,
    ...requiredNamespacesForLayout,
  ]
}
