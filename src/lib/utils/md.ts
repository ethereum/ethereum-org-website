import fsp from "fs/promises"
import { extname, join } from "path"

import matter from "gray-matter"
import readingTime from "reading-time"

import type { Frontmatter, ITutorial, Skill, SlugPageParams } from "@/lib/types"

import { dateToString } from "@/lib/utils/date"

import internalTutorialSlugs from "@/data/internalTutorials.json"

import { CONTENT_DIR, DEFAULT_LOCALE } from "@/lib/constants"

import { toPosixPath } from "./relativePath"

function getContentRoot() {
  return join(process.cwd(), CONTENT_DIR)
}

export const getPostSlugs = async (dir: string, filterRegex?: RegExp) => {
  const contentRoot = getContentRoot()
  const _dir = join(contentRoot, dir)

  try {
    // Get an array of all files and directories in the passed directory using `fs.readdirSync`
    const dirContents = await fsp.readdir(_dir)

    const files: string[] = []

    // Create the full path of the file/directory by concatenating the passed directory and file/directory name
    for (const fileOrDir of dirContents) {
      // file = "about", "bridges".... "translations" (<-- skip that one)...
      const path = join(_dir, fileOrDir)

      const stats = await fsp.stat(path)
      if (stats.isDirectory()) {
        // Skip nested translations directory
        if (fileOrDir === "translations") continue
        // Skip videos directory — video pages have their own dedicated route
        if (fileOrDir === "videos") continue
        // If it is a directory, recursively call the `getPostSlugs` function with the
        // directory path and the files array
        const nestedDir = join(dir, fileOrDir)

        const nestedFiles = await getPostSlugs(nestedDir, filterRegex)
        files.push(...nestedFiles)
        continue
      }

      if (filterRegex?.test(path)) continue

      // If the current file is not a markdown file, skip it
      if (extname(path) !== ".md") continue

      const sanitizedPath = toPosixPath(
        path.replace(contentRoot, "").replace("/index.md", "")
      )

      files.push(sanitizedPath)
    }

    return files
  } catch (error) {
    // If directory doesn't exist (e.g., in Netlify serverless environment), return empty array
    if (error instanceof Error && "code" in error && error.code === "ENOENT") {
      console.warn(
        `Content directory ${_dir} not found, returning empty slug list`
      )
      return []
    }
    // Re-throw other errors
    throw error
  }
}

export const getTutorialsData = async (
  locale: string
): Promise<ITutorial[]> => {
  const contentRoot = join(process.cwd(), "public/content")

  const tutorialPromises = (internalTutorialSlugs as string[]).map(
    async (slug) => {
      try {
        let fileContents: string
        let isTranslated = true

        const enPath = join(
          contentRoot,
          "developers/tutorials",
          slug,
          "index.md"
        )

        if (locale === DEFAULT_LOCALE) {
          fileContents = await fsp.readFile(enPath, "utf-8")
        } else {
          const translatedPath = join(
            contentRoot,
            "translations",
            locale,
            "developers/tutorials",
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
        const frontmatter = data as Frontmatter

        return {
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
        }
      } catch (error) {
        // Only warn if English content is missing (actual error)
        console.warn(`Error reading tutorial ${slug}:`, error)
        return null
      }
    }
  )

  const results = await Promise.all(tutorialPromises)

  // Filter out null results (missing tutorials)
  return results.filter((tutorial) => tutorial !== null) as ITutorial[]
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
