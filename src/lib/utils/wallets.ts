import { union } from "lodash"

import { getLanguageCodeName } from "@/lib/utils/intl"
import { safeShuffle } from "@/lib/utils/random"
import { capitalize } from "@/lib/utils/string"

import { newToCrypto } from "@/data/wallets/new-to-crypto"
import walletsData from "@/data/wallets/wallet-data"

import type { WalletLanguage } from "../types"

export const getSupportedLocaleWallets = (locale: string) =>
  safeShuffle(
    walletsData.filter((wallet) =>
      wallet.languages_supported.includes(locale as WalletLanguage)
    )
  )

export const getNonSupportedLocaleWallets = (locale: string) =>
  safeShuffle(
    walletsData.filter(
      (wallet) => !wallet.languages_supported.includes(locale as WalletLanguage)
    )
  )

export const getNewToCryptoWallets = () => {
  return walletsData.filter((wallet) => newToCrypto.includes(wallet.name))
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
      currentWallet.languages_supported.includes(languageCode as WalletLanguage)
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
