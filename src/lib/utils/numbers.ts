/**
 * A wrapper for Intl.NumberFormat that enforces Web3 numeral standards.
 * - Arabic ('ar') defaults to Western Arabic numerals (1, 2, 3).
 * - Urdu ('ur') defaults to Extended Arabic numerals (۱, ۲, ۳).
 * - All other locales default to 'latn' to prevent browser-specific quirks.
 */
export function numberFormat(
  locale: string,
  // locales?: string | string[],
  options?: Intl.NumberFormatOptions
): Intl.NumberFormat {
  // If numberingSystem explicitly passed, respect it.
  // Otherwise, apply our localization rules.
  let numberingSystem = options?.numberingSystem

  if (!numberingSystem) {
    if (locale === "ur") {
      // Force Extended Arabic numerals for Urdu
      numberingSystem = "arabext"
    } else {
      // Force Western Arabic numerals ('latn') for Arabic and all other locales
      // to override browser defaults that might try to use native scripts.
      numberingSystem = "latn"
    }
  }

  // Merge the resolved numbering system into the options
  const finalOptions: Intl.NumberFormatOptions = {
    ...options,
    ...(numberingSystem && { numberingSystem }),
  }

  return new Intl.NumberFormat(locale, finalOptions)
}

export const formatLargeUSD = (value: number, locale: string): string => {
  return numberFormat(locale, {
    style: "currency",
    currency: "USD",
    notation: "compact",
    minimumSignificantDigits: 3,
    maximumSignificantDigits: 4,
  }).format(value)
}

export const formatSmallUSD = (value: number, locale: string): string => {
  return numberFormat(locale, {
    style: "currency",
    currency: "USD",
    notation: "compact",
    minimumSignificantDigits: 2,
    maximumSignificantDigits: 2,
  }).format(value)
}

export const formatLargeNumber = (value: number, locale: string): string => {
  return numberFormat(locale, {
    notation: "compact",
    minimumSignificantDigits: 3,
    maximumSignificantDigits: 4,
  }).format(value)
}

export const formatPriceUSD = (value: number, locale: string): string => {
  return numberFormat(locale, {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value)
}

export const numberToPercent = (num: number, locale: string): string =>
  numberFormat(locale, {
    style: "percent",
    maximumFractionDigits: 0,
  }).format(num)
