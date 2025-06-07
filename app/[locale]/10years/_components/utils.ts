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
