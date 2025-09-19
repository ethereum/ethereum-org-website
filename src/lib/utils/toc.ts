import { slugify } from "@/lib/utils/url"

// RegEx patterns
const customIdRegEx = /^.+(\s*\{#([^}]+?)\}\s*)$/
const emojiRegEx = /<Emoji [^/]+\/>/g

/**
 * Parse a heading ID from a heading string. If the heading contains a custom ID,
 * it will be used as the ID, otherwise the heading will be slugified and used.
 * @param heading Heading string without leading #s that may contain a {#custom-id}
 * @returns Heading ID string
 */
export const parseHeadingId = (heading: string): string => {
  const match = customIdRegEx.exec(heading)
  return match ? match[2].toLowerCase() : slugify(heading)
}

/**
 * Removes any custom ID and Emoji components from a heading string
 * @param title Heading string, not yet trimmed
 * @returns Trimmed heading string
 */
export const trimmedTitle = (title: string): string => {
  const match = customIdRegEx.exec(title)
  const trimmedTitle = match ? title.replace(match[1], "").trim() : title

  // Removes Twemoji components from title
  const emojiMatch = emojiRegEx.exec(trimmedTitle)
  return emojiMatch ? trimmedTitle.replaceAll(emojiRegEx, "") : trimmedTitle
}
