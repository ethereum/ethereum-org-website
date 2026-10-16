import { dateTimeFormat } from "@/lib/utils/date"

/**
 * Relative time ("2 minutes ago") with the same numbering-system rules as
 * numberFormat/dateTimeFormat. No shared wrapper exists for RelativeTimeFormat.
 */
export const relativeTime = (
  locale: string,
  value: number,
  unit: Intl.RelativeTimeFormatUnit
) =>
  new Intl.RelativeTimeFormat(locale, {
    numeric: "auto",
    numberingSystem: locale === "ur" ? "arabext" : "latn",
  } as Intl.RelativeTimeFormatOptions).format(value, unit)

/** A local time of day today, e.g. 07:40, formatted for the locale */
export const timeOfDay = (locale: string, hours: number, minutes = 0) => {
  const date = new Date()
  date.setHours(hours, minutes, 0, 0)
  return dateTimeFormat(locale, { hour: "numeric", minute: "2-digit" }).format(
    date
  )
}
