import { crowdinBearerHeaders } from "../../config"

type PromptResource = {
  id: number
  name: string
  action: string
  aiProviderId?: number | null
  model?: string | null
  version?: string | null
}

export async function getPromptModelKey(
  userId: number,
  promptId: number
): Promise<string> {
  const url = `https://api.crowdin.com/api/v2/users/${userId}/ai/prompts/${promptId}`
  const resp = await fetch(url, { headers: crowdinBearerHeaders })
  if (!resp.ok) {
    throw new Error(
      `Failed to fetch prompt metadata: ${resp.status} ${await resp.text()}`
    )
  }
  const json: { data?: PromptResource } = await resp.json()
  const data: PromptResource = json.data ?? ({} as PromptResource)
  const provider = data.aiProviderId ?? "provider"
  const model = data.model ?? "model"
  const version = data.version ?? "version"
  return `${provider}:${model}:${version}`
}
