import { getPrimaryNamespaceForPath } from "../utils/translations"

import { areNamespacesTranslated } from "./translationStatus"

/**
 * Determine if a page should be considered translated for a given locale.
 *
 * This checks only the primary namespace inferred from the provided path. When
 * no primary namespace exists for the path, the page is assumed translated
 * because it depends solely on globally available shared namespaces (like
 * "common") rather than page-specific strings.
 *
 * @param locale - Locale code, e.g., "en", "es"
 * @param slug - Page path or slug, e.g., "/wallets/"
 * @returns Promise resolving to whether the page is translated
 * @example
 *   await isPageTranslated("es", "/wallets/") // => true | false
 */
export async function isPageTranslated(
  locale: string,
  slug: string
): Promise<boolean> {
  const primaryNamespace = getPrimaryNamespaceForPath(slug)

  if (!primaryNamespace) {
    return true
  }

  return areNamespacesTranslated(locale, [primaryNamespace])
}
