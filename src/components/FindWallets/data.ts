import {
  getNonSupportedLocaleWallets,
  getSupportedLanguages,
  getSupportedLocaleWallets,
} from "@/lib/utils/wallets"

// URL-safe slug for a wallet's dedicated detail route. Wallet names are unique,
// so a lowercased, hyphenated name round-trips well enough for the PoC.
export const walletSlug = (name: string) =>
  name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")

// Single source for the wallet rows, shared by the list page and the detail
// route so both build identical wallet objects.
export const getFindWalletRows = (locale: string) => {
  const supportedLocaleWallets = getSupportedLocaleWallets(locale)
  const noSupportedLocaleWallets = getNonSupportedLocaleWallets(locale)
  return supportedLocaleWallets
    .concat(noSupportedLocaleWallets)
    .map((wallet) => ({
      ...wallet,
      id: wallet.name,
      supportedLanguages: getSupportedLanguages(
        wallet.languages_supported,
        locale
      ),
    }))
}

export const getWalletRowBySlug = (locale: string, slug: string) =>
  getFindWalletRows(locale).find((wallet) => walletSlug(wallet.name) === slug)
