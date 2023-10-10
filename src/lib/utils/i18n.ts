import { join } from "path"

import { DEFAULT_LOCALE } from "../constants"

// If content is not translated, read it from english path as fallback
export const getFallbackEnglishPath = (path: string) => {
  const splittedPath = path.split("translations/")

  return join(splittedPath[0], splittedPath[1].split("/").slice(1).join("/"))
}

// If content is in english, remove en/ prefix so filepath can be read correctly
export const removeEnglishPrefix = (slug: string) => {
  const contentIsInEnglish = slug.split("/").includes(DEFAULT_LOCALE)

  return contentIsInEnglish
    ? join(slug.split("en/")[1], "index.md")
    : join(slug, "index.md")
}
