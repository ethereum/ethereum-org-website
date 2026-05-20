import { readFile } from "fs/promises"
import { join } from "path"

import matter from "gray-matter"
import readingTime from "reading-time"

import { CONTENT_DIR, DEFAULT_LOCALE } from "../../lib/constants"
import type {
  TutorialFrontmatter,
  VideoFrontmatter,
} from "../../lib/interfaces"
import type { ITutorial, Skill, VideoCardData } from "../../lib/types"
import { dateToString } from "../../lib/utils/date"

import type { CollectionDefinition } from "./types"

/**
 * Resolve the absolute path to a markdown file for a given collection slug + locale.
 * English lives at the root; translations under `translations/{locale}/`.
 */
function mdPath(subDir: string, slug: string, locale: string): string {
  const base =
    locale === DEFAULT_LOCALE
      ? join(process.cwd(), CONTENT_DIR, subDir)
      : join(process.cwd(), CONTENT_DIR, "translations", locale, subDir)
  return join(base, slug, "index.md")
}

const tutorials: CollectionDefinition<ITutorial & { isTranslated: boolean }> = {
  name: "tutorials",
  subDir: "developers/tutorials",
  async buildEntry(slug, locale) {
    const enPathStr = mdPath(this.subDir, slug, DEFAULT_LOCALE)

    let raw: string
    let isTranslated = true

    if (locale === DEFAULT_LOCALE) {
      raw = await readFile(enPathStr, "utf-8")
    } else {
      try {
        raw = await readFile(mdPath(this.subDir, slug, locale), "utf-8")
      } catch {
        raw = await readFile(enPathStr, "utf-8")
        isTranslated = false
      }
    }

    const { data, content } = matter(raw)
    const fm = data as TutorialFrontmatter

    return {
      href: `/developers/tutorials/${slug}`,
      title: fm.title,
      description: fm.description,
      author: fm.author || "",
      tags: fm.tags,
      skill: fm.skill as Skill,
      timeToRead: Math.round(readingTime(content).minutes),
      published: dateToString(fm.published),
      lang: fm.lang,
      isExternal: false,
      isTranslated,
    }
  },
}

const videos: CollectionDefinition<VideoCardData> = {
  name: "videos",
  subDir: "videos",
  async buildEntry(slug, locale) {
    // Metadata always comes from English; locale only overrides title/description.
    const enRaw = await readFile(
      mdPath(this.subDir, slug, DEFAULT_LOCALE),
      "utf-8"
    )
    const enParsed = matter(enRaw)
    const fm = { ...enParsed.data } as VideoFrontmatter

    if ((fm.uploadDate as unknown) instanceof Date) {
      fm.uploadDate = (fm.uploadDate as unknown as Date)
        .toISOString()
        .split("T")[0]
    }

    if (locale !== DEFAULT_LOCALE) {
      try {
        const localeRaw = await readFile(
          mdPath(this.subDir, slug, locale),
          "utf-8"
        )
        const localeData = matter(localeRaw).data
        if (typeof localeData.title === "string") fm.title = localeData.title
        if (typeof localeData.description === "string") {
          fm.description = localeData.description
        }
      } catch {
        // No translation; fall through to English title/description.
      }
    }

    return {
      slug,
      title: fm.title,
      description: fm.description,
      uploadDate: fm.uploadDate,
      duration: fm.duration,
      topic: fm.topic,
      // Thumbnail is resolved at runtime from the S3 thumbnail map; the
      // manifest stores an empty placeholder so the type stays flat.
      thumbnailUrl: "",
    }
  },
}

export const collections = [tutorials, videos] as const
