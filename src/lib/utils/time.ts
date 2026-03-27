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
 * Convert duration from "H:MM:SS" or "M:SS" format to ISO 8601 (PTxHxMxS).
 *
 * @param duration - Duration string in "H:MM:SS" or "M:SS" format
 * @returns ISO 8601 duration string (e.g., "PT1H2M30S")
 */
export function toIsoDuration(duration: string): string {
  const parts = duration.split(":").map(Number)
  if (parts.length === 3) {
    const [h, m, s] = parts
    return `PT${h > 0 ? `${h}H` : ""}${m}M${s}S`
  }
  if (parts.length === 2) {
    const [m, s] = parts
    return `PT${m}M${s}S`
  }
  return duration
}
