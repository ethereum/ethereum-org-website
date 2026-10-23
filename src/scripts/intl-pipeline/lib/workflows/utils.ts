// Common utilities for i18n workflows

import { config } from "../../config"

/**
 * Delay execution for specified milliseconds
 */
export const delay = (ms: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms))

/**
 * Log debug message (only when verbose mode is enabled)
 */
export function debugLog(message: string): void {
  if (!config.verbose) return
  console.log(`[DEBUG] ${message}`)
}

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
 * Whether a run produced nothing usable and should abort loudly.
 *
 * "Nothing usable" means no translated file and no refreshed manifest, while at
 * least one failure is still retryable. A failure that is now quarantined does
 * not count: the run recorded it, and rerunning the same input would fail the
 * same way, so there is nothing for a human to act on.
 *
 * The quarantine file is deliberately not part of `stampedManifests`. It is
 * bookkeeping about failures, and counting it as output would let a run where
 * every task failed exit green with a PR containing only quarantine.json.
 */
export function shouldAbortRun(run: {
  /** Failures not absorbed by the quarantine */
  unhandledFailures: number
  /** Translated files recorded this run */
  translatedFiles: number
  /** Manifests refreshed this run (stamp-only path) */
  stampedManifests: boolean
}): boolean {
  return (
    run.unhandledFailures > 0 &&
    run.translatedFiles === 0 &&
    !run.stampedManifests
  )
}

/**
 * Give the output the same file ending as its English source.
 *
 * The full path emits whatever the model returned, and a model does not
 * reliably end a file with a newline -- all four `mode: full` outputs of run
 * 36636650455 lost theirs while all three incremental outputs kept them, since
 * incremental splices into the existing file. Mirroring English rather than
 * imposing a house rule keeps this consistent with every other thing the
 * pipeline asserts about structure, and leaves the six English files that end
 * without a newline alone.
 */
export function matchTrailingNewline(output: string, english: string): string {
  if (!output) return output
  const wanted = english.match(/\n*$/)?.[0] ?? ""
  return output.replace(/\n*$/, wanted)
}
