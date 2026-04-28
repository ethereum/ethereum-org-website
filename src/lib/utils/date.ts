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
  return dateTimeFormat(locale, {
    month: "long",
    day: "numeric",
    year: "numeric",
    ...options,
  }).format(new Date(date))
}

export const isDateReached = (date: string) => {
  const today = new Date()
  const threshold = new Date(date)
  return threshold >= today
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
  }).formatRange(new Date(start), new Date(end || start))

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
