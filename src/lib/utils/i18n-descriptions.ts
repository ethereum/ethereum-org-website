import { slugify } from "@/lib/utils/url"

/**
 * Returns a localized description if a translation exists in the namespace,
 * otherwise falls back to the original English description.
 *
 * Used for externally-sourced data (apps, developer tools) where descriptions
 * are extracted into i18n namespace files by the sync-external-descriptions
 * GitHub Action.
 *
 * @param translator - A next-intl translator for the description namespace
 * @param prefix - Key prefix ("app" or "tool")
 * @param name - The item name (slugified to form the key)
 * @param fallback - The original English description from the data source
 */
export function getLocalizedDescription(
  translator: { has: (key: string) => boolean; (key: string): string },
  prefix: string,
  name: string,
  fallback: string
): string {
  const key = `${prefix}-${slugify(name)}-description`
  return translator.has(key) ? translator(key) : fallback
}
