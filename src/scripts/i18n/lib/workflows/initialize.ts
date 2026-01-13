// Workflow initialization phase

import { config, validateTargetPath } from "../../config"
import { getCrowdinProjectFiles } from "../crowdin/files"
import { fetchGlossaryEntries, groupGlossaryByLanguage } from "../supabase"

import type { WorkflowContext } from "./types"
import { logSection } from "./utils"

/**
 * Initialize workflow: validate config, log settings, fetch Crowdin state
 */
export async function initializeWorkflow(): Promise<WorkflowContext> {
  const { targetPath } = config

  logSection("Crowdin AI Translation Import")
  console.log(`Target languages: ${config.allCrowdinCodes.join(", ")}`)

  if (targetPath) {
    const isFile = targetPath.endsWith(".md") || targetPath.endsWith(".json")
    console.log(`Mode: ${isFile ? "Single file" : "Directory"} (${targetPath})`)

    // Validate target path is in allowed location
    try {
      validateTargetPath(targetPath)
    } catch (e) {
      console.error(e instanceof Error ? e.message : String(e))
      process.exit(1)
    }
  } else {
    console.log(`Mode: Full translation (all files)`)
  }

  // Fetch Crowdin project state
  const crowdinProjectFiles = await getCrowdinProjectFiles()

  // Fetch glossary from Supabase (graceful degradation if unavailable)
  const glossaryEntries = await fetchGlossaryEntries()
  const glossary = groupGlossaryByLanguage(glossaryEntries)
  console.log(
    `[INIT] Loaded glossary: ${glossaryEntries.length} terms across ${glossary.size} languages`
  )

  // Initialize shared state
  return {
    crowdinProjectFiles,
    fileIdsSet: new Set<number>(),
    processedFileIdToPath: {},
    englishBuffers: {},
    glossary,
  }
}
