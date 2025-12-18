// Common utilities for i18n workflows

/**
 * Delay execution for specified milliseconds
 */
export const delay = (ms: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms))

/**
 * Log a section header with consistent formatting
 */
export function logSection(title: string): void {
  console.log(`\n========== ${title} ==========`)
}

/**
 * Log a subsection with lighter formatting
 */
export function logSubsection(title: string): void {
  console.log(`\n--- ${title} ---`)
}

/**
 * Get GitHub Actions workflow run URL from environment variables.
 * Returns undefined if not running in GitHub Actions.
 */
export function getWorkflowRunUrl(): string | undefined {
  const { GITHUB_SERVER_URL, GITHUB_REPOSITORY, GITHUB_RUN_ID } = process.env
  if (!GITHUB_SERVER_URL || !GITHUB_REPOSITORY || !GITHUB_RUN_ID) {
    return undefined
  }
  return `${GITHUB_SERVER_URL}/${GITHUB_REPOSITORY}/actions/runs/${GITHUB_RUN_ID}`
}
