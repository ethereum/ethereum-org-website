import { join } from "path"

import type { CommitHistory, FileContributor, Lang } from "@/lib/types"

import { DEFAULT_LOCALE } from "@/lib/constants"

import {
  convertToFileContributorFromCrowdin,
  getCrowdinContributors,
} from "./crowdin"
import { getLastModifiedDate } from "./gh"
import { getLocaleTimestamp } from "./time"

import { fetchAndCacheGitContributors } from "@/lib/api/fetchGitHistory"

export const getFileContributorInfo = async (
  mdDir: string,
  mdPath: string,
  slug: string,
  locale: string,
  fileLang: string,
  cache: CommitHistory
) => {
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
  const gitContributors = await fetchAndCacheGitContributors(
    join("src/pages/", pagePath),
    cache
  )

  const latestCommitDate = getLastModifiedDate(pagePath, locale!)
  const gitHubLastEdit = gitContributors[0]?.date

  const lastEditLocaleTimestamp = getLocaleTimestamp(
    locale,
    gitHubLastEdit || latestCommitDate
  )

  return { contributors: gitContributors, lastEditLocaleTimestamp }
}
