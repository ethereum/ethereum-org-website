import type { PartialDate } from "@/data/upgrades/types"

import { DEFAULT_LOCALE } from "../constants"
import type { Lang } from "../types"

/**
 * A wrapper for Intl.DateTimeFormat that enforces Web3 date standards.
 * - Forces the Gregorian calendar universally.
 * - Arabic ('ar') and standard locales default to Western numerals (1, 2, 3).
 * - Urdu ('ur') defaults to Extended Arabic numerals (۱, ۲, ۳).
 */
export function dateTimeFormat(
  locale: string,
  options?: Intl.DateTimeFormatOptions
): Intl.DateTimeFormat {
  let numberingSystem = options?.numberingSystem

  if (!numberingSystem) {
    if (locale === "ur") {
      numberingSystem = "arabext" // Native Urdu numerals
    } else {
      numberingSystem = "latn" // Western numerals for Arabic, Indic, etc.
    }
  }

  const finalOptions: Intl.DateTimeFormatOptions = {
    // ALWAYS force Gregorian for tech/Web3 consistency
    calendar: "gregory",
    ...options,
    ...(numberingSystem && { numberingSystem }),
  }

  return new Intl.DateTimeFormat(locale, finalOptions)
}

export const dateToString = (published: Date | string) =>
  new globalThis.Date(published).toISOString().split("T")[0]

export const isValidDate = (
  dateString?: Date | string | number | null
): boolean => {
  if (!dateString) return false
  const date = new Date(dateString)
  return !isNaN(date.getTime())
}

export const getValidDate = (
  dateValue: Date | string | number | null | undefined
): Date | null => {
  const dateString =
    dateValue instanceof Date ? dateValue.toISOString() : dateValue
  return isValidDate(dateString) ? new Date(dateValue as Date | string) : null
}

export const formatDate = (
  date: string,
  locale: string = "en-US",
  options?: Intl.DateTimeFormatOptions
) => {
  if (/^\d{4}$/.test(date)) {
    return date
  }
  // Guard malformed input (e.g. RSS pubDate / frontmatter) so callers can
  // render the result directly without their own NaN check.
  if (!isValidDate(date)) {
    return ""
  }
  return (
    dateTimeFormat(locale, {
      month: "long",
      day: "numeric",
      year: "numeric",
      ...options,
    })
      .format(new Date(date))
      // Normalize whitespace to avoid SSR/client hydration mismatches: Node's ICU
      // and the browser's ICU can emit different space characters (e.g. U+202F
      // narrow no-break space vs a regular U+0020) around date parts. The two
      // render identically but differ byte-for-byte, tripping React's hydration
      // check. Collapsing whitespace makes the output deterministic. See
      // formatDateRange for the same fix.
      .replace(/\s+/g, " ")
  )
}

/**
 * Format a {@link PartialDate} at whatever precision it carries: a year, a
 * quarter, a month and year, or a full date. Used by the upgrade data layer,
 * where a date is only ever as precise as its source.
 *
 * Built through `dateTimeFormat` so Arabic and Urdu get the right numbering
 * system, and pinned to UTC so a `{ year, month, day }` never renders as the
 * previous day for viewers behind UTC.
 *
 * Quarters can't go through `Intl` — there is no quarter skeleton, and "Q4
 * 2026" is written very differently across locales — so the caller passes a
 * `formatQuarter` that renders a translated pattern. It is required rather than
 * optional so a quarter date can never silently degrade to just its year.
 */
export const formatPartialDate = (
  { year, quarter, month, day }: PartialDate,
  locale: string = DEFAULT_LOCALE,
  formatQuarter: (quarter: number, year: number) => string
) => {
  if (quarter) return formatQuarter(quarter, year)

  const date = new Date(Date.UTC(year, (month ?? 1) - 1, day ?? 1))
  return dateTimeFormat(locale, {
    timeZone: "UTC",
    year: "numeric",
    ...(month && { month: "long" }),
    ...(day && { day: "numeric" }),
  }).format(date)
}

export const formatDateRange = (
  start: string,
  end: string | null,
  locale: string = DEFAULT_LOCALE,
  options?: Intl.DateTimeFormatOptions
) =>
  dateTimeFormat(locale, {
    month: "short",
    day: "numeric",
    ...options,
  })
    .formatRange(new Date(start), new Date(end || start))
    // Normalize whitespace to avoid SSR/client hydration mismatches: Node's ICU
    // and the browser's ICU can emit different space characters (e.g. U+202F
    // narrow no-break space vs a regular U+0020) around the range en-dash. The
    // two render identically but differ byte-for-byte, tripping React's
    // hydration check. Collapsing whitespace makes the output deterministic.
    .replace(/\s+/g, " ")

/**
 * Date range split into parts so callers can style them individually (e.g. a
 * lighter year), instead of hand-assembling the string -- which would hard-code
 * English part order. Whitespace is normalized as in `formatDateRange`.
 */
export const formatDateRangeToParts = (
  start: Date | string,
  end: Date | string,
  locale: string = DEFAULT_LOCALE,
  options?: Intl.DateTimeFormatOptions
) =>
  dateTimeFormat(locale, {
    month: "short",
    day: "numeric",
    ...options,
  })
    .formatRangeToParts(new Date(start), new Date(end))
    .map(({ type, value }) => ({ type, value: value.replace(/\s+/g, " ") }))

export const getLocaleYear = (
  locale: string = "en-US",
  date?: ConstructorParameters<DateConstructor>[0]
) =>
  dateTimeFormat(locale, { year: "numeric" }).format(
    date ? new Date(date) : new Date()
  )

export const getLocaleFormattedDate = (locale: Lang, date: string) => {
  const walletLastUpdatedDate = new Date(date)
  return dateTimeFormat(locale).format(walletLastUpdatedDate)
}

/**
 * Get ISO week number for a given date
 * Used as seed for deterministic weekly rotation
 *
 * @param date - The date to get the week number for
 * @returns ISO week number (1-53)
 */
export const getWeekNumber = (date: Date): number => {
  const d = new Date(
    Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
  )
  const dayNum = d.getUTCDay() || 7
  d.setUTCDate(d.getUTCDate() + 4 - dayNum)
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1))
  return Math.ceil(((d.getTime() - yearStart.getTime()) / 86400000 + 1) / 7)
}

/**
 * Get day of year for a given date (1-365/366)
 * Used as seed for deterministic daily rotation
 *
 * @param date - The date to get the day of year for
 * @returns Day of year (1-365 or 1-366 for leap years)
 */
export const getDayOfYear = (date: Date): number => {
  const start = new Date(date.getFullYear(), 0, 0)
  const diff = date.getTime() - start.getTime()
  return Math.floor(diff / 86400000)
}
