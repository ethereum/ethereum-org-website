import { DateTime } from "luxon"

export const getLocaleTimestamp = (locale, timestamp) => {
  return DateTime.local().setLocale(locale).toFormat("MMM dd, yyyy")
}
