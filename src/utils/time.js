import { DateTime } from "luxon"

export const getLocaleTimestamp = (locale, timestamp) => {
  let localeTimestamp = DateTime.fromSQL(timestamp)
    .setLocale(locale)
    .toLocaleString(DateTime.DATE_FULL)

  // Fallback to ISO
  if (localeTimestamp === "Invalid DateTime") {
    localeTimestamp = DateTime.fromISO(timestamp)
      .setLocale(locale)
      .toLocaleString(DateTime.DATE_FULL)
  }
  return localeTimestamp
}
