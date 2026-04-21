import * as dotenv from "dotenv"

import i18nConfig from "../../../i18n.config.json"

dotenv.config({ path: ".env.local" })

// Glossary API (ETHGlossary)
export const GLOSSARY_API_URL =
  process.env.GLOSSARY_API_URL ||
  "https://ethglossary.visual-20-hoists.workers.dev/api/v1"

// GitHub API configuration
const githubApiToken = process.env.GITHUB_API_TOKEN || ""
if (!githubApiToken) {
  console.error("[ERROR] Missing GITHUB_API_TOKEN environment variable")
  throw new Error("No GitHub API token found (GITHUB_API_TOKEN)")
}

export const gitHubBearerHeaders = {
  Authorization: `Bearer ${githubApiToken}`,
  Accept: "application/vnd.github.v3+json",
}

// Parse target languages from env (internal codes: "es", "ko", etc.)
const targetLanguagesInput = process.env.TARGET_LANGUAGES
  ? process.env.TARGET_LANGUAGES.split(",")
      .map((lang) => lang.trim())
      .filter(Boolean)
  : []

// If no target languages specified, use all from i18n.config.json except English
const allInternalCodes: string[] =
  targetLanguagesInput.length > 0
    ? targetLanguagesInput
    : i18nConfig.map(({ code }) => code).filter((code) => code !== "en")

const baseBranch = process.env.BASE_BRANCH || "dev"
// Default target branch derived from base: intl/pending-{base with / replaced by -}
const defaultTargetBranch = `intl/pending-${baseBranch.replace(/\//g, "-")}`
const targetBranch = process.env.TARGET_BRANCH || defaultTargetBranch

const targetPathRaw = process.env.TARGET_PATH || ""
const targetPaths = targetPathRaw
  ? targetPathRaw
      .split(",")
      .map((p) => p.trim())
      .filter(Boolean)
  : []

const excludePathRaw = process.env.EXCLUDE_PATH?.trim() || ""
const excludePaths = excludePathRaw
  ? excludePathRaw
      .split(",")
      .map((p) => p.trim())
      .filter(Boolean)
  : []

const verbose = process.env.VERBOSE === "true"
const skipPr = ["1", "true", "yes", "on"].includes(
  (process.env.SKIP_PR_CREATION || "").toLowerCase()
)
const stampOnly = ["1", "true", "yes", "on"].includes(
  (process.env.STAMP_ONLY || "").toLowerCase()
)
const dryRun = ["1", "true", "yes", "on"].includes(
  (process.env.DRY_RUN || "").toLowerCase()
)
const mode = (process.env.MODE || "auto") as "auto" | "full"
const concurrency = parseInt(process.env.GEMINI_CONCURRENCY || "16", 10)

// Parse GitHub repository from env (format: "owner/repo")
const githubRepo =
  process.env.GITHUB_REPOSITORY || "ethereum/ethereum-org-website"
const [ghOrganization, ghRepo] = githubRepo.split("/")

if (verbose) {
  console.log("[config] Configuration:")
  console.log(`[config]   Languages: ${allInternalCodes.join(", ") || "ALL"}`)
  console.log(`[config]   Base branch: ${baseBranch}`)
  console.log(`[config]   Target branch: ${targetBranch}`)
  console.log(`[config]   Target paths: ${targetPaths.join(", ") || "all"}`)
  console.log(`[config]   Exclude paths: ${excludePaths.join(", ") || "none"}`)
  console.log(`[config]   Mode: ${mode}`)
  console.log(`[config]   Stamp only: ${stampOnly}`)
  console.log(`[config]   Skip PR: ${skipPr}`)
  console.log(`[config]   Dry run: ${dryRun}`)
  console.log(`[config]   Concurrency: ${concurrency}`)
  console.log(`[config]   Repo: ${ghOrganization}/${ghRepo}`)
}

export const config = {
  ghOrganization,
  ghRepo,
  jsonRoot: "src/intl/en",
  mdRoot: "public/content",
  allInternalCodes,
  baseBranch,
  targetBranch,
  targetPath: targetPathRaw,
  targetPaths,
  excludePaths,
  verbose,
  skipPr,
  stampOnly,
  dryRun,
  mode,
  concurrency,
}

// Paths that should never be translated
export const doNotTranslatePaths = [
  "/cookie-policy/",
  "/privacy-policy/",
  "/terms-of-use/",
  "/terms-and-conditions/",
  "/style-guide/",
]

export function validateTargetPath(targetPath: string): void {
  if (!targetPath) return

  if (targetPath.includes("public/content/translations")) {
    throw new Error(
      `Invalid target path: "${targetPath}" -- cannot target translated content`
    )
  }

  if (
    targetPath.startsWith("src/intl/") &&
    !targetPath.startsWith("src/intl/en")
  ) {
    throw new Error(
      `Invalid target path: "${targetPath}" -- only src/intl/en is allowed`
    )
  }

  for (const excluded of doNotTranslatePaths) {
    if (targetPath.includes(excluded)) {
      throw new Error(
        `Invalid target path: "${targetPath}" -- in excluded list (${excluded})`
      )
    }
  }
}
