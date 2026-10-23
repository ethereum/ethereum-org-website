import { capitalize } from "./string"

export const getLanguageCodeName = (languageCode: string, locale: string) => {
  return capitalize(
    new Intl.DisplayNames([locale], {
      type: "language",
    }).of(languageCode) as string
  )
}

export const getCountryCodeName = (countryCode: string, locale: string) => {
  return new Intl.DisplayNames([locale], {
    type: "region",
  }).of(countryCode) as string
}

/**
 * Collapse whitespace in an `Intl`-formatted string so SSR and client output
 * match byte-for-byte.
 *
 * Node's ICU and the browser's ICU disagree on which space character to emit
 * around formatted parts -- U+202F narrow no-break space vs U+00A0 vs a plain
 * U+0020, varying by locale, engine and ICU version. The results render
 * identically, so nothing looks wrong, but React's hydration check compares
 * strings and bails out into a full client re-render.
 *
 * `\s` already covers U+00A0 and every Unicode space separator (U+2000-U+200A,
 * U+202F, U+205F, U+3000), so one pass normalizes them all. Intl output never
 * contains a meaningful run of spaces, so collapsing runs is safe.
 *
 * Apply this to anything derived from `Intl` that gets rendered.
 */
export const normalizeIntlSpaces = (formatted: string): string =>
  formatted.replace(/\s+/g, " ")
