/**
 * Temp branch naming for pipeline runs.
 * See CONCURRENCY-SPEC.md Part 3.
 */

/**
 * Generate a temp branch name: tmp-intl/run-MMDD-HHMM
 * Uses UTC time to avoid timezone ambiguity.
 */
export function generateTempBranchName(): string {
  const now = new Date()
  const mm = String(now.getUTCMonth() + 1).padStart(2, "0")
  const dd = String(now.getUTCDate()).padStart(2, "0")
  const hh = String(now.getUTCHours()).padStart(2, "0")
  const min = String(now.getUTCMinutes()).padStart(2, "0")
  return `tmp-intl/run-${mm}${dd}-${hh}${min}`
}
