import { existsSync } from "fs"
import { join } from "path"

import { DEFAULT_LOCALE } from "@/lib/constants"

// Cache namespace existence checks so filesystem reads are consistent
// across all pages rendered during a single build.
const namespaceExistsCache = new Map<string, boolean>()

/**
 * Determine whether all required i18n namespaces exist for a given locale.
 * Default locale is always considered translated.
 * Results are cached per locale+namespace for build-time consistency.
 */
export async function areNamespacesTranslated(
  locale: string,
  namespaces: string[]
): Promise<boolean> {
  if (locale === DEFAULT_LOCALE) return true

  const intlPath = join(process.cwd(), "src/intl")

  return namespaces.every((ns) => {
    const cacheKey = `${locale}/${ns}`
    const cached = namespaceExistsCache.get(cacheKey)
    if (cached !== undefined) return cached

    const exists = existsSync(join(intlPath, locale, `${ns}.json`))
    namespaceExistsCache.set(cacheKey, exists)
    return exists
  })
}
