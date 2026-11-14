import matter from "gray-matter"
import { getTranslations } from "next-intl/server"

import {
  getBreadcrumbLabelKey,
  toBreadcrumbPath,
} from "@/lib/utils/breadcrumbs"

import type { PageLink } from "@/data/courses"

import { importMd } from "@/lib/md/import"

/**
 * Title for a site page in the learner's language: the markdown page's own
 * title, else the React page's breadcrumb label. Build time only (reads
 * `public/content`), so callers must stay static.
 */
export const getPageLink = async (
  locale: string,
  href: string
): Promise<PageLink> => {
  const path = toBreadcrumbPath(href.split("#")[0])
  try {
    const { markdown } = await importMd(locale, path.slice(1, -1))
    const { title } = matter(markdown).data
    if (title) return { href, title: String(title) }
  } catch {
    // Not a markdown page
  }
  const t = await getTranslations({ locale, namespace: "common" })
  return { href, title: t(getBreadcrumbLabelKey(path)) }
}
