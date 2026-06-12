import { readdir } from "fs/promises"
import { join } from "path"

import { CONTENT_DIR } from "@/lib/constants"

const STORIES_DIR = join(process.cwd(), CONTENT_DIR, "stories")

/**
 * Featured stories shown in the "Discover the Stories" section.
 * Copy lives in the `page-stories` i18n namespace; each entry links to its
 * full markdown page at /stories/{slug}.
 *
 * NOTE: images are placeholders for now -- swap for final art later.
 */
export const FEATURED_STORIES = [
  {
    slug: "escaping-venezuela",
    titleKey: "page-stories-featured-venezuela-title",
    descriptionKey: "page-stories-featured-venezuela-description",
  },
  {
    slug: "ukraine-payments",
    titleKey: "page-stories-featured-ukraine-title",
    descriptionKey: "page-stories-featured-ukraine-description",
  },
  {
    slug: "canadian-truckers",
    titleKey: "page-stories-featured-truckers-title",
    descriptionKey: "page-stories-featured-truckers-description",
  },
] as const

export async function getStorySlugs(): Promise<string[]> {
  const entries = await readdir(STORIES_DIR, { withFileTypes: true })
  return entries.filter((e) => e.isDirectory()).map((e) => e.name)
}
