import { shuffle } from "lodash"

import walletData from "@/data/wallets/wallet-data"

export const getSupportedLocaleWallets = (locale: string) =>
  shuffle(
    walletData.filter((wallet) => wallet.languages_supported.includes(locale))
  )

export const getNonSupportedLocaleWallets = (locale: string) =>
  shuffle(
    walletData.filter((wallet) => !wallet.languages_supported.includes(locale))
  )
