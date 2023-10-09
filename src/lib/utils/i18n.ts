import { join } from "path"

import i18nConfig from "../../../i18n.config.json"

// Return a sorted list of supported locales codes, defined in `i18n.config.json`
export const getLocalesCodes = () => i18nConfig.map((lang) => lang.code).sort()

// If content is not translated, read it from english path as fallback
export const getFallbackEnglishPath = (path: string) => {
  const splittedPath = path.split("translations/")

  return join(splittedPath[0], splittedPath[1].split("/").slice(1).join("/"))
}

// If content is in english, remove en/ prefix so filepath can be read correctly
export const removeEnglishPrefix = (slug: string) => {
  return slug.split("/").includes("en")
    ? join(slug.split("en/")[1], "index.md")
    : join(slug, "index.md")
}
