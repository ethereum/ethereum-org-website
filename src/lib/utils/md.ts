import fsp from "fs/promises"
import { extname, join } from "path"

import matter from "gray-matter"
import readingTime from "reading-time"

import type {
  BlogPost,
  Frontmatter,
  ITutorial,
  Skill,
  SlugPageParams,
  StoryPreview,
} from "@/lib/types"

import { dateToString } from "@/lib/utils/date"

import blogPostSlugs from "@/data/blogPosts.json"
import internalTutorialSlugs from "@/data/internalTutorials.json"

import { DEFAULT_LOCALE } from "@/lib/constants"

import { toPosixPath } from "./relativePath"

function getContentRoot() {
  return join(process.cwd(), "public/content")
}

export const getPostSlugs = async (dir: string, filterRegex?: RegExp) => {
  const contentRoot = getContentRoot()
  const _dir = join(contentRoot, dir)

  const dirContents = await fsp.readdir(_dir)

  const files: string[] = []

  for (const fileOrDir of dirContents) {
    const path = join(_dir, fileOrDir)

    const stats = await fsp.stat(path)
    if (stats.isDirectory()) {
      if (fileOrDir === "translations") continue
      // Video pages have their own dedicated route
      if (fileOrDir === "videos") continue

      const nestedFiles = await getPostSlugs(join(dir, fileOrDir), filterRegex)
      files.push(...nestedFiles)
      continue
    }

    if (filterRegex?.test(path)) continue
    if (extname(path) !== ".md") continue

    const sanitizedPath = toPosixPath(
      path.replace(contentRoot, "").replace("/index.md", "")
    )

    files.push(sanitizedPath)
  }

  return files
}

/**
 * Generic helper for reading a list of content slugs, resolving locale
 * fallback, parsing frontmatter, and mapping to a typed result.
 *
 * Both getTutorialsData and getBlogPostsData delegate to this to avoid
 * duplicating the slug-resolution and frontmatter-parsing boilerplate.
 */
const getContentListData = async <T>(
  locale: string,
  slugs: string[],
  contentDir: string,
  mapEntry: (
    frontmatter: Frontmatter,
    content: string,
    slug: string,
    isTranslated: boolean
  ) => T,
  label: string
): Promise<T[]> => {
  const contentRoot = getContentRoot()
  // Throw rather than return [] when the collection wasn't traced into the
  // server function, so a broken ISR regeneration keeps the last good page.
  await fsp.access(join(contentRoot, contentDir))

  const promises = slugs.map(async (slug) => {
    try {
      let fileContents: string
      let isTranslated = true

      const enPath = join(contentRoot, contentDir, slug, "index.md")

      if (locale === DEFAULT_LOCALE) {
        fileContents = await fsp.readFile(enPath, "utf-8")
      } else {
        const translatedPath = join(
          contentRoot,
          "translations",
          locale,
          contentDir,
          slug,
          "index.md"
        )
        try {
          fileContents = await fsp.readFile(translatedPath, "utf-8")
        } catch {
          fileContents = await fsp.readFile(enPath, "utf-8")
          isTranslated = false
        }
      }

      const { data, content } = matter(fileContents)
      return mapEntry(data as Frontmatter, content, slug, isTranslated)
    } catch (error) {
      console.warn(`Error reading ${label} ${slug}:`, error)
      return null
    }
  })

  const results = await Promise.all(promises)
  return results.filter((item) => item !== null) as T[]
}

export const getTutorialsData = async (
  locale: string
): Promise<ITutorial[]> => {
  return getContentListData(
    locale,
    internalTutorialSlugs as string[],
    "developers/tutorials",
    (frontmatter, content, slug, isTranslated) => ({
      href: `/developers/tutorials/${slug}`,
      title: frontmatter.title,
      description: frontmatter.description,
      author: frontmatter.author || "",
      tags: frontmatter.tags,
      skill: frontmatter.skill as Skill,
      timeToRead: Math.round(readingTime(content).minutes),
      published: dateToString(frontmatter.published),
      lang: frontmatter.lang,
      isExternal: false,
      isTranslated,
    }),
    "tutorial"
  )
}

export const checkPathValidity = (
  validPaths: SlugPageParams[],
  { slug: slugArray }: SlugPageParams
): boolean =>
  validPaths.some((path) => path.slug.join("/") === slugArray.join("/"))

/**
 * Strips markdown syntax from text, leaving plain text.
 * For preview/snippet text where markdown shouldn't be visible.
 *
 * @param text - Text with markdown syntax
 * @param preserveNewlines - When true, collapses runs of 3+ newlines to 2
 *   instead of collapsing all whitespace to single spaces. Useful for
 *   structured output like JSON-LD transcripts.
 * @returns Plain text with markdown markers removed
 */
export function stripMarkdown(
  text: string,
  preserveNewlines?: boolean
): string {
  let result = text
    // Remove bold/italic (**text** or __text__)
    .replace(/(\*\*|__)(.*?)\1/g, "$2")
    // Remove italic (*text* or _text_)
    .replace(/(\*|_)(.*?)\1/g, "$2")
    // Remove inline code (`code`)
    .replace(/`([^`]+)`/g, "$1")
    // Remove links [text](url) -> text
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    // Remove images ![alt](url) -> empty
    .replace(/!\[([^\]]*)\]\([^)]+\)/g, "")
    // Remove headings (# text)
    .replace(/^#{1,6}\s+/gm, "")
    // Remove list markers (- or * or 1.)
    .replace(/^[\s]*[-*+]\s+/gm, "")
    .replace(/^[\s]*\d+\.\s+/gm, "")

  // Clean up whitespace
  result = preserveNewlines
    ? result.replace(/\n{3,}/g, "\n\n")
    : result.replace(/\s+/g, " ")

  return result.trim()
}

export const getBlogPostsData = async (locale: string): Promise<BlogPost[]> => {
  const posts = await getContentListData(
    locale,
    blogPostSlugs as string[],
    "latest",
    (frontmatter, content, slug) => ({
      href: `/latest/${slug}`,
      title: frontmatter.title,
      description: frontmatter.description,
      author: frontmatter.author || "",
      team: frontmatter.team || "",
      tags: frontmatter.tags,
      timeToRead: Math.round(readingTime(content).minutes),
      published: dateToString(frontmatter.published),
      lang: frontmatter.lang,
      image: frontmatter.image,
    }),
    "blog post"
  )

  return posts.sort(
    (a, b) => new Date(b.published).getTime() - new Date(a.published).getTime()
  )
}

/**
 * Lists the story slugs under public/content/stories/, skipping the
 * `translations` directory the intl pipeline writes into.
 */
export const getStorySlugs = async (): Promise<string[]> => {
  const storiesRoot = join(getContentRoot(), "stories")

  const entries = await fsp.readdir(storiesRoot, { withFileTypes: true })
  return entries
    .filter((entry) => entry.isDirectory() && entry.name !== "translations")
    .map((entry) => entry.name)
}

/**
 * Reads every story under public/content/stories/{slug}/index.md and returns
 * its card preview (title, description, cover image) straight from frontmatter,
 * newest first. The /stories Discover section is rendered from this -- no
 * hardcoded copy or image imports.
 */
export const getStoriesData = async (
  locale: string
): Promise<StoryPreview[]> => {
  const slugs = await getStorySlugs()

  const stories = await getContentListData(
    locale,
    slugs,
    "stories",
    (frontmatter, _, slug) => ({
      slug,
      title: frontmatter.title,
      description: frontmatter.description,
      image: frontmatter.image ?? "",
      published: dateToString(frontmatter.published),
    }),
    "story"
  )

  return stories.sort(
    (a, b) => new Date(b.published).getTime() - new Date(a.published).getTime()
  )
}
