/**
 * A wrapper for Intl.NumberFormat that enforces Web3 numeral standards.
 * - Arabic ('ar') defaults to Western Arabic numerals (1, 2, 3).
 * - Urdu ('ur') defaults to Extended Arabic numerals (۱, ۲, ۳).
 * - All other locales default to 'latn' to prevent browser-specific quirks.
 */
export function numberFormat(
  locale: string,
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

export const formatCompactNumber = (
  value: number,
  locale: string,
  options?: Intl.NumberFormatOptions
): string =>
  numberFormat(locale, {
    notation: "compact",
    maximumSignificantDigits: 3,
    ...options,
  })
    .format(value)
    // Normalize whitespace to avoid SSR/client hydration mismatches: Node's
    // ICU and the browser's ICU can emit different space characters (e.g.
    // U+202F narrow no-break space vs a regular U+0020) between the number
    // and its compact unit (e.g. "123 M"). The two render identically but
    // differ byte-for-byte, tripping React's hydration check. See the same
    // fix in `formatDateRange` (src/lib/utils/date.ts).
    .replace(/\s+/g, " ")

export const formatPriceUSD = (
  value: number,
  locale: string,
  options?: Intl.NumberFormatOptions
): string => {
  return numberFormat(locale, {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    ...options,
  }).format(value)
}

export const numberToPercent = (
  num: number,
  locale: string,
  options?: Intl.NumberFormatOptions
): string =>
  numberFormat(locale, {
    style: "percent",
    maximumFractionDigits: 0,
    ...options,
  }).format(num)
