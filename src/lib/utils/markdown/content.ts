/**
 * Content Loading Utilities
 *
 * Handles loading markdown content with locale fallback support.
 */

import fs from "fs"
import path from "path"

import matter from "gray-matter"

import type { Frontmatter } from "@/lib/types"

import { getPostSlugs } from "@/lib/utils/md"

import { CONTENT_DIR, DEFAULT_LOCALE, LOCALES_CODES } from "@/lib/constants"

interface LoadedContent {
  content: string
  frontmatter: Frontmatter
  filePath: string
  contentNotTranslated: boolean
}

/**
 * Get the file path for markdown content
 */
function getContentPath(slug: string, locale: string): string {
  const contentRoot = path.join(process.cwd(), CONTENT_DIR)

  if (locale === DEFAULT_LOCALE) {
    return path.join(contentRoot, slug, "index.md")
  }

  return path.join(contentRoot, "translations", locale, slug, "index.md")
}

/**
 * Check if a file exists
 */
function fileExists(filePath: string): boolean {
  try {
    return fs.existsSync(filePath)
  } catch {
    return false
  }
}

/**
 * Load markdown content for a given slug and locale.
 * Falls back to English if translation doesn't exist.
 */
export async function loadMarkdownContent(
  slug: string,
  locale: string
): Promise<LoadedContent | null> {
  // Try locale-specific path first (for non-English locales)
  let filePath = getContentPath(slug, locale)
  let contentNotTranslated = false

  if (locale !== DEFAULT_LOCALE) {
    if (!fileExists(filePath)) {
      // Fall back to English
      filePath = getContentPath(slug, DEFAULT_LOCALE)
      contentNotTranslated = true
    }
  }

  // Check if file exists
  if (!fileExists(filePath)) {
    return null
  }

  try {
    const fileContent = fs.readFileSync(filePath, "utf-8")
    const { data, content } = matter(fileContent)

    // Check if translation exists but is marked as English
    // (some translations may exist but have lang: "en" in frontmatter)
    if (!contentNotTranslated && locale !== DEFAULT_LOCALE) {
      const frontmatterLang = (data as Frontmatter).lang
      // Compare as strings to avoid type narrowing issues
      if (String(frontmatterLang) === DEFAULT_LOCALE) {
        contentNotTranslated = true
      }
    }

    return {
      content,
      frontmatter: data as Frontmatter,
      filePath,
      contentNotTranslated,
    }
  } catch (error) {
    console.error(`Error loading markdown content for ${slug}:`, error)
    return null
  }
}

/**
 * Get all markdown paths for static generation.
 * Returns paths for all supported locales.
 */
export async function getAllMarkdownPaths(): Promise<
  { locale: string; slug: string[] }[]
> {
  const paths: { locale: string; slug: string[] }[] = []

  // Get all English content slugs
  const slugs = await getPostSlugs("/")

  // For each slug, generate paths for all locales
  for (const slug of slugs) {
    // Remove leading slash and split into array
    const slugArray = slug.replace(/^\//, "").split("/").filter(Boolean)

    // Add path for each locale
    for (const locale of LOCALES_CODES) {
      paths.push({
        locale,
        slug: slugArray,
      })
    }
  }

  return paths
}

/**
 * Check if content exists for a given slug (English version)
 */
export function contentExists(slug: string): boolean {
  const filePath = getContentPath(slug, DEFAULT_LOCALE)
  return fileExists(filePath)
}

/**
 * Get the relative path for GitHub edit links
 */
export function getEditPath(slug: string, locale: string): string {
  if (locale === DEFAULT_LOCALE) {
    return `${CONTENT_DIR}/${slug}/index.md`
  }
  return `${CONTENT_DIR}/translations/${locale}/${slug}/index.md`
}

/**
 * Get the content directory for a slug
 */
export function getContentDir(slug: string, locale: string): string {
  const contentRoot = path.join(process.cwd(), CONTENT_DIR)

  if (locale === DEFAULT_LOCALE) {
    return path.join(contentRoot, slug)
  }

  return path.join(contentRoot, "translations", locale, slug)
}
