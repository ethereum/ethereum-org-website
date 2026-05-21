import fsp from "fs/promises"
import { join } from "path"

import matter from "gray-matter"
import readingTime from "reading-time"

import type { Frontmatter, ITutorial, Skill } from "@/lib/types"

import { dateToString } from "@/lib/utils/date"

import internalTutorialSlugs from "@/data/internalTutorials.json"

import { DEFAULT_LOCALE } from "@/lib/constants"

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
