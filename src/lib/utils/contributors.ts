import { join } from "path"

import type { FileContributor, Lang } from "@/lib/types"

import { TEAM_LOGINS } from "@/data/team"

import { CONTENT_PATH, DEFAULT_LOCALE } from "@/lib/constants"

import {
  convertToFileContributorFromCrowdin,
  getCrowdinContributors,
} from "./crowdin"
import { getAppPageLastCommitDate } from "./gh"
import { getLocaleTimestamp } from "./time"

import { getGitHubContributors, getStaticGitHubContributors } from "@/lib/data"

/** Sort team members to the end, preserving relative order within each group. */
const sortTeamToEnd = (contributors: FileContributor[]): FileContributor[] =>
  contributors.toSorted((a, b) =>
    Number(TEAM_LOGINS.has(a.login)) - Number(TEAM_LOGINS.has(b.login))
  )

export const getMarkdownFileContributorInfo = async (
  slug: string,
  locale: string,
  fileLang: string
) => {
  const mdPath = join(CONTENT_PATH, slug)

  const contributorsData = await getStaticGitHubContributors()
  const gitHubContributors = contributorsData?.content[slug] ?? []

  const lastUpdatedDate = gitHubContributors[0]?.date

  const crowdinContributors = convertToFileContributorFromCrowdin(
    getCrowdinContributors(mdPath, locale as Lang)
  )

  const englishOnly: boolean =
    fileLang === DEFAULT_LOCALE || crowdinContributors.length === 0

  const contributors: FileContributor[] = englishOnly
    ? sortTeamToEnd(gitHubContributors)
    : [...crowdinContributors, ...sortTeamToEnd(gitHubContributors)]

  return { contributors, lastUpdatedDate }
}

export const getAppPageContributorInfo = async (
  pagePath: string,
  locale: Lang
) => {
  // TODO: Incorporate Crowdin contributor information

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

  return {
    contributors: sortTeamToEnd(uniqueGitHubContributors),
    lastEditLocaleTimestamp,
  }
}
