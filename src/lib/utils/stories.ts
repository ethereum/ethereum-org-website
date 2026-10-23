import { shuffle } from "lodash"
import { getTranslations } from "next-intl/server"

import type { Story, StoryData } from "@/lib/types"

import { formatDate, isValidDate } from "@/lib/utils/date"

import tenYearStories, { newStories } from "@/data/tenYearStories"

import { DEFAULT_LOCALE } from "@/lib/constants"

import { loadMessages } from "@/lib/i18n/loadMessages"

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
 * Resolve raw story data for rendering: story copy localized via the
 * "community-stories" namespace (English fallback), dates formatted for the
 * locale, and junk spreadsheet fields (region) dropped.
 */
const resolveStories = async (
  stories: StoryData[],
  locale = DEFAULT_LOCALE
): Promise<Story[]> => {
  const t = await getTranslations({ locale, namespace: "community-stories" })
  // Keys actually present in this locale's own file (before the English merge
  // in i18n/request.ts), so we can tell a real translation from a fallback
  const localeMessages = await loadMessages(locale)
  const translated = localeMessages["community-stories"] ?? {}
  const hasTranslation = (key: string) =>
    locale !== DEFAULT_LOCALE && key in translated

  return stories.map(
    ({
      storyKey,
      storyOriginal,
      originalLocale,
      category,
      name,
      date,
      country,
      twitter,
    }) => {
      // Prefer the author's verbatim words when the viewer reads the original
      // language, or (for English submissions) when this locale has no
      // translation yet -- the verbatim text beats a drift-prone English intl
      // value. Non-English originals keep t() as a readable English fallback.
      const useOriginal =
        originalLocale === locale ||
        (originalLocale === DEFAULT_LOCALE && !hasTranslation(storyKey))
      return {
        storyKey,
        name,
        story: useOriginal ? storyOriginal : t(storyKey),
        storyOriginal: storyOriginal || null,
        twitter: twitter || null,
        country: country || null,
        date: parseDate(date, locale),
        category,
      }
    }
  )
}

/** All community stories in file order (used by /stories). */
export const getCommunityStories = async (
  locale = DEFAULT_LOCALE
): Promise<Story[]> => resolveStories(tenYearStories, locale)

/**
 * Stories for the /community "Ethereum voices" section: the newer stories
 * first, then the 10-year-anniversary campaign stories shuffled for variety.
 * The shuffle runs server-side (build time) before the client StoryCard grid
 * receives the ordered array as props, so there is no hydration mismatch.
 */
export const getVoicesStories = async (
  locale = DEFAULT_LOCALE
): Promise<Story[]> => {
  const all = await resolveStories(tenYearStories, locale)
  const newCount = newStories.length
  return [...all.slice(0, newCount), ...shuffle(all.slice(newCount))]
}
