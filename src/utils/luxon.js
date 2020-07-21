import { DateTime } from "luxon"

export const getLocaleTimestamp = (locale, timestamp) => {
  let timeLastUpdate = DateTime.local(timestamp).ts

  return DateTime.fromMillis(timeLastUpdate)
    .setLocale(locale)
    .toFormat("MMM dd, yyyy")
}
