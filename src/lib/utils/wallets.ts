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
