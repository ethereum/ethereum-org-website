import { readFile } from "fs/promises"
import { join } from "path"

import { CONTENT_DIR, DEFAULT_LOCALE } from "@/lib/constants"

import { getVideoBySlug } from "./videos"

/**
 * Get the raw MDX transcript content for a video.
 * Uses the transcriptPath from the video data to locate the transcript file.
 *
 * This is a server-only function that uses Node.js fs/promises.
 * Do not import this in client components or shared modules.
 *
 * @throws Error if the video slug is invalid or transcript file does not exist
 */
export async function getTranscript(
  slug: string,
  locale: string = DEFAULT_LOCALE
): Promise<string> {
  // Validate slug exists before attempting file read
  const video = await getVideoBySlug(slug)
  if (!video) {
    throw new Error(
      `No video found with slug "${slug}". Cannot retrieve transcript.`
    )
  }

  // Use transcriptPath from video data for consistency
  // English content: public/content/{path}
  // Translated content: public/content/translations/{locale}/{path}
  const path = join(
    process.cwd(),
    CONTENT_DIR,
    locale === DEFAULT_LOCALE ? "" : `translations/${locale}`,
    `${video.transcriptPath}.md`
  )

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
