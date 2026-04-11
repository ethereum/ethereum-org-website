/**
 * Incremental Translation Pipeline -- Entry Point
 *
 * Modes:
 *   "full"  -- Translate entire files from scratch via Gemini
 *   "auto"  -- Detect drift since last run; propagate inert changes by script,
 *              send only changed prose to Gemini (default)
 *
 * Environment variables: see config.ts
 */

import { execSync } from "child_process"
import * as fs from "fs"
import * as path from "path"

import {
  diff,
  extractChanges,
  parseJson,
  parseMarkdown,
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
} from "./lib/ai/incremental-translate"
import {
  buildJsonManifest,
  buildLocaleTranslationManifest,
  buildMarkdownManifest,
  extractPlaceholderData,
  hasEnglishChanged,
  parseEnglishJson,
} from "./lib/ai/manifest-adapter"
import { ensureStagingBranch, getBranchObject } from "./lib/github/branches"
import { getDestinationFromPath, SharedCommitter } from "./lib/github/commits"
import { runPostImportSanitization } from "./lib/workflows/sanitization"
import { logSection } from "./lib/workflows/utils"
import { config } from "./config"
import type { LlmTranslator } from "./pipeline"
import { pipeline, PIPELINE_CONFIG } from "./pipeline"

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface FileContext {
  path: string
  content: string
  type: "markdown" | "json"
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function log(msg: string) {
  console.log(`[pipeline] ${msg}`)
}

function readSourceManifestPath(
  destPath: string,
  fileType: string,
  locale: string
): string {
  if (fileType === "markdown") {
    return path.join(
      process.cwd(),
      path.dirname(destPath),
      ".manifest-source.json"
    )
  }
  return path.join(process.cwd(), `src/intl/${locale}/.manifest-source.json`)
}

const GLOSSARY_DIR = path.join(process.cwd(), "src/scripts/i18n/data/glossary")
const GLOSSARY_FILE = path.join(GLOSSARY_DIR, "glossary-terms-enhanced.json")
const GLOSSARY_TRANSLATIONS_DIR = path.join(GLOSSARY_DIR, "translations")

function loadGlossary(
  fileContent: string,
  fileType: "markdown" | "json",
  locale: string
): Map<string, string> {
  try {
    if (!fs.existsSync(GLOSSARY_FILE)) return new Map()
    return filterGlossaryFlat(
      fileContent,
      fileType,
      locale,
      GLOSSARY_FILE,
      GLOSSARY_TRANSLATIONS_DIR
    )
  } catch {
    return new Map()
  }
}

function readLocalePath(
  destPath: string,
  fileType: string,
  locale: string,
  fileName: string
): string {
  if (fileType === "markdown") {
    return path.join(process.cwd(), destPath)
  }
  return path.join(process.cwd(), `src/intl/${locale}/${fileName}`)
}

/**
 * Build an LLM translator that batches section translations via Gemini.
 *
 * Instead of calling Gemini per-section, we pre-translate all needed sections
 * in one batch, then return a lookup function.
 */
async function buildGeminiTranslator(
  englishContent: string,
  localeContent: string,
  fileType: "markdown" | "json",
  filePath: string,
  locale: string,
  sectionIds: string[]
): Promise<LlmTranslator> {
  if (sectionIds.length === 0) {
    return (_, content) => content
  }

  // Extract sections from English and locale files
  const englishSections =
    fileType === "json"
      ? extractJsonSections(englishContent)
      : extractSections(englishContent)
  const localeSections =
    fileType === "json"
      ? extractJsonSections(localeContent)
      : extractSections(localeContent)

  // Build TRANSLATE/CONTEXT section list
  const sectionList = buildSectionList(
    englishSections,
    localeSections,
    sectionIds
  )
  const translateCount = sectionList.filter(
    (s) => s.action === "TRANSLATE"
  ).length

  if (translateCount === 0) {
    log(`  No sections matched for translation`)
    return (_, content) => content
  }

  // Get language name
  const langEntry = i18nConfig.find((l: { code: string }) => l.code === locale)
  const languageName = langEntry
    ? (langEntry as { code: string; name: string }).name
    : locale

  // Load glossary for this locale
  const glossaryTerms = loadGlossary(englishContent, fileType, locale)
  if (config.verbose && glossaryTerms.size > 0) {
    log(`  Glossary: ${glossaryTerms.size} terms for ${locale}`)
  }

  // Build batched prompt
  const prompt = buildIncrementalPrompt({
    filePath,
    targetLanguage: locale,
    languageName,
    sections: sectionList,
    glossaryTerms,
  })

  log(`  Calling Gemini: ${translateCount} sections, ${prompt.length} chars`)

  // Call Gemini
  const result = await callGeminiRaw(prompt, {
    filePath,
    targetLanguage: locale,
    label: "incremental",
  })

  // Parse response into section map
  const translations = parseIncrementalResponse(result.text)
  const translatedIds = Object.keys(translations)
  log(
    `  Gemini returned ${translatedIds.length} sections (${result.tokensUsed.input} in, ${result.tokensUsed.output} out)`
  )

  // Log missing sections
  for (const id of sectionIds) {
    if (!translations[id]) {
      console.warn(`  Section "${id}" not returned by Gemini`)
    }
  }

  // Return lookup function
  return (sectionId: string, englishFallback: string) => {
    return translations[sectionId] || englishFallback
  }
}

/**
 * Identify which sections need LLM translation.
 * This mirrors the logic in pipeline.ts but extracts just the section IDs.
 */
function getLlmSectionIds(
  englishA: string,
  englishB: string,
  fileType: "markdown" | "json"
): string[] {
  const parse = fileType === "markdown" ? parseMarkdown : parseJson
  const treeA = parse(englishA, PIPELINE_CONFIG)
  const treeB = parse(englishB, PIPELINE_CONFIG)
  const dr = diff(treeA, treeB)
  const cs = extractChanges(treeA, treeB)

  // Leaf translatableDrift
  const tdPaths = dr.translatableDrift.map((e: { path: string }) => e.path)
  const leafTdPaths = tdPaths.filter(
    (p: string) =>
      !tdPaths.some((o: string) => o !== p && o.startsWith(p + "/"))
  )
  const leafTdIds = dr.translatableDrift
    .filter((e: { path: string }) => leafTdPaths.includes(e.path))
    .map((e: { id: string }) => e.id)
    .filter((id: string) => !id.startsWith("frontmatter:"))

  // Truly added (not renames)
  const renamedNewIds = new Set(
    cs.sectionRenames.map((r: { newId: string }) => r.newId)
  )
  const addedIds = dr.added
    .filter((e: { id: string }) => !renamedNewIds.has(e.id))
    .map((e: { id: string }) => e.id)

  return [...leafTdIds, ...addedIds]
}

// ---------------------------------------------------------------------------
// Full Translation
// ---------------------------------------------------------------------------

async function runFullTranslation(
  file: FileContext,
  locale: string,
  destPath: string,
  committer: SharedCommitter,
  baseBranchSha: string,
  committedFiles: Array<{ path: string; content: string }>
) {
  log(`[${locale}] ${file.path}: full translation...`)

  const glossaryTerms = loadGlossary(file.content, file.type, locale)
  if (config.verbose && glossaryTerms.size > 0) {
    log(`[${locale}] Glossary: ${glossaryTerms.size} terms`)
  }

  const result = await translateFile({
    filePath: file.path,
    fileContent: file.content,
    fileType: file.type,
    targetLanguage: locale,
    glossaryTerms,
    useNormalizer: file.type === "markdown",
  })

  log(
    `[${locale}] ${file.path}: translated (${result.tokensUsed.input} in, ${result.tokensUsed.output} out)`
  )

  // Commit translated file
  await committer.commitFile(destPath, result.translatedContent, locale)
  committedFiles.push({ path: destPath, content: result.translatedContent })

  // Build and commit source manifest
  const sourceManifest =
    file.type === "markdown"
      ? buildMarkdownManifest(file.content, file.path, baseBranchSha)
      : buildJsonManifest(file.content, file.path, baseBranchSha)

  if (file.type === "markdown") {
    const manifestPath = destPath.replace(/index\.md$/, ".manifest-source.json")
    await committer.commitFile(manifestPath, sourceManifest, locale)

    // Translation manifest
    if (result.placeholderOrder && result.placeholderMap) {
      const parsed = JSON.parse(sourceManifest)
      const tm = buildLocaleTranslationManifest({
        locale,
        englishManifestHash: parsed.rootHash,
        placeholderOrder: result.placeholderOrder,
        placeholderMap: result.placeholderMap,
        sections: {
          _all: { translatedAt: new Date().toISOString(), status: "success" },
        },
      })
      const tmPath = destPath.replace(
        /index\.md$/,
        ".manifest-translation.json"
      )
      await committer.commitFile(tmPath, tm, locale)
    }
  } else {
    const manifestPath = `src/intl/${locale}/.manifest-source.json`
    await committer.commitFile(manifestPath, sourceManifest, locale)

    const placeholderData =
      result.placeholderOrder && result.placeholderMap
        ? {
            placeholderOrder: result.placeholderOrder,
            placeholderMap: result.placeholderMap,
          }
        : extractPlaceholderData(parseEnglishJson(file.content))

    const parsed = JSON.parse(sourceManifest)
    const tm = buildLocaleTranslationManifest({
      locale,
      englishManifestHash: parsed.rootHash,
      placeholderOrder: placeholderData.placeholderOrder,
      placeholderMap: placeholderData.placeholderMap,
      sections: {
        _all: { translatedAt: new Date().toISOString(), status: "success" },
      },
    })
    const jsonTmPath = `src/intl/${locale}/.manifest-translation.json`
    await committer.commitFile(jsonTmPath, tm, locale)
  }

  log(`[${locale}] ${destPath}: committed`)
}

// ---------------------------------------------------------------------------
// Incremental Translation
// ---------------------------------------------------------------------------

async function runIncremental(
  file: FileContext,
  locale: string,
  destPath: string,
  sourceManifestJson: string,
  localeContent: string,
  committer: SharedCommitter,
  baseBranchSha: string,
  committedFiles: Array<{ path: string; content: string }>
) {
  // Get old English content from git via sourceCommitSha
  const manifest = JSON.parse(sourceManifestJson)
  let englishA: string

  try {
    if (!manifest.sourceCommitSha)
      throw new Error("no sourceCommitSha in manifest")
    englishA = execSync(`git show ${manifest.sourceCommitSha}:${file.path}`, {
      encoding: "utf-8",
    })
  } catch (err) {
    log(
      `[${locale}] ${file.path}: cannot retrieve old English (${err instanceof Error ? err.message : String(err)}), falling back to full translation`
    )
    await runFullTranslation(
      file,
      locale,
      destPath,
      committer,
      baseBranchSha,
      committedFiles
    )
    return
  }

  const englishB = file.content

  // Identify sections needing Gemini
  const llmSectionIds = getLlmSectionIds(englishA, englishB, file.type)
  log(
    `[${locale}] ${file.path}: ${llmSectionIds.length} section(s) need Gemini`
  )

  // Build Gemini translator (batch all LLM sections in one call)
  let translator: LlmTranslator | undefined
  if (llmSectionIds.length > 0 && isGeminiAvailable()) {
    translator = await buildGeminiTranslator(
      englishB,
      localeContent,
      file.type,
      file.path,
      locale,
      llmSectionIds
    )
  }

  // Run the pipeline
  const result = pipeline(
    englishA,
    englishB,
    localeContent,
    file.type,
    translator
  )

  // Commit result
  await committer.commitFile(destPath, result, locale)
  committedFiles.push({ path: destPath, content: result })

  // Update manifests
  const sourceManifest =
    file.type === "markdown"
      ? buildMarkdownManifest(englishB, file.path, baseBranchSha)
      : buildJsonManifest(englishB, file.path, baseBranchSha)

  if (file.type === "markdown") {
    const smPath = destPath.replace(/index\.md$/, ".manifest-source.json")
    await committer.commitFile(smPath, sourceManifest, locale)
  } else {
    const smPath = `src/intl/${locale}/.manifest-source.json`
    await committer.commitFile(smPath, sourceManifest, locale)
  }

  log(`[${locale}] ${destPath}: committed (incremental)`)
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main() {
  const startTime = Date.now()
  logSection("Incremental Translation Pipeline v5")

  if (!config.targetPaths.length) {
    console.error("[ERROR] TARGET_PATH is required")
    process.exit(1)
  }

  const targetLanguages = config.allInternalCodes
  const baseBranch = config.baseBranch
  const targetBranch = config.targetBranch

  log(`Branch: ${targetBranch} (base: ${baseBranch})`)
  log(`Files: ${config.targetPaths.join(", ")}`)
  log(`Languages: ${targetLanguages.join(", ")}`)
  log(`Mode: ${config.mode}`)

  // Initialize branch and committer
  await ensureStagingBranch(targetBranch, baseBranch)
  const baseBranchSha = (await getBranchObject(baseBranch)).sha
  const committer = new SharedCommitter(targetBranch)

  // Track committed files for post-processing sanitization
  const committedFiles: Array<{ path: string; content: string }> = []
  await committer.init()

  // Load English files from disk
  const englishFiles: FileContext[] = config.targetPaths.map((fp) => ({
    path: fp,
    content: fs.readFileSync(path.resolve(fp), "utf-8"),
    type: fp.endsWith(".json") ? ("json" as const) : ("markdown" as const),
  }))

  // Process each file x language
  for (const file of englishFiles) {
    for (const locale of targetLanguages) {
      const destPath = getDestinationFromPath(file.path, locale)
      const smPath = readSourceManifestPath(destPath, file.type, locale)
      const localePath = readLocalePath(
        destPath,
        file.type,
        locale,
        path.basename(file.path)
      )

      // Decide: full vs incremental
      const hasLocale = fs.existsSync(localePath)
      const hasManifest = fs.existsSync(smPath)

      if (config.mode === "full" || !hasLocale || !hasManifest) {
        const reason =
          config.mode === "full"
            ? "forced full"
            : !hasLocale
              ? "no locale file"
              : "no manifest"
        log(`[${locale}] ${file.path}: ${reason} -> full translation`)

        if (!isGeminiAvailable()) {
          console.warn(`[${locale}] Skipping: GEMINI_API_KEY not set`)
          continue
        }

        await runFullTranslation(
          file,
          locale,
          destPath,
          committer,
          baseBranchSha,
          committedFiles
        )
        continue
      }

      // Incremental: check if English changed
      const sourceManifestJson = fs.readFileSync(smPath, "utf-8")
      if (!hasEnglishChanged(file.content, sourceManifestJson, file.type)) {
        if (config.verbose) log(`[${locale}] ${file.path}: no changes`)
        continue
      }

      const localeContent = fs.readFileSync(localePath, "utf-8")

      if (config.stampOnly) {
        log(`[${locale}] ${file.path}: stamp only`)
        const sourceManifest =
          file.type === "markdown"
            ? buildMarkdownManifest(file.content, file.path, baseBranchSha)
            : buildJsonManifest(file.content, file.path, baseBranchSha)
        const manifestDest =
          file.type === "markdown"
            ? destPath.replace(/index\.md$/, ".manifest-source.json")
            : `src/intl/${locale}/.manifest-source.json`
        await committer.commitFile(manifestDest, sourceManifest, locale)
        continue
      }

      await runIncremental(
        file,
        locale,
        destPath,
        sourceManifestJson,
        localeContent,
        committer,
        baseBranchSha,
        committedFiles
      )
    }
  }

  // Post-processing: sanitize Gemini output
  if (committedFiles.length > 0 && !config.stampOnly) {
    const englishContentMap = new Map<string, string>(
      englishFiles.map((f) => [f.path, f.content])
    )
    try {
      await runPostImportSanitization(
        committedFiles,
        targetBranch,
        englishContentMap
      )
    } catch (error) {
      console.warn(
        `[pipeline] Sanitization failed (non-fatal): ${error instanceof Error ? error.message : String(error)}`
      )
    }
  }

  // Done
  const duration = ((Date.now() - startTime) / 1000).toFixed(1)
  logSection("Complete")
  log(`Finished in ${duration}s`)
}

main().catch((error) => {
  console.error("\n========== ERROR ==========")
  console.error(error instanceof Error ? error.message : String(error))
  if (error instanceof Error && error.stack) console.error(error.stack)
  process.exit(1)
})
