import { DEFAULT_LOCALE } from "../constants"

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
  return new Date(date).toLocaleDateString(locale, {
    month: "long",
    day: "numeric",
    year: "numeric",
    ...options,
  })
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
  new Intl.DateTimeFormat(locale, {
    month: "short",
    day: "numeric",
    ...options,
  }).formatRange(new Date(start), new Date(end || start))

export const getLocaleYear = (
  locale: Intl.LocalesArgument = "en-US",
  date?: ConstructorParameters<DateConstructor>[0]
) =>
  new Intl.DateTimeFormat(locale, { year: "numeric" }).format(
    date ? new Date(date) : new Date()
  )

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
