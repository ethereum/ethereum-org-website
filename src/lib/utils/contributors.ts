import { join } from "path"

import type { CommitHistory, FileContributor, Lang } from "@/lib/types"

import { CONTENT_DIR, CONTENT_PATH, DEFAULT_LOCALE } from "@/lib/constants"

import {
  convertToFileContributorFromCrowdin,
  getCrowdinContributors,
} from "./crowdin"
import { getAppPageLastCommitDate, getMarkdownLastCommitDate } from "./gh"
import { getLocaleTimestamp } from "./time"

import { fetchAndCacheGitHubContributors } from "@/lib/api/fetchGitHistory"

export const getMarkdownFileContributorInfo = async (
  slug: string,
  locale: string,
  fileLang: string,
  cache: CommitHistory
) => {
  const mdPath = join(CONTENT_PATH, slug)
  const mdDir = join(CONTENT_DIR, slug)

  const gitHubContributors = await fetchAndCacheGitHubContributors(
    join("/", mdDir, "index.md"),
    cache
  )

  const latestCommitDate = getMarkdownLastCommitDate(slug, locale!)
  const gitHubLastEdit = gitHubContributors[0]?.date
  const lastUpdatedDate = gitHubLastEdit || latestCommitDate

  const crowdinContributors = convertToFileContributorFromCrowdin(
    getCrowdinContributors(mdPath, locale as Lang)
  )

  const englishOnly: boolean =
    fileLang === DEFAULT_LOCALE || crowdinContributors.length === 0

  const contributors: FileContributor[] = englishOnly
    ? gitHubContributors
    : [...crowdinContributors, ...gitHubContributors]

  return { contributors, lastUpdatedDate }
}

/**
 * Returns an array of possible historical file paths for a given page,
 * accounting for different directory structures and migrations over time.
 *
 * @param pagePath - The relative path of the page (without extension).
 * @returns An array of strings representing all historical file paths for the page.
 *
 * @remarks
 * This function is used to track all possible locations a page may have existed in the repository,
 * which is useful for aggregating git history and contributor information.
 *
 * @note
 * If a page is migrated or its location changes, ensure the new path is added to this list.
 * This maintains a complete historical record for accurate git history tracking.
 */
const getAllHistoricalPaths = (pagePath: string): string[] => [
  join("src/pages", `${pagePath}.tsx`),
  join("src/pages", pagePath, "index.tsx"),
  join("src/pages/[locale]", `${pagePath}.tsx`),
  join("src/pages/[locale]", pagePath, "index.tsx"),
  join("app/[locale]", pagePath, "page.tsx"),
  join("app/[locale]", pagePath, "_components", `${pagePath}.tsx`),
]

export const getAppPageContributorInfo = async (
  pagePath: string,
  locale: Lang,
  cache: CommitHistory
) => {
  // TODO: Incorporate Crowdin contributor information

  const gitHubContributors = await getAllHistoricalPaths(pagePath).reduce(
    async (acc, path) => {
      const contributors = await fetchAndCacheGitHubContributors(path, cache)
      return [...(await acc), ...contributors]
    },
    Promise.resolve([] as FileContributor[])
  )

  const uniqueGitHubContributors = gitHubContributors.filter(
    (contributor, index, self) =>
      index === self.findIndex((t) => t.login === contributor.login)
  )

  const latestCommitDate = getAppPageLastCommitDate(gitHubContributors)
  const lastEditLocaleTimestamp = getLocaleTimestamp(locale, latestCommitDate)

  if (
    (!uniqueGitHubContributors.length || !lastEditLocaleTimestamp) &&
    process.env.NODE_ENV === "production"
  ) {
    throw new Error(
      `No contributors found, path: ${pagePath}, locale: ${locale}`
    )
  }

  return { contributors: uniqueGitHubContributors, lastEditLocaleTimestamp }
}
