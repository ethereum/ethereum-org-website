import * as fs from "fs"

import { crowdinBearerHeaders } from "../../config"

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
