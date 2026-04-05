/**
 * Incremental translation pipeline entry point.
 *
 * Detects what changed in English since the last translation, then:
 * - Inert changes (URLs, code, paths): propagated deterministically
 * - Translatable changes (prose): sent to Gemini section-by-section
 * - Structural changes (added/removed): handled accordingly
 *
 * Environment variables:
 *   GEMINI_API_KEY          - Gemini API key (required for prose changes)
 *   I18N_GITHUB_API_KEY     - GitHub API key (required)
 *   TARGET_PATH             - Comma-separated English file paths (required)
 *   TARGET_LANGUAGES        - Comma-separated language codes (blank = all)
 *   BASE_BRANCH             - GitHub base branch (default: dev)
 *   GEMINI_CONCURRENCY      - Max parallel requests (default: 3)
 *   SKIP_PR_CREATION        - Skip PR creation (default: false)
 *   VERBOSE                 - Enable verbose logging (default: false)
 *   DRY_RUN                 - Print drift report only (default: false)
 */

import * as fs from "fs"
import * as path from "path"

import i18nConfig from "../../../i18n.config.json"

import { isGeminiAvailable } from "./lib/ai/gemini"
import { filterGlossaryFlat } from "./lib/ai/glossary-lookup"
import {
  buildJsonManifest,
  buildMarkdownManifest,
  detectDrift,
  hasEnglishChanged,
  type LocaleTranslationManifest,
} from "./lib/ai/manifest-adapter"
import { applyInertChanges, detectInertChanges } from "./lib/ai/propagate-inert"
import {
  createBranchFromSha,
  createBranchName,
  getBranchObject,
} from "./lib/github/branches"
import { getDestinationFromPath, SharedCommitter } from "./lib/github/commits"
import { logSection } from "./lib/workflows/utils"
import { config } from "./config"

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface FileContext {
  path: string
  content: string
  type: "markdown" | "json"
}

interface DriftReport {
  file: string
  locale: string
  inertCount: number
  translatableCount: number
  addedCount: number
  removedCount: number
  reorderedCount: number
  unchanged: boolean
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main() {
  const startTime = Date.now()
  logSection("Incremental Translation Pipeline")

  const verbose = process.env.VERBOSE === "true"
  const dryRun = process.env.DRY_RUN === "true"
  const targetPath = process.env.TARGET_PATH
  const targetLanguages = process.env.TARGET_LANGUAGES
    ? process.env.TARGET_LANGUAGES.split(",").map((s) => s.trim())
    : i18nConfig
        .map((l: { code: string }) => l.code)
        .filter((c: string) => c !== "en")

  if (!targetPath) {
    console.error("[ERROR] TARGET_PATH is required for incremental mode")
    process.exit(1)
  }

  if (!process.env.I18N_GITHUB_API_KEY) {
    console.error("[ERROR] I18N_GITHUB_API_KEY is not set")
    process.exit(1)
  }

  const filePaths = targetPath.split(",").map((s) => s.trim())

  // Phase 1: Initialize
  logSection("Phase 1: Initialize")

  const baseBranch = process.env.BASE_BRANCH || config.baseBranch
  const branchSuffix =
    targetLanguages.length === 1 ? targetLanguages[0] : "incremental"
  const branchName = createBranchName(branchSuffix)
  const baseBranchObj = await getBranchObject(baseBranch)
  await createBranchFromSha(branchName, baseBranchObj.sha)

  console.log(`[main] Branch: ${branchName}`)
  console.log(`[main] Files: ${filePaths.join(", ")}`)
  console.log(`[main] Languages: ${targetLanguages.join(", ")}`)
  console.log(`[main] Dry run: ${dryRun}`)

  const committer = new SharedCommitter(branchName)

  // Load English files
  const englishFiles: FileContext[] = []
  for (const fp of filePaths) {
    const fullPath = path.resolve(fp)

    const content = fs.readFileSync(fullPath, "utf-8")
    const type = fp.endsWith(".json") ? "json" : "markdown"
    englishFiles.push({ path: fp, content, type })
  }

  // Load glossary
  const glossaryDataDir = path.join(
    process.cwd(),
    "src/scripts/i18n/data/glossary"
  )
  const translationsDir = path.join(glossaryDataDir, "translations")

  // Phase 2: Drift Detection
  logSection("Phase 2: Drift Detection")

  const driftReports: DriftReport[] = []
  const fileLanguageTasks: Array<{
    file: FileContext
    locale: string
    drift: ReturnType<typeof detectDrift>
    sourceManifestJson: string
    translationManifest: LocaleTranslationManifest | null
    localeContent: string
  }> = []

  for (const file of englishFiles) {
    for (const locale of targetLanguages) {
      const destPath = getDestinationFromPath(file.path, locale)

      const rootDir = process.cwd()

      // Determine manifest paths
      let sourceManifestPath: string
      let translationManifestPath: string
      let localePath: string

      if (file.type === "markdown") {
        const dir = path.dirname(destPath)
        sourceManifestPath = path.join(rootDir, dir, ".manifest-source.json")
        translationManifestPath = path.join(
          rootDir,
          dir,
          ".manifest-translation.json"
        )
        localePath = path.join(rootDir, destPath)
      } else {
        sourceManifestPath = path.join(
          rootDir,
          `src/intl/${locale}/.manifest-source.json`
        )
        translationManifestPath = "" // JSON doesn't have translation manifests yet
        localePath = path.join(
          rootDir,
          `src/intl/${locale}/${path.basename(file.path)}`
        )
      }

      // Check if locale file and manifests exist
      if (!fs.existsSync(localePath)) {
        console.log(
          `  [${locale}] ${file.path}: no translation exists, needs full translation`
        )
        driftReports.push({
          file: file.path,
          locale,
          inertCount: 0,
          translatableCount: 0,
          addedCount: 0,
          removedCount: 0,
          reorderedCount: 0,
          unchanged: false,
        })
        continue
      }

      if (!fs.existsSync(sourceManifestPath)) {
        console.log(
          `  [${locale}] ${file.path}: no source manifest, needs full translation`
        )
        continue
      }

      const sourceManifestJson = fs.readFileSync(sourceManifestPath, "utf-8")
      const localeContent = fs.readFileSync(localePath, "utf-8")

      // Quick check
      if (!hasEnglishChanged(file.content, sourceManifestJson, file.type)) {
        if (verbose) console.log(`  [${locale}] ${file.path}: no changes`)
        driftReports.push({
          file: file.path,
          locale,
          inertCount: 0,
          translatableCount: 0,
          addedCount: 0,
          removedCount: 0,
          reorderedCount: 0,
          unchanged: true,
        })
        continue
      }

      // Full drift detection
      const drift = detectDrift(file.content, sourceManifestJson, file.type)

      const report: DriftReport = {
        file: file.path,
        locale,
        inertCount: drift.inertDrift.length,
        translatableCount: drift.translatableDrift.length,
        addedCount: drift.added.length,
        removedCount: drift.removed.length,
        reorderedCount: drift.reordered.length,
        unchanged: false,
      }
      driftReports.push(report)

      console.log(
        `  [${locale}] ${file.path}: ` +
          `inert=${report.inertCount} prose=${report.translatableCount} ` +
          `added=${report.addedCount} removed=${report.removedCount} ` +
          `reordered=${report.reorderedCount}`
      )

      // Load translation manifest if available
      let translationManifest: LocaleTranslationManifest | null = null
      if (translationManifestPath && fs.existsSync(translationManifestPath)) {
        translationManifest = JSON.parse(
          fs.readFileSync(translationManifestPath, "utf-8")
        )
      }

      fileLanguageTasks.push({
        file,
        locale,
        drift,
        sourceManifestJson,
        translationManifest,
        localeContent,
      })
    }
  }

  // Print drift summary
  logSection("Drift Summary")
  const totalInert = driftReports.reduce((s, r) => s + r.inertCount, 0)
  const totalProse = driftReports.reduce((s, r) => s + r.translatableCount, 0)
  const totalAdded = driftReports.reduce((s, r) => s + r.addedCount, 0)
  const totalRemoved = driftReports.reduce((s, r) => s + r.removedCount, 0)
  const totalUnchanged = driftReports.filter((r) => r.unchanged).length
  console.log(`  Unchanged: ${totalUnchanged}`)
  console.log(`  Inert drift: ${totalInert} (script-propagated, no Gemini)`)
  console.log(`  Translatable drift: ${totalProse} (needs Gemini)`)
  console.log(`  Added: ${totalAdded}`)
  console.log(`  Removed: ${totalRemoved}`)

  if (dryRun) {
    console.log("\n[DRY RUN] No changes applied.")
    process.exit(0)
  }

  if (fileLanguageTasks.length === 0) {
    console.log("\nNo drift detected. Nothing to do.")
    process.exit(0)
  }

  // Phase 3: Inert Propagation
  logSection("Phase 3: Inert Propagation")

  for (const task of fileLanguageTasks) {
    if (task.drift.inertDrift.length === 0) continue
    if (!task.translationManifest) {
      console.log(
        `  [${task.locale}] ${task.file.path}: no translation manifest, skipping inert propagation`
      )
      continue
    }

    const changes = detectInertChanges(
      task.file.content,
      task.sourceManifestJson,
      task.translationManifest
    )

    if (changes.length === 0) continue

    const { content, applied, skipped } = applyInertChanges(
      task.localeContent,
      changes
    )

    if (applied > 0) {
      task.localeContent = content // Update in-memory for prose phase
      console.log(
        `  [${task.locale}] ${task.file.path}: ${applied} inert changes applied, ${skipped} skipped`
      )
    }
  }

  // Phase 4: Prose Retranslation
  logSection("Phase 4: Prose Retranslation")

  const geminiAvailable = isGeminiAvailable()
  if (!geminiAvailable && totalProse > 0) {
    console.warn("[WARN] GEMINI_API_KEY not set, skipping prose retranslation")
  }

  if (geminiAvailable) {
    for (const task of fileLanguageTasks) {
      const proseIds = task.drift.translatableDrift.map((e) => e.id)
      const addedIds = task.drift.added.map((e) => e.id)
      const needsTranslation = [...proseIds, ...addedIds]

      if (needsTranslation.length === 0) continue

      console.log(
        `  [${task.locale}] ${task.file.path}: translating ${needsTranslation.length} section(s)`
      )

      // Build glossary for this locale
      let glossaryTerms = new Map<string, string>()
      try {
        const glossaryFile = path.join(
          translationsDir,
          `glossary-${task.locale}.json`
        )
        if (fs.existsSync(glossaryFile)) {
          const glossaryData = JSON.parse(
            fs.readFileSync(glossaryFile, "utf-8")
          )
          glossaryTerms = filterGlossaryFlat(glossaryData, task.file.content)
        }
      } catch {
        // Glossary unavailable, continue without
      }

      if (verbose) {
        console.log(
          `  [${task.locale}] glossary: ${glossaryTerms.size} terms loaded`
        )
      }

      // Build sections for the prompt
      // TODO: Parse English into sections and build TRANSLATE/CONTEXT list
      // For now, this is a placeholder that will be fleshed out
      // when we integrate with the normalizer's section parsing
      console.log(
        `  [${task.locale}] ${task.file.path}: section-level prompt TODO`
      )

      // TODO: callGeminiRaw with the incremental prompt
      // TODO: parseIncrementalResponse
      // TODO: replaceSections in task.localeContent
    }
  }

  // Phase 5: Commit
  logSection("Phase 5: Commit")

  for (const task of fileLanguageTasks) {
    const destPath = getDestinationFromPath(task.file.path, task.locale)

    // Commit updated locale file
    await committer.commitFile(destPath, task.localeContent, task.locale)
    console.log(`  [${task.locale}] ${destPath}: committed`)

    // Stamp source manifest (only after ALL operations succeed for this file)
    if (task.file.type === "markdown") {
      const sourceManifest = buildMarkdownManifest(
        task.file.content,
        task.file.path
      )
      const sourceManifestPath = destPath.replace(
        /index\.md$/,
        ".manifest-source.json"
      )
      await committer.commitFile(
        sourceManifestPath,
        sourceManifest,
        task.locale
      )

      // Update translation manifest if we have one
      if (task.translationManifest) {
        const parsed = JSON.parse(sourceManifest)
        const updatedTM = {
          ...task.translationManifest,
          englishManifestHash: parsed.rootHash,
          translatedAt: new Date().toISOString(),
        }
        const tmPath = destPath.replace(
          /index\.md$/,
          ".manifest-translation.json"
        )
        await committer.commitFile(
          tmPath,
          JSON.stringify(updatedTM, null, 2) + "\n",
          task.locale
        )
      }
    } else {
      const sourceManifest = buildJsonManifest(
        task.file.content,
        task.file.path
      )
      const jsonManifestPath = `src/intl/${task.locale}/.manifest-source.json`
      await committer.commitFile(jsonManifestPath, sourceManifest, task.locale)
    }
  }

  // Phase 6: Done
  const duration = ((Date.now() - startTime) / 1000).toFixed(1)
  logSection("Complete")
  console.log(`[main] Incremental pipeline finished in ${duration}s`)
  console.log(
    `[main] Inert: ${totalInert}, Prose: ${totalProse}, Added: ${totalAdded}, Removed: ${totalRemoved}`
  )
}

main().catch((error) => {
  console.error("\n========== ERROR ==========")
  console.error(error)
  process.exit(1)
})
