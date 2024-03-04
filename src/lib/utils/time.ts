// TODO: we are using `luxon` package just for this util, should consider rewrite using native JS Date API
import { DateTime } from "luxon"

import { Lang } from "../types"

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
