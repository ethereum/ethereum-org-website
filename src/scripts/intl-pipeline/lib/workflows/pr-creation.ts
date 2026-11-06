// PR creation and update workflow phase

import { config } from "../../config"
import {
  findOpenPR,
  postPullRequest,
  updatePRBody,
} from "../github/pull-requests"

import type { CommittedFile, LanguagePair } from "./types"
import { logSection } from "./utils"

/**
 * GitHub rejects PR bodies over 65,536 chars. Keep headroom and clamp before
 * every create/update so a long failure list or accumulated run history can
 * never block the PR (this previously failed full-tree runs -- see PR #18471).
 */
export const MAX_PR_BODY = 60_000
/** Cap the per-run failure + rerun lists; full set is in the workflow log. */
const MAX_FAILURES_LISTED = 40

/**
 * Clamp a PR body to MAX_PR_BODY, preserving the TAIL (the newest run summary
 * is the most useful) and prefixing a truncation notice.
 */
export function clampBody(body: string): string {
  if (body.length <= MAX_PR_BODY) return body
  const notice =
    "_[earlier content truncated to fit GitHub's PR body limit; see workflow logs for full history]_\n\n"
  return notice + body.slice(body.length - (MAX_PR_BODY - notice.length))
}

/**
 * Generate PR title based on language count
 */
export function generatePRTitle(
  langCodes: string[],
  allPossibleLanguages: string[]
): string {
  let prTitle = "i18n: translation pipeline"

  if (langCodes.length <= 3) {
    prTitle += ` (${langCodes.join(", ")})`
  } else if (langCodes.length === allPossibleLanguages.length) {
    prTitle += " (all languages)"
  } else {
    prTitle += " (multiple languages)"
  }

  return prTitle
}

/**
 * Generate the initial PR body (used only on first creation)
 */
function generateInitialPRBody(): string {
  return [
    "## Automated Translations",
    "",
    "This PR contains translations managed by the intl pipeline.",
    "Each run appends a summary below.",
    "",
  ].join("\n")
}

export interface RunFailure {
  locale: string
  file: string
  message: string
  /** Recorded in the quarantine list this run; skipped next run */
  quarantined?: boolean
}

/** A pair the run did not attempt because the quarantine list holds it. */
export interface SkippedPair {
  locale: string
  file: string
  class: string
  reason: string
  expiresAt: string
}

/**
 * Generate a run summary to append to the PR body
 */
export function generateRunSummary(
  langCodes: string[],
  committedFiles: CommittedFile[],
  mode: string,
  workflowRunUrl?: string,
  failures: RunFailure[] = [],
  skipped: SkippedPair[] = []
): string {
  const now = new Date().toISOString().replace("T", " ").slice(0, 19) + " UTC"

  const jsonCount = committedFiles.filter((f) =>
    f.path.endsWith(".json")
  ).length
  const mdCount = committedFiles.filter((f) => f.path.endsWith(".md")).length

  const parts = [
    "---",
    `### Run: ${now}`,
    `- Languages: ${langCodes.join(", ")}`,
    `- Files: ${committedFiles.length} (${mdCount} MD, ${jsonCount} JSON)`,
    `- Mode: ${mode}`,
  ]

  if (workflowRunUrl) {
    parts.push(`- [View workflow run](${workflowRunUrl})`)
  }

  if (failures.length > 0) {
    const shown = failures.slice(0, MAX_FAILURES_LISTED)
    const extra = failures.length - shown.length
    const cap = extra > 0 ? ` (showing first ${MAX_FAILURES_LISTED})` : ""
    parts.push("", `**${failures.length} task(s) failed${cap}:**`, "")
    for (const f of shown) {
      parts.push(
        `- \`${f.file}\` (${f.locale}): ${f.message}${f.quarantined ? " _(quarantined)_" : ""}`
      )
    }
    if (extra > 0) parts.push(`- ...and ${extra} more (see workflow log)`)
    parts.push("", "Rerun the failed combinations:", "", "```")
    for (const f of shown) {
      parts.push(
        `gh workflow run "Intl Pipeline" -f target_path="${f.file}" -f target_languages="${f.locale}"${f.quarantined ? " -f mode=full" : ""}`
      )
    }
    if (extra > 0) parts.push(`# ...and ${extra} more (see workflow log)`)
    parts.push("```")
  }

  if (skipped.length > 0) {
    const shown = skipped.slice(0, MAX_FAILURES_LISTED)
    const extra = skipped.length - shown.length
    parts.push(
      "",
      `**${skipped.length} pair(s) skipped -- quarantined from an earlier run:**`,
      ""
    )
    for (const p of shown) {
      parts.push(
        `- \`${p.file}\` (${p.locale}): ${p.class}, until ${p.expiresAt.slice(0, 10)} -- ${p.reason.slice(0, 120)}`
      )
    }
    if (extra > 0)
      parts.push(`- ...and ${extra} more (see \`.manifests/quarantine.json\`)`)
    parts.push(
      "",
      "A quarantined pair is retried when its English changes or the entry expires. To force it now, rerun with `mode=full`, or delete its entry from `.manifests/quarantine.json`."
    )
  }

  parts.push("")
  return parts.join("\n")
}

/**
 * Build workflow run URL from GitHub environment variables
 */
function getWorkflowRunUrl(): string | undefined {
  const serverUrl = process.env.GITHUB_SERVER_URL
  const repository = process.env.GITHUB_REPOSITORY
  const runId = process.env.GITHUB_RUN_ID

  if (serverUrl && repository && runId) {
    return `${serverUrl}/${repository}/actions/runs/${runId}`
  }
  return undefined
}

/**
 * Create or update a translation PR.
 *
 * - If no open PR exists for targetBranch -> baseBranch: creates one
 * - If an open PR exists: appends a run summary to the existing body
 */
export async function createOrUpdateTranslationPR(
  branch: string,
  committedFiles: CommittedFile[],
  languagePairs: LanguagePair[],
  mode: string,
  failures: RunFailure[] = [],
  skipped: SkippedPair[] = []
): Promise<{ number: number; html_url: string }> {
  logSection("Pull Request")

  const langCodes = languagePairs.map((p) => p.internalLanguageCode)
  const workflowRunUrl = getWorkflowRunUrl()
  const runSummary = generateRunSummary(
    langCodes,
    committedFiles,
    mode,
    workflowRunUrl,
    failures,
    skipped
  )

  // Check for existing open PR
  const existingPR = await findOpenPR(branch, config.baseBranch)

  if (existingPR) {
    // Append run summary to existing PR body (clamped so accumulated history
    // can never exceed GitHub's limit).
    const updatedBody = clampBody((existingPR.body || "") + "\n" + runSummary)
    await updatePRBody(existingPR.number, updatedBody)
    console.log(
      `[pr] Updated existing PR #${existingPR.number}: ${existingPR.html_url}`
    )
    return existingPR
  }

  // Create new PR
  const prTitle = generatePRTitle(langCodes, config.allInternalCodes)
  const prBody = clampBody(generateInitialPRBody() + "\n" + runSummary)

  const pr = await postPullRequest(branch, config.baseBranch, prTitle, prBody)
  console.log(`[pr] Created PR #${pr.number}: ${pr.html_url}`)

  return pr
}
