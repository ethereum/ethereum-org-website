import { DEFAULT_LOCALE } from "@/lib/constants"

import { allSlugs, contentManifest } from "./manifest.generated"
import type { ContentManifestEntry } from "./types"

export { allSlugs, contentManifest }

/**
 * Resolve the manifest entry for the requested locale, falling back to
 * English when the locale has no translated entry — matches the runtime
 * fallback `importMd` already implements.
 */
export const getManifestEntry = (
  locale: string,
  slug: string
): ContentManifestEntry | undefined => {
  const localeMap = contentManifest[slug]
  if (!localeMap) return undefined
  return localeMap[locale] ?? localeMap[DEFAULT_LOCALE]
}

export const hasContentSlug = (slug: string): boolean => slug in contentManifest

export const getLocalesForSlug = (slug: string): string[] => {
  const localeMap = contentManifest[slug]
  return localeMap ? Object.keys(localeMap) : []
}
