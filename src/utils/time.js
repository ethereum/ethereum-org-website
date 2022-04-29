import { DateTime } from "luxon"

export const INVALID_DATETIME = "Invalid DateTime"

export const getLocaleTimestamp = (locale, timestamp, slug = null) => {
  let localeTimestamp = DateTime.fromSQL(timestamp)
    .setLocale(locale)
    .toLocaleString(DateTime.DATE_FULL)

  // Fallback to ISO
  if (localeTimestamp === INVALID_DATETIME) {
    localeTimestamp = DateTime.fromISO(timestamp)
      .setLocale(locale)
      .toLocaleString(DateTime.DATE_FULL)
  }

  if (slug && localeTimestamp === INVALID_DATETIME) {
    console.error("Invalid datetime at:", slug)
  }

  return localeTimestamp
}
