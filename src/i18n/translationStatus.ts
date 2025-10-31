import { DEFAULT_LOCALE } from "@/lib/constants"

import { loadMessages } from "@/i18n/loadMessages"

/**
 * Determine whether all required i18n namespaces exist for a given locale.
 * Default locale is always considered translated.
 */
export async function areNamespacesTranslated(
  locale: string,
  namespaces: string[]
): Promise<boolean> {
  if (locale === DEFAULT_LOCALE) return true

  const localeMessages = await loadMessages(locale)
  return namespaces.every((ns) =>
    Object.prototype.hasOwnProperty.call(localeMessages, ns)
  )
}
