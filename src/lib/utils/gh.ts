import { execSync } from "child_process"
import fs from "fs"
import { join } from "path"

import { CONTENT_DIR, DEFAULT_LOCALE, TRANSLATIONS_DIR } from "@/lib/constants"

const getGitLogFromPath = (path: string): string => {
  // git command to show file last commit info
  const gitCommand = `git log -1 -- ${path}`
  // Execute git command and parse result to string
  return execSync(gitCommand).toString()
}

const extractDateFromGitLogInfo = (logInfo: string): string => {
  // Filter commit date in log and return date using ISOString format (same that GH API uses)
  try {
    const lastCommitDate = logInfo
    .split("\n")
    .filter((x) => x.startsWith("Date: "))[0]
    .slice("Date:".length)
    .trim()
  return new Date(lastCommitDate).toISOString()
  } catch {
    return new Date().toISOString()
  }
}

// This util filters the git log to get the file last commit info, and then the commit date (last update)
export const getLastModifiedDate = (slug: string, locale: string): string => {
  const translatedContentPath = join(TRANSLATIONS_DIR, locale, slug, "index.md")
  const contentIsNotTranslated = !fs.existsSync(translatedContentPath)
  let filePath = ""

  if (locale === DEFAULT_LOCALE || contentIsNotTranslated) {
    // Use git log data from english content
    filePath = join(CONTENT_DIR, slug, "index.md")
  } else {
    // Use git log data from translated content
    filePath = join(TRANSLATIONS_DIR, locale, slug, "index.md")
  }

  const logInfo = getGitLogFromPath(filePath)
  return extractDateFromGitLogInfo(logInfo)
}

export const getLastModifiedDateByPath = (path: string): string => {
  if (!fs.existsSync(path)) throw new Error(`File not found: ${path}`)
  const logInfo = getGitLogFromPath(path)
  return extractDateFromGitLogInfo(logInfo)
}

const LABELS_TO_SEARCH = [
  "content",
  "design",
  "dev",
  "doc",
  "translation",
  "event",
] as const

const LABELS_TO_TEXT: Record<(typeof LABELS_TO_SEARCH)[number], string> = {
  content: "content",
  design: "design",
  dev: "dev",
  doc: "docs",
  translation: "translation",
  event: "event",
}

// Given a list of labels, it returns a new array with the labels that match the
// LABELS_TO_SEARCH list, using the LABELS_TO_TEXT values
// Example:
// - ["content :pencil:", "ux design"] => ["content", "design"]
// - ["documentation :emoji:", "dev required", "good first issue"] => ["docs", "dev"]
export const normalizeLabels = (labels: string[]) => {
  const labelsFound = labels
    .map((label) => {
      const labelIndex = LABELS_TO_SEARCH.findIndex((l) =>
        label.toLocaleLowerCase().includes(l)
      )

      if (labelIndex === -1) {
        return
      }

      const labelMatched = LABELS_TO_SEARCH[labelIndex]
      return LABELS_TO_TEXT[labelMatched]
    })
    .filter(Boolean)

  // remove duplicates
  return Array.from(new Set(labelsFound))
}
