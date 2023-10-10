import fs from "fs"
import { join } from "path"

import {
  DEFAULT_LOCALE,
  LAST_COMMIT_BASE_URL,
  OLD_CONTENT_DIR,
  OLD_TRANSLATIONS_DIR,
  TRANSLATIONS_DIR,
} from "../constants"

export const getLastModifiedDate = async (filePath: string, locale: string) => {
  const headers = new Headers({
    // About personal access tokens https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token#about-personal-access-tokens
    Authorization: "Token " + process.env.GITHUB_TOKEN_READ_ONLY,
  })
  const url = new URL(LAST_COMMIT_BASE_URL)
  // TODO: swap `OLD_CONTENT_DIR` for new `CONTENT_DIR` constant value before deploying site to prod
  // as we're currently fetching last commit date from canonical repo

  // TODO: swap `OLD_TRANSLATIONS_DIR` for new `TRANSLATIONS_DIR` constant value before deploying site to prod
  // as we're currently fetching last commit date from canonical repo
  const translatedContentPath = join(
    TRANSLATIONS_DIR,
    locale,
    filePath,
    "index.md"
  )

  // If content is not translated, use english content date
  const contentIsNotTranslated = !fs.existsSync(translatedContentPath)

  if (locale === DEFAULT_LOCALE || contentIsNotTranslated) {
    url.searchParams.set("path", join(OLD_CONTENT_DIR, filePath, "index.md"))
  } else {
    url.searchParams.set(
      "path",
      join(OLD_TRANSLATIONS_DIR, locale, filePath, "index.md")
    )
  }
  url.searchParams.set("page", "1")
  url.searchParams.set("per_page", "1")

  try {
    const response = await fetch(url, { headers })
    const commits = await response.json()
    return commits[0].commit.committer.date
  } catch (err) {
    console.error(filePath, err)
  }
}
