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
 * Generate PR title based on language count
 */
export function generatePRTitle(
  langCodes: string[],
  allPossibleLanguages: string[]
): string {
  let prTitle = "i18n: intl-pipeline translations"

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

/**
 * Generate a run summary to append to the PR body
 */
export function generateRunSummary(
  langCodes: string[],
  committedFiles: CommittedFile[],
  mode: string,
  workflowRunUrl?: string
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
  mode: string
): Promise<{ number: number; html_url: string }> {
  logSection("Pull Request")

  const langCodes = languagePairs.map((p) => p.internalLanguageCode)
  const workflowRunUrl = getWorkflowRunUrl()
  const runSummary = generateRunSummary(
    langCodes,
    committedFiles,
    mode,
    workflowRunUrl
  )

  // Check for existing open PR
  const existingPR = await findOpenPR(branch, config.baseBranch)

  if (existingPR) {
    // Append run summary to existing PR body
    const updatedBody = (existingPR.body || "") + "\n" + runSummary
    await updatePRBody(existingPR.number, updatedBody)
    console.log(
      `[pr] Updated existing PR #${existingPR.number}: ${existingPR.html_url}`
    )
    return existingPR
  }

  // Create new PR
  const prTitle = generatePRTitle(langCodes, config.allInternalCodes)
  const prBody = generateInitialPRBody() + "\n" + runSummary

  const pr = await postPullRequest(branch, config.baseBranch, prTitle, prBody)
  console.log(`[pr] Created PR #${pr.number}: ${pr.html_url}`)

  return pr
}
