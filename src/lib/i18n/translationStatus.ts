import { existsSync } from "fs"
import { join } from "path"

import { DEFAULT_LOCALE } from "@/lib/constants"

/**
 * Determine whether all required i18n namespaces exist for a given locale.
 * Default locale is always considered translated.
 */
export async function areNamespacesTranslated(
  locale: string,
  namespaces: string[]
): Promise<boolean> {
  if (locale === DEFAULT_LOCALE) return true

  const intlPath = join(process.cwd(), "src/intl")

  return namespaces.every((ns) =>
    existsSync(join(intlPath, locale, `${ns}.json`))
  )
}
