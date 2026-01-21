import { Lang } from "../types"

export const getLocaleTimestamp = (
  locale: Lang,
  timestamp: string,
  options?: Intl.DateTimeFormatOptions
) => {
  const opts =
    options ||
    ({
      year: "numeric",
      month: "long",
      day: "numeric",
    } as Intl.DateTimeFormatOptions)
  const date = new Date(timestamp)
  return new Intl.DateTimeFormat(locale, opts).format(date)
}

export const getLocaleFormattedDate = (locale: Lang, date: string) => {
  const walletLastUpdatedDate = new Date(date)

  return new Intl.DateTimeFormat(locale).format(walletLastUpdatedDate)
}

/**
 * Returns a duration in seconds for the given interval.
 *
 * @param interval - "minute" | "hour" | "day" | "week" | "month"
 * @param multiplier - Number of intervals (default: 1)
 * @returns Duration in seconds
 */
export const every = (
  interval: "minute" | "hour" | "day" | "week" | "month",
  multiplier: number = 1
): number => {
  const SECOND = 1
  const MINUTE = 60 * SECOND
  const HOUR = 60 * MINUTE
  const DAY = 24 * HOUR
  const WEEK = 7 * DAY
  const MONTH = 28 * DAY // approximate

  switch (interval) {
    case "minute":
      return multiplier * MINUTE
    case "hour":
      return multiplier * HOUR
    case "day":
      return multiplier * DAY
    case "week":
      return multiplier * WEEK
    case "month":
      return multiplier * MONTH
    default:
      return multiplier * DAY
  }
}
