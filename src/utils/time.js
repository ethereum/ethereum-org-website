import { DateTime } from "luxon"

export const getLocaleTimestamp = (locale, timestamp) => {
  const ts = DateTime.local(timestamp).ts

  return DateTime.fromMillis(ts)
    .setLocale(locale)
    .toLocaleString(DateTime.DATE_FULL)
}
