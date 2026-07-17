import fs from "fs"
import path from "path"

import matter from "gray-matter"

import { CONTENT_DIR } from "@/lib/constants"

const REPO_ROOT = process.cwd()

const cache = new Map<string, string | null>()

/**
 * Read the `description` field from `public/content/{slug}/index.md` if it
 * exists. Returns `null` for any miss — file absent, frontmatter parse error,
 * or no description field. Warnings go to stderr; never throws.
 */
export const readFrontmatterDescription = (href: string): string | null => {
  if (cache.has(href)) return cache.get(href) ?? null

  if (!href.startsWith("/") || href.startsWith("//")) {
    cache.set(href, null)
    return null
  }

  const slug = href.replace(/^\/+|\/+$/g, "")
  if (!slug) {
    cache.set(href, null)
    return null
  }

  const bodyPath = path.join(REPO_ROOT, CONTENT_DIR, slug, "index.md")
  let raw: string
  try {
    raw = fs.readFileSync(bodyPath, "utf-8")
  } catch {
    cache.set(href, null)
    return null
  }

  try {
    const { data } = matter(raw)
    const description =
      typeof data.description === "string" && data.description.trim()
        ? data.description.trim()
        : null
    cache.set(href, description)
    return description
  } catch (err) {
    console.warn(
      `[llms-txt] frontmatter parse failed for ${href}: ${(err as Error).message}`
    )
    cache.set(href, null)
    return null
  }
}
