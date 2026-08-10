import { getLanguageCodeName } from "@/lib/utils/intl"
import {
  formatPriceUSD,
  numberFormat,
  numberToPercent,
} from "@/lib/utils/numbers"
import { safeShuffle } from "@/lib/utils/random"
import { capitalize } from "@/lib/utils/string"

import { newToCrypto } from "@/data/wallets/new-to-crypto"
import walletsData from "@/data/wallets/wallet-data"

import type { WalletFee, WalletFeeAmount, WalletLanguage } from "../types"

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

/** Namespace-bound `t` from useTranslations("page-wallets-find-wallet") */
type WalletFeeTFunc = (
  key: string,
  values?: Record<string, string | number>
) => string

/**
 * Renders structured wallet fees as one line, e.g. "Device: $149, Swap fee: variable".
 * Numbers stay canonical in wallet-data.ts; Intl handles per-locale formatting.
 */
export const formatWalletFees = (
  fees: WalletFee[],
  locale: string,
  t: WalletFeeTFunc
): string => {
  // Node and browser ICU disagree on which thin/narrow space they emit around
  // range dashes; normalize those to avoid hydration mismatches, but leave NBSP
  // alone -- it separates the value from its unit (e.g. de "0,05-0,7 %")
  const formatRange = (
    fmt: Intl.NumberFormat,
    [min, max]: [min: number, max: number]
  ) =>
    fmt.formatRange(min, max).replace(/[\u2000-\u200a\u202f\u205f\u3000]/g, " ")

  // Data stores human-readable percents (0.875 -> "0.875%")
  const percent = (amount: WalletFeeAmount) =>
    Array.isArray(amount)
      ? formatRange(
          numberFormat(locale, { style: "percent", maximumFractionDigits: 3 }),
          [amount[0] / 100, amount[1] / 100]
        )
      : numberToPercent(amount / 100, locale, { maximumFractionDigits: 3 })
  const usd = (amount: WalletFeeAmount) =>
    Array.isArray(amount)
      ? formatRange(
          numberFormat(locale, {
            style: "currency",
            currency: "USD",
            minimumFractionDigits: 0,
            maximumFractionDigits: 2,
          }),
          amount
        )
      : formatPriceUSD(amount, locale, { minimumFractionDigits: 0 })

  const formatValue = (fee: WalletFee): string => {
    if (fee.text) return t(`page-find-wallet-fee-value-${fee.text}`)
    if (fee.percent !== undefined) return percent(fee.percent)
    return usd(fee.usd)
  }

  const items = fees.map((fee) => {
    let value = formatValue(fee)
    if (fee.from) value = t("page-find-wallet-fee-value-from", { value })

    // One-off template without the "{label}: {value}" shape
    if (fee.type === "free-tier-plans")
      return t("page-find-wallet-fee-free-tier-plans", { value })

    if (fee.qualifier) {
      value = t(`page-find-wallet-fee-qualifier-${fee.qualifier}`, {
        value,
        ...(fee.qualifierPercent !== undefined && {
          percent: percent(fee.qualifierPercent),
        }),
        ...(fee.qualifierUsd !== undefined && {
          usd: usd(fee.qualifierUsd),
        }),
      })
    }

    return t("page-find-wallet-fee-item", {
      label: t(`page-find-wallet-fee-label-${fee.type}`),
      value,
    })
  })

  return new Intl.ListFormat(locale, { style: "narrow" }).format(items)
}
