/**
 * Initialize the Gemini direct translation workflow.
 * No Crowdin -- just fetch English files, glossary, and config.
 */

import { config } from "../../config"
import { createRateLimiter } from "../ai/rate-limiter"
import { getAllEnglishFiles } from "../github/files"
import {
  fetchGlossaryEntries,
  type GlossaryByLanguage,
  groupGlossaryByLanguage,
} from "../supabase/glossary"
import { fetchWithRetry } from "../utils/fetch"

import { logSection } from "./utils"

export interface GeminiWorkflowContext {
  englishFiles: Array<{
    path: string
    content: string
    type: "markdown" | "json"
  }>
  glossary: GlossaryByLanguage
  targetLanguages: string[]
}

/**
 * Download file content from GitHub.
 */
async function downloadFileContent(filePath: string): Promise<string> {
  const url = new URL(
    `https://api.github.com/repos/${config.ghOrganization}/${config.ghRepo}/contents/${filePath}`
  )
  url.searchParams.set("ref", config.baseBranch)
  const res = await fetchWithRetry(url.toString(), {
    headers: {
      Authorization: `Bearer ${process.env.I18N_GITHUB_API_KEY}`,
      Accept: "application/vnd.github.v3.raw",
    },
  })

  if (!res.ok) {
    throw new Error(`Failed to download ${filePath}: ${res.status}`)
  }

  return res.text()
}

/**
 * Initialize the workflow context.
 */
export async function geminiInitialize(): Promise<GeminiWorkflowContext> {
  logSection("Gemini Direct Translation - Initialize")

  // Fetch English file list
  console.log("[init] Fetching English source files...")
  const fileList = await getAllEnglishFiles()
  console.log(`[init] Found ${fileList.length} English files`)

  // Download file contents with bounded concurrency
  console.log("[init] Downloading file contents...")
  const englishFiles: GeminiWorkflowContext["englishFiles"] = []
  const downloadLimiter = createRateLimiter(10, 100)

  await Promise.all(
    fileList.map(async (file) => {
      await downloadLimiter.acquire()
      try {
        const content = await downloadFileContent(file.path)
        const type = file.path.endsWith(".json") ? "json" : "markdown"
        englishFiles.push({ path: file.path, content, type })
      } catch (error) {
        console.warn(
          `[init] Failed to download ${file.path}: ${error instanceof Error ? error.message : String(error)}`
        )
      } finally {
        downloadLimiter.release()
      }
    })
  )

  // Sort by path for deterministic ordering (concurrent download completes out of order)
  englishFiles.sort((a, b) => a.path.localeCompare(b.path))

  console.log(`[init] Downloaded ${englishFiles.length} files`)

  // Fetch glossary
  console.log("[init] Fetching glossary...")
  let glossary: GlossaryByLanguage = new Map()
  try {
    const entries = await fetchGlossaryEntries()
    glossary = groupGlossaryByLanguage(entries)
    console.log(
      `[init] Glossary loaded: ${entries.length} entries across ${glossary.size} languages`
    )
  } catch (error) {
    console.warn(
      `[init] Glossary fetch failed, proceeding without: ${error instanceof Error ? error.message : String(error)}`
    )
  }

  const targetLanguages = config.allInternalCodes

  console.log(`[init] Target languages: ${targetLanguages.join(", ")}`)
  console.log(`[init] Files to translate: ${englishFiles.length}`)

  return { englishFiles, glossary, targetLanguages }
}
