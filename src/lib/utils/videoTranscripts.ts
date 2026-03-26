import { readFile } from "fs/promises"
import { join } from "path"

import matter from "gray-matter"

import type { VideoMeta } from "@/lib/types"

import { CONTENT_DIR, DEFAULT_LOCALE } from "@/lib/constants"

import { getVideoBySlug } from "./videos"

/**
 * Resolves the absolute path to a transcript file for a given slug and locale.
 * English: public/content/videos/{slug}/transcript.md
 * Translated: public/content/translations/{locale}/videos/{slug}/transcript.md
 */
function transcriptPath(slug: string, locale: string): string {
  return join(
    process.cwd(),
    CONTENT_DIR,
    locale === DEFAULT_LOCALE ? "" : `translations/${locale}`,
    `videos/${slug}/transcript.md`
  )
}

/**
 * Reads the raw transcript file content (including frontmatter) for a video.
 * Validates that the slug exists in videos.json first.
 *
 * Server-only — uses Node.js fs/promises. Only import this from server
 * components or server-side utility files (pages, layouts, route handlers).
 *
 * @throws Error if the video slug is invalid or transcript file does not exist
 */
async function getRawTranscript(slug: string, locale: string): Promise<string> {
  // Validate slug exists before attempting file read
  const video = await getVideoBySlug(slug)
  if (!video) {
    throw new Error(
      `No video found with slug "${slug}". Cannot retrieve transcript.`
    )
  }

  const path = transcriptPath(slug, locale)

  try {
    return await readFile(path, "utf-8")
  } catch (error) {
    if (
      error instanceof Error &&
      "code" in error &&
      (error as NodeJS.ErrnoException).code === "ENOENT"
    ) {
      throw new Error(
        `Transcript not found for video "${slug}" in locale "${locale}". Expected at: ${path}`
      )
    }
    throw error
  }
}

/**
 * Get the MDX body content for a video transcript (frontmatter stripped).
 * For use in the transcript accordion and JSON-LD schema.
 *
 * @throws Error if the video slug is invalid or transcript file does not exist
 */
export async function getTranscript(
  slug: string,
  locale: string = DEFAULT_LOCALE
): Promise<string> {
  const raw = await getRawTranscript(slug, locale)
  // Strip YAML frontmatter — return only the markdown body
  return matter(raw).content
}

/**
 * Get the title and description for a video from its transcript frontmatter.
 * Falls back to English if a locale-specific transcript does not exist.
 *
 * @throws Error if the video slug is invalid or the English transcript is missing
 */
export async function getVideoMeta(
  slug: string,
  locale: string = DEFAULT_LOCALE
): Promise<VideoMeta> {
  let raw: string

  try {
    raw = await getRawTranscript(slug, locale)
  } catch {
    // Locale-specific transcript not found — fall back to English
    if (locale !== DEFAULT_LOCALE) {
      raw = await getRawTranscript(slug, DEFAULT_LOCALE)
    } else {
      throw new Error(
        `Cannot read transcript frontmatter for "${slug}": English transcript not found.`
      )
    }
  }

  const { data } = matter(raw)

  if (typeof data.title !== "string" || typeof data.description !== "string") {
    throw new Error(
      `Transcript for "${slug}" is missing required frontmatter fields: title, description.`
    )
  }

  return {
    title: data.title,
    description: data.description,
  }
}
