import fs from "fs"
import { join } from "path"
import { execSync } from "child_process"

import {
  CONTENT_DIR,
  DEFAULT_LOCALE,
  GITHUB_AUTH_HEADERS,
  GITHUB_LAST_DEPLOY_URL,
  TRANSLATIONS_DIR,
} from "@/lib/constants"

// This util filters the git log to get the file last commit info, and then the commit date (last update)
export const getLastModifiedDate = (slug: string, locale: string) => {
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

  // git command to show file last commit info
  const gitCommand = `git log -1 -- ${filePath}`
  // Execute git command and parse result to string
  const logInfo = execSync(gitCommand).toString()
  // Filter commit date in log and return date using ISOString format (same that GH API uses)
  const lastCommitDate = logInfo
    .split("\n")
    .filter((x) => x.startsWith("Date: "))[0]
    .slice("Date:".length)
    .trim()

  return new Date(lastCommitDate).toISOString()
}

export const getLastDeployDate = async () => {
  try {
    // Fetch data from closed PRs made to the master branch
    const response = await fetch(GITHUB_LAST_DEPLOY_URL, GITHUB_AUTH_HEADERS)
    const pullRequests = await response.json()

    // Get the `merged_at` date (deployment date) from last deploy PR made to the master branch
    const lastDeployDate: string = pullRequests.filter((pr) =>
      pr.title.toLowerCase().includes("deploy")
    )[0].merged_at

    return lastDeployDate
  } catch (err) {
    console.error(err)
    // If API fetch fails, use current date as fallback date
    return new Date().toISOString()
  }
}
