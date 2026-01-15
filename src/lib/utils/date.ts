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
