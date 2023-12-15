import { existsSync } from "fs"
import { join } from "path"

/**
 * Checks if a namespace .json file exists for the given locale
 * @param locale Path locale
 * @param namespace Namespace for the page
 * @returns false if the namespace .json file exists, true otherwise
 */
export const existsNamespace = (
  locale: string,
  namespace: string,
): boolean => {
  const nsJsonPathForLocale = join("../intl", locale, namespace + ".json")
  return existsSync(nsJsonPathForLocale)
}
