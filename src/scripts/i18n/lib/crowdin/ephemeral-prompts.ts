/**
 * Ephemeral Prompts
 *
 * Manages Crowdin AI prompts that are created per-job and cleaned up after use.
 * Each prompt is uniquely named with language, key, and timestamp to avoid conflicts.
 *
 * Naming convention: eth-org-{lang}-{key}-{timestamp}
 * Example: eth-org-es-formal-1702987200
 */

import { crowdinBearerHeaders } from "../../config"

import type { PromptResource } from "./prompt"

// ============================================================================
// TYPES
// ============================================================================

/** Parameters for creating an ephemeral prompt */
export interface CreateEphemeralPromptParams {
  /** Crowdin user ID (owner of the prompt) */
  userId: number
  /** Language code (e.g., "es", "fr", "de") */
  languageCode: string
  /** Prompt key (e.g., "formal", "informal") */
  promptKey: string
  /** The full prompt text */
  promptText: string
  /** AI provider ID (optional, uses default if not specified) */
  aiProviderId?: number
  /** AI model ID (optional, uses default if not specified) */
  aiModelId?: string
  /** Enable verbose logging */
  verbose?: boolean
}

/** Result of creating an ephemeral prompt */
export interface EphemeralPromptResult {
  /** The created prompt's ID */
  promptId: number
  /** The prompt's unique name */
  promptName: string
}

/** Crowdin API response for prompt creation */
interface CrowdinCreatePromptResponse {
  data: PromptResource
}

// ============================================================================
// CONSTANTS
// ============================================================================

/** Prefix for all ephemeral prompt names */
const EPHEMERAL_PREFIX = "eth-org"

/** Crowdin action type for pre-translation prompts */
const PRE_TRANSLATE_ACTION = "pre_translate"

// ============================================================================
// PROMPT LIFECYCLE
// ============================================================================

/**
 * Generate a unique name for an ephemeral prompt
 * @param languageCode - Language code (e.g., "es")
 * @param promptKey - Prompt key (e.g., "formal")
 * @returns Unique prompt name
 */
export function generateEphemeralPromptName(
  languageCode: string,
  promptKey: string
): string {
  const timestamp = Math.floor(Date.now() / 1000)
  return `${EPHEMERAL_PREFIX}-${languageCode}-${promptKey}-${timestamp}`
}

/**
 * Create an ephemeral AI prompt in Crowdin
 *
 * Uses Crowdin API v2: POST /users/{userId}/ai/prompts
 * https://support.crowdin.com/developer/api/v2/#tag/AI/operation/api.users.ai.prompts.post
 *
 * @param params - Prompt creation parameters
 * @returns The created prompt's ID and name
 */
export async function createEphemeralPrompt(
  params: CreateEphemeralPromptParams
): Promise<EphemeralPromptResult> {
  const {
    userId,
    languageCode,
    promptKey,
    promptText,
    aiProviderId,
    aiModelId,
    verbose = false,
  } = params

  const promptName = generateEphemeralPromptName(languageCode, promptKey)

  if (verbose) {
    console.log(`[EPHEMERAL-PROMPT] Creating prompt: ${promptName}`)
    console.log(
      `[EPHEMERAL-PROMPT] Prompt length: ${promptText.length} characters`
    )
  }

  const url = `https://api.crowdin.com/api/v2/users/${userId}/ai/prompts`

  const body: Record<string, unknown> = {
    name: promptName,
    action: PRE_TRANSLATE_ACTION,
    config: {
      mode: "advanced",
      prompt: promptText,
      glossaryTerms: true,
      tmSuggestions: true,
    },
  }

  // Add optional AI provider/model if specified
  if (aiProviderId !== undefined) {
    body.aiProviderId = aiProviderId
  }
  if (aiModelId !== undefined) {
    body.aiModelId = aiModelId
  }

  const response = await fetch(url, {
    method: "POST",
    headers: {
      ...crowdinBearerHeaders,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  })

  if (!response.ok) {
    const text = await response.text().catch(() => "")
    throw new Error(
      `Failed to create ephemeral prompt "${promptName}" (${response.status}): ${text}`
    )
  }

  const json = (await response.json()) as CrowdinCreatePromptResponse
  const promptId = json.data.id

  if (verbose) {
    console.log(
      `[EPHEMERAL-PROMPT] Created prompt: ${promptName} (ID: ${promptId})`
    )
  }

  return { promptId, promptName }
}

/**
 * Delete an ephemeral AI prompt from Crowdin
 *
 * Uses Crowdin API v2: DELETE /users/{userId}/ai/prompts/{promptId}
 * https://support.crowdin.com/developer/api/v2/#tag/AI/operation/api.users.ai.prompts.delete
 *
 * @param userId - Crowdin user ID (owner of the prompt)
 * @param promptId - ID of the prompt to delete
 * @param verbose - Enable verbose logging
 */
export async function deleteEphemeralPrompt(
  userId: number,
  promptId: number,
  verbose = false
): Promise<void> {
  if (verbose) {
    console.log(`[EPHEMERAL-PROMPT] Deleting prompt ID: ${promptId}`)
  }

  const url = `https://api.crowdin.com/api/v2/users/${userId}/ai/prompts/${promptId}`

  const response = await fetch(url, {
    method: "DELETE",
    headers: crowdinBearerHeaders,
  })

  // 204 No Content is success, 404 is also acceptable (already deleted)
  if (!response.ok && response.status !== 404) {
    const text = await response.text().catch(() => "")
    throw new Error(
      `Failed to delete ephemeral prompt ${promptId} (${response.status}): ${text}`
    )
  }

  if (verbose) {
    if (response.status === 404) {
      console.log(`[EPHEMERAL-PROMPT] Prompt ${promptId} already deleted (404)`)
    } else {
      console.log(`[EPHEMERAL-PROMPT] Deleted prompt ID: ${promptId}`)
    }
  }
}

/**
 * Delete multiple ephemeral prompts in sequence
 *
 * Continues even if some deletions fail (logs warnings but doesn't throw)
 *
 * @param userId - Crowdin user ID
 * @param promptIds - Array of prompt IDs to delete
 * @param verbose - Enable verbose logging
 */
export async function deleteEphemeralPrompts(
  userId: number,
  promptIds: number[],
  verbose = false
): Promise<void> {
  if (promptIds.length === 0) {
    if (verbose) {
      console.log("[EPHEMERAL-PROMPT] No prompts to delete")
    }
    return
  }

  if (verbose) {
    console.log(
      `[EPHEMERAL-PROMPT] Cleaning up ${promptIds.length} ephemeral prompts`
    )
  }

  for (const promptId of promptIds) {
    try {
      await deleteEphemeralPrompt(userId, promptId, verbose)
    } catch (error) {
      // Log but continue - we want to clean up as many as possible
      console.warn(
        `[EPHEMERAL-PROMPT] Warning: Failed to delete prompt ${promptId}:`,
        (error as Error).message
      )
    }
  }

  if (verbose) {
    console.log("[EPHEMERAL-PROMPT] Cleanup complete")
  }
}

// ============================================================================
// PROMPT LISTING (for cleanup/debugging)
// ============================================================================

/**
 * List all ephemeral prompts for a user (filtered by our naming prefix)
 *
 * Uses Crowdin API v2: GET /users/{userId}/ai/prompts
 * https://support.crowdin.com/developer/api/v2/#tag/AI/operation/api.users.ai.prompts.getMany
 *
 * @param userId - Crowdin user ID
 * @param verbose - Enable verbose logging
 * @returns Array of ephemeral prompt resources
 */
export async function listEphemeralPrompts(
  userId: number,
  verbose = false
): Promise<PromptResource[]> {
  const allPrompts: PromptResource[] = []
  let offset = 0
  const limit = 100
  let hasMore = true

  while (hasMore) {
    const url = new URL(
      `https://api.crowdin.com/api/v2/users/${userId}/ai/prompts`
    )
    url.searchParams.set("limit", limit.toString())
    url.searchParams.set("offset", offset.toString())

    const response = await fetch(url.toString(), {
      method: "GET",
      headers: crowdinBearerHeaders,
    })

    if (!response.ok) {
      const text = await response.text().catch(() => "")
      throw new Error(`Failed to list prompts (${response.status}): ${text}`)
    }

    const json = await response.json()
    const prompts = json.data as PromptResource[]

    if (prompts.length === 0) {
      hasMore = false
    } else {
      // Filter to only ephemeral prompts (those with our prefix)
      const ephemeralPrompts = prompts.filter((p) =>
        p.name.startsWith(EPHEMERAL_PREFIX + "-")
      )
      allPrompts.push(...ephemeralPrompts)
      offset += limit
    }
  }

  if (verbose) {
    console.log(
      `[EPHEMERAL-PROMPT] Found ${allPrompts.length} ephemeral prompts`
    )
    for (const p of allPrompts) {
      console.log(`  - ${p.name} (ID: ${p.id})`)
    }
  }

  return allPrompts
}

/**
 * Clean up all stale ephemeral prompts older than a threshold
 *
 * Parses timestamp from prompt names and deletes those older than maxAgeMs
 *
 * @param userId - Crowdin user ID
 * @param maxAgeMs - Maximum age in milliseconds (default: 24 hours)
 * @param verbose - Enable verbose logging
 * @returns Number of prompts deleted
 */
export async function cleanupStalePrompts(
  userId: number,
  maxAgeMs = 24 * 60 * 60 * 1000, // 24 hours
  verbose = false
): Promise<number> {
  const prompts = await listEphemeralPrompts(userId, verbose)
  const now = Date.now()
  const stalePromptIds: number[] = []

  for (const prompt of prompts) {
    // Extract timestamp from name: eth-org-{lang}-{key}-{timestamp}
    const parts = prompt.name.split("-")
    const timestampStr = parts[parts.length - 1]
    const timestamp = parseInt(timestampStr, 10)

    if (!isNaN(timestamp)) {
      const ageMs = now - timestamp * 1000
      if (ageMs > maxAgeMs) {
        stalePromptIds.push(prompt.id)
        if (verbose) {
          const ageHours = Math.round(ageMs / (60 * 60 * 1000))
          console.log(
            `[EPHEMERAL-PROMPT] Stale: ${prompt.name} (${ageHours}h old)`
          )
        }
      }
    }
  }

  if (stalePromptIds.length > 0) {
    await deleteEphemeralPrompts(userId, stalePromptIds, verbose)
  }

  if (verbose) {
    console.log(
      `[EPHEMERAL-PROMPT] Cleaned up ${stalePromptIds.length} stale prompts`
    )
  }

  return stalePromptIds.length
}
