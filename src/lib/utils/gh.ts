import type { FileContributor } from "../types"

// Returns "" when no valid commit date exists, so callers can omit dates
// instead of reporting the Unix epoch or an invalid machine-readable value.
export const getAppPageLastCommitDate = (
  gitHubContributors: FileContributor[]
): string => {
  let latest: Date | null = null
  for (const contributor of gitHubContributors) {
    const commitDate = new Date(contributor.date)
    if (Number.isNaN(commitDate.getTime())) continue
    if (!latest || commitDate > latest) latest = commitDate
  }
  return latest?.toISOString() ?? ""
}

const LABELS_TO_SEARCH = [
  "content",
  "design",
  "dev",
  "doc",
  "translation",
  "event",
] as const

const LABELS_TO_TEXT: Record<(typeof LABELS_TO_SEARCH)[number], string> = {
  content: "content",
  design: "design",
  dev: "dev",
  doc: "docs",
  translation: "translation",
  event: "event",
}

// Given a list of labels, it returns a new array with the labels that match the
// LABELS_TO_SEARCH list, using the LABELS_TO_TEXT values
// Example:
// - ["content :pencil:", "ux design"] => ["content", "design"]
// - ["documentation :emoji:", "dev required", "good first issue"] => ["docs", "dev"]
export const normalizeLabels = (labels: string[]) => {
  const labelsFound = labels
    .map((label) => {
      const labelIndex = LABELS_TO_SEARCH.findIndex((l) =>
        label.toLocaleLowerCase().includes(l)
      )

      if (labelIndex === -1) {
        return
      }

      const labelMatched = LABELS_TO_SEARCH[labelIndex]
      return LABELS_TO_TEXT[labelMatched]
    })
    .filter(Boolean)

  // remove duplicates
  return Array.from(new Set(labelsFound))
}
