/**
 * Ephemeral Prompts
 *
 * Manages Crowdin AI prompts that are created per-job and cleaned up after use.
 * Each prompt is uniquely named with language, key, and timestamp to avoid conflicts.
 *
 * Naming convention: eth-org-{lang}-{key}-{timestamp}
 * Example: eth-org-es-glossary-1702987200
 */

import { crowdinBearerHeaders } from "../../config"

import type { PromptResource } from "./prompt"

/** Parameters for creating an ephemeral prompt */
export interface CreateEphemeralPromptParams {
  /** Crowdin user ID (owner of the prompt) */
  userId: number
  /** Language code (e.g., "es", "fr", "de") */
  languageCode: string
  /** Prompt key (e.g., "glossary", "formal") */
  promptKey: string
  /** The full prompt text */
  promptText: string
  /** AI provider ID (optional, uses default if not specified) */
  aiProviderId?: number
  /** AI model ID (optional, uses default if not specified) */
  aiModelId?: string
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

/** Prefix for all ephemeral prompt names */
const EPHEMERAL_PREFIX = "eth-org"

/** Crowdin action type for pre-translation prompts */
const PRE_TRANSLATE_ACTION = "pre_translate"

/**
 * Generate a unique name for an ephemeral prompt
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
  } = params

  const promptName = generateEphemeralPromptName(languageCode, promptKey)
  console.log(`[EPHEMERAL-PROMPT] Creating prompt: ${promptName}`)

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

  console.log(
    `[EPHEMERAL-PROMPT] Created prompt: ${promptName} (ID: ${promptId})`
  )
  return { promptId, promptName }
}

/**
 * Delete an ephemeral AI prompt from Crowdin
 */
export async function deleteEphemeralPrompt(
  userId: number,
  promptId: number
): Promise<void> {
  console.log(`[EPHEMERAL-PROMPT] Deleting prompt ID: ${promptId}`)

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

  console.log(`[EPHEMERAL-PROMPT] Deleted prompt ID: ${promptId}`)
}
