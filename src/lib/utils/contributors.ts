import { join } from "path"

import type { CommitHistory, FileContributor, Lang } from "@/lib/types"

import { DEFAULT_LOCALE } from "@/lib/constants"

import {
  convertToFileContributorFromCrowdin,
  getCrowdinContributors,
} from "./crowdin"
import { getLastModifiedDate } from "./gh"

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
