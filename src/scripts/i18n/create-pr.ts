#!/usr/bin/env npx ts-node
/**
 * create-pr.ts
 *
 * Creates a GitHub PR with processed translations.
 * Collects all translation files and commits them in a single PR.
 *
 * Usage:
 *   npx ts-node src/scripts/i18n/create-pr.ts [translations-dir]
 *   npx ts-node src/scripts/i18n/create-pr.ts processed
 *
 * Environment:
 *   GITHUB_API_KEY or I18N_GITHUB_API_KEY - GitHub API token
 *   GITHUB_REPOSITORY - Repository (default: ethereum/ethereum-org-website)
 *   BASE_BRANCH - Base branch for PR (default: dev)
 *   LANGUAGES - JSON array of languages processed (for PR description)
 */

import { existsSync, readdirSync, readFileSync, statSync } from "fs"
import path from "path"

// Language code mapping
import i18nConfig from "../../../i18n.config.json"

import { loadEnv } from "./lib/env"
import { githubClient } from "./lib/github-client"

const crowdinToInternal: Record<string, string> = {}
const internalToName: Record<string, string> = {}
for (const { crowdinCode, code, name } of i18nConfig) {
  crowdinToInternal[crowdinCode] = code
  internalToName[code] = name
}

/**
 * Generate a branch name with timestamp.
 */
function generateBranchName(): string {
  const ts = new Date().toISOString().replace(/\..*$/, "").replace(/[:]/g, "-")
  return `i18n/import/${ts}`
}

/**
 * Collect all files from a directory recursively.
 */
function collectFiles(dir: string, basePath: string = ""): Map<string, Buffer> {
  const files = new Map<string, Buffer>()

  function walkDir(currentDir: string, relativePath: string) {
    const entries = readdirSync(currentDir)

    for (const entry of entries) {
      const fullPath = path.join(currentDir, entry)
      const entryRelPath = path.join(relativePath, entry)
      const stat = statSync(fullPath)

      if (stat.isDirectory()) {
        walkDir(fullPath, entryRelPath)
      } else if (
        entry.endsWith(".md") ||
        entry.endsWith(".json") ||
        entry.endsWith(".mdx")
      ) {
        // Skip report files
        if (entry.includes("report")) continue

        const content = readFileSync(fullPath)
        files.set(entryRelPath, content)
      }
    }
  }

  walkDir(dir, basePath)
  return files
}

/**
 * Map translation paths to repository paths.
 * Crowdin exports with specific structure that needs mapping.
 */
function mapToRepoPaths(
  files: Map<string, Buffer>,
  language: string
): Map<string, Buffer> {
  const internalCode = crowdinToInternal[language] || language
  const mapped = new Map<string, Buffer>()

  for (const [filePath, content] of files) {
    let repoPath = filePath

    // Handle JSON files: src/intl/en/*.json -> src/intl/{lang}/*.json
    if (filePath.includes("src/intl/en/")) {
      repoPath = filePath.replace("src/intl/en/", `src/intl/${internalCode}/`)
    } else if (filePath.startsWith("intl/en/")) {
      repoPath = filePath.replace("intl/en/", `src/intl/${internalCode}/`)
    }
    // Handle markdown: public/content/*.md -> public/content/translations/{lang}/*.md
    else if (
      filePath.includes("public/content/") &&
      !filePath.includes("translations/")
    ) {
      const rel = filePath.replace(/^.*public\/content\//, "")
      repoPath = `public/content/translations/${internalCode}/${rel}`
    } else if (
      filePath.startsWith("content/") &&
      !filePath.includes("translations/")
    ) {
      repoPath = `public/content/translations/${internalCode}/${filePath.replace("content/", "")}`
    }
    // Already in translations folder - update language
    else if (filePath.includes("translations/")) {
      // Replace any existing language code with the target
      repoPath = filePath.replace(
        /translations\/[a-z-]+\//,
        `translations/${internalCode}/`
      )
    }

    mapped.set(repoPath, content)
  }

  return mapped
}

/**
 * Generate PR body with summary.
 */
function generatePRBody(
  languages: string[],
  fileCount: number,
  sanitizeReports: string[]
): string {
  const languageList = languages
    .map((lang) => {
      const internal = crowdinToInternal[lang] || lang
      const name = internalToName[internal] || lang
      return `- ${name} (${internal})`
    })
    .join("\n")

  let body = `## i18n: Automated Crowdin Translation Import

### Languages
${languageList}

### Summary
- **Files updated**: ${fileCount}
- **Languages**: ${languages.length}

### Process
1. Pre-translated using Crowdin AI
2. Sanitized for common issues (translated URLs, path errors)
3. Validated markdown syntax

`

  // Add sanitization issues if any
  if (sanitizeReports.length > 0) {
    body += `### Sanitization Notes
The following issues were detected and auto-fixed where possible:

`
    for (const report of sanitizeReports) {
      body += report + "\n"
    }
  }

  body += `
---
🤖 Generated with [Claude Code](https://claude.com/claude-code)
`

  return body
}

/**
 * Load sanitization reports from processed directories.
 */
function loadSanitizeReports(baseDir: string): string[] {
  const reports: string[] = []

  if (!existsSync(baseDir)) return reports

  const entries = readdirSync(baseDir)
  for (const entry of entries) {
    const reportPath = path.join(baseDir, entry, "sanitize-report.json")
    if (existsSync(reportPath)) {
      try {
        const report = JSON.parse(readFileSync(reportPath, "utf-8"))
        if (report.filesWithIssues > 0) {
          reports.push(
            `**${entry}**: ${report.filesWithIssues} files with issues, ${report.filesModified} auto-fixed`
          )
        }
      } catch {
        // Skip invalid reports
      }
    }
  }

  return reports
}

async function main() {
  console.log("[PR] Starting PR creation...")

  // Load environment
  const env = loadEnv()
  console.log(`[PR] Repository: ${env.githubOwner}/${env.githubRepo}`)
  console.log(`[PR] Base branch: ${env.baseBranch}`)

  // Parse arguments
  const args = process.argv.slice(2)
  const inputDir = args[0] || "processed"

  if (!existsSync(inputDir)) {
    console.error(`[PR] Input directory not found: ${inputDir}`)
    process.exit(1)
  }

  // Determine languages from directory structure or environment
  let languages: string[] = []
  try {
    const languagesEnv = process.env.LANGUAGES
    if (languagesEnv) {
      languages = JSON.parse(languagesEnv)
    }
  } catch {
    // Fall back to directory listing
  }

  if (languages.length === 0) {
    // Try to detect from directory structure
    const entries = readdirSync(inputDir)
    for (const entry of entries) {
      const entryPath = path.join(inputDir, entry)
      if (statSync(entryPath).isDirectory() && !entry.startsWith(".")) {
        // Check if this looks like a language code
        if (entry.match(/^[a-z]{2}(-[A-Z]{2})?$/)) {
          languages.push(entry)
        }
      }
    }
  }

  // If still no languages, use target from env
  if (languages.length === 0) {
    languages = env.targetLanguages
  }

  console.log(`[PR] Languages: ${languages.join(", ")}`)

  // Collect all files
  console.log("[PR] Collecting translation files...")
  const allFiles = new Map<string, Buffer>()

  for (const lang of languages) {
    const langDir = path.join(inputDir, crowdinToInternal[lang] || lang)
    if (existsSync(langDir)) {
      const files = collectFiles(langDir)
      const mapped = mapToRepoPaths(files, lang)

      for (const [filePath, content] of mapped) {
        allFiles.set(filePath, content)
      }

      console.log(`[PR] Collected ${files.size} files for ${lang}`)
    } else {
      // Try direct collection if no language subdirectory
      const files = collectFiles(inputDir)
      const mapped = mapToRepoPaths(files, lang)

      for (const [filePath, content] of mapped) {
        allFiles.set(filePath, content)
      }
      break // Only process once if no subdirectories
    }
  }

  console.log(`[PR] Total files: ${allFiles.size}`)

  if (allFiles.size === 0) {
    console.error("[PR] No files to commit!")
    process.exit(1)
  }

  // Load sanitization reports
  const sanitizeReports = loadSanitizeReports(inputDir)

  // Generate branch name
  const branchName = generateBranchName()
  console.log(`[PR] Branch: ${branchName}`)

  // Create branch
  await githubClient.createBranch(branchName, env.baseBranch)

  // Commit files (in batches to avoid API limits)
  console.log("[PR] Committing files...")
  const fileEntries = [...allFiles.entries()]
  const batchSize = 50

  for (let i = 0; i < fileEntries.length; i += batchSize) {
    const batch = fileEntries.slice(i, i + batchSize)
    const batchNum = Math.floor(i / batchSize) + 1
    const totalBatches = Math.ceil(fileEntries.length / batchSize)

    console.log(
      `[PR] Committing batch ${batchNum}/${totalBatches} (${batch.length} files)`
    )

    for (const [filePath, content] of batch) {
      await githubClient.createOrUpdateFile(
        filePath,
        content,
        branchName,
        `update(i18n): ${filePath}`
      )
    }
  }

  // Generate PR body
  const prBody = generatePRBody(languages, allFiles.size, sanitizeReports)

  // Create PR
  console.log("[PR] Creating pull request...")
  const pr = await githubClient.createPullRequest(
    branchName,
    `i18n: Import translations for ${languages.map((l) => crowdinToInternal[l] || l).join(", ")}`,
    prBody,
    env.baseBranch
  )

  console.log(`\n[PR] ✓ Pull request created!`)
  console.log(`[PR] URL: ${pr.html_url}`)
  console.log(`[PR] Number: #${pr.number}`)
}

main().catch((error) => {
  console.error("[PR] Fatal error:", error)
  process.exit(1)
})
