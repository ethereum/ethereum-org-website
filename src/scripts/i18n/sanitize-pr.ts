/**
 * Run the post-import sanitizer on ONLY the files changed in a specific PR.
 *
 * Usage:
 *   npx ts-node -O '{"module":"commonjs"}' src/scripts/i18n/sanitize-pr.ts <PR_NUMBER>
 *
 * Requires: `gh` CLI authenticated and available in PATH.
 *
 * Fetches the file list from the GitHub API (paginated), filters to
 * translation files (.md and .json), and passes them to runSanitizer()
 * with empty content so the sanitizer reads from disk and writes fixes back.
 */

import { execSync } from "child_process"
import * as path from "path"

import { runSanitizer } from "./post_import_sanitize"

const ROOT = process.cwd()

function getPRFiles(prNumber: string): string[] {
  const cmd = `gh api repos/ethereum/ethereum-org-website/pulls/${prNumber}/files --paginate -q '.[].filename'`
  const output = execSync(cmd, {
    encoding: "utf8",
    maxBuffer: 10 * 1024 * 1024,
  })
  return output.trim().split("\n").filter(Boolean)
}

async function main() {
  const prNumber = process.argv[2]
  if (!prNumber) {
    console.error("Usage: sanitize-pr.ts <PR_NUMBER>")
    process.exit(1)
  }

  console.log(`[sanitize-pr] Fetching file list for PR #${prNumber}...`)
  const allFiles = getPRFiles(prNumber)

  // Filter to translation files only (md + json under translations/ or intl/)
  const translationFiles = allFiles.filter(
    (f) =>
      (f.includes("/translations/") || f.includes("/intl/")) &&
      (f.endsWith(".md") || f.endsWith(".json"))
  )

  if (translationFiles.length === 0) {
    console.log("[sanitize-pr] No translation files found in PR diff.")
    process.exit(0)
  }

  console.log(
    `[sanitize-pr] Found ${translationFiles.length} translation files in PR #${prNumber}`
  )

  // Convert to absolute paths with empty content (sanitizer reads from disk)
  const filesWithContent = translationFiles.map((relPath) => ({
    path: path.join(ROOT, relPath),
    content: "",
  }))

  const result = await runSanitizer(filesWithContent)

  console.log(`\n[sanitize-pr] Done.`)
  console.log(
    `  Markdown: ${result.markdown.scanned} scanned, ${result.markdown.fixed} fixed`
  )
  console.log(
    `  JSON: ${result.json.scanned} scanned, ${result.json.fixed} fixed`
  )

  if (result.orphanWarnings && result.orphanWarnings.length > 0) {
    console.log(`  Orphan warnings: ${result.orphanWarnings.length}`)
  }
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
