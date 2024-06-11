import type { CrowdinContributor, FileContributor, Lang } from "@/lib/types"

import translators from "@/data/crowdin/combined-translators.json"
import fileIds from "@/data/crowdin/file-ids.json"

import { DEFAULT_LOCALE } from "@/lib/constants"

export const getCrowdinContributors = (
  path: string,
  locale: Lang
): CrowdinContributor[] => {
  if (locale === DEFAULT_LOCALE) return []

  let _fileId: number | null = null
  const normalizedPath = path.replace(/content\//, "").replace(/^\/+|\/+$/g, "")
  for (const { path, id } of fileIds) {
    if (path.includes(normalizedPath)) {
      _fileId = id
    }
  }

  const data = translators.filter(({ lang }) => lang === locale)[0]?.data ?? []
  return data.filter(({ fileId }) => +fileId === _fileId)[0]?.contributors ?? []
}

export const convertToFileContributorFromCrowdin = (
  contributors: CrowdinContributor[]
): FileContributor[] =>
  contributors.map(({ username, avatarUrl }) => ({
    login: username,
    avatar_url: avatarUrl,
    html_url: `https://crowdin.com/profile/${username}`,
  }))
