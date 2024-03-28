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
