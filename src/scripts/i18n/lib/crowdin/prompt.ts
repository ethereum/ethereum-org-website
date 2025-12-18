import * as fs from "fs"

import { crowdinBearerHeaders } from "../../config"

/** Crowdin AI prompt resource type */
export type PromptResource = {
  id: number
  name: string
  action: string
  aiProviderId?: number | null
  aiModelId?: string | null
  model?: string | null
  version?: string | null
  config?: {
    companyDescription?: string
    projectDescription?: string
    audienceDescription?: string
    otherLanguageTranslations?: Record<string, unknown>
    glossaryTerms?: boolean
    tmSuggestions?: boolean
    publicPrompts?: number[]
  }
  prompt?: string
}

/** Delimiters for extracting universal translation rules from prompt */
const UNIVERSAL_RULES_START = "<!-- BEGIN UNIVERSAL TRANSLATION RULES -->"
const UNIVERSAL_RULES_END = "<!-- END UNIVERSAL TRANSLATION RULES -->"

/**
 * Get information about a Crowdin AI prompt including the model being used.
 * Uses Crowdin API v2: GET /users/{userId}/ai/prompts/{promptId}
 */
export async function getPromptInfo(
  userId: number,
  promptId: number
): Promise<PromptResource> {
  const url = `https://api.crowdin.com/api/v2/users/${userId}/ai/prompts/${promptId}`
  const resp = await fetch(url, {
    method: "GET",
    headers: crowdinBearerHeaders,
  })
  if (!resp.ok) {
    const text = await resp.text().catch(() => "")
    throw new Error(`Failed to get prompt info (${resp.status}): ${text}`)
  }
  const json = await resp.json()
  return json.data as PromptResource
}

/**
 * Update a Crowdin AI prompt's content from a local file.
 * Uses Crowdin API v2: PATCH /users/{userId}/ai/prompts/{promptId}
 */
export async function updatePromptFromFile(
  userId: number,
  promptId: number,
  filePath: string
): Promise<void> {
  const content = await fs.promises.readFile(filePath, "utf8")
  const url = `https://api.crowdin.com/api/v2/users/${userId}/ai/prompts/${promptId}`
  const resp = await fetch(url, {
    method: "PATCH",
    headers: {
      ...crowdinBearerHeaders,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ content }),
  })
  if (!resp.ok) {
    const text = await resp.text().catch(() => "")
    throw new Error(`Failed to update prompt (${resp.status}): ${text}`)
  }
}

/**
 * Fetch the full prompt text from Crowdin AI prompt.
 * Uses Crowdin API v2: GET /users/{userId}/ai/prompts/{promptId}
 */
export async function getPromptText(
  userId: number,
  promptId: number
): Promise<string> {
  const url = `https://api.crowdin.com/api/v2/users/${userId}/ai/prompts/${promptId}`
  const resp = await fetch(url, {
    method: "GET",
    headers: crowdinBearerHeaders,
  })
  if (!resp.ok) {
    const text = await resp.text().catch(() => "")
    throw new Error(`Failed to get prompt text (${resp.status}): ${text}`)
  }
  const json = await resp.json()
  const data = json.data as PromptResource
  return data.prompt ?? ""
}

/**
 * Extract the universal translation rules section from a prompt.
 * Returns only the content between the UNIVERSAL delimiters, or full prompt if not found.
 */
export function extractUniversalRules(promptText: string): string {
  const startIdx = promptText.indexOf(UNIVERSAL_RULES_START)
  const endIdx = promptText.indexOf(UNIVERSAL_RULES_END)

  if (startIdx === -1 || endIdx === -1 || endIdx <= startIdx) {
    // Delimiters not found, return full prompt (minus any Crowdin-specific section)
    const crowdinStart = promptText.indexOf("<!-- BEGIN CROWDIN-SPECIFIC")
    if (crowdinStart !== -1) {
      return promptText.slice(0, crowdinStart).trim()
    }
    return promptText
  }

  // Extract content between delimiters (excluding the delimiter comments themselves)
  return promptText
    .slice(startIdx + UNIVERSAL_RULES_START.length, endIdx)
    .trim()
}

/** Cached prompt text to avoid repeated API calls */
let cachedPromptText: string | null = null

/**
 * Get universal translation rules from Crowdin prompt (with caching).
 * Call once per workflow run to minimize API calls.
 */
export async function getUniversalTranslationRules(
  userId: number,
  promptId: number
): Promise<string> {
  if (cachedPromptText === null) {
    try {
      cachedPromptText = await getPromptText(userId, promptId)
      console.log("[PROMPT] Fetched Crowdin translation prompt")
    } catch (error) {
      console.warn("[PROMPT] Failed to fetch prompt, using empty:", error)
      cachedPromptText = ""
    }
  }
  return extractUniversalRules(cachedPromptText)
}

/**
 * Clear the cached prompt text (useful for testing)
 */
export function clearPromptCache(): void {
  cachedPromptText = null
}
