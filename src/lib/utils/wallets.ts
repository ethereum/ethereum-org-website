import { shuffle, union } from "lodash"

import { getLanguageCodeName } from "@/lib/utils/intl"
import { capitalize } from "@/lib/utils/string"

import walletsData from "@/data/wallets/wallet-data"

import {
  DEVELOPER_FEATURES,
  FINANCE_FEATURES,
  LONG_TERM_FEATURES,
  NEW_TO_CRYPTO_FEATURES,
  NFTS_FEATURES,
} from "../constants"
import type { Lang, WalletData, WalletFilter } from "../types"

export const getSupportedLocaleWallets = (locale: string) =>
  shuffle(
    walletsData.filter((wallet) =>
      wallet.languages_supported.includes(locale as Lang)
    )
  )

export const getNonSupportedLocaleWallets = (locale: string) =>
  shuffle(
    walletsData.filter(
      (wallet) => !wallet.languages_supported.includes(locale as Lang)
    )
  )

// Get a list of a wallet supported Personas (new to crypto, nfts, long term, finance, developer)
export const getWalletPersonas = (wallet: WalletData) => {
  const walletPersonas: string[] = []

  const isNewToCryptoPersona = NEW_TO_CRYPTO_FEATURES.every(
    (feature) => wallet[feature]
  )
  const isNFTPersona = NFTS_FEATURES.every((feature) => wallet[feature])
  const isLongTermPersona = LONG_TERM_FEATURES.every(
    (feature) => wallet[feature]
  )
  const isFinancePersona = FINANCE_FEATURES.every((feature) => wallet[feature])
  const isDeveloperPersona = DEVELOPER_FEATURES.every(
    (feature) => wallet[feature]
  )

  if (isNewToCryptoPersona) {
    walletPersonas.push("page-find-wallet-new-to-crypto-title")
  }

  if (isNFTPersona) {
    walletPersonas.push("page-find-wallet-nfts-title")
  }

  if (isLongTermPersona) {
    walletPersonas.push("page-find-wallet-hodler-title")
  }

  if (isFinancePersona) {
    walletPersonas.push("page-find-wallet-finance-title")
  }

  if (isDeveloperPersona) {
    walletPersonas.push("page-find-wallet-developer-title")
  }

  return walletPersonas
}

// Get a list of wallet supported languages with native title
export const getSupportedLanguages = (
  supportedLanguageCodes: string[],
  locale: string
) => {
  const supportedLanguages = [] as string[]

  // current locale should appear first on the list, this manipulates the array to move it to the top if needed
  const supportsCurrentLocale = (current) => current === locale
  const localeIndex = supportedLanguageCodes.findIndex(supportsCurrentLocale)

  if (localeIndex >= 0) {
    supportedLanguageCodes.splice(localeIndex, 1)
    supportedLanguageCodes.unshift(locale)
  }

  supportedLanguageCodes.forEach((supportedLanguage) => {
    // Get supported language name
    const supportedLanguageName = getLanguageCodeName(supportedLanguage, locale)
    // Capitalize supported language name
    supportedLanguages.push(capitalize(supportedLanguageName!))
  })

  return supportedLanguages
}

// Format languages list to be displayed on UI label
export const formatStringList = (strings: string[], sliceSize?: number) => {
  return sliceSize ? strings.slice(0, sliceSize).join(", ") : strings.join(", ")
}

// Get total count of wallets that support a language
const getLanguageTotalCount = (languageCode: string) => {
  return walletsData.reduce(
    (total, currentWallet) =>
      currentWallet.languages_supported.includes(languageCode as Lang)
        ? (total = total + 1)
        : total,
    0
  )
}

// Get a list of all wallets languages, without duplicates
export const getAllWalletsLanguages = (locale: string) => {
  const compareFn = (
    a: { langCode: string; langName: string },
    b: { langCode: string; langName: string }
  ) => {
    if (a.langName > b.langName) {
      return 1
    }
    if (a.langName < b.langName) {
      return -1
    }
    return 0
  }

  return (
    walletsData
      .reduce(
        (allLanguagesList, current) =>
          // `union` lodash method merges all arrays removing duplicates
          union(allLanguagesList, current.languages_supported),
        [] as string[]
      )
      .map((languageCode) => {
        // Get supported language name
        const supportedLanguageName = getLanguageCodeName(languageCode, locale)
        // Get a list of {langCode, langName}
        return {
          langCode: languageCode,
          langName: `${capitalize(
            supportedLanguageName!
          )} (${getLanguageTotalCount(languageCode)})`,
        }
      })
      // Sort list alphabetically by langName
      .sort(compareFn)
  )
}

// Get a list of top n wallets languages
export const getWalletsTopLanguages = (n: number, locale: string) => {
  const compareFn = (a: string, b: string) => {
    return getLanguageTotalCount(b) - getLanguageTotalCount(a)
  }

  return walletsData
    .reduce(
      (allLanguagesList, current) =>
        // `union` lodash method merges all arrays removing duplicates
        union(allLanguagesList, current.languages_supported),
      [] as string[]
    )
    .sort(compareFn)
    .map((languageCode) => {
      // Get supported language name
      const supportedLanguageName = getLanguageCodeName(languageCode, locale)
      // Return {code, capitalized language name}
      return {
        code: languageCode,
        langName: `${capitalize(
          supportedLanguageName!
        )} (${getLanguageTotalCount(languageCode)})`,
      }
    })
    .slice(0, n)
}

// Get wallets listing count after applying filters
export const walletsListingCount = (filters: WalletFilter) => {
  return Object.values(filters).reduce(
    (acc, filter) => (filter ? acc + 1 : acc),
    0
  )
}

export const getLanguageCountWalletsData = (locale: string) => {
  const languageCountWalletsData = getAllWalletsLanguages(locale).map(
    (language) => ({
      langCode: language.langCode,
      count: getLanguageTotalCount(language.langCode),
      name: getLanguageCodeName(language.langCode, locale),
    })
  )
  languageCountWalletsData.sort((a, b) => a.name.localeCompare(b.name))
  return languageCountWalletsData
}
