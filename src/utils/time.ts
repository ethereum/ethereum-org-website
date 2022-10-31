import { DateTime } from "luxon"
import { Lang } from "./languages"

export const INVALID_DATETIME = "Invalid DateTime"

export const getLocaleTimestamp = (locale: Lang, timestamp: string) => {
  let localeTimestamp = DateTime.fromSQL(timestamp)
    .setLocale(locale)
    .toLocaleString(DateTime.DATE_FULL)

  // Fallback to ISO
  if (localeTimestamp === INVALID_DATETIME) {
    localeTimestamp = DateTime.fromISO(timestamp)
      .setLocale(locale)
      .toLocaleString(DateTime.DATE_FULL)
  }
  return localeTimestamp
}
