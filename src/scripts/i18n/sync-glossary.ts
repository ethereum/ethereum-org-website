/**
 * Glossary synchronization orchestrator
 *
 * Workflow:
 * 1. Export existing Crowdin glossaries/TMs
 * 2. Check if content has changed (compare hashes)
 * 3. If changed, save timestamped backup to .crowdin-backups/
 * 4. Fetch latest glossary from Supabase
 * 5. Import updated glossary to Crowdin
 * 6. Create Git branch and PR with backup files
 */

import {
  exportGlossary,
  exportTranslationMemory,
  importGlossary,
  listGlossaries,
  listTranslationMemories,
} from "./lib/crowdin/glossary"
import { postCreateBranchFrom } from "./lib/github/branches"
import { putCommitFile } from "./lib/github/commits"
import { postPullRequest } from "./lib/github/pull-requests"
import {
  getAllBackupPaths,
  hasContentChanged,
  saveBackup,
} from "./lib/glossary/backup"
import {
  fetchGlossaryForLanguage,
  formatGlossaryAsTBX,
} from "./lib/glossary/supabase"
import { mapCrowdinCodeToInternal } from "./lib/utils/mapping"
import { config } from "./config"

const SUPABASE_URL = process.env.SUPABASE_URL || ""
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || ""

if (!SUPABASE_SERVICE_ROLE_KEY) {
  console.error("[GLOSSARY-SYNC] Missing SUPABASE_SERVICE_ROLE_KEY")
  throw new Error("SUPABASE_SERVICE_ROLE_KEY environment variable is required")
}

const MIN_VOTES = parseInt(process.env.GLOSSARY_MIN_VOTES || "2", 10)
const SKIP_BACKUP_PR = process.env.SKIP_GLOSSARY_BACKUP_PR === "true"

/**
 * Main sync function
 */
export async function syncGlossary(): Promise<{
  backupBranch?: string
  backupPrUrl?: string
  updatedGlossaries: string[]
}> {
  console.log("\n[GLOSSARY-SYNC] ========== Starting Glossary Sync ==========")
  console.log(`[GLOSSARY-SYNC] Supabase URL: ${SUPABASE_URL}`)
  console.log(`[GLOSSARY-SYNC] Min votes: ${MIN_VOTES}`)
  console.log(`[GLOSSARY-SYNC] Skip backup PR: ${SKIP_BACKUP_PR}`)

  const backupPaths: string[] = []
  const updatedGlossaries: string[] = []
  let backupNeeded = false

  // Step 1: Export and backup existing Crowdin glossaries
  console.log(
    "\n[GLOSSARY-SYNC] Step 1: Backing up existing Crowdin glossaries"
  )
  try {
    const glossaries = await listGlossaries()
    console.log(
      `[GLOSSARY-SYNC] Found ${glossaries.length} existing glossaries`
    )

    for (const glossary of glossaries) {
      console.log(
        `[GLOSSARY-SYNC] Exporting glossary: ${glossary.name} (ID: ${glossary.id})`
      )
      const content = await exportGlossary(glossary.id)

      if (hasContentChanged(glossary.name, content, "glossary")) {
        const backupPath = saveBackup(glossary.name, content, "glossary", "tbx")
        backupPaths.push(backupPath)
        backupNeeded = true
      }
    }
  } catch (error) {
    console.warn(
      "[GLOSSARY-SYNC] Failed to backup glossaries (continuing anyway):",
      error
    )
  }

  // Step 2: Export and backup Translation Memories (optional)
  console.log("\n[GLOSSARY-SYNC] Step 2: Backing up Translation Memories")
  try {
    const tms = await listTranslationMemories()
    console.log(`[GLOSSARY-SYNC] Found ${tms.length} TMs`)

    for (const tm of tms) {
      console.log(`[GLOSSARY-SYNC] Exporting TM: ${tm.name} (ID: ${tm.id})`)
      const content = await exportTranslationMemory(tm.id)

      if (hasContentChanged(tm.name, content, "tm")) {
        const backupPath = saveBackup(tm.name, content, "tm", "tmx")
        backupPaths.push(backupPath)
        backupNeeded = true
      }
    }
  } catch (error) {
    console.warn(
      "[GLOSSARY-SYNC] Failed to backup TMs (continuing anyway):",
      error
    )
  }

  // Step 3: Fetch latest glossary from Supabase for each language
  console.log("\n[GLOSSARY-SYNC] Step 3: Fetching glossary from Supabase")
  const languageCodes = config.allCrowdinCodes
  console.log(`[GLOSSARY-SYNC] Target languages: ${languageCodes.join(", ")}`)

  for (const crowdinCode of languageCodes) {
    try {
      // Map Crowdin code to internal code for Supabase query
      const internalCode = mapCrowdinCodeToInternal(crowdinCode)
      console.log(
        `\n[GLOSSARY-SYNC] Processing language: ${crowdinCode} (internal: ${internalCode})`
      )

      const entries = await fetchGlossaryForLanguage(
        SUPABASE_URL,
        SUPABASE_SERVICE_ROLE_KEY,
        internalCode,
        MIN_VOTES
      )

      if (entries.length === 0) {
        console.log(
          `[GLOSSARY-SYNC] No glossary entries found for ${crowdinCode}`
        )
        continue
      }

      console.log(
        `[GLOSSARY-SYNC] Found ${entries.length} glossary entries for ${crowdinCode}`
      )

      // Step 4: Import to Crowdin
      const tbxContent = formatGlossaryAsTBX(entries, "en", crowdinCode)
      const glossaryName = `Ethereum.org Community (${crowdinCode})`

      console.log(`[GLOSSARY-SYNC] Importing glossary: ${glossaryName}`)
      await importGlossary(glossaryName, crowdinCode, tbxContent)

      updatedGlossaries.push(crowdinCode)
      console.log(
        `[GLOSSARY-SYNC] ✓ Successfully updated glossary for ${crowdinCode}`
      )
    } catch (error) {
      console.error(
        `[GLOSSARY-SYNC] Failed to update glossary for ${crowdinCode}:`,
        error
      )
      // Continue with other languages
    }
  }

  // Step 5: Create backup PR if needed
  let backupBranch: string | undefined
  let backupPrUrl: string | undefined

  if (backupNeeded && !SKIP_BACKUP_PR) {
    console.log("\n[GLOSSARY-SYNC] Step 5: Creating backup PR")
    try {
      const result = await createBackupPR()
      backupBranch = result.branch
      backupPrUrl = result.prUrl
    } catch (error) {
      console.error("[GLOSSARY-SYNC] Failed to create backup PR:", error)
      console.error(
        "[GLOSSARY-SYNC] Backups are saved locally but not committed"
      )
    }
  } else if (backupNeeded) {
    console.log(
      "\n[GLOSSARY-SYNC] Backups saved locally (PR creation skipped via SKIP_GLOSSARY_BACKUP_PR)"
    )
  } else {
    console.log("\n[GLOSSARY-SYNC] No backups needed (no changes detected)")
  }

  console.log("\n[GLOSSARY-SYNC] ========== Sync Complete ==========")
  console.log(`[GLOSSARY-SYNC] Updated glossaries: ${updatedGlossaries.length}`)
  console.log(`[GLOSSARY-SYNC] Languages: ${updatedGlossaries.join(", ")}`)
  if (backupBranch) {
    console.log(`[GLOSSARY-SYNC] Backup branch: ${backupBranch}`)
  }
  if (backupPrUrl) {
    console.log(`[GLOSSARY-SYNC] Backup PR: ${backupPrUrl}`)
  }

  return {
    backupBranch,
    backupPrUrl,
    updatedGlossaries,
  }
}

/**
 * Create a Git branch and PR with backup files
 */
async function createBackupPR(): Promise<{ branch: string; prUrl: string }> {
  const timestamp = new Date().toISOString().split("T")[0]
  const branchName = `i18n-glossary-backup-${timestamp}`

  console.log(`[GLOSSARY-SYNC] Creating branch: ${branchName}`)
  await postCreateBranchFrom(config.baseBranch, branchName)

  // Get all backup files (including newly created ones)
  const allBackupPaths = getAllBackupPaths()
  console.log(
    `[GLOSSARY-SYNC] Committing ${allBackupPaths.length} backup files`
  )

  // Commit each backup file
  const fs = await import("fs")
  const path = await import("path")

  for (const relativePath of allBackupPaths) {
    console.log(`[GLOSSARY-SYNC] Committing: ${relativePath}`)
    const absolutePath = path.join(process.cwd(), relativePath)
    const buffer = fs.readFileSync(absolutePath)
    await putCommitFile(buffer, relativePath, branchName)
  }

  // Create PR
  console.log("[GLOSSARY-SYNC] Creating pull request")
  const prTitle = `🗂️ Crowdin Glossary/TM Backup - ${timestamp}`
  const prBody = `# Crowdin Glossary and Translation Memory Backup

This automated PR backs up Crowdin glossary and translation memory exports before syncing with the Supabase community glossary.

## Backup Details
- **Date**: ${new Date().toISOString()}
- **Files**: ${allBackupPaths.length} total backups
- **Glossary backups**: ${allBackupPaths.filter((p) => p.includes("glossary")).length}
- **TM backups**: ${allBackupPaths.filter((p) => p.includes("tm")).length}

## Purpose
These backups enable easy reversion if the Supabase glossary sync introduces issues. Each backup is timestamped and content-hashed for traceability.

## Next Steps
- Review the backup files
- Merge to preserve the backup history
- Monitor the main translation workflow for any glossary-related issues

**Auto-generated by the i18n glossary sync workflow**
`

  const prUrl = await postPullRequest(branchName, prTitle, prBody)
  console.log(`[GLOSSARY-SYNC] ✓ Created PR: ${prUrl}`)

  return { branch: branchName, prUrl }
}

// CLI execution
if (require.main === module) {
  syncGlossary()
    .then((result) => {
      console.log("\n[GLOSSARY-SYNC] Success!")
      if (result.backupPrUrl) {
        console.log(`[GLOSSARY-SYNC] Backup PR: ${result.backupPrUrl}`)
      }
      process.exit(0)
    })
    .catch((error) => {
      console.error("\n[GLOSSARY-SYNC] Fatal error:", error)
      process.exit(1)
    })
}
