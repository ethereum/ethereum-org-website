import * as dotenv from "dotenv"

import i18nConfig from "../../../i18n.config.json"

import canonicalLanguageList from "./config/canonical-llm-language-list.json"
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
const useLegacyLanguages = ["1", "true", "yes", "on"].includes(
  (process.env.USE_LEGACY_LANGUAGES || "").toLowerCase()
)

const targetLanguagesInput = process.env.TARGET_LANGUAGES
  ? process.env.TARGET_LANGUAGES.split(",")
      .map((lang) => lang.trim())
      .filter(Boolean)
  : []

// If no target languages specified, use all languages from appropriate config
let targetLanguages: string[]
if (targetLanguagesInput.length === 0) {
  if (useLegacyLanguages) {
    // Use i18n.config.json, excluding 'en'
    targetLanguages = i18nConfig
      .map(({ code }) => code)
      .filter((code) => code !== "en")
      .map((code) => mapInternalCodeToCrowdin(code))
  } else {
    // Use canonical-llm-language-list.json
    targetLanguages = canonicalLanguageList
      .map(({ code }) => code)
      .map((code) => mapInternalCodeToCrowdin(code))
  }
} else {
  targetLanguages = targetLanguagesInput.map((code) =>
    mapInternalCodeToCrowdin(code)
  )
}

const baseBranch = process.env.BASE_BRANCH || "dev"

const targetPath = process.env.TARGET_PATH || ""
const excludePath = process.env.EXCLUDE_PATH?.trim() || ""

// Skip awaiting pre-translation completion (exit early with ID for manual resume)
const skipAwait = ["1", "true", "yes", "on"].includes(
  (process.env.SKIP_AWAIT || "").toLowerCase()
)

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
    `[DEBUG] - Target languages (internal): ${targetLanguagesInput.length ? targetLanguagesInput.join(", ") : "ALL"}`
  )
  console.log(
    `[DEBUG] - Target languages (Crowdin): ${targetLanguages.join(", ")}`
  )
  console.log(`[DEBUG] - Use legacy languages: ${useLegacyLanguages}`)
  console.log(`[DEBUG] - Base branch: ${baseBranch}`)
  console.log(
    `[DEBUG] - Target path: ${targetPath || "none (full translation)"}`
  )
  console.log(`[DEBUG] - Exclude path: ${excludePath || "none"}`)
  console.log(`[DEBUG] - Skip await: ${skipAwait}`)
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
  allInternalCodes: targetLanguagesInput.length
    ? targetLanguagesInput
    : useLegacyLanguages
      ? i18nConfig.map(({ code }) => code).filter((code) => code !== "en")
      : canonicalLanguageList.map(({ code }) => code),
  useLegacyLanguages,
  baseBranch,
  targetPath,
  excludePath,
  skipAwait,
  pretranslateTimeoutMs,
  pretranslatePollBaseMs,
  existingPreTranslationId,
  verbose,
}

// Do not translate list - Declare paths that should never be translated
export const doNotTranslatePaths = [
  "/cookie-policy/",
  "/privacy-policy/",
  "/terms-of-use/",
  "/terms-and-conditions/",
  "/style-guide/",
]

// Validation for target path
export function validateTargetPath(targetPath: string): void {
  if (!targetPath) {
    // Full translation mode is allowed
    return
  }

  // Disallowed: paths under public/content/translations (translated content)
  if (targetPath.includes("public/content/translations")) {
    throw new Error(
      `[ERROR] Invalid target path: "${targetPath}"\n` +
        `Target path cannot be under "public/content/translations" (this is translated content)\n` +
        `Did you mean to target a file under "public/content" instead?`
    )
  }

  // Disallowed: paths under src/intl other than src/intl/en
  if (
    targetPath.startsWith("src/intl/") &&
    !targetPath.startsWith("src/intl/en")
  ) {
    throw new Error(
      `[ERROR] Invalid target path: "${targetPath}"\n` +
        `Target path under "src/intl/" can only be "src/intl/en" (English source)\n` +
        `Other src/intl directories contain translated content`
    )
  }

  // Disallowed: explicitly excluded paths from config file
  for (const excluded of doNotTranslatePaths) {
    if (targetPath.includes(excluded)) {
      throw new Error(
        `[ERROR] Invalid target path: "${targetPath}"\n` +
          `This path is in the excluded paths list (${excluded})`
      )
    }
  }
}

// Constants
export const CROWDIN_API_BASE_URL = "https://api.crowdin.com/api/v2"
export const MAX_STRINGS_PER_REQUEST = 500
