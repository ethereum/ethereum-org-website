/**
 * Standalone JSX attribute translation module
 *
 * Can be called from:
 * 1. Main i18n workflow (after Crowdin download, before sanitizer)
 * 2. Dedicated GitHub Action (accepts branch/PR, runs in isolation)
 *
 * Usage:
 *   npx ts-node translate-jsx-attributes.ts --language es --files file1.md,file2.md
 *   npx ts-node translate-jsx-attributes.ts --language es --branch translations/es
 */

import fs from "fs"
import path from "path"

import type { TranslationContext } from "./lib/ai"
import { isGeminiAvailable, translateAttributesByFile } from "./lib/ai"
import { getUniversalTranslationRules } from "./lib/crowdin/prompt"
import { getCurrentUser } from "./lib/crowdin/user"
import type {
  ExtractedAttribute,
  FileExtractionResult,
  FileTranslationResult,
  JsxTranslationSummary,
} from "./lib/jsx-attributes"
import {
  countExtractedAttributes,
  extractAttributesFromFile,
  reinsertTranslatedAttributes,
} from "./lib/jsx-attributes"
import {
  fetchGlossaryEntries,
  getGlossaryForLanguage,
  groupGlossaryByLanguage,
} from "./lib/supabase"
import { config } from "./config"

/**
 * Options for JSX attribute translation
 */
export interface TranslateJsxOptions {
  /** Target language code (e.g., "es", "fr") */
  targetLanguage: string
  /** Files to process (path and content) */
  files: { path: string; content: string }[]
  /** Whether to log verbose output */
  verbose?: boolean
  /** Translation context with glossary and rules */
  translationContext?: TranslationContext
}

/**
 * Translate JSX attributes in a batch of files for a single language.
 * This is the main entry point for both workflow integration and standalone use.
 */
export async function translateJsxAttributes(
  options: TranslateJsxOptions
): Promise<JsxTranslationSummary> {
  const { targetLanguage, files, verbose = false, translationContext } = options

  console.log(`\n[JSX-TRANSLATE] Starting JSX attribute translation`)
  console.log(`[JSX-TRANSLATE] Target language: ${targetLanguage}`)
  console.log(`[JSX-TRANSLATE] Files to process: ${files.length}`)

  // Check Gemini availability
  const geminiAvailable = isGeminiAvailable()
  if (!geminiAvailable) {
    console.warn(
      `[JSX-TRANSLATE] ⚠️ GEMINI_API_KEY not available, skipping translation`
    )
    return {
      filesProcessed: files.length,
      filesWithChanges: 0,
      attributesTranslated: 0,
      attributesFailed: 0,
      geminiAvailable: false,
      updatedFiles: [],
    }
  }

  // Extract attributes from all files
  const extractions: FileExtractionResult[] = []
  const attributesByFile = new Map<string, ExtractedAttribute[]>()

  for (const file of files) {
    // Only process markdown files
    if (!file.path.endsWith(".md") && !file.path.endsWith(".mdx")) {
      continue
    }

    const extraction = extractAttributesFromFile(file.content, file.path)
    extractions.push(extraction)

    if (extraction.attributes.length > 0) {
      attributesByFile.set(file.path, extraction.attributes)
      if (verbose) {
        console.log(
          `[JSX-TRANSLATE] Found ${extraction.attributes.length} attributes in ${file.path}`
        )
      }
    }
  }

  const totalAttributes = countExtractedAttributes(extractions)
  console.log(
    `[JSX-TRANSLATE] Found ${totalAttributes} translatable attributes in ${attributesByFile.size} files`
  )

  if (totalAttributes === 0) {
    console.log(`[JSX-TRANSLATE] No attributes to translate`)
    return {
      filesProcessed: files.length,
      filesWithChanges: 0,
      attributesTranslated: 0,
      attributesFailed: 0,
      geminiAvailable: true,
      updatedFiles: [],
    }
  }

  // Translate attributes via Gemini (one API call per file batch)
  const translatedByFile = await translateAttributesByFile(
    attributesByFile,
    targetLanguage,
    translationContext
  )

  // Re-insert translated attributes into files
  const updatedFiles: FileTranslationResult[] = []
  let attributesTranslated = 0
  let attributesFailed = 0

  for (const extraction of extractions) {
    const translated = translatedByFile.get(extraction.filePath) || []
    const result = reinsertTranslatedAttributes(extraction, translated)

    if (result.hasChanges) {
      updatedFiles.push(result)
      attributesTranslated += translated.length
    }

    // Count failed as those we extracted but didn't get back
    const originalCount = extraction.attributes.length
    const translatedCount = translated.length
    if (translatedCount < originalCount) {
      attributesFailed += originalCount - translatedCount
    }
  }

  console.log(`[JSX-TRANSLATE] ✓ Translation complete`)
  console.log(`[JSX-TRANSLATE]   - Files with changes: ${updatedFiles.length}`)
  console.log(
    `[JSX-TRANSLATE]   - Attributes translated: ${attributesTranslated}`
  )
  if (attributesFailed > 0) {
    console.log(`[JSX-TRANSLATE]   - Attributes failed: ${attributesFailed}`)
  }

  return {
    filesProcessed: files.length,
    filesWithChanges: updatedFiles.length,
    attributesTranslated,
    attributesFailed,
    geminiAvailable: true,
    updatedFiles,
  }
}

/**
 * Read files from disk for standalone execution
 */
function readFilesFromDisk(
  filePaths: string[]
): { path: string; content: string }[] {
  return filePaths.map((filePath) => {
    const absolutePath = path.isAbsolute(filePath)
      ? filePath
      : path.join(process.cwd(), filePath)
    const content = fs.readFileSync(absolutePath, "utf-8")
    return { path: filePath, content }
  })
}

/**
 * Write updated files back to disk
 */
function writeFilesToDisk(files: FileTranslationResult[]): void {
  for (const file of files) {
    const absolutePath = path.isAbsolute(file.filePath)
      ? file.filePath
      : path.join(process.cwd(), file.filePath)
    fs.writeFileSync(absolutePath, file.updatedContent, "utf-8")
    console.log(`[JSX-TRANSLATE] Wrote: ${file.filePath}`)
  }
}

/**
 * Parse CLI arguments
 */
function parseArgs(): { language: string; files: string[] } | null {
  const args = process.argv.slice(2)
  let language = ""
  let files: string[] = []

  for (let i = 0; i < args.length; i++) {
    if (args[i] === "--language" || args[i] === "-l") {
      language = args[++i]
    } else if (args[i] === "--files" || args[i] === "-f") {
      files = args[++i].split(",").map((f) => f.trim())
    }
  }

  if (!language || files.length === 0) {
    return null
  }

  return { language, files }
}

/**
 * Fetch translation context (glossary + universal rules) for standalone execution
 */
async function fetchTranslationContext(
  targetLanguage: string
): Promise<TranslationContext> {
  console.log(`[JSX-TRANSLATE] Loading translation context...`)

  // Fetch glossary from Supabase
  const glossaryEntries = await fetchGlossaryEntries()
  const glossaryByLang = groupGlossaryByLanguage(glossaryEntries)
  const glossary = getGlossaryForLanguage(glossaryByLang, targetLanguage)

  // Fetch universal rules from Crowdin prompt
  let universalRules = ""
  try {
    const currentUser = await getCurrentUser()
    universalRules = await getUniversalTranslationRules(
      currentUser.id,
      config.preTranslatePromptId
    )
  } catch (error) {
    console.warn(`[JSX-TRANSLATE] Could not fetch Crowdin prompt rules:`, error)
  }

  console.log(
    `[JSX-TRANSLATE] Loaded ${glossary.size} glossary terms, ${universalRules.length} chars of rules`
  )

  return { glossary, universalRules }
}

/**
 * CLI entry point for standalone execution
 */
async function main() {
  const parsed = parseArgs()

  if (!parsed) {
    console.log(`
Usage: npx ts-node translate-jsx-attributes.ts --language <code> --files <paths>

Options:
  --language, -l   Target language code (e.g., "es", "fr", "de")
  --files, -f      Comma-separated list of file paths to process

Example:
  npx ts-node translate-jsx-attributes.ts -l es -f public/content/roadmap/pbs/index.md
`)
    process.exit(1)
  }

  // Fetch translation context for consistency with main workflow
  const translationContext = await fetchTranslationContext(parsed.language)

  const fileContents = readFilesFromDisk(parsed.files)
  const result = await translateJsxAttributes({
    targetLanguage: parsed.language,
    files: fileContents,
    verbose: true,
    translationContext,
  })

  if (result.updatedFiles.length > 0) {
    writeFilesToDisk(result.updatedFiles)
    console.log(`\n✓ Updated ${result.updatedFiles.length} files`)
  } else {
    console.log(`\nNo files were modified`)
  }
}

// Run CLI if executed directly
if (require.main === module) {
  main().catch((err) => {
    console.error("Error:", err)
    process.exit(1)
  })
}
