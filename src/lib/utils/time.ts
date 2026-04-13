import { Lang } from "../types"

import { dateTimeFormat } from "./date"

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
  return dateTimeFormat(locale, opts).format(date)
}
