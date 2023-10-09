import { join } from "path"

import i18nConfig from "../../../i18n.config.json"

// Return a sorted list of supported locales codes, defined in `i18n.config.json`
export const getLocalesCodes = () => i18nConfig.map((lang) => lang.code).sort()

export const getFallbackEnglishPath = (path: string) => {
  const splittedPath = path.split("translations/")

  return join(splittedPath[0], splittedPath[1].split("/").slice(1).join("/"))
}
