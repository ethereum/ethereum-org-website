import { Lang, Languages } from "@/lib/types"

import * as url from "@/lib/utils/url"

import { DEFAULT_LOCALE, FAKE_LOCALE } from "@/lib/constants"

import i18nConfig from "../../../i18n.config.json"

// Same data as in the `config.json` but indexed by language code
export const languages: Languages = i18nConfig.reduce((result, config) => {
  return { ...result, [config.code]: config }
}, {} as Languages)

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

const getRequiredNamespacesForPath = (relativePath: string) => {
  const path = url.addSlashes(relativePath)

  let primaryNamespace: string | undefined // the primary namespace for the page
  let requiredNamespaces: string[] = [] // any additional namespaces required for the page

  if (path === "/assets/") {
    primaryNamespace = "page-assets"
  }

  if (path === "/") {
    primaryNamespace = "page-index"
  }

  if (path === "/contributing/translation-program/acknowledgements/") {
    primaryNamespace = "page-contributing-translation-program-acknowledgements"
  }

  if (path === "/contributing/translation-program/contributors/") {
    primaryNamespace = "page-contributing-translation-program-contributors"
  }

  if (path.startsWith("/community/")) {
    primaryNamespace = "page-community"
  }

  if (path.startsWith("/dapps/")) {
    primaryNamespace = "page-dapps"
  }

  if (path.startsWith("/energy-consumption/")) {
    primaryNamespace = "page-what-is-ethereum"
    requiredNamespaces = [...requiredNamespaces, "page-about"]
  }

  if (path.startsWith("/eth/")) {
    primaryNamespace = "page-eth"
  }

  if (path.startsWith("/glossary/")) {
    requiredNamespaces = [...requiredNamespaces, "glossary"]
  }

  if (path.startsWith("/history/")) {
    primaryNamespace = "page-history"
  }

  if (path.startsWith("/stablecoins/")) {
    primaryNamespace = "page-stablecoins"
  }

  if (path.startsWith("/staking/")) {
    primaryNamespace = "page-staking"
  }

  if (path.startsWith("/staking/deposit-contract/")) {
    primaryNamespace = "page-staking-deposit-contract"
  }

  if (path.startsWith("/developers/")) {
    primaryNamespace = "page-developers-index"
  }

  if (path.startsWith("/learn/")) {
    primaryNamespace = "page-learn"
  }

  if (path.startsWith("/developers/local-environment/")) {
    primaryNamespace = "page-developers-local-environment"
  }

  if (path.startsWith("/developers/learning-tools/")) {
    primaryNamespace = "page-developers-learning-tools"
  }

  if (path.startsWith("/developers/tutorials/")) {
    primaryNamespace = "page-developers-tutorials"
  }

  if (path.startsWith("/developers/docs/scaling/")) {
    requiredNamespaces = [...requiredNamespaces, "page-layer-2"]
  }

  if (path === "/get-eth/") {
    primaryNamespace = "page-get-eth"
  }

  if (path.startsWith("/roadmap/vision/")) {
    primaryNamespace = "page-roadmap-vision"
    requiredNamespaces = [...requiredNamespaces, "page-upgrades-index"]
  }

  if (path.startsWith("/gas/")) {
    primaryNamespace = "page-gas"
    requiredNamespaces = [...requiredNamespaces, "page-gas", "page-community"]
  }

  if (path.startsWith("/what-is-ethereum/")) {
    primaryNamespace = "page-what-is-ethereum"
  }

  if (path === "/bug-bounty/") {
    primaryNamespace = "page-bug-bounty"
  }

  if (path.startsWith("/run-a-node/")) {
    primaryNamespace = "page-run-a-node"
  }

  if (path.endsWith("/wallets/")) {
    primaryNamespace = "page-wallets"
  }

  if (path.endsWith("/wallets/find-wallet/")) {
    primaryNamespace = "page-wallets-find-wallet"
    requiredNamespaces = [...requiredNamespaces, "page-wallets", "table"]
  }

  // TODO: Remove this when the page is translated
  if (path.startsWith("/layer-2/")) {
    primaryNamespace = "page-layer-2"
  }

  if (path.startsWith("/layer-2/learn/")) {
    primaryNamespace = "page-layer-2-learn"
  }

  if (path.startsWith("/layer-2/networks/")) {
    requiredNamespaces = [...requiredNamespaces, "table"]
  }

  if (path.startsWith("/contributing/translation-program/translatathon/")) {
    primaryNamespace = "page-translatathon"
  }

  // Glossary tooltips
  if (
    path.startsWith("/dapps/") ||
    path.startsWith("/layer-2/") ||
    path.startsWith("/layer-2/learn/") ||
    path.startsWith("/get-eth/") ||
    path.startsWith("/stablecoins/") ||
    path.startsWith("/staking/") ||
    path.startsWith("/run-a-node/") ||
    path.startsWith("/what-is-ethereum/") ||
    path.startsWith("/eth/") ||
    path.startsWith("/wallets/") ||
    path.startsWith("/gas/")
  ) {
    requiredNamespaces = [...requiredNamespaces, "glossary-tooltip"]
  }

  // Quizzes
  // Note: Add any URL paths that have quizzes here
  if (
    path.startsWith("/eth/") ||
    path.startsWith("/layer-2/") ||
    path.startsWith("/layer-2/learn/") ||
    path.startsWith("/nft/") ||
    path.startsWith("/roadmap/merge/") ||
    path.startsWith("/roadmap/scaling/") ||
    path.startsWith("/run-a-node/") ||
    path.startsWith("/security/") ||
    path.startsWith("/staking/solo/") ||
    path.startsWith("/wallets/") ||
    path.startsWith("/web3/") ||
    path.startsWith("/what-is-ethereum/") ||
    path.startsWith("/quizzes/") ||
    path.startsWith("/stablecoins/") ||
    path.startsWith("/defi/")
  ) {
    requiredNamespaces = [...requiredNamespaces, "learn-quizzes"]
  }

  // Ensures that the primary namespace is always the first item in the array
  return primaryNamespace
    ? [primaryNamespace, ...requiredNamespaces]
    : [...requiredNamespaces]
}

const getRequiredNamespacesForLayout = (layout?: string) => {
  let requiredNamespaces: string[] = []

  // namespaces required for all layouts
  if (layout) {
    requiredNamespaces = [...requiredNamespaces, "glossary-tooltip"]
  }

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
