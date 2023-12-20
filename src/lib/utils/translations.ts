import { Lang, Languages } from "@/lib/types"

import { DEFAULT_LOCALE } from "@/lib/constants"

import i18nConfig from "../../../i18n.config.json"

// same data as in the `config.json` but indexed by language code
export const languages: Languages = i18nConfig.reduce((result, config) => {
  return { ...result, [config.code]: config }
}, {} as Languages)

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

  if (path === "assets") {
    requiredNamespaces = [...requiredNamespaces, "page-assets"]
  }

  if (path === "/") {
    requiredNamespaces = [...requiredNamespaces, "page-index"]
  }

  if (path === "/contributing/translation-program/acknowledgements") {
    requiredNamespaces = [
      ...requiredNamespaces,
      "page-contributing-translation-program-acknowledgements",
    ]
  }

  if (path === "/contributing/translation-program/contributors") {
    requiredNamespaces = [
      ...requiredNamespaces,
      "page-contributing-translation-program-contributors",
      "page-languages",
    ]
  }

  if (path.startsWith("/community")) {
    requiredNamespaces = [...requiredNamespaces, "page-community"]
  }

  if (path.startsWith("/dapps")) {
    requiredNamespaces = [...requiredNamespaces, "page-dapps"]
  }

  if (path.startsWith("/energy-consumption")) {
    requiredNamespaces = [
      ...requiredNamespaces,
      "page-about",
      "page-what-is-ethereum",
    ]
  }

  if (path.startsWith("/eth")) {
    requiredNamespaces = [...requiredNamespaces, "page-eth"]
  }

  if (path.startsWith("/glossary") || path.startsWith("/dapps")) {
    requiredNamespaces = [...requiredNamespaces, "glossary"]
  }

  if (path.startsWith("/history")) {
    requiredNamespaces = [...requiredNamespaces, "page-history"]
  }

  if (path.startsWith("/stablecoins")) {
    requiredNamespaces = [...requiredNamespaces, "page-stablecoins"]
  }

  if (path.startsWith("/staking")) {
    requiredNamespaces = [...requiredNamespaces, "page-staking"]
  }

  if (path.startsWith("/staking/deposit-contract")) {
    requiredNamespaces = [
      ...requiredNamespaces,
      "page-staking-deposit-contract",
    ]
  }

  if (path.startsWith("/developers")) {
    requiredNamespaces = [...requiredNamespaces, "page-developers-index"]
  }

  if (path.startsWith("/learn")) {
    requiredNamespaces = [...requiredNamespaces, "page-learn"]
  }

  if (path.startsWith("/developers/local-environment")) {
    requiredNamespaces = [
      ...requiredNamespaces,
      "page-developers-local-environment",
    ]
  }

  if (path.startsWith("/developers/learning-tools")) {
    requiredNamespaces = [
      ...requiredNamespaces,
      "page-developers-learning-tools",
    ]
  }

  if (path.startsWith("/developers/tutorials")) {
    requiredNamespaces = [...requiredNamespaces, "page-developers-tutorials"]
  }

  if (path.startsWith("/developers/docs/scaling")) {
    requiredNamespaces = [...requiredNamespaces, "page-layer-2"]
  }

  if (path === "get-eth") {
    requiredNamespaces = [...requiredNamespaces, "page-get-eth"]
  }

  if (path.startsWith("/languages")) {
    requiredNamespaces = [...requiredNamespaces, "page-languages"]
  }

  if (path.startsWith("/roadmap/vision")) {
    requiredNamespaces = [
      ...requiredNamespaces,
      "page-roadmap-vision",
      "page-upgrades-index",
    ]
  }

  if (path.startsWith("/gas")) {
    requiredNamespaces = [...requiredNamespaces, "page-gas", "page-community"]
  }

  if (path.startsWith("/what-is-ethereum")) {
    requiredNamespaces = [...requiredNamespaces, "page-what-is-ethereum"]
  }

  // Quizzes
  // Note: Add any URL paths that have quizzes here
  if (
    path.startsWith("/eth") ||
    path.startsWith("/layer-2") ||
    path.startsWith("/nft") ||
    path.startsWith("/roadmap/merge") ||
    path.startsWith("/security") ||
    path.startsWith("/wallets") ||
    path.startsWith("/web3") ||
    path.startsWith("/what-is-ethereum") ||
    path.startsWith("/quizzes")
  ) {
    requiredNamespaces = [...requiredNamespaces, "learn-quizzes"]
  }

  if (path === "bug-bounty") {
    requiredNamespaces = [...requiredNamespaces, "page-bug-bounty"]
  }

  if (path === "run-a-node") {
    requiredNamespaces = [...requiredNamespaces, "page-run-a-node"]
  }

  if (path.startsWith("/wallets")) {
    requiredNamespaces = [...requiredNamespaces, "page-wallets", "glossary"]
  }

  if (path.startsWith("/wallets/find-wallet")) {
    requiredNamespaces = [
      ...requiredNamespaces,
      "page-wallets",
      "page-wallets-find-wallet",
    ]
  }

  if (path.startsWith("/layer-2")) {
    requiredNamespaces = [...requiredNamespaces, "page-layer-2"]
  }

  return requiredNamespaces
}

const getRequiredNamespacesForLayout = (layout?: string) => {
  let requiredNamespaces: string[] = []

  // namespaces required for all layouts
  if (layout) {
    requiredNamespaces = [...requiredNamespaces, "glossary"]
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
