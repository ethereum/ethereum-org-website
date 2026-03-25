import { readFile } from "fs/promises"
import path from "path"

import { DEFAULT_LOCALE } from "../constants"

export const importMd = async (locale: string, slug: string) => {
  const contentPath = path.join(process.cwd(), "public/content")

  if (locale === DEFAULT_LOCALE) {
    const filePath = path.join(contentPath, slug, "index.md")
    const markdown = await readFile(filePath, "utf-8")
    return { markdown, isTranslated: true }
  }

  // Try translated version first
  const translatedPath = path.join(
    contentPath,
    "translations",
    locale,
    slug,
    "index.md"
  )
  try {
    const markdown = await readFile(translatedPath, "utf-8")
    return { markdown, isTranslated: true }
  } catch {
    // Fall back to English
    const defaultPath = path.join(contentPath, slug, "index.md")
    const markdown = await readFile(defaultPath, "utf-8")
    return { markdown, isTranslated: false }
  }
}
