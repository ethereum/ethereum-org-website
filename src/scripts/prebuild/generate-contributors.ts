/**
 * Pre-build Script: Generate Content Contributors
 *
 * This script runs a single `git log` pass to extract all contributor data
 * for markdown files in public/content/. This eliminates ~150,000 per-page
 * git commands during the build, reducing build time significantly.
 *
 * Output: src/data/content-contributors.json
 *
 * Usage: pnpm prebuild:contributors
 */

import { execSync } from "child_process"
import crypto from "crypto"
import fs from "fs"
import path from "path"

interface FileContributor {
  login: string
  avatar_url: string
  html_url: string
  date: string
}

interface ContributorEntry {
  contributors: FileContributor[]
  lastUpdated: string
}

type ContentContributors = Record<string, ContributorEntry>

// Email to GitHub username cache (built from commit data)
const emailToUsernameCache = new Map<string, string>()

/**
 * Generate Gravatar URL from email
 */
function getGravatarUrl(email: string): string {
  const hash = crypto
    .createHash("md5")
    .update(email.toLowerCase().trim())
    .digest("hex")
  return `https://www.gravatar.com/avatar/${hash}?d=identicon&s=48`
}

/**
 * Create a GitHub profile URL from username or email
 */
function getGitHubUrl(username: string, email: string): string {
  // If we have a username, use it
  if (username && username !== "unknown") {
    return `https://github.com/${username}`
  }

  // Try to extract username from GitHub noreply email
  const noreplyMatch = email.match(
    /^(\d+\+)?([^@]+)@users\.noreply\.github\.com$/
  )
  if (noreplyMatch) {
    return `https://github.com/${noreplyMatch[2]}`
  }

  // Fallback: search by email (won't be a direct link)
  return `https://github.com/search?q=${encodeURIComponent(email)}&type=users`
}

/**
 * Extract username from email or author name
 */
function extractUsername(authorName: string, email: string): string {
  // Check cache first
  if (emailToUsernameCache.has(email)) {
    return emailToUsernameCache.get(email)!
  }

  // GitHub noreply email pattern
  const noreplyMatch = email.match(
    /^(\d+\+)?([^@]+)@users\.noreply\.github\.com$/
  )
  if (noreplyMatch) {
    const username = noreplyMatch[2]
    emailToUsernameCache.set(email, username)
    return username
  }

  // Use author name as fallback (may not be a valid username)
  return authorName.replace(/\s+/g, "")
}

/**
 * Get GitHub avatar URL
 */
function getAvatarUrl(_: string, email: string): string {
  // GitHub noreply email - we can use GitHub avatar
  const noreplyMatch = email.match(
    /^(\d+\+)?([^@]+)@users\.noreply\.github\.com$/
  )
  if (noreplyMatch) {
    return `https://github.com/${noreplyMatch[2]}.png?size=48`
  }

  // For other emails, use Gravatar
  return getGravatarUrl(email)
}

/**
 * Parse git log output and build contributor data
 */
function parseGitLog(output: string): ContentContributors {
  const contributors: ContentContributors = {}
  const lines = output.split("\n")

  let currentCommit: {
    hash: string
    authorName: string
    email: string
    date: string
  } | null = null

  for (const line of lines) {
    // Commit line format: hash|authorName|email|date
    if (line.includes("|")) {
      const parts = line.split("|")
      if (parts.length >= 4) {
        currentCommit = {
          hash: parts[0],
          authorName: parts[1],
          email: parts[2],
          date: parts[3],
        }
      }
    } else if (line.trim() && currentCommit) {
      // File path line
      const filePath = line.trim()

      // Only process markdown files in public/content/
      if (
        !filePath.startsWith("public/content/") ||
        !filePath.endsWith(".md")
      ) {
        continue
      }

      // Initialize entry if not exists
      if (!contributors[filePath]) {
        contributors[filePath] = {
          contributors: [],
          lastUpdated: currentCommit.date,
        }
      }

      // Check if this contributor already exists for this file
      const existingContributor = contributors[filePath].contributors.find(
        (c) =>
          c.login ===
          extractUsername(currentCommit!.authorName, currentCommit!.email)
      )

      if (!existingContributor) {
        const username = extractUsername(
          currentCommit.authorName,
          currentCommit.email
        )
        contributors[filePath].contributors.push({
          login: username,
          avatar_url: getAvatarUrl(username, currentCommit.email),
          html_url: getGitHubUrl(username, currentCommit.email),
          date: currentCommit.date,
        })
      }

      // Update lastUpdated if this commit is more recent
      if (currentCommit.date > contributors[filePath].lastUpdated) {
        contributors[filePath].lastUpdated = currentCommit.date
      }
    }
  }

  return contributors
}

/**
 * Run git log and generate contributor data
 */
function generateContributorData(): ContentContributors {
  console.log("Generating contributor data from git history...")

  // Single git log command to get all contributors for all markdown files
  // Format: hash|authorName|email|date followed by file names
  const gitCommand = `git log --name-only --format="%H|%an|%ae|%aI" -- "public/content/**/*.md"`

  try {
    const output = execSync(gitCommand, {
      encoding: "utf-8",
      maxBuffer: 100 * 1024 * 1024, // 100MB buffer for large repos
      cwd: process.cwd(),
    })

    const contributors = parseGitLog(output)

    // Sort contributors by date (most recent first) for each file
    for (const filePath of Object.keys(contributors)) {
      contributors[filePath].contributors.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      )
    }

    return contributors
  } catch (error) {
    console.error("Error running git log:", error)
    return {}
  }
}

/**
 * Main entry point
 */
async function main() {
  const startTime = Date.now()

  const contributors = generateContributorData()

  const fileCount = Object.keys(contributors).length
  const contributorCount = Object.values(contributors).reduce(
    (sum, entry) => sum + entry.contributors.length,
    0
  )

  console.log(
    `Found ${fileCount} files with ${contributorCount} total contributor entries`
  )

  // Write to JSON file
  const outputPath = path.join(
    process.cwd(),
    "src/data/content-contributors.json"
  )
  fs.writeFileSync(outputPath, JSON.stringify(contributors, null, 2))

  const duration = ((Date.now() - startTime) / 1000).toFixed(2)
  console.log(`Wrote contributor data to ${outputPath} in ${duration}s`)
}

main().catch(console.error)
