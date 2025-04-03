import { join } from "path"

import type { CommitHistory, FileContributor, Lang } from "@/lib/types"

import { CONTENT_DIR, CONTENT_PATH, DEFAULT_LOCALE } from "@/lib/constants"

import {
  convertToFileContributorFromCrowdin,
  getCrowdinContributors,
} from "./crowdin"
import { getLastModifiedDate } from "./gh"
import { getLocaleTimestamp } from "./time"

import { fetchAndCacheGitContributors } from "@/lib/api/fetchGitHistory"

export const getFileContributorInfo = async (
  slug: string,
  locale: string,
  fileLang: string,
  cache: CommitHistory
) => {
  const mdPath = join(CONTENT_PATH, slug)
  const mdDir = join(CONTENT_DIR, slug)

  const gitContributors = await fetchAndCacheGitContributors(
    join("/", mdDir, "index.md"),
    cache
  )

  const latestCommitDate = getLastModifiedDate(slug, locale!)
  const gitHubLastEdit = gitContributors[0]?.date
  const lastUpdatedDate = gitHubLastEdit || latestCommitDate

  const crowdinContributors = convertToFileContributorFromCrowdin(
    getCrowdinContributors(mdPath, locale as Lang)
  )

  const useGitHubContributors: boolean =
    fileLang === DEFAULT_LOCALE || crowdinContributors.length === 0

  const contributors: FileContributor[] = useGitHubContributors
    ? gitContributors
    : [...crowdinContributors, ...gitContributors]

  return { contributors, lastUpdatedDate }
}

export const getPageContributorInfo = async (
  pagePath: string,
  locale: Lang,
  cache: CommitHistory
) => {
  const gitContributors = [
    ...(await fetchAndCacheGitContributors(
      join("app/[locale]", pagePath, "page.tsx"),
      cache
    )),
    ...(await fetchAndCacheGitContributors(
      join("app/[locale]", pagePath, "_components", `${pagePath}.tsx`),
      cache
    )),
  ]

  const uniqueGitContributors = gitContributors.filter(
    (contributor, index, self) =>
      index === self.findIndex((t) => t.login === contributor.login)
  )

  const latestCommitDate = getLastModifiedDate(pagePath, locale!)
  const gitHubLastEdit = uniqueGitContributors[0]?.date

  const lastEditLocaleTimestamp = getLocaleTimestamp(
    locale,
    gitHubLastEdit || latestCommitDate
  )

  return { contributors: uniqueGitContributors, lastEditLocaleTimestamp }
}
