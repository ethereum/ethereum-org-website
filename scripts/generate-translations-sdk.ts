/**
 * Generate glossary translations using @google/genai SDK.
 *
 * Reads glossary-terms-enhanced.json, checks existing per-language
 * translation files, and generates missing translations via Gemini.
 *
 * Single language per call, ~10 terms per batch, term families grouped.
 * Auto-normalizes known Gemini drift patterns.
 * Saves incrementally per language.
 */

import { execSync } from "child_process"
import {
  appendFileSync,
  existsSync,
  mkdirSync,
  readFileSync,
  writeFileSync,
} from "fs"
import { join } from "path"

import { GoogleGenAI, HarmBlockThreshold, HarmCategory } from "@google/genai"

const SCRIPTS_DIR = join(process.cwd(), "scripts")
const TERMS_PATH = join(SCRIPTS_DIR, "glossary-terms-enhanced.json")
const TRANSLATIONS_DIR = join(SCRIPTS_DIR, "translations")

const BATCH_SIZE = 10
const MAX_RETRIES = 3
const RETRY_DELAY_MS = 3000
const CONCURRENCY = 16
const LOG_PATH = join(SCRIPTS_DIR, "translations", "sdk-run.log")

interface GlossaryTerm {
  term?: string
  category?: string
  aliases?: Array<string | { term: string }>
  translation_note?: string
  note?: string
  script_rule?: string
  term_family?: string
  content_occurrences?: number
}

const LANGUAGES = [
  {
    code: "ar",
    name: "Arabic",
    notes:
      "RTL. Use Western Arabic numerals. Broken plural system (zero/one/two/few/many/other).",
  },
  {
    code: "bn",
    name: "Bengali",
    notes: "Indic script. Transliterate technical terms to Bengali script.",
  },
  {
    code: "cs",
    name: "Czech",
    notes:
      "Slavic. 7 grammatical cases. Complex plurals (one/few/many/other). Gender: masculine/feminine/neuter.",
  },
  {
    code: "de",
    name: "German",
    notes: "Capitalize all nouns. Gender: masculine/feminine/neuter.",
  },
  {
    code: "es",
    name: "Spanish",
    notes: "Gender: masculine/feminine. Use Latin American neutral Spanish.",
  },
  {
    code: "fr",
    name: "French",
    notes:
      "Gender: masculine/feminine. English loanwords take masculine by default unless root word is feminine.",
  },
  {
    code: "hi",
    name: "Hindi",
    notes: "Full Devanagari transliteration. Gender: masculine/feminine.",
  },
  {
    code: "id",
    name: "Indonesian",
    notes: "Latin script. No grammatical gender. No plural inflection.",
  },
  { code: "it", name: "Italian", notes: "Gender: masculine/feminine." },
  {
    code: "ja",
    name: "Japanese",
    notes:
      "Transliterate loanwords to katakana. Use middle dot for multi-word compounds. No plural inflection.",
  },
  {
    code: "ko",
    name: "Korean",
    notes: "Transliterate loanwords to Hangul. Formal/neutral register.",
  },
  {
    code: "mr",
    name: "Marathi",
    notes: "Indic script. Gender: masculine/feminine/neuter.",
  },
  {
    code: "pl",
    name: "Polish",
    notes:
      "Slavic. 7 grammatical cases. Complex plurals (one/few/many/other). Gender + animacy.",
  },
  {
    code: "pt-br",
    name: "Portuguese (Brazilian)",
    notes: "Gender: masculine/feminine. Brazilian Portuguese.",
  },
  {
    code: "ru",
    name: "Russian",
    notes: "Cyrillic script. 6 cases. Complex plurals. Gender + animacy.",
  },
  {
    code: "sw",
    name: "Swahili",
    notes: "Latin script. Bantu noun class system.",
  },
  { code: "ta", name: "Tamil", notes: "Dravidian script. Agglutinative." },
  { code: "te", name: "Telugu", notes: "Dravidian script." },
  {
    code: "tr",
    name: "Turkish",
    notes: "Agglutinative. Vowel harmony. No grammatical gender.",
  },
  {
    code: "uk",
    name: "Ukrainian",
    notes: "Cyrillic. 7 cases. Gender + animacy.",
  },
  {
    code: "ur",
    name: "Urdu",
    notes: "RTL. Nastaliq script. Use native Urdu numerals in prose.",
  },
  {
    code: "vi",
    name: "Vietnamese",
    notes: "Latin script with diacritics. Classifier system. No inflection.",
  },
  {
    code: "zh",
    name: "Chinese Simplified",
    notes: "Simplified characters. No inflection, no plurals, no gender.",
  },
  {
    code: "zh-tw",
    name: "Chinese Traditional",
    notes: "Traditional characters. May differ from Simplified in terminology.",
  },
]

const SCHEMA_INSTRUCTIONS = `Output valid JSON only. No markdown fences, no commentary.

Each term entry must have this EXACT structure:
{
  "term": "primary translation",
  "aliases": ["alternatives or empty []"],
  "transliteration": "Latin phonetic (non-Latin scripts only, null for Latin-script)",
  "morphology": {
    "noun": { "singular": "lemma" },
    "verb": { "infinitive": "...", "participle": "..." },
    "adjective": "string or null",
    "agent": "string or null",
    "negation": "string or null",
    "compounds": { "compound-id": "translated compound" }
  },
  "contexts": {
    "prose": { "term": "inflected form", "example": "full sentence" },
    "heading": { "term": "heading form" },
    "tag": { "term": "label form" },
    "ui": { "term": "button/menu form" },
    "code": { "term": "Latin/ASCII form" }
  },
  "grammar": {
    "gender": "masculine/feminine/neuter or null",
    "animacy": "animate/inanimate or null",
    "part_of_speech": "noun/verb/adjective/abbreviation/proper_noun",
    "formality": "formal/neutral/casual or null"
  },
  "plurals": { "one": "...", "two": "...", "few": "...", "many": "...", "other": "..." },
  "source": "llm",
  "confidence": "high/medium/low",
  "notes": "caveats or null"
}

RULES:
- null for non-applicable fields (do NOT omit them)
- aliases MUST always be present (use [] if empty)
- Every context MUST be an object: { "term": "..." }
- contexts.prose MUST include "example" sentence
- morphology.verb = null if no verb form
- plurals = null for languages without complex plural rules
- transliteration = null for Latin-script languages
- Terms with script_rule "keep_latin": translation = English term (identity)
- Terms with script_rule "transliterate": phonetic in native script
- "onchain"/"offchain" written WITHOUT hyphens`

function loadTerms(): Record<string, GlossaryTerm> {
  const data = JSON.parse(readFileSync(TERMS_PATH, "utf-8"))
  return data.confirmed_terms ?? data.entries ?? {}
}

function loadExistingTranslations(langCode: string): Record<string, unknown> {
  const path = join(TRANSLATIONS_DIR, `glossary-${langCode}.json`)
  if (existsSync(path)) {
    return JSON.parse(readFileSync(path, "utf-8"))
  }
  return {}
}

function saveTranslations(
  langCode: string,
  data: Record<string, unknown>
): void {
  if (!existsSync(TRANSLATIONS_DIR))
    mkdirSync(TRANSLATIONS_DIR, { recursive: true })
  const path = join(TRANSLATIONS_DIR, `glossary-${langCode}.json`)
  writeFileSync(path, JSON.stringify(data, null, 2) + "\n", "utf-8")
}

function getUntranslatedTerms(
  allTerms: Record<string, GlossaryTerm>,
  existing: Record<string, unknown>
): Record<string, GlossaryTerm> {
  const result: Record<string, GlossaryTerm> = {}
  for (const [key, term] of Object.entries(allTerms)) {
    if (!(key in existing)) {
      result[key] = term
    }
  }
  return result
}

function groupIntoBatches(
  terms: Record<string, GlossaryTerm>,
  batchSize: number
): string[][] {
  const families: Record<string, string[]> = {}
  const standalone: string[] = []

  for (const [key, term] of Object.entries(terms)) {
    const family = term.term_family
    if (family) {
      if (!families[family]) families[family] = []
      families[family].push(key)
    } else {
      standalone.push(key)
    }
  }

  const batches: string[][] = []
  let current: string[] = []

  for (const members of Object.values(families).sort()) {
    if (current.length + members.length > batchSize && current.length > 0) {
      batches.push(current)
      current = []
    }
    current.push(...members)
    if (current.length >= batchSize) {
      batches.push(current)
      current = []
    }
  }

  for (const key of standalone.sort(
    (a, b) =>
      (terms[b].content_occurrences ?? 0) - (terms[a].content_occurrences ?? 0)
  )) {
    current.push(key)
    if (current.length >= batchSize) {
      batches.push(current)
      current = []
    }
  }

  if (current.length > 0) batches.push(current)
  return batches
}

function buildTermDescriptions(
  terms: Record<string, GlossaryTerm>,
  batchKeys: string[]
): string {
  return batchKeys
    .map((key, i) => {
      const t = terms[key]
      const name = t.term ?? key
      const cat = t.category ?? "general"
      const note = t.translation_note ?? t.note ?? ""
      const scriptRule = t.script_rule ? ` [script_rule: ${t.script_rule}]` : ""
      return `${i + 1}. **${name}** (${cat})${scriptRule}${note ? " -- " + note : ""}`
    })
    .join("\n")
}

function normalizeEntry(
  entry: Record<string, unknown>
): Record<string, unknown> {
  if (!entry || typeof entry !== "object") return entry

  // Fix: missing aliases
  if (!("aliases" in entry)) entry.aliases = []

  // Fix: context values as strings -> wrap in object
  const contexts = entry.contexts as Record<string, unknown> | undefined
  if (contexts && typeof contexts === "object") {
    for (const ctx of ["prose", "heading", "tag", "ui", "code"]) {
      if (ctx in contexts && typeof contexts[ctx] === "string") {
        contexts[ctx] = { term: contexts[ctx] }
      }
    }
  }

  // Fix: ensure null fields present
  for (const field of [
    "transliteration",
    "morphology",
    "grammar",
    "plurals",
    "notes",
  ]) {
    if (!(field in entry)) entry[field] = null
  }
  if (!("source" in entry)) entry.source = "llm"
  if (!("confidence" in entry)) entry.confidence = "medium"

  return entry
}

function extractJson(text: string): Record<string, unknown> | null {
  // Try code-fenced JSON
  const fenceMatch = text.match(/```json?\s*\n([\s\S]*?)\n```/)
  if (fenceMatch) {
    try {
      return JSON.parse(fenceMatch[1])
    } catch {
      /* fall through */
    }
  }

  // Try bare JSON
  const braceMatch = text.match(/\{[\s\S]*\}/)
  if (braceMatch) {
    try {
      return JSON.parse(braceMatch[0])
    } catch {
      /* fall through */
    }
  }

  return null
}

async function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

// Mutex for git operations (multiple languages finish concurrently)
let gitLock = Promise.resolve()

/**
 * Commit and push current translation progress.
 * Called after each language completes so work isn't lost.
 * Serialized via gitLock to prevent concurrent git operations.
 */
function commitProgress(langCode: string): void {
  gitLock = gitLock.then(() => commitProgressInner(langCode))
}

function commitProgressInner(langCode: string): void {
  try {
    execSync("git add scripts/translations/", { stdio: "pipe" })
    try {
      execSync("git diff --staged --quiet", { stdio: "pipe" })
      // No changes staged -- nothing to commit
      return
    } catch {
      // git diff --quiet exits non-zero when there ARE changes -- expected
    }
    execSync(
      `git commit -m "data: glossary translations (${langCode})\n\nCo-Authored-By: Gemini <noreply@google.com>"`,
      { stdio: "pipe" }
    )
    execSync("git push", { stdio: "pipe" })
    log(`  [git] Committed and pushed ${langCode} translations`)
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err)
    log(`  [git] Commit/push failed: ${msg.slice(0, 100)}`)
  }
}

function log(msg: string): void {
  const ts = new Date().toISOString()
  const line = `[${ts}] ${msg}`
  console.log(line)
  try {
    appendFileSync(LOG_PATH, line + "\n", "utf-8")
  } catch {
    /* non-fatal */
  }
}

interface FailedBatch {
  lang: string
  batchIndex: number
  keys: string[]
  reason: string
}

/**
 * Semaphore-based concurrency limiter.
 * All languages share one pool of CONCURRENCY slots.
 */
function createLimiter(maxConcurrent: number) {
  let active = 0
  const queue: Array<() => void> = []

  return {
    async acquire(): Promise<void> {
      return new Promise((resolve) => {
        const tryRun = () => {
          if (active < maxConcurrent) {
            active++
            resolve()
          } else {
            queue.push(tryRun)
          }
        }
        tryRun()
      })
    },
    release() {
      active--
      const next = queue.shift()
      if (next) next()
    },
  }
}

/**
 * Process a single batch: call Gemini, parse, normalize, save.
 * Returns count of successfully translated terms.
 */
async function processBatch(
  ai: GoogleGenAI,
  limiter: ReturnType<typeof createLimiter>,
  allTerms: Record<string, GlossaryTerm>,
  lang: (typeof LANGUAGES)[number],
  batchKeys: string[],
  batchIndex: number,
  totalBatches: number,
  existing: Record<string, unknown>,
  failedBatches: FailedBatch[]
): Promise<{ generated: number; failed: number }> {
  const batchLabel = `${lang.code} batch ${batchIndex + 1}/${totalBatches}`

  await limiter.acquire()

  try {
    log(
      `  ${batchLabel} (${batchKeys.length} terms: ${batchKeys.slice(0, 3).join(", ")}${batchKeys.length > 3 ? "..." : ""})`
    )

    const termBlock = buildTermDescriptions(allTerms, batchKeys)

    const prompt = [
      `Produce Ethereum glossary translations for the following terms.`,
      ``,
      `TARGET LANGUAGE: ${lang.name} (${lang.code})`,
      `Language notes: ${lang.notes}`,
      ``,
      SCHEMA_INSTRUCTIONS,
      ``,
      `THE TERMS:`,
      ``,
      termBlock,
      ``,
      `Output as a single JSON object. Keys: ${batchKeys.map((k) => `"${k}"`).join(", ")}`,
    ].join("\n")

    for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
      try {
        const response = await ai.models.generateContent({
          model: "gemini-2.5-pro",
          contents: prompt,
          config: {
            safetySettings: [
              {
                category: HarmCategory.HARM_CATEGORY_HARASSMENT,
                threshold: HarmBlockThreshold.BLOCK_NONE,
              },
              {
                category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
                threshold: HarmBlockThreshold.BLOCK_NONE,
              },
              {
                category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
                threshold: HarmBlockThreshold.BLOCK_NONE,
              },
              {
                category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
                threshold: HarmBlockThreshold.BLOCK_NONE,
              },
            ],
          },
        })

        const text = response.text ?? ""

        if (!text.trim()) {
          log(
            `    ${batchLabel} attempt ${attempt}/${MAX_RETRIES}: empty response`
          )
          if (attempt < MAX_RETRIES) await sleep(RETRY_DELAY_MS * attempt)
          continue
        }

        const data = extractJson(text)

        if (!data) {
          log(
            `    ${batchLabel} attempt ${attempt}/${MAX_RETRIES}: JSON parse failed (len: ${text.length})`
          )
          if (attempt < MAX_RETRIES) await sleep(RETRY_DELAY_MS * attempt)
          continue
        }

        let batchOk = 0
        const missing: string[] = []
        for (const key of batchKeys) {
          if (key in data) {
            existing[key] = normalizeEntry(data[key] as Record<string, unknown>)
            batchOk++
          } else {
            missing.push(key)
          }
        }

        if (missing.length > 0) {
          log(
            `    ${batchLabel} OK: ${batchOk}/${batchKeys.length} (missing: ${missing.join(", ")})`
          )
        } else {
          log(`    ${batchLabel} OK: ${batchOk}/${batchKeys.length}`)
        }

        return { generated: batchOk, failed: missing.length }
      } catch (err) {
        const msg = err instanceof Error ? err.message : String(err)
        log(
          `    ${batchLabel} attempt ${attempt}/${MAX_RETRIES} ERROR: ${msg.slice(0, 200)}`
        )
        if (attempt < MAX_RETRIES) await sleep(RETRY_DELAY_MS * attempt)
      }
    }

    log(`    ${batchLabel} FAILED after ${MAX_RETRIES} attempts`)
    failedBatches.push({
      lang: lang.code,
      batchIndex,
      keys: batchKeys,
      reason: "max retries exceeded",
    })
    return { generated: 0, failed: batchKeys.length }
  } finally {
    limiter.release()
  }
}

/**
 * Process all batches for a single language.
 * Batches within a language run sequentially through the shared limiter.
 */
async function processLanguage(
  ai: GoogleGenAI,
  limiter: ReturnType<typeof createLimiter>,
  allTerms: Record<string, GlossaryTerm>,
  lang: (typeof LANGUAGES)[number],
  failedBatches: FailedBatch[]
): Promise<{ generated: number; failed: number; skipped: number }> {
  const totalTerms = Object.keys(allTerms).length
  const existing = loadExistingTranslations(lang.code)
  const untranslated = getUntranslatedTerms(allTerms, existing)
  const remaining = Object.keys(untranslated).length

  if (remaining === 0) {
    log(
      `[${lang.code}] Complete (${Object.keys(existing).length}/${totalTerms})`
    )
    return { generated: 0, failed: 0, skipped: totalTerms }
  }

  log(`[${lang.code}] ${lang.name}: ${remaining} terms to translate`)

  const batches = groupIntoBatches(untranslated, BATCH_SIZE)
  let langGenerated = 0
  let langFailed = 0

  for (let bi = 0; bi < batches.length; bi++) {
    const result = await processBatch(
      ai,
      limiter,
      allTerms,
      lang,
      batches[bi],
      bi,
      batches.length,
      existing,
      failedBatches
    )
    langGenerated += result.generated
    langFailed += result.failed

    // Save after each batch (incremental)
    saveTranslations(lang.code, existing)
  }

  const finalCount = Object.keys(existing).length
  log(`[${lang.code}] Done: ${finalCount}/${totalTerms} terms`)

  // Commit progress so work isn't lost if the action crashes
  commitProgress(lang.code)

  return { generated: langGenerated, failed: langFailed, skipped: 0 }
}

async function main(): Promise<void> {
  const apiKey = process.env.GEMINI_API_KEY
  if (!apiKey) {
    console.error("GEMINI_API_KEY not set")
    process.exit(1)
  }

  if (!existsSync(TRANSLATIONS_DIR))
    mkdirSync(TRANSLATIONS_DIR, { recursive: true })

  const ai = new GoogleGenAI({ apiKey })
  const allTerms = loadTerms()
  const totalTerms = Object.keys(allTerms).length
  const failedBatches: FailedBatch[] = []
  const limiter = createLimiter(CONCURRENCY)

  log("=".repeat(60))
  log("GLOSSARY TRANSLATION GENERATOR (SDK)")
  log("=".repeat(60))
  log(`Total terms: ${totalTerms}`)
  log(`Languages: ${LANGUAGES.length}`)
  log(
    `Batch size: ${BATCH_SIZE}, Concurrency: ${CONCURRENCY}, Max retries: ${MAX_RETRIES}`
  )
  log("")

  // Dispatch all languages concurrently -- they share the limiter
  const results = await Promise.allSettled(
    LANGUAGES.map((lang) =>
      processLanguage(ai, limiter, allTerms, lang, failedBatches)
    )
  )

  // Aggregate results
  let totalGenerated = 0
  let totalFailed = 0
  let totalSkipped = 0

  for (const result of results) {
    if (result.status === "fulfilled") {
      totalGenerated += result.value.generated
      totalFailed += result.value.failed
      totalSkipped += result.value.skipped
    } else {
      log(`Language-level error: ${result.reason}`)
      totalFailed++
    }
  }

  // Summary
  log("")
  log("=".repeat(60))
  log("GENERATION COMPLETE")
  log("=".repeat(60))
  log(`Generated: ${totalGenerated}`)
  log(`Failed: ${totalFailed}`)
  log(`Skipped (already translated): ${totalSkipped}`)

  if (failedBatches.length > 0) {
    log("")
    log(`FAILED BATCHES (${failedBatches.length}):`)
    for (const fb of failedBatches) {
      log(
        `  ${fb.lang} batch ${fb.batchIndex + 1}: ${fb.keys.length} terms -- ${fb.reason}`
      )
      log(`    Keys: ${fb.keys.join(", ")}`)
    }
  }

  // Write summary JSON
  const summary = {
    timestamp: new Date().toISOString(),
    totalGenerated,
    totalFailed,
    totalSkipped,
    failedBatches,
    languageStatus: Object.fromEntries(
      LANGUAGES.map((l) => {
        const count = Object.keys(loadExistingTranslations(l.code)).length
        return [l.code, { translated: count, total: totalTerms }]
      })
    ),
  }
  writeFileSync(
    join(TRANSLATIONS_DIR, "sdk-summary.json"),
    JSON.stringify(summary, null, 2) + "\n",
    "utf-8"
  )
  log(`Summary written to scripts/translations/sdk-summary.json`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
