import * as dotenv from "dotenv"

import i18nConfig from "../../../i18n.config.json"

import { mapInternalCodeToCrowdin } from "./lib/utils/mapping"

dotenv.config({ path: ".env.local" })

// Language code mapping
export const crowdinToInternalCodeMapping: Record<string, string> =
  i18nConfig.reduce(
    (acc, { crowdinCode, code }) => {
      acc[crowdinCode] = code
      return acc
    },
    {} as Record<string, string>
  )

// GitHub API configuration
const gitHubApiKey = process.env.I18N_GITHUB_API_KEY || ""
if (!gitHubApiKey) {
  console.error("[ERROR] Missing I18N_GITHUB_API_KEY environment variable")
  console.error(
    "[ERROR] Please set I18N_GITHUB_API_KEY in your .env.local file"
  )
  throw new Error("No GitHub API Key found (I18N_GITHUB_API_KEY)")
}

export const gitHubBearerHeaders = {
  Authorization: `Bearer ${gitHubApiKey}`,
  Accept: "application/vnd.github.v3+json",
}

// Crowdin API configuration
const crowdinApiKey = process.env.I18N_CROWDIN_API_KEY || ""
if (!crowdinApiKey) {
  console.error("[ERROR] Missing I18N_CROWDIN_API_KEY environment variable")
  console.error(
    "[ERROR] Please set I18N_CROWDIN_API_KEY in your .env.local file"
  )
  throw new Error("No Crowdin API Key found (I18N_CROWDIN_API_KEY)")
}

export const crowdinBearerHeaders = { Authorization: `Bearer ${crowdinApiKey}` }

// Parse environment variables with defaults
// Accept internal codes (e.g., "es") and convert to Crowdin codes (e.g., "es-EM")
const targetLanguagesInput = process.env.TARGET_LANGUAGES
  ? process.env.TARGET_LANGUAGES.split(",").map((lang) => lang.trim())
  : ["es"]

const targetLanguages = targetLanguagesInput.map((code) =>
  mapInternalCodeToCrowdin(code)
)

const baseBranch = process.env.BASE_BRANCH || "dev"

const targetPath = process.env.TARGET_PATH || ""

// Adaptive polling / timeout configuration (milliseconds)
const pretranslateTimeoutMs = process.env.PRETRANSLATE_TIMEOUT_MS
  ? parseInt(process.env.PRETRANSLATE_TIMEOUT_MS, 10)
  : 6 * 60 * 60 * 1000 // default 6h

const pretranslatePollBaseMs = process.env.PRETRANSLATE_POLL_BASE_MS
  ? Math.max(5000, parseInt(process.env.PRETRANSLATE_POLL_BASE_MS, 10))
  : 30_000 // default 30s base (min clamped to 5s)

const existingPreTranslationId = process.env.PRETRANSLATION_ID || ""

const verbose = process.env.VERBOSE === "true"

// Parse GitHub repository from env (format: "owner/repo")
const githubRepo =
  process.env.GITHUB_REPOSITORY || "ethereum/ethereum-org-website"
const [ghOrganization, ghRepo] = githubRepo.split("/")

if (verbose) {
  console.log("[DEBUG] Configuration:")
  console.log(
    `[DEBUG] - Target languages (internal): ${targetLanguagesInput.join(", ")}`
  )
  console.log(
    `[DEBUG] - Target languages (Crowdin): ${targetLanguages.join(", ")}`
  )
  console.log(`[DEBUG] - Base branch: ${baseBranch}`)
  console.log(
    `[DEBUG] - Target path: ${targetPath || "none (full translation)"}`
  )
  console.log(`[DEBUG] - GitHub repo: ${ghOrganization}/${ghRepo}`)
  console.log(`[DEBUG] - Pretranslate timeout ms: ${pretranslateTimeoutMs}`)
  console.log(`[DEBUG] - Pretranslate poll base ms: ${pretranslatePollBaseMs}`)
  if (existingPreTranslationId) {
    console.log(
      `[DEBUG] - Resuming from pre-translation ID: ${existingPreTranslationId}`
    )
  }
}

// Main configuration object
export const config = {
  projectId: 834930,
  ghOrganization,
  ghRepo,
  jsonRoot: "src/intl/en",
  mdRoot: "public/content",
  preTranslatePromptId: Number.parseInt(
    process.env.PRE_TRANSLATE_PROMPT_ID || "326942"
  ),
  allCrowdinCodes: targetLanguages,
  baseBranch,
  targetPath,
  pretranslateTimeoutMs,
  pretranslatePollBaseMs,
  existingPreTranslationId,
  verbose,
}

// Constants
export const CROWDIN_API_BASE_URL = "https://api.crowdin.com/api/v2"
export const MAX_STRINGS_PER_REQUEST = 500
