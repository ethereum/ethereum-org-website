/**
 * Incremental Translation Pipeline -- Entry Point
 *
 * Modes:
 *   "full"  -- Translate entire files from scratch via LLM
 *   "auto"  -- Detect drift since last run; propagate inert changes by script,
 *              send only changed prose to LLM (default)
 *
 * Environment variables: see config.ts
 */

import { execFileSync } from "child_process"
import * as fs from "fs"
import * as path from "path"

import {
  diff,
  extractChanges,
  parseJson,
  parseMarkdown,
} from "intl-content-tree"

import i18nConfig from "../../../i18n.config.json"

import {
  ensureStagingBranch,
  getBranchObject,
  mergeBranchInto,
} from "./lib/github/branches"
import { getDestinationFromPath, SharedCommitter } from "./lib/github/commits"
import { callGeminiRaw, isLlmAvailable, translateFile } from "./lib/llm/gemini"
import {
  batchSections,
  buildIncrementalPrompt,
  buildSectionList,
  extractJsonSections,
  extractSections,
  parseIncrementalResponse,
} from "./lib/llm/incremental-translate"
import {
  buildJsonManifest,
  buildLocaleTranslationManifest,
  buildMarkdownManifest,
  extractPlaceholderData,
  hasEnglishChanged,
  parseEnglishJson,
} from "./lib/llm/manifest-adapter"
import { generateTempBranchName } from "./lib/utils/branch-naming"
import type { TaskResult } from "./lib/utils/task-pool"
import { createTaskPool } from "./lib/utils/task-pool"
import { createOrUpdateTranslationPR } from "./lib/workflows/pr-creation"
import { sanitizeTranslations } from "./lib/workflows/sanitization"
import { logSection } from "./lib/workflows/utils"
import { config, GLOSSARY_API_URL, validateTargetPath } from "./config"
import { LLM, MANIFESTS_DIR } from "./constants"
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

/**
 * Get manifest path (relative to repo root) for a given destination file.
 * Structure: .manifests/{destPath}/source.json or translation.json
 * Example: .manifests/public/content/translations/ar/about/index.md/source.json
 */
function getManifestPath(
  destPath: string,
  type: "source" | "translation"
): string {
  return path.join(MANIFESTS_DIR, destPath, `${type}.json`)
}

/**
 * Fetch glossary terms from ETHGlossary API, filtered to terms
 * that appear in the source content for a given language.
 * Returns Map<english, translation> for prompt injection.
 * Includes term notes as parenthetical context when available.
 */
async function loadGlossary(
  fileContent: string,
  locale: string
): Promise<Map<string, string>> {
  try {
    const res = await fetch(`${GLOSSARY_API_URL}/filter`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content: fileContent, language: locale }),
    })
    if (!res.ok) {
      console.warn(
        `[glossary] API returned ${res.status} for ${locale}, continuing without glossary`
      )
      return new Map()
    }
    const data = (await res.json()) as {
      terms: Array<{
        english: string
        translation: string
        note?: string
      }>
    }
    // Sanitize all glossary fields to prevent prompt injection
    // eslint-disable-next-line no-control-regex
    const controlCharRe = new RegExp("[\\u0000-\\u001f]", "g")
    const sanitize = (s: string, maxLen: number) =>
      s.replace(controlCharRe, "").replace(/\n/g, " ").slice(0, maxLen)

    const map = new Map<string, string>()
    for (const term of data.terms) {
      const safeEnglish = sanitize(term.english, 200)
      const safeTranslation = sanitize(term.translation, 500)
      const safeNote = term.note ? sanitize(term.note, 200) : ""
      const value = safeNote
        ? `${safeTranslation} (${safeNote})`
        : safeTranslation
      map.set(safeEnglish, value)
    }
    return map
  } catch (err) {
    console.warn(
      `[glossary] Failed to fetch for ${locale}: ${err instanceof Error ? err.message : String(err)}`
    )
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

function printTokenSummary(
  stats: Record<
    string,
    {
      totalInputTokens: number
      totalOutputTokens: number
      tasksCompleted: number
    }
  >,
  pipelineDurationMs: number
) {
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

  for (const [lang, s] of Object.entries(stats)) {
    const total = s.totalInputTokens + s.totalOutputTokens
    grandInput += s.totalInputTokens
    grandOutput += s.totalOutputTokens
    grandCalls += s.tasksCompleted

    console.log(
      `${lang.padEnd(10)}| ${pad(String(s.tasksCompleted), 5)} | ${pad(fmt(s.totalInputTokens), 10)} | ${pad(fmt(s.totalOutputTokens), 10)} | ${pad(fmt(total), 10)}`
    )
  }

  console.log(sep)
  const grandTotal = grandInput + grandOutput
  console.log(
    `${"TOTAL".padEnd(10)}| ${pad(String(grandCalls), 5)} | ${pad(fmt(grandInput), 10)} | ${pad(fmt(grandOutput), 10)} | ${pad(fmt(grandTotal), 10)}`
  )

  // Approximate cost (standard tier, <=200k prompts)
  // https://ai.google.dev/gemini-api/docs/pricing (as of 11-April-2026)
  const INPUT_RATE = 2.0
  const OUTPUT_RATE = 12.0
  const estCost =
    (grandInput / 1_000_000) * INPUT_RATE +
    (grandOutput / 1_000_000) * OUTPUT_RATE

  const pipelineSecs = (pipelineDurationMs / 1000).toFixed(1)
  console.log(
    `\n  Estimated cost: ~$${estCost.toFixed(4)} (${LLM.models[0]}: $${INPUT_RATE}/1M input, $${OUTPUT_RATE}/1M output)`
  )
  console.log(`  Wall time: ${pipelineSecs}s`)
}

/**
 * Build an LLM translator that batches section translations.
 * Uses batchSections for byte-size-aware splitting of large section lists.
 */
async function buildGeminiTranslator(
  englishContent: string,
  localeContent: string,
  fileType: "markdown" | "json",
  filePath: string,
  locale: string,
  sectionIds: string[]
): Promise<{
  translator: LlmTranslator
  tokens: { input: number; output: number }
}> {
  if (sectionIds.length === 0) {
    return {
      translator: (_, content) => content,
      tokens: { input: 0, output: 0 },
    }
  }

  const englishSections =
    fileType === "json"
      ? extractJsonSections(englishContent)
      : extractSections(englishContent)
  const localeSections =
    fileType === "json"
      ? extractJsonSections(localeContent)
      : extractSections(localeContent)

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
    return {
      translator: (_, content) => content,
      tokens: { input: 0, output: 0 },
    }
  }

  const langEntry = i18nConfig.find((l: { code: string }) => l.code === locale)
  const languageName = langEntry
    ? (langEntry as { code: string; name: string }).name
    : locale

  const glossaryTerms = await loadGlossary(englishContent, locale)
  if (config.verbose && glossaryTerms.size > 0) {
    log(`  Glossary: ${glossaryTerms.size} terms for ${locale}`)
  }

  // Split into batches if needed (byte-size-aware)
  const batches = batchSections(
    sectionList.map((s) => ({
      id: s.id,
      content: s.content || "",
      action: s.action,
    }))
  )

  const allTranslations: Record<string, string> = {}
  let totalInput = 0
  let totalOutput = 0

  for (const batch of batches) {
    const batchSectionList = sectionList.filter((s) =>
      batch.some((b) => b.id === s.id)
    )

    const prompt = buildIncrementalPrompt({
      filePath,
      fileType,
      targetLanguage: locale,
      languageName,
      sections: batchSectionList,
      glossaryTerms,
    })

    log(
      `  Calling LLM: ${batchSectionList.filter((s) => s.action === "TRANSLATE").length} sections, ${prompt.length} chars`
    )

    const result = await callGeminiRaw(prompt, {
      filePath,
      targetLanguage: locale,
      label: "incremental",
    })

    try {
      const translations = parseIncrementalResponse(result.text)
      Object.assign(allTranslations, translations)
    } catch (err) {
      console.warn(
        `[pipeline] Failed to parse batch response for ${locale} (${err instanceof Error ? err.message : String(err)}). Continuing with partial translations.`
      )
    }
    totalInput += result.tokensUsed.input
    totalOutput += result.tokensUsed.output
  }

  const translatedIds = Object.keys(allTranslations)
  log(
    `  LLM returned ${translatedIds.length} sections (${totalInput} in, ${totalOutput} out)`
  )

  for (const id of sectionIds) {
    if (!allTranslations[id]) {
      console.warn(`  Section "${id}" not returned by LLM`)
    }
  }

  return {
    translator: (sectionId: string, englishFallback: string) => {
      return allTranslations[sectionId] || englishFallback
    },
    tokens: { input: totalInput, output: totalOutput },
  }
}

/**
 * Identify which sections need LLM translation.
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

  const tdPaths = dr.translatableDrift.map((e: { path: string }) => e.path)
  const leafTdPaths = tdPaths.filter(
    (p: string) =>
      !tdPaths.some((o: string) => o !== p && o.startsWith(p + "/"))
  )
  const leafTdIds = dr.translatableDrift
    .filter((e: { path: string }) => leafTdPaths.includes(e.path))
    .map((e: { id: string }) => e.id)
    .filter((id: string) => !id.startsWith("frontmatter:"))

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
): Promise<TaskResult> {
  log(`[${locale}] ${file.path}: full translation...`)

  const glossaryTerms = await loadGlossary(file.content, locale)
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

  await committer.commitFile(destPath, result.translatedContent, locale)
  committedFiles.push({ path: destPath, content: result.translatedContent })

  // Build and commit source manifest
  const sourceManifest =
    file.type === "markdown"
      ? buildMarkdownManifest(file.content, file.path, baseBranchSha)
      : buildJsonManifest(file.content, file.path, baseBranchSha)

  // Commit source manifest
  const smDest = getManifestPath(destPath, "source")
  await committer.commitFile(smDest, sourceManifest, locale)

  // Commit translation manifest
  const placeholderData =
    result.placeholderOrder && result.placeholderMap
      ? {
          placeholderOrder: result.placeholderOrder,
          placeholderMap: result.placeholderMap,
        }
      : file.type === "json"
        ? extractPlaceholderData(parseEnglishJson(file.content))
        : null

  if (placeholderData) {
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
    const tmDest = getManifestPath(destPath, "translation")
    await committer.commitFile(tmDest, tm, locale)
  }

  log(`[${locale}] ${destPath}: committed`)
  return {
    tokens: {
      input: result.tokensUsed.input,
      output: result.tokensUsed.output,
    },
  }
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
): Promise<TaskResult> {
  const manifest = JSON.parse(sourceManifestJson)
  let englishA: string

  try {
    if (!manifest.sourceCommitSha)
      throw new Error("no sourceCommitSha in manifest")
    if (!/^[0-9a-f]{40}$/i.test(manifest.sourceCommitSha))
      throw new Error(`invalid SHA: ${manifest.sourceCommitSha}`)
    validateTargetPath(file.path)
    englishA = execFileSync(
      "git",
      ["show", `${manifest.sourceCommitSha}:${file.path}`],
      { encoding: "utf-8" }
    )
  } catch (err) {
    log(
      `[${locale}] ${file.path}: cannot retrieve old English (${err instanceof Error ? err.message : String(err)}), falling back to full translation`
    )
    return runFullTranslation(
      file,
      locale,
      destPath,
      committer,
      baseBranchSha,
      committedFiles
    )
  }

  const englishB = file.content

  const llmSectionIds = getLlmSectionIds(englishA, englishB, file.type)
  log(`[${locale}] ${file.path}: ${llmSectionIds.length} section(s) need LLM`)

  let translator: LlmTranslator | undefined
  let tokens = { input: 0, output: 0 }
  if (llmSectionIds.length > 0 && isLlmAvailable()) {
    const geminiResult = await buildGeminiTranslator(
      englishB,
      localeContent,
      file.type,
      file.path,
      locale,
      llmSectionIds
    )
    translator = geminiResult.translator
    tokens = geminiResult.tokens
  }

  const result = pipeline(
    englishA,
    englishB,
    localeContent,
    file.type,
    translator
  )

  await committer.commitFile(destPath, result, locale)
  committedFiles.push({ path: destPath, content: result })

  const sourceManifest =
    file.type === "markdown"
      ? buildMarkdownManifest(englishB, file.path, baseBranchSha)
      : buildJsonManifest(englishB, file.path, baseBranchSha)

  const smDest = getManifestPath(destPath, "source")
  await committer.commitFile(smDest, sourceManifest, locale)

  log(`[${locale}] ${destPath}: committed (incremental)`)
  return { tokens }
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

  log(`Target: ${targetBranch} (base: ${baseBranch})`)
  log(`Files: ${config.targetPaths.join(", ")}`)
  log(`Languages: ${targetLanguages.join(", ")}`)
  log(`Mode: ${config.mode}`)
  log(`Concurrency: ${config.concurrency}`)

  // Create temp working branch for crash safety
  const tempBranch = generateTempBranchName()
  log(`Temp branch: ${tempBranch}`)
  await ensureStagingBranch(tempBranch, baseBranch)
  const baseBranchSha = (await getBranchObject(baseBranch)).sha
  const committer = new SharedCommitter(tempBranch)
  await committer.init()

  const committedFiles: Array<{ path: string; content: string }> = []
  let hasCommits = false

  // Validate target paths before any filesystem reads
  for (const fp of config.targetPaths) {
    validateTargetPath(fp)
  }

  // Load English files from disk
  const englishFiles: FileContext[] = config.targetPaths.map((fp) => ({
    path: fp,
    content: fs.readFileSync(path.resolve(fp), "utf-8"),
    type: fp.endsWith(".json") ? ("json" as const) : ("markdown" as const),
  }))

  // Build task pool with per-language completion logging
  const pool = createTaskPool({
    concurrency: config.concurrency,
    onLanguageComplete: (lang, stats) => {
      log(
        `[${lang}] Complete: ${stats.tasksCompleted} tasks, ${stats.totalInputTokens} input, ${stats.totalOutputTokens} output tokens`
      )
    },
  })

  // Submit all file x language tasks to the pool
  for (const file of englishFiles) {
    for (const locale of targetLanguages) {
      const destPath = getDestinationFromPath(file.path, locale)
      const smPath = path.join(
        process.cwd(),
        getManifestPath(destPath, "source")
      )
      const localePath = readLocalePath(
        destPath,
        file.type,
        locale,
        path.basename(file.path)
      )

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

        if (!isLlmAvailable()) {
          console.warn(`[${locale}] Skipping: LLM API key not set`)
          continue
        }

        pool.submit(locale, () =>
          runFullTranslation(
            file,
            locale,
            destPath,
            committer,
            baseBranchSha,
            committedFiles
          )
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
        pool.submit(locale, async () => {
          const sourceManifest =
            file.type === "markdown"
              ? buildMarkdownManifest(file.content, file.path, baseBranchSha)
              : buildJsonManifest(file.content, file.path, baseBranchSha)
          await committer.commitFile(
            getManifestPath(destPath, "source"),
            sourceManifest,
            locale
          )
          hasCommits = true
        })
        continue
      }

      pool.submit(locale, () =>
        runIncremental(
          file,
          locale,
          destPath,
          sourceManifestJson,
          localeContent,
          committer,
          baseBranchSha,
          committedFiles
        )
      )
    }
  }

  // Wait for all tasks to complete
  await pool.drain()

  // Check for task failures
  if (pool.hasErrors()) {
    const errors = pool.getErrors()
    console.error(`[pipeline] ${errors.length} task(s) failed:`)
    for (const { language, error } of errors) {
      console.error(`  [${language}] ${error.message}`)
    }
    throw new Error(
      `Pipeline aborted: ${errors.length} translation task(s) failed. Temp branch ${tempBranch} preserved with partial progress.`
    )
  }

  // Squash interleaved commits into one per language
  if (committedFiles.length > 0 || hasCommits) {
    await committer.squashByLanguage()
  }

  // Post-processing: sanitize LLM output
  if (committedFiles.length > 0 && !config.stampOnly) {
    const englishContentMap = new Map<string, string>(
      englishFiles.map((f) => [f.path, f.content])
    )
    try {
      await sanitizeTranslations(committedFiles, tempBranch, englishContentMap)
    } catch (error) {
      console.warn(
        `[pipeline] Sanitization failed (non-fatal): ${error instanceof Error ? error.message : String(error)}`
      )
    }
  }

  // Merge temp branch into target branch
  if (committedFiles.length > 0 || hasCommits) {
    log(`Merging ${tempBranch} -> ${targetBranch}`)
    await ensureStagingBranch(targetBranch, baseBranch)
    const merged = await mergeBranchInto(tempBranch, targetBranch)
    if (!merged) {
      throw new Error(
        `Failed to merge ${tempBranch} into ${targetBranch}. Temp branch preserved for manual resolution.`
      )
    }
    log(`Merged successfully`)
  } else {
    log(`No changes to merge`)
  }

  // Create or update PR unless skipped
  if ((committedFiles.length > 0 || hasCommits) && !config.skipPr) {
    const languagePairs = targetLanguages.map((code) => {
      const entry = i18nConfig.find((l: { code: string }) => l.code === code)
      return {
        internalLanguageCode: code,
        languageName: entry
          ? (entry as { code: string; name: string }).name
          : code,
      }
    })
    try {
      await createOrUpdateTranslationPR(
        targetBranch,
        committedFiles,
        languagePairs,
        config.mode
      )
    } catch (error) {
      console.warn(
        `[pipeline] PR creation failed (non-fatal): ${error instanceof Error ? error.message : String(error)}`
      )
    }
  }

  // Print token summary from pool stats
  const poolStats = pool.getStats()
  if (Object.keys(poolStats).length > 0) {
    printTokenSummary(poolStats, Date.now() - startTime)
  }

  logSection("Complete")
  log(`Finished in ${((Date.now() - startTime) / 1000).toFixed(1)}s`)
}

main().catch((error) => {
  console.error("\n========== ERROR ==========")
  console.error(error instanceof Error ? error.message : String(error))
  if (error instanceof Error && error.stack) console.error(error.stack)
  process.exit(1)
})
