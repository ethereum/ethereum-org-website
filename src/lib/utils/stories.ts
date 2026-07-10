import { getTranslations } from "next-intl/server"

import type { Story } from "@/lib/types"

import { formatDate, isValidDate } from "@/lib/utils/date"

import tenYearStories from "@/data/tenYearStories"

import { DEFAULT_LOCALE } from "@/lib/constants"

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

/**
 * Community stories resolved for rendering: story copy localized via the
 * "community-stories" namespace (English fallback) and dates formatted for
 * the locale. Junk spreadsheet fields (region) are dropped here.
 */
export const getCommunityStories = async (
  locale = DEFAULT_LOCALE
): Promise<Story[]> => {
  const t = await getTranslations({ locale, namespace: "community-stories" })
  return tenYearStories.map(
    ({
      storyKey,
      storyOriginal,
      originalLocale,
      category,
      name,
      date,
      country,
      twitter,
    }) => ({
      storyKey,
      name,
      // The author's own words beat a round-trip translation when the viewer
      // reads their language; StoryCard then hides the flip (story === original)
      story: originalLocale === locale ? storyOriginal : t(storyKey),
      storyOriginal: storyOriginal || null,
      twitter: twitter || null,
      country: country || null,
      date: parseDate(date, locale),
      category,
    })
  )
}
