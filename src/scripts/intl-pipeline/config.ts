import * as dotenv from "dotenv"

import i18nConfig from "../../../i18n.config.json"

import { DO_NOT_TRANSLATE_PATHS } from "./constants"

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
}

// All locale codes from i18n.config.json (including "en"). Used by
// normalizeTargetPath to strip accidental locale-prefixed paths.
const allLocaleCodes: string[] = i18nConfig.map(({ code }) => code)

/**
 * Repo-specific path normalization for user-supplied target paths.
 *
 * Adjustments (each logged at info level when applied):
 *   - public/content/translations/<locale>/X        -> public/content/X
 *   - src/intl/<non-en-locale>/X                    -> src/intl/en/X
 *   - X.json (without src/intl/en/ prefix)          -> src/intl/en/X.json
 *   - X (markdown, without public/content/ prefix)  -> public/content/X
 *
 * Returns the normalized path. Logging is the caller's responsibility (the
 * caller passes a logger so this stays free of side-effect coupling).
 */
export function normalizeTargetPath(
  raw: string,
  onAdjust?: (from: string, to: string) => void
): string {
  let p = raw.trim()
  if (!p) return p
  const original = p

  // Strip leading "./" if present
  if (p.startsWith("./")) p = p.slice(2)
  // Strip leading "/" so prefixes match consistently
  if (p.startsWith("/")) p = p.slice(1)

  // 1. Strip accidental translations/<locale>/ prefix
  const trMatch = p.match(/^public\/content\/translations\/([^/]+)\/(.+)$/)
  if (trMatch && allLocaleCodes.includes(trMatch[1])) {
    p = `public/content/${trMatch[2]}`
  }

  // 2. Strip accidental non-en src/intl/<locale>/ prefix
  const intlMatch = p.match(/^src\/intl\/([^/]+)\/(.+)$/)
  if (
    intlMatch &&
    intlMatch[1] !== "en" &&
    allLocaleCodes.includes(intlMatch[1])
  ) {
    p = `src/intl/en/${intlMatch[2]}`
  }

  // 3. Auto-prefix by file type. Paths already at/under a source root (the
  //    bare roots "src/intl/en" and "public/content" included) are left as-is;
  //    only bare relative paths get prefixed. Note "public/content" has no
  //    trailing slash, so the root itself must be matched explicitly.
  const underJsonRoot = p === "src/intl/en" || p.startsWith("src/intl/en/")
  const underMdRoot =
    p === "public/content" || p.startsWith("public/content/")
  if (underJsonRoot || underMdRoot) {
    // already rooted -- no prefix needed
  } else if (p.endsWith(".json")) {
    p = `src/intl/en/${p}`
  } else {
    p = `public/content/${p}`
  }

  if (p !== original && onAdjust) onAdjust(original, p)
  return p
}

// Returns the matching excluded fragment if the path is in the do-not-translate
// list, or null otherwise. Unlike validateTargetPath, this is non-fatal: callers
// should filter excluded paths out and continue with whatever remains.
export function getExcludedReason(targetPath: string): string | null {
  if (!targetPath) return null
  for (const excluded of DO_NOT_TRANSLATE_PATHS) {
    if (targetPath.includes(excluded)) return excluded
  }
  return null
}
