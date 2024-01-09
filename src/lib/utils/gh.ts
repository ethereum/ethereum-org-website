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
  const lastCommitDate = logInfo
    .split("\n")
    .filter((x) => x.startsWith("Date: "))[0]
    .slice("Date:".length)
    .trim()
  return new Date(lastCommitDate).toISOString()
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
