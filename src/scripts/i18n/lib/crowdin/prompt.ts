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
}

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
  await updatePromptContent(userId, promptId, content)
}

/**
 * Update a Crowdin AI prompt with provided content.
 * Uses Crowdin API v2: PATCH /users/{userId}/ai/prompts/{promptId}
 */
export async function updatePromptContent(
  userId: number,
  promptId: number,
  content: string
): Promise<void> {
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
