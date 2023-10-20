import fs from "fs"
import { join } from "path"
import { execSync } from "child_process"

import {
  CONTENT_DIR,
  DEFAULT_LOCALE,
  LAST_DEPLOY_BASE_URL,
  TRANSLATIONS_DIR,
} from "../constants"

// This util filters the git log to get the file last commit info, and then the commit date (last update)
export const getLastModifiedDate = async (slug: string, locale: string) => {
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
  const headers = new Headers({
    // About personal access tokens https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token#about-personal-access-tokens
    Authorization: "Token " + process.env.GITHUB_TOKEN_READ_ONLY,
  })

  try {
    // Fetch data from closed PRs made to the master branch
    const response = await fetch(LAST_DEPLOY_BASE_URL, { headers })
    const pullRequests = await response.json()

    // Get the `merged_at` date (deployment date) from last deploy PR made to the master branch
    const deploys = pullRequests.filter(({ title }: { title: string }) =>
      title.toLowerCase().includes("deploy")
    )

    if (deploys.length <= 0) throw new Error("No deploy PRs found")
    const lastDeployDate: string = deploys[0].merged_at

    return lastDeployDate
  } catch (err) {
    console.error(err)
    // If API fetch fails, use current date as fallback date
    return new Date().toISOString()
  }
}
