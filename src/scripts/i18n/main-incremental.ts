/**
 * Incremental translation pipeline entry point.
 *
 * Detects what changed in English since the last translation, then:
 * - Any section with drift: sent to Gemini for section-level retranslation
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
 *   STAMP_ONLY              - Update manifests only, no translations (default: false)
 */

import { execSync } from "child_process"
import * as fs from "fs"
import * as path from "path"

import {
  deserialize,
  getContainingSection,
  type TreeNode,
} from "intl-content-tree"

import i18nConfig from "../../../i18n.config.json"

import { isGeminiAvailable } from "./lib/ai/gemini"
import { callGeminiRaw, translateFile } from "./lib/ai/gemini-translate"
import { filterGlossaryFlat } from "./lib/ai/glossary-lookup"
import {
  buildIncrementalPrompt,
  buildSectionList,
  extractJsonSections,
  extractSections,
  parseIncrementalResponse,
  removeMarkdownSection,
  replaceJsonValues,
  replaceSections,
} from "./lib/ai/incremental-translate"
import {
  buildJsonManifest,
  buildLocaleTranslationManifest,
  buildMarkdownManifest,
  detectDrift,
  extractInertChangesFromTrees,
  extractPlaceholderData,
  hasEnglishChanged,
  type LocaleTranslationManifest,
  parseEnglishJson,
  type TreeManifest,
} from "./lib/ai/manifest-adapter"
import {
  applyInertChanges,
  updateTranslationManifest,
} from "./lib/ai/propagate-inert"
import { ensureStagingBranch, getBranchObject } from "./lib/github/branches"
import { getDestinationFromPath, SharedCommitter } from "./lib/github/commits"
import { runPostImportSanitization } from "./lib/workflows/sanitization"
import { logSection } from "./lib/workflows/utils"
import { config, normalizeToEnglishPath } from "./config"

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
  structuralCount: number
  translatableCount: number
  addedCount: number
  removedCount: number
  reorderedCount: number
  unchanged: boolean
}

interface FullTranslationTask {
  file: FileContext
  locale: string
  destPath: string
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main() {
  const startTime = Date.now()
  logSection("Incremental Translation Pipeline")

  const verbose = process.env.VERBOSE === "true"
  const dryRun = process.env.DRY_RUN === "true"
  const stampOnly = process.env.STAMP_ONLY === "true"
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

  const filePaths = targetPath
    .split(",")
    .map((s) => normalizeToEnglishPath(s.trim()))

  // Phase 1: Initialize
  logSection("Phase 1: Initialize")

  const baseBranch = process.env.BASE_BRANCH || config.baseBranch
  const branchName = process.env.TRANSLATION_BRANCH || "intl/pending"
  await ensureStagingBranch(branchName, baseBranch)
  const baseBranchSha = (await getBranchObject(baseBranch)).sha

  console.log(`[main] Branch: ${branchName}`)
  console.log(`[main] Files: ${filePaths.join(", ")}`)
  console.log(`[main] Languages: ${targetLanguages.join(", ")}`)
  console.log(`[main] Dry run: ${dryRun}`)

  const committer = new SharedCommitter(branchName)
  await committer.init()

  // Per-language token usage tracking
  const tokenStats: Record<
    string,
    {
      inputTokens: number
      outputTokens: number
      geminiCalls: number
    }
  > = {}

  const trackTokens = (locale: string, input: number, output: number): void => {
    if (!tokenStats[locale]) {
      tokenStats[locale] = { inputTokens: 0, outputTokens: 0, geminiCalls: 0 }
    }
    tokenStats[locale].inputTokens += input
    tokenStats[locale].outputTokens += output
    tokenStats[locale].geminiCalls += 1
  }

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

  // Phase 2: Drift Detection (auto-detect full vs incremental per file)
  logSection("Phase 2: Drift Detection")

  const fullTranslationTasks: FullTranslationTask[] = []
  const driftReports: DriftReport[] = []
  const fileLanguageTasks: Array<{
    file: FileContext
    locale: string
    drift: ReturnType<typeof detectDrift>
    manifestTree: TreeNode
    sourceManifestJson: string
    translationManifest: LocaleTranslationManifest | null
    localeContent: string
    oldEnglishContent: string | null
  }> = []

  // Cache old English content per file (same across locales)
  const oldEnglishCache = new Map<string, string | null>()

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
        translationManifestPath = path.join(
          rootDir,
          `src/intl/${locale}/.manifest-translation.json`
        )
        localePath = path.join(
          rootDir,
          `src/intl/${locale}/${path.basename(file.path)}`
        )
      }

      // Auto-detect: if no locale file or no source manifest, queue for
      // full translation instead of incremental drift-based updates.
      if (!fs.existsSync(localePath) || !fs.existsSync(sourceManifestPath)) {
        const reason = !fs.existsSync(localePath)
          ? "no translation exists"
          : "no source manifest"
        console.log(`  [${locale}] ${file.path}: ${reason} -> full translation`)
        fullTranslationTasks.push({ file, locale, destPath })
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
          structuralCount: 0,
          translatableCount: 0,
          addedCount: 0,
          removedCount: 0,
          reorderedCount: 0,
          unchanged: true,
        })
        continue
      }

      // Full drift detection
      const drift = detectDrift(
        file.content,
        sourceManifestJson,
        file.type,
        file.path
      )

      // Deserialize the manifest tree for getContainingSection in Phase 5
      const manifestTree = deserialize(
        JSON.parse(sourceManifestJson) as TreeManifest
      )

      const report: DriftReport = {
        file: file.path,
        locale,
        inertCount: drift.inertDrift.length,
        structuralCount: drift.structuralDrift?.length || 0,
        translatableCount: drift.translatableDrift.length,
        addedCount: drift.added.length,
        removedCount: drift.removed.length,
        reorderedCount: drift.reordered.length,
        unchanged: false,
      }
      driftReports.push(report)

      console.log(
        `  [${locale}] ${file.path}: ` +
          `inert=${report.inertCount} structural=${report.structuralCount} ` +
          `prose=${report.translatableCount} ` +
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

      // Fetch old English content for inert propagation (cached per file)
      if (!oldEnglishCache.has(file.path)) {
        const manifest: { sourceCommitSha?: string } =
          JSON.parse(sourceManifestJson)
        if (manifest.sourceCommitSha) {
          try {
            const old = execSync(
              `git show ${manifest.sourceCommitSha}:${file.path}`,
              { encoding: "utf-8" }
            )
            oldEnglishCache.set(file.path, old)
          } catch {
            oldEnglishCache.set(file.path, null)
          }
        } else {
          oldEnglishCache.set(file.path, null)
        }
      }

      fileLanguageTasks.push({
        file,
        locale,
        drift,
        manifestTree,
        sourceManifestJson,
        translationManifest,
        localeContent,
        oldEnglishContent: oldEnglishCache.get(file.path) ?? null,
      })
    }
  }

  // Print drift summary
  logSection("Drift Summary")
  const totalInert = driftReports.reduce((s, r) => s + r.inertCount, 0)
  const totalStructural = driftReports.reduce(
    (s, r) => s + r.structuralCount,
    0
  )
  const totalProse = driftReports.reduce((s, r) => s + r.translatableCount, 0)
  const totalAdded = driftReports.reduce((s, r) => s + r.addedCount, 0)
  const totalRemoved = driftReports.reduce((s, r) => s + r.removedCount, 0)
  const totalUnchanged = driftReports.filter((r) => r.unchanged).length
  console.log(`  Full translation: ${fullTranslationTasks.length} file(s)`)
  console.log(`  Unchanged: ${totalUnchanged}`)
  console.log(`  Inert drift: ${totalInert} (no Gemini needed)`)
  console.log(`  Structural drift: ${totalStructural} (no Gemini needed)`)
  console.log(`  Translatable drift: ${totalProse} (needs Gemini)`)
  console.log(`  Added: ${totalAdded}`)
  console.log(`  Removed: ${totalRemoved}`)

  if (dryRun) {
    console.log("\n[DRY RUN] No changes applied.")
    process.exit(0)
  }

  if (fileLanguageTasks.length === 0 && fullTranslationTasks.length === 0) {
    console.log("\nNo drift detected and no new files. Nothing to do.")
    process.exit(0)
  }

  // Stamp-only mode: skip all translations, just update manifests
  if (stampOnly) {
    logSection("Stamp Only Mode")
    console.log("Skipping translations. Stamping manifests only.")
    // Jump directly to Phase 6 (commit manifests)
    // fileLanguageTasks have the current English + locale content loaded
    // Phase 6 will stamp fresh manifests from current English state
  }

  const geminiAvailable = isGeminiAvailable()

  // Track all Gemini output for sanitization in Phase 7
  const geminiOutputForSanitizer: Array<{ path: string; content: string }> = []

  if (!stampOnly) {
    // Phase 3: Full Translation (for files without manifests)
    logSection("Phase 3: Full Translation")

    if (fullTranslationTasks.length === 0) {
      console.log("  No new files to translate.")
    }

    if (geminiAvailable) {
      for (const task of fullTranslationTasks) {
        console.log(
          `  [${task.locale}] ${task.file.path}: translating (full)...`
        )

        // Build glossary for this locale
        let glossaryTerms = new Map<string, string>()
        try {
          const glossaryFile = path.join(
            glossaryDataDir,
            "glossary-terms-enhanced.json"
          )
          if (fs.existsSync(glossaryFile)) {
            glossaryTerms = filterGlossaryFlat(
              task.file.content,
              task.file.type,
              task.locale,
              glossaryFile,
              translationsDir
            )
          }
        } catch {
          // Glossary unavailable, continue without
        }

        try {
          const result = await translateFile({
            filePath: task.file.path,
            fileContent: task.file.content,
            fileType: task.file.type,
            targetLanguage: task.locale,
            glossaryTerms,
            useNormalizer: task.file.type === "markdown",
          })

          trackTokens(
            task.locale,
            result.tokensUsed.input,
            result.tokensUsed.output
          )
          console.log(
            `  [${task.locale}] ${task.file.path}: translated ` +
              `(${result.tokensUsed.input} in, ${result.tokensUsed.output} out)`
          )

          // Commit translated file
          await committer.commitFile(
            task.destPath,
            result.translatedContent,
            task.locale
          )

          // Collect for Phase 7 sanitizer
          geminiOutputForSanitizer.push({
            path: path.resolve(task.destPath),
            content: result.translatedContent,
          })

          // Stamp manifests (non-fatal if this fails -- translation is
          // already committed, manifests can be regenerated on next run)
          try {
            const sourceManifest =
              task.file.type === "markdown"
                ? buildMarkdownManifest(
                    task.file.content,
                    task.file.path,
                    baseBranchSha
                  )
                : buildJsonManifest(
                    task.file.content,
                    task.file.path,
                    baseBranchSha
                  )

            if (task.file.type === "markdown") {
              const sourceManifestPath = task.destPath.replace(
                /index\.md$/,
                ".manifest-source.json"
              )
              await committer.commitFile(
                sourceManifestPath,
                sourceManifest,
                task.locale
              )

              // Stamp translation manifest (if normalizer produced placeholder data)
              if (result.placeholderOrder && result.placeholderMap) {
                const parsed = JSON.parse(sourceManifest)
                const translationManifest = buildLocaleTranslationManifest({
                  locale: task.locale,
                  englishManifestHash: parsed.rootHash,
                  placeholderOrder: result.placeholderOrder,
                  placeholderMap: result.placeholderMap,
                  sections: {
                    _all: {
                      translatedAt: new Date().toISOString(),
                      status: "success",
                    },
                  },
                })
                const tmPath = task.destPath.replace(
                  /index\.md$/,
                  ".manifest-translation.json"
                )
                await committer.commitFile(
                  tmPath,
                  translationManifest,
                  task.locale
                )
              }
            } else {
              const jsonManifestPath = `src/intl/${task.locale}/.manifest-source.json`
              await committer.commitFile(
                jsonManifestPath,
                sourceManifest,
                task.locale
              )

              // Stamp translation manifest for JSON (enables incremental later).
              // translateFile for JSON doesn't return placeholder data, so we
              // extract it from the English tree directly.
              const placeholderData =
                result.placeholderOrder && result.placeholderMap
                  ? {
                      placeholderOrder: result.placeholderOrder,
                      placeholderMap: result.placeholderMap,
                    }
                  : extractPlaceholderData(parseEnglishJson(task.file.content))

              const parsed = JSON.parse(sourceManifest)
              const translationManifest = buildLocaleTranslationManifest({
                locale: task.locale,
                englishManifestHash: parsed.rootHash,
                placeholderOrder: placeholderData.placeholderOrder,
                placeholderMap: placeholderData.placeholderMap,
                sections: {
                  _all: {
                    translatedAt: new Date().toISOString(),
                    status: "success",
                  },
                },
              })
              const jsonTmPath = `src/intl/${task.locale}/.manifest-translation.json`
              await committer.commitFile(
                jsonTmPath,
                translationManifest,
                task.locale
              )
            }
          } catch (err) {
            console.warn(
              `  [${task.locale}] ${task.file.path}: manifest write failed (non-fatal): ${err instanceof Error ? err.message : String(err)}`
            )
          }

          console.log(`  [${task.locale}] ${task.destPath}: committed`)
        } catch (error) {
          console.error(
            `  [${task.locale}] ${task.file.path}: full translation failed: ${error instanceof Error ? error.message : String(error)}`
          )
        }
      }
    } else if (fullTranslationTasks.length > 0) {
      console.warn(
        "[WARN] GEMINI_API_KEY not set, skipping full translation of new files"
      )
    }

    // Phase 4: Remove deleted content + detect heading ID renames
    // A heading ID rename (e.g., {#old-id} -> {#new-id} with same content)
    // shows up as removed + added. We detect this by matching removed/added
    // entries that share the same parent path and have unchanged content.
    // Renames update the {#id} in the locale file. True removals delete.
    if (totalRemoved > 0) {
      logSection("Phase 4: Remove Deleted Content")

      for (const task of fileLanguageTasks) {
        if (task.drift.removed.length === 0) continue

        // Detect heading ID renames: match removed against added by parent path
        const addedByParent = new Map<string, (typeof task.drift.added)[0]>()
        for (const entry of task.drift.added) {
          const parent = entry.path.substring(0, entry.path.lastIndexOf("/"))
          addedByParent.set(parent, entry)
        }

        const trueRemovals: string[] = []
        const renames: Array<{ oldId: string; newId: string }> = []

        for (const removed of task.drift.removed) {
          const parent = removed.path.substring(
            0,
            removed.path.lastIndexOf("/")
          )
          const matchingAdded = addedByParent.get(parent)
          if (matchingAdded && !removed.contentHashChanged) {
            renames.push({ oldId: removed.id, newId: matchingAdded.id })
            addedByParent.delete(parent)
          } else {
            trueRemovals.push(removed.id)
          }
        }

        // Apply heading ID renames in locale file
        if (renames.length > 0 && task.file.type === "markdown") {
          for (const { oldId, newId } of renames) {
            const pattern = new RegExp(
              `(^#{1,6}\\s+.+?)\\{#${oldId}\\}(\\s*)$`,
              "m"
            )
            const replaced = task.localeContent.replace(
              pattern,
              `$1{#${newId}}$2`
            )
            if (replaced !== task.localeContent) {
              task.localeContent = replaced
              console.log(
                `  [${task.locale}] ${task.file.path}: renamed heading {#${oldId}} -> {#${newId}}`
              )
            } else {
              console.warn(
                `  [${task.locale}] ${task.file.path}: heading {#${oldId}} not found in locale file for rename`
              )
            }
          }
        }

        // Apply true removals
        if (trueRemovals.length > 0) {
          if (task.file.type === "json") {
            try {
              const obj = JSON.parse(task.localeContent)
              for (const id of trueRemovals) {
                const parts = id.split("/")
                let target = obj
                for (let i = 0; i < parts.length - 1; i++) {
                  if (
                    target[parts[i]] &&
                    typeof target[parts[i]] === "object"
                  ) {
                    target = target[parts[i]]
                  } else {
                    target = null as unknown as Record<string, unknown>
                    break
                  }
                }
                if (target) {
                  delete target[parts[parts.length - 1]]
                }
              }
              task.localeContent = JSON.stringify(obj, null, 2) + "\n"
            } catch {
              console.warn(
                `  [${task.locale}] ${task.file.path}: failed to parse JSON for removal`
              )
            }
          } else {
            for (const id of trueRemovals) {
              task.localeContent = removeMarkdownSection(task.localeContent, id)
            }
          }

          console.log(
            `  [${task.locale}] ${task.file.path}: removed ${trueRemovals.length} deleted section(s): ${trueRemovals.join(", ")}`
          )
        }
      }
    }

    // Phase 4b: Inert Propagation
    // Deterministic replacement of inert values (URLs, attributes, etc.)
    // in locale files. No LLM needed.
    if (totalInert > 0) {
      logSection("Phase 4b: Inert Propagation")

      for (const task of fileLanguageTasks) {
        if (task.drift.inertDrift.length === 0) continue
        if (!task.oldEnglishContent) {
          console.warn(
            `  [${task.locale}] ${task.file.path}: no old English content, skipping inert propagation`
          )
          continue
        }

        const sectionIds = task.drift.inertDrift.map((e) => e.id)
        const inertChanges = extractInertChangesFromTrees(
          task.oldEnglishContent,
          task.file.content,
          task.file.type,
          sectionIds
        )

        if (inertChanges.length === 0) {
          if (verbose) {
            console.log(
              `  [${task.locale}] ${task.file.path}: no extractable inert changes`
            )
          }
          continue
        }

        const { content, applied, skipped } = applyInertChanges(
          task.localeContent,
          inertChanges,
          task.file.type
        )

        task.localeContent = content
        console.log(
          `  [${task.locale}] ${task.file.path}: propagated ${applied.length} inert change(s)` +
            (skipped.length > 0 ? `, skipped ${skipped.length}` : "")
        )
        for (const c of applied) {
          console.log(
            `    ${c.elementType} ${c.key}: "${c.oldValue}" -> "${c.newValue}"`
          )
        }
        if (skipped.length > 0) {
          for (const c of skipped) {
            console.warn(
              `    SKIPPED ${c.elementType} ${c.key}: "${c.oldValue}" not found in locale`
            )
          }
        }
      }
    }

    // Phase 5: Prose Retranslation
    logSection("Phase 5: Prose Retranslation")

    if (!geminiAvailable && totalProse > 0) {
      console.warn(
        "[WARN] GEMINI_API_KEY not set, skipping prose retranslation"
      )
    }

    if (geminiAvailable && !stampOnly) {
      for (const task of fileLanguageTasks) {
        // Only translatable drift + added sections need Gemini.
        // Inert drift and structural drift are handled without LLM:
        // - Inert: manual propagation + stamp-only (v4 workflow)
        // - Structural: component add/remove doesn't change prose
        const translatableDriftIds = [
          ...task.drift.translatableDrift.map((e) => e.id),
          ...task.drift.added.map((e) => e.id),
        ]

        // Map tree node IDs to their containing heading section
        // using the package's getContainingSection (walks the tree)
        const headingSections = new Set<string>()
        for (const id of translatableDriftIds) {
          if (id === "prose:0" || id.startsWith("prose:0/")) {
            headingSections.add("_preamble")
          } else if (id.startsWith("frontmatter:")) {
            // Frontmatter changes don't need section retranslation
            continue
          } else {
            const section = getContainingSection(task.manifestTree, id)
            if (section) headingSections.add(section)
          }
        }
        const needsTranslation = [...headingSections]

        if (needsTranslation.length === 0) continue

        console.log(
          `  [${task.locale}] ${task.file.path}: translating ${needsTranslation.length} section(s)`
        )

        // Build glossary for this locale
        let glossaryTerms = new Map<string, string>()
        try {
          const glossaryFile = path.join(
            glossaryDataDir,
            "glossary-terms-enhanced.json"
          )
          if (fs.existsSync(glossaryFile)) {
            glossaryTerms = filterGlossaryFlat(
              task.file.content,
              task.file.type,
              task.locale,
              glossaryFile,
              translationsDir
            )
          }
        } catch {
          // Glossary unavailable, continue without
        }

        if (verbose) {
          console.log(
            `  [${task.locale}] glossary: ${glossaryTerms.size} terms loaded`
          )
        }

        // Parse English and locale files into sections (markdown or JSON)
        const englishSections =
          task.file.type === "json"
            ? extractJsonSections(task.file.content)
            : extractSections(task.file.content)
        const localeSections =
          task.file.type === "json"
            ? extractJsonSections(task.localeContent)
            : extractSections(task.localeContent)

        // Build TRANSLATE/CONTEXT section list
        const sectionList = buildSectionList(
          englishSections,
          localeSections,
          needsTranslation
        )

        const translateCount = sectionList.filter(
          (s) => s.action === "TRANSLATE"
        ).length
        if (translateCount === 0) {
          console.log(
            `  [${task.locale}] ${task.file.path}: no sections matched for translation`
          )
          continue
        }

        // Get language name for prompt
        const langEntry = i18nConfig.find(
          (l: { code: string }) => l.code === task.locale
        )
        const languageName = langEntry
          ? (langEntry as { code: string; name: string }).name
          : task.locale

        // Build the batched prompt
        const prompt = buildIncrementalPrompt({
          filePath: task.file.path,
          targetLanguage: task.locale,
          languageName,
          sections: sectionList,
          glossaryTerms,
        })

        if (verbose) {
          console.log(
            `  [${task.locale}] prompt: ${prompt.length} chars, ${translateCount} TRANSLATE sections`
          )
        }

        // Call Gemini
        try {
          const result = await callGeminiRaw(prompt, {
            filePath: task.file.path,
            targetLanguage: task.locale,
            label: "incremental",
          })

          // Parse response
          const translations = parseIncrementalResponse(result.text)
          const translatedIds = Object.keys(translations)

          trackTokens(
            task.locale,
            result.tokensUsed.input,
            result.tokensUsed.output
          )
          console.log(
            `  [${task.locale}] ${task.file.path}: received ${translatedIds.length} translated section(s) ` +
              `(${result.tokensUsed.input} in, ${result.tokensUsed.output} out)`
          )

          // Replace sections in locale content
          task.localeContent =
            task.file.type === "json"
              ? replaceJsonValues(task.localeContent, translations)
              : replaceSections(task.localeContent, translations)

          // Log any sections we requested but didn't get back
          for (const id of needsTranslation) {
            if (!translations[id]) {
              console.warn(
                `  [${task.locale}] ${task.file.path}: section "${id}" not returned by Gemini`
              )
            }
          }
        } catch (error) {
          console.error(
            `  [${task.locale}] ${task.file.path}: prose retranslation failed: ${error instanceof Error ? error.message : String(error)}`
          )
        }
      }
    }
  } // end if (!stampOnly)

  // Phase 6: Commit locale files + manifests
  // In stamp-only mode, this only stamps manifests (locale files unchanged)
  logSection(stampOnly ? "Phase 6: Stamp Manifests" : "Phase 6: Commit")

  for (const task of fileLanguageTasks) {
    const destPath = getDestinationFromPath(task.file.path, task.locale)

    // Commit updated locale file (skip in stamp-only mode)
    if (!stampOnly) {
      await committer.commitFile(destPath, task.localeContent, task.locale)
      console.log(`  [${task.locale}] ${destPath}: committed`)
    }

    // Stamp source manifest
    if (task.file.type === "markdown") {
      const sourceManifest = buildMarkdownManifest(
        task.file.content,
        task.file.path,
        baseBranchSha
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

      // Update translation manifest hash
      if (task.translationManifest) {
        const parsed = JSON.parse(sourceManifest)
        const updatedTM = updateTranslationManifest(
          task.translationManifest,
          [],
          parsed.rootHash
        )
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
        task.file.path,
        baseBranchSha
      )
      const jsonManifestPath = `src/intl/${task.locale}/.manifest-source.json`
      await committer.commitFile(jsonManifestPath, sourceManifest, task.locale)

      // Update JSON translation manifest hash
      if (task.translationManifest) {
        const parsed = JSON.parse(sourceManifest)
        const updatedTM = updateTranslationManifest(
          task.translationManifest,
          [],
          parsed.rootHash
        )
        const jsonTmPath = `src/intl/${task.locale}/.manifest-translation.json`
        await committer.commitFile(
          jsonTmPath,
          JSON.stringify(updatedTM, null, 2) + "\n",
          task.locale
        )
      }
    }
  }

  // Phase 7: Sanitize Gemini output (skip in stamp-only mode)
  if (!stampOnly) {
    // Includes both full translations (Phase 3) and incremental prose
    // retranslations (Phase 5). Covers markdown AND JSON for BiDi fixes,
    // code fence alignment, etc.
    for (const task of fileLanguageTasks) {
      const destPath = getDestinationFromPath(task.file.path, task.locale)
      geminiOutputForSanitizer.push({
        path: path.resolve(destPath),
        content: task.localeContent,
      })
    }

    if (geminiOutputForSanitizer.length > 0) {
      const englishContentMap = new Map<string, string>(
        englishFiles.map((f) => [f.path, f.content])
      )
      try {
        await runPostImportSanitization(
          geminiOutputForSanitizer,
          branchName,
          englishContentMap
        )
      } catch (error) {
        console.warn(
          `[main] Sanitization failed (non-fatal): ${error instanceof Error ? error.message : String(error)}`
        )
      }
    }
  } // end if (!stampOnly) for Phase 7

  // Token usage summary
  printTokenSummary(tokenStats, Date.now() - startTime)

  // Done
  const duration = ((Date.now() - startTime) / 1000).toFixed(1)
  logSection("Complete")
  console.log(`[main] Pipeline finished in ${duration}s`)
  if (stampOnly) {
    console.log("[main] Stamp-only mode: manifests updated, no translations.")
  } else {
    console.log(
      `[main] Full: ${fullTranslationTasks.length}, Prose: ${totalProse}, Added: ${totalAdded}, Removed: ${totalRemoved}`
    )
  }
}

/**
 * Print a formatted token usage summary table with per-language breakdown
 * and approximate cost estimation.
 */
function printTokenSummary(
  stats: Record<
    string,
    { inputTokens: number; outputTokens: number; geminiCalls: number }
  >,
  pipelineDurationMs: number
): void {
  const entries = Object.entries(stats)
  if (entries.length === 0) {
    logSection("Token Usage Summary")
    console.log("  No Gemini calls made.")
    return
  }

  logSection("Token Usage Summary")

  const fmt = (n: number) => n.toLocaleString("en-US")
  const pad = (s: string, w: number) => s.padStart(w)

  console.log(
    `${"Language".padEnd(10)}| ${"Calls".padStart(5)} | ${"Input".padStart(10)} | ${"Output".padStart(10)} | ${"Total".padStart(10)}`
  )
  const sep = `${"-".repeat(10)}|${"-".repeat(7)}|${"-".repeat(12)}|${"-".repeat(12)}|${"-".repeat(12)}`
  console.log(sep)

  let grandInput = 0
  let grandOutput = 0
  let grandCalls = 0

  for (const [lang, s] of entries) {
    const total = s.inputTokens + s.outputTokens
    grandInput += s.inputTokens
    grandOutput += s.outputTokens
    grandCalls += s.geminiCalls

    console.log(
      `${lang.padEnd(10)}| ${pad(String(s.geminiCalls), 5)} | ${pad(fmt(s.inputTokens), 10)} | ${pad(fmt(s.outputTokens), 10)} | ${pad(fmt(total), 10)}`
    )
  }

  console.log(sep)
  const grandTotal = grandInput + grandOutput
  const pipelineSecs = (pipelineDurationMs / 1000).toFixed(1)
  console.log(
    `${"TOTAL".padEnd(10)}| ${pad(String(grandCalls), 5)} | ${pad(fmt(grandInput), 10)} | ${pad(fmt(grandOutput), 10)} | ${pad(fmt(grandTotal), 10)}`
  )

  // Approximate cost estimation (Gemini Pro rates)
  const APPROX_INPUT_RATE = 1.25
  const APPROX_OUTPUT_RATE = 10.0
  const estCost =
    (grandInput / 1_000_000) * APPROX_INPUT_RATE +
    (grandOutput / 1_000_000) * APPROX_OUTPUT_RATE

  console.log(
    `\n  Estimated cost: ~$${estCost.toFixed(2)} (Gemini Pro: $${APPROX_INPUT_RATE}/1M input, $${APPROX_OUTPUT_RATE}/1M output)`
  )
  console.log(`  Pipeline wall time: ${pipelineSecs}s`)
}

main().catch((error) => {
  console.error("\n========== ERROR ==========")
  console.error(error)
  process.exit(1)
})
