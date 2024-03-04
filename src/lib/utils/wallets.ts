import { shuffle } from "lodash"

import walletData, { WalletData } from "@/data/wallets/wallet-data"

import {
  DEVELOPER_FEATURES,
  FINANCE_FEATURES,
  LONG_TERM_FEATURES,
  NEW_TO_CRYPTO_FEATURES,
  NFTS_FEATURES,
} from "../constants"

export const getSupportedLocaleWallets = (locale: string) =>
  shuffle(
    walletData.filter((wallet) => wallet.languages_supported.includes(locale))
  )

export const getNonSupportedLocaleWallets = (locale: string) =>
  shuffle(
    walletData.filter((wallet) => !wallet.languages_supported.includes(locale))
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
  walletSupportedLanguages: string[],
  languages: {}[],
  locale: string
) => {
  const supportedLanguages = [] as string[]

  // current locale should appear first on the list, this manipulates the array to move it to the top if needed
  const supportsCurrentLocale = (current) => current === locale
  const localeIndex = walletSupportedLanguages.findIndex(supportsCurrentLocale)

  if (localeIndex >= 0) {
    walletSupportedLanguages.splice(localeIndex, 1)
    walletSupportedLanguages.unshift(locale)
  }

  walletSupportedLanguages.forEach((supportedLanguage) => {
    for (const [_, value] of Object.entries(languages)) {
      if (value[supportedLanguage]) {
        supportedLanguages.push(value[supportedLanguage])
      }
    }
  })

  return supportedLanguages
}

export const formatSupportedLanguages = (
  supportedLanguages: string[],
  sliceSize?: number
) => {
  return sliceSize
    ? supportedLanguages.slice(0, sliceSize).join(", ")
    : supportedLanguages.join(", ")
}

export const getPersonaBorderColor = (selectedPersona: number, idx: number) => {
  return selectedPersona === idx ? "primary.base" : "transparent"
}
