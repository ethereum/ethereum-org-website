import { addSlashes, normalizeSlug } from "@/lib/utils/url"

import {
  BREADCRUMB_ANCESTOR_LABEL_KEYS,
  BREADCRUMB_HUBS,
  BREADCRUMB_LABEL_KEYS,
  BREADCRUMB_PARENTS,
} from "@/data/breadcrumbs"

export type BreadcrumbTrailItem = {
  /** Normalized path, e.g. "/learn/" */
  href: string
  /** Translation key in the `common` namespace; null for the root crumb */
  labelKey: string | null
}

const ROOT = "/"

export const toBreadcrumbPath = (slug: string) =>
  addSlashes(normalizeSlug(slug))

export const getBreadcrumbParent = (path: string): string | null => {
  if (path === ROOT) return null
  if (path in BREADCRUMB_PARENTS) return BREADCRUMB_PARENTS[path]

  const segments = path.split("/").filter(Boolean)
  const urlParent = toBreadcrumbPath(segments.slice(0, -1).join("/"))
  return BREADCRUMB_PARENTS[`${urlParent}*`] ?? urlParent
}

export const getBreadcrumbLabelKey = (path: string) =>
  BREADCRUMB_LABEL_KEYS[path] ?? path.split("/").filter(Boolean).pop()!

/** Ancestors-first trail; the root crumb is omitted on and below a hub */
export const getBreadcrumbTrail = (slug: string): BreadcrumbTrailItem[] => {
  const path = toBreadcrumbPath(slug)
  if (path === ROOT) return []

  const paths: string[] = []
  const seen = new Set<string>()
  for (
    let current: string | null = path;
    current && current !== ROOT;
    current = getBreadcrumbParent(current)
  ) {
    if (seen.has(current)) throw new Error(`Breadcrumb cycle at ${current}`)
    seen.add(current)
    paths.unshift(current)
  }

  const insideHub = paths.some((p) =>
    (BREADCRUMB_HUBS as readonly string[]).includes(p)
  )

  return [
    ...(insideHub ? [] : [{ href: ROOT, labelKey: null }]),
    ...paths.map((href, idx) => ({
      href,
      labelKey:
        (idx < paths.length - 1 && BREADCRUMB_ANCESTOR_LABEL_KEYS[href]) ||
        getBreadcrumbLabelKey(href),
    })),
  ]
}
