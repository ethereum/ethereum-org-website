import type { FileContributor } from "../types"

// Returns "" (not the Unix epoch) for an empty array, so callers can hide
// the "last update" line instead of formatting "January 1, 1970".
export const getAppPageLastCommitDate = (
  gitHubContributors: FileContributor[]
): string => {
  if (!gitHubContributors.length) return ""

  return gitHubContributors
    .reduce((latest, contributor) => {
      const commitDate = new Date(contributor.date)
      return commitDate > latest ? commitDate : latest
    }, new Date(0))
    .toISOString()
}
