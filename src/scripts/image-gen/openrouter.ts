/**
 * OpenRouter image API client. The key is read from the environment and only ever
 * placed in the Authorization header: nothing here logs it, and `scrub` is a backstop
 * for anything a provider might echo back.
 */

import { config } from "dotenv"

config({ path: ".env.local" })
config()

const API = "https://openrouter.ai/api/v1"

export const scrub = (s: string) =>
  s.replace(/sk-or-[\w-]+/g, "sk-or-[redacted]")

type EnumParam = { type: "enum"; values: string[] }
type RangeParam = { type: "range"; min: number; max: number }

export interface ImageModel {
  id: string
  supported_parameters: Record<string, EnumParam | RangeParam | undefined>
}

export const enumValues = (
  m: ImageModel,
  key: string
): string[] | undefined => {
  const p = m.supported_parameters[key]
  return p?.type === "enum" ? p.values : undefined
}

export const rangeMax = (m: ImageModel, key: string): number | undefined => {
  const p = m.supported_parameters[key]
  return p?.type === "range" ? p.max : undefined
}

/** Public endpoint, no key needed. */
export const fetchModels = async (): Promise<ImageModel[]> => {
  const res = await fetch(`${API}/images/models`)
  if (!res.ok) throw new Error(`GET /images/models: ${res.status}`)
  const json = (await res.json()) as { data?: ImageModel[] } | ImageModel[]
  return Array.isArray(json) ? json : (json.data ?? [])
}

export interface ImageResponse {
  data: { b64_json: string; media_type?: string }[]
  usage?: { cost?: number }
}

export const generate = async (
  body: Record<string, unknown>
): Promise<ImageResponse> => {
  const key = process.env.OPENROUTER_API_KEY
  if (!key) {
    throw new Error(
      "OPENROUTER_API_KEY is not set. Add it to .env.local (see .env.example)."
    )
  }
  const res = await fetch(`${API}/images`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
      "X-Title": "ethereum.org image-gen",
    },
    body: JSON.stringify(body),
    signal: AbortSignal.timeout(300_000),
  })
  if (!res.ok) {
    throw new Error(`POST /images: ${res.status} ${scrub(await res.text())}`)
  }
  return (await res.json()) as ImageResponse
}
