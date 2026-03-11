import { execSync } from "child_process"
import fs from "fs"
import { join } from "path"

import {
  CONTENT_DIR,
  DEFAULT_LOCALE,
  GITHUB_COMMITS_URL,
  OLD_CONTENT_DIR,
  TRANSLATIONS_DIR,
} from "@/lib/constants"

import type { Commit, CommitHistory, FileContributor } from "../types"

const getGitLogFromPath = (path: string): string => {
  // git command to show file last commit info
  const gitCommand = `git log -1 -- ${path}`
  // Execute git command and parse result to string
  return execSync(gitCommand).toString()
}

const extractDateFromGitLogInfo = (logInfo: string): string => {
  // Filter commit date in log and return date using ISOString format (same that GH API uses)
  try {
    const lastCommitDate = logInfo
      .split("\n")
      .filter((x) => x.startsWith("Date: "))[0]
      .slice("Date:".length)
      .trim()
    return new Date(lastCommitDate).toISOString()
  } catch {
    return new Date().toISOString()
  }
}

export const getAppPageLastCommitDate = (
  gitHubContributors: FileContributor[]
) =>
  gitHubContributors
    .reduce((latest, contributor) => {
      const commitDate = new Date(contributor.date)
      return commitDate > latest ? commitDate : latest
    }, new Date(0))
    .toString()

export const getLastGitCommitDateByPath = (path: string): string => {
  if (!fs.existsSync(path)) throw new Error(`File not found: ${path}`)
  const logInfo = getGitLogFromPath(path)
  return extractDateFromGitLogInfo(logInfo)
}

// This util filters the git log to get the file last commit info, and then the commit date (last update)
export const getMarkdownLastCommitDate = (
  slug: string,
  locale: string
): string => {
  const translatedContentPath = join(TRANSLATIONS_DIR, locale, slug, "index.md")
  const contentIsNotTranslated = !fs.existsSync(translatedContentPath)
  let filePath = ""

  if (locale === DEFAULT_LOCALE || contentIsNotTranslated) {
    // Use git log data from english content
    filePath = join(CONTENT_DIR, slug, "index.md")
  } else {
    // Use git log data from translated content
    filePath = join(TRANSLATIONS_DIR, locale, slug, "index.md")
  }

  return getLastGitCommitDateByPath(filePath)
}

const LABELS_TO_SEARCH = [
  "content",
  "design",
  "dev",
  "doc",
  "translation",
  "event",
] as const

const LABELS_TO_TEXT: Record<(typeof LABELS_TO_SEARCH)[number], string> = {
  content: "content",
  design: "design",
  dev: "dev",
  doc: "docs",
  translation: "translation",
  event: "event",
}

// Given a list of labels, it returns a new array with the labels that match the
// LABELS_TO_SEARCH list, using the LABELS_TO_TEXT values
// Example:
// - ["content :pencil:", "ux design"] => ["content", "design"]
// - ["documentation :emoji:", "dev required", "good first issue"] => ["docs", "dev"]
export const normalizeLabels = (labels: string[]) => {
  const labelsFound = labels
    .map((label) => {
      const labelIndex = LABELS_TO_SEARCH.findIndex((l) =>
        label.toLocaleLowerCase().includes(l)
      )

      if (labelIndex === -1) {
        return
      }

      const labelMatched = LABELS_TO_SEARCH[labelIndex]
      return LABELS_TO_TEXT[labelMatched]
    })
    .filter(Boolean)

  // remove duplicates
  return Array.from(new Set(labelsFound))
}

async function fetchWithRateLimit(filepath: string): Promise<Commit[]> {
  const url = new URL(GITHUB_COMMITS_URL)
  url.searchParams.set("path", filepath)
  url.searchParams.set("sha", "master")

  const gitHubToken = process.env.GITHUB_TOKEN_READ_ONLY

  // If no token available, return empty array
  if (!gitHubToken) return []

  const response = await fetch(url.href, {
    headers: { Authorization: `token ${gitHubToken}` },
  })

  if (
    response.status === 403 &&
    response.headers.get("X-RateLimit-Remaining") === "0"
  ) {
    console.warn(`GitHub API rate limit exceeded for ${filepath}. Skipping.`)
    return []
  }

  if (!response.ok) {
    console.warn(`GitHub API error for ${filepath}: ${response.statusText}`)
    return []
  }

  const json = await response.json()
  if (!Array.isArray(json)) {
    console.warn("Unexpected response from GitHub API", json)
    return []
  }
  return json
}

/** Email addresses (or substrings) that identify AI agent co-authors */
const EXCLUDED_EMAILS = [
  "noreply@anthropic.com",
  "copilot@github.com",
  "49699333+dependabot[bot]@users.noreply.github.com",
  "actions@github.com",
  "github-actions[bot]@users.noreply.github.com",
  "noreply@github.com",
]

/** GitHub logins (exact match) that should be excluded */
const EXCLUDED_LOGINS = [
  "dependabot[bot]",
  "github-actions[bot]",
  "allcontributors[bot]",
  "netlify[bot]",
  "crowdin-bot",
  "eth-bot",
  "ethereumoptimism-bot",
  "coderabbitai[bot]",
]

/** Name patterns (case-insensitive substring match) for AI agent co-authors */
const EXCLUDED_NAME_PATTERNS = [
  "claude",
  "copilot",
  "gpt",
  "chatgpt",
  "openai",
  "cursor",
  "codeium",
  "tabnine",
  "amazon q",
  "cody",
  "gemini",
  "coderabbit",
]

/**
 * Extract GitHub login from a noreply email address.
 * Handles both formats:
 *   - "username@users.noreply.github.com"
 *   - "12345678+username@users.noreply.github.com"
 * Returns null for non-noreply emails.
 */
const extractLoginFromNoreplyEmail = (email: string): string | null => {
  const match = email.match(/^(?:\d+\+)?([^@]+)@users\.noreply\.github\.com$/)
  return match ? match[1] : null
}

/**
 * Parse co-author trailers from a commit message.
 * Matches lines like: "Co-authored-by: Name <email>"
 * Returns FileContributor entries for any co-authors with resolvable
 * GitHub logins (via noreply email addresses).
 */
const parseCoAuthors = (
  message: string,
  commitDate: string
): FileContributor[] => {
  const coAuthorPattern = /^co-authored-by:\s*(.+?)\s*<([^>]+)>/gim
  const coAuthors: FileContributor[] = []
  let match

  while ((match = coAuthorPattern.exec(message)) !== null) {
    const name = match[1].trim()
    const email = match[2].trim()

    // Skip excluded emails
    if (
      EXCLUDED_EMAILS.some((excluded) =>
        email.toLowerCase().includes(excluded.toLowerCase())
      )
    ) {
      continue
    }

    // Skip excluded name patterns (catches AI agents)
    if (
      EXCLUDED_NAME_PATTERNS.some((pattern) =>
        name.toLowerCase().includes(pattern.toLowerCase())
      )
    ) {
      continue
    }

    // Resolve GitHub login from noreply email
    const login = extractLoginFromNoreplyEmail(email)
    if (!login) continue

    // Skip excluded logins
    if (
      EXCLUDED_LOGINS.some(
        (excluded) => excluded.toLowerCase() === login.toLowerCase()
      )
    ) {
      continue
    }

    coAuthors.push({
      login,
      avatar_url: `https://avatars.githubusercontent.com/${login}`,
      html_url: `https://github.com/${login}`,
      date: commitDate,
    })
  }

  return coAuthors
}

/** Check if a primary commit author should be excluded */
const isExcludedContributor = (login: string): boolean =>
  EXCLUDED_LOGINS.some(
    (excluded) => excluded.toLowerCase() === login.toLowerCase()
  )

// Fetch commit history and save it to a JSON file
export const fetchAndCacheGitHubContributors = async (
  filepath: string,
  cache: CommitHistory
) => {
  // First, check cache for existing commit history for English version (despite locale)
  if (cache[filepath]) return cache[filepath]

  // Fetch and save commit history for file
  const history = (await fetchWithRateLimit(filepath)) || []

  const legacyHistory =
    (await fetchWithRateLimit(
      filepath.replace(CONTENT_DIR, OLD_CONTENT_DIR)
    )) || []

  // Transform commitHistory: include both primary authors and co-authors
  const contributors = [...history, ...legacyHistory]
    .filter(({ author }) => !!author)
    .flatMap((contribution) => {
      const { login, avatar_url, html_url } = contribution.author
      const { date } = contribution.commit.author

      const primary: FileContributor[] = isExcludedContributor(login)
        ? []
        : [{ login, avatar_url, html_url, date }]

      const coAuthors = parseCoAuthors(contribution.commit.message, date)

      return [...primary, ...coAuthors]
    })

  // Remove duplicates from same login
  const uniqueContributors = contributors.filter(
    (contributor, index, self) =>
      index === self.findIndex((t) => t.login === contributor.login)
  )

  // Amend to cache
  cache[filepath] = uniqueContributors

  return uniqueContributors
}
