import { getTranslations } from "next-intl/server"

import { TimeLeftLabels } from "@/lib/types"

import { formatDate, isValidDate } from "@/lib/utils/date"

import { DEFAULT_LOCALE } from "@/lib/constants"

import type { Story } from "./types"

const parseDate = (date: string, locale = DEFAULT_LOCALE): string => {
  // TODO: Remove this check when spreadsheet is fixed
  // Currently dates are in the formatted as "DD.MM." which is not parsable by Date.parse
  // If partially valid date, reformat it
  const partiallyValidDate = /^(\d{1,2})\.(\d{1})\.$/
  if (partiallyValidDate.test(date)) {
    const [, day, month] = date.match(partiallyValidDate) || []
    const newDate = `2025-${month.padStart(2, "0")}-${day.padStart(2, "0")}`
    return formatDate(newDate, locale)
  }

  // If the date is already in a valid format, return it
  if (isValidDate(date)) return formatDate(date, locale)
  // If the date is not recognized, return original value
  return date
}

export const parseStoryDates = (
  stories: Story[],
  locale = DEFAULT_LOCALE
): Story[] =>
  stories.map(({ date, ...story }) => ({
    ...story,
    date: parseDate(date, locale),
  }))

export const getTimeUnitTranslations = async (locale: string) => {
  const t = await getTranslations({
    locale,
    namespace: "page-10-year-anniversary",
  })
  const timeLeftLabels: TimeLeftLabels = {
    days: {
      singular: t("page-10-year-countdown-day"),
      plural: t("page-10-year-countdown-days"),
    },
    hours: {
      singular: t("page-10-year-countdown-hour"),
      plural: t("page-10-year-countdown-hours"),
    },
    minutes: {
      singular: t("page-10-year-countdown-minute"),
      plural: t("page-10-year-countdown-minutes"),
    },
    seconds: {
      singular: t("page-10-year-countdown-second"),
      plural: t("page-10-year-countdown-seconds"),
    },
  }
  return timeLeftLabels
}
