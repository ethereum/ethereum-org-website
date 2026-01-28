import { join } from "path"

import type { FileContributor, Lang } from "@/lib/types"

import { CONTENT_PATH, DEFAULT_LOCALE } from "@/lib/constants"

import {
  convertToFileContributorFromCrowdin,
  getCrowdinContributors,
} from "./crowdin"
import { getAppPageLastCommitDate, getMarkdownLastCommitDate } from "./gh"
import { getLocaleTimestamp } from "./time"

import { getGitHubContributors } from "@/lib/data"

export const getMarkdownFileContributorInfo = async (
  slug: string,
  locale: string,
  fileLang: string
) => {
  const mdPath = join(CONTENT_PATH, slug)

  // Load from data-layer (fetched by scheduled task, stored in Netlify Blobs)
  const contributorsData = await getGitHubContributors()
  const gitHubContributors = contributorsData?.content[slug] ?? []

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

export const getAppPageContributorInfo = async (
  pagePath: string,
  locale: Lang
) => {
  // TODO: Incorporate Crowdin contributor information

  // Load from data-layer (fetched by scheduled task, stored in Netlify Blobs)
  const contributorsData = await getGitHubContributors()
  const gitHubContributors = contributorsData?.appPages[pagePath] ?? []

  const uniqueGitHubContributors = gitHubContributors.filter(
    (contributor, index, self) =>
      index === self.findIndex((t) => t.login === contributor.login)
  )

  const latestCommitDate = getAppPageLastCommitDate(gitHubContributors)
  const lastEditLocaleTimestamp = getLocaleTimestamp(locale, latestCommitDate)

  // if (
  //   (!uniqueGitHubContributors.length || !lastEditLocaleTimestamp) &&
  //   process.env.NODE_ENV === "production"
  // ) {
  //   throw new Error(
  //     `No contributors found, path: ${pagePath}, locale: ${locale}`
  //   )
  // }

  return { contributors: uniqueGitHubContributors, lastEditLocaleTimestamp }
}
