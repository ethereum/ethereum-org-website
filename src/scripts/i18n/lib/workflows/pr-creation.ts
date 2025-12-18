// PR creation workflow phase

import { config } from "../../config"
import { getPromptInfo } from "../crowdin/prompt"
import { getCurrentUser } from "../crowdin/user"
import { postPullRequest } from "../github/pull-requests"

import type { CommittedFile, LanguagePair, PullRequest } from "./types"
import { logSection } from "./utils"

/**
 * Generate dynamic PR title based on language count
 */
export function generatePRTitle(
  langCodes: string[],
  allPossibleLanguages: string[]
): string {
  const isAllLanguages = langCodes.length === allPossibleLanguages.length

  let prTitle = "i18n: automated Crowdin translation import"

  if (langCodes.length <= 3) {
    prTitle += ` (${langCodes.join(", ")})`
  } else if (isAllLanguages) {
    prTitle += ` (all languages)`
  } else {
    prTitle += ` (many languages)`
  }

  return prTitle
}

/** Options for PR body generation */
export interface PRBodyOptions {
  geminiSkipped?: boolean
  workflowRunUrl?: string
}

/**
 * Generate PR body with organized file listings
 */
export function generatePRBody(
  aiModelName: string,
  langCodes: string[],
  committedFiles: CommittedFile[],
  sanitizedFiles: CommittedFile[],
  options: PRBodyOptions = {}
): string {
  // Include both sanitized files and original committed files
  const allChangedPathsSet = new Set([
    ...sanitizedFiles.map(({ path }) => path),
    ...committedFiles.map(({ path }) => path),
  ])
  const allChangedPaths = Array.from(allChangedPathsSet)

  // Separate JSON and Markdown files
  const jsonFiles = allChangedPaths.filter((path) =>
    path.toLowerCase().endsWith(".json")
  )
  const markdownFiles = allChangedPaths.filter((path) =>
    path.toLowerCase().endsWith(".md")
  )

  // Build PR body
  let prBody = `## Description\n\n`
  prBody += `This PR contains automated ${aiModelName} translations from Crowdin\n\n`

  // Add workflow run link if available
  if (options.workflowRunUrl) {
    prBody += `🔗 [View workflow run](${options.workflowRunUrl})\n\n`
  }

  // Language section
  prBody += `### Languages translated\n\n`
  prBody += `${langCodes.join(", ")}\n\n`

  // Files section - JSON
  if (jsonFiles.length > 0) {
    prBody += `#### JSON changes (\`src/intl/{locale}/\`)\n\n`
    for (const path of jsonFiles) {
      // Remove src/intl/{locale}/ prefix
      const simplifiedPath = path.replace(/^src\/intl\/[^/]+\//, "")
      prBody += `- ${simplifiedPath}\n`
    }
    prBody += `\n`
  }

  // Files section - Markdown
  if (markdownFiles.length > 0) {
    prBody += `#### Markdown changes (\`public/content/translations/{locale}/\`)\n\n`
    for (const path of markdownFiles) {
      // Remove public/content/translations/{locale}/ prefix
      const simplifiedPath = path.replace(
        /^public\/content\/translations\/[^/]+\//,
        ""
      )
      prBody += `- ${simplifiedPath}\n`
    }
    prBody += `\n`
  }

  // Add warning if Gemini was skipped
  if (options.geminiSkipped) {
    prBody += `---\n\n`
    prBody += `> ⚠️ **Note:** GEMINI_API_KEY was not available during this run. `
    prBody += `JSX component attributes (e.g., \`title="..."\`, \`description="..."\`) `
    prBody += `may remain untranslated. You can run the \`translate-jsx-attributes\` `
    prBody += `workflow on this branch to translate them separately.\n\n`
  }

  return prBody
}

/**
 * Fetch AI model name from Crowdin
 */
async function fetchAIModelName(): Promise<string> {
  try {
    const currentUser = await getCurrentUser()
    const promptInfo = await getPromptInfo(
      currentUser.id,
      config.preTranslatePromptId
    )

    if (promptInfo?.aiModelId) {
      console.log(`✓ Fetched AI model: ${promptInfo.aiModelId}`)
      return promptInfo.aiModelId
    } else {
      console.warn("Prompt info missing aiModelId, using default")
      return "LLM"
    }
  } catch (e) {
    console.warn("Could not fetch AI model name from Crowdin:", e)
    return "LLM"
  }
}

/**
 * Create pull request with formatted title and body
 */
export async function createTranslationPR(
  branch: string,
  committedFiles: CommittedFile[],
  sanitizedFiles: CommittedFile[],
  languagePairs: LanguagePair[],
  options: PRBodyOptions = {}
): Promise<PullRequest> {
  logSection("Creating Pull Request")

  // Fetch AI model name dynamically
  const aiModelName = await fetchAIModelName()

  // Extract language codes
  const langCodes = languagePairs.map((p) => p.internalLanguageCode)

  // Generate PR title and body
  const prTitle = generatePRTitle(langCodes, config.allInternalCodes)
  const prBody = generatePRBody(
    aiModelName,
    langCodes,
    committedFiles,
    sanitizedFiles,
    options
  )

  // Create PR
  const pr = await postPullRequest(branch, config.baseBranch, prTitle, prBody)

  console.log(`\n✓ Pull Request created: ${pr.html_url}`)
  console.log(`PR Number: #${pr.number}`)

  return pr
}
