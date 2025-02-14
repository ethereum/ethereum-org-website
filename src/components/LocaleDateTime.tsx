import { useLocale } from "next-intl"

type LocaleDateTimeProps = {
  utcDateTime: string
  hideDate?: boolean
  hideTime?: boolean
  options?: Intl.DateTimeFormatOptions
}

/**
 * Renders a localized date and time component
 * @param utcDateTime - The UTC date and time string, ie "2022-04-20T16:20:00Z"
 * @param hideDate - Whether to hide the date portion
 * @param hideTime - Whether to hide the time portion
 * @param options - Options override for formatting the date and time
 * @returns The rendered LocaleDateTime component
 */
const LocaleDateTime = ({
  utcDateTime,
  hideDate,
  hideTime,
  options,
}: LocaleDateTimeProps) => {
  if (hideDate && hideTime)
    throw new Error(
      "LocaleDateTime hideDate and hideTime props cannot both be true"
    )

  const locale = useLocale()
  const date = new Date(utcDateTime)
  const defaultDateOptions: Intl.DateTimeFormatOptions = {
    month: "long",
    day: "numeric",
    year: "numeric",
  }
  const defaultTimeOptions: Intl.DateTimeFormatOptions = {
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  }
  const dateTimeOptions: Intl.DateTimeFormatOptions = {
    ...(hideDate ? {} : defaultDateOptions),
    ...(hideTime ? {} : defaultTimeOptions),
    ...options,
  }
  return (
    <time dateTime={utcDateTime}>
      {new Intl.DateTimeFormat(locale, dateTimeOptions).format(date)}
    </time>
  )
}

export default LocaleDateTime
