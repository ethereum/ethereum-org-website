import { DeveloperToolsResponse } from "@/lib/types"

import { fetchRetry } from "@/data-layer/fetchers/fetchRetry"

/**
 * Normalizes a URL field by ensuring it has an https:// protocol prefix.
 * Returns undefined for empty/whitespace-only values.
 */
function normalizeUrl(value: string | undefined): string | undefined {
  if (!value) return undefined
  const trimmed = value.trim()
  if (!trimmed) return undefined
  if (/^https?:\/\//i.test(trimmed)) return trimmed
  return `https://${trimmed}`
}

/**
 * Normalizes a Twitter/X social field into a full URL.
 * Handles bare handles (@foo, foo), partial URLs (x.com/foo, twitter.com/foo),
 * and full URLs.
 */
function normalizeTwitter(value: string | undefined): string | undefined {
  if (!value) return undefined
  const trimmed = value.trim()
  if (!trimmed) return undefined
  if (/^https?:\/\//i.test(trimmed)) return trimmed
  // Already a partial domain URL (x.com/..., twitter.com/...)
  if (/^(x\.com|twitter\.com)\//i.test(trimmed)) return `https://${trimmed}`
  // Bare handle with or without @
  const handle = trimmed.replace(/^@/, "")
  return `https://x.com/${handle}`
}

export async function fetchBuidlGuidl(): Promise<DeveloperToolsResponse[]> {
  const url =
    "https://raw.githubusercontent.com/BuidlGuidl/Developer-Tooling/refs/heads/main/output/results.json"

  console.log("Starting BuidlGuidl developer tooling data fetch")

  const response = await fetchRetry(url)

  if (!response.ok) {
    const status = response.status
    console.warn("GitHub developer apps fetch non-OK", { status, url })
    const error = `GitHub responded with status ${status}`
    throw new Error(error)
  }

  const json: DeveloperToolsResponse[] = await response.json()

  console.log("Successfully fetched BuidlGuidl developer tooling data")

  return json.map((tool) => ({
    ...tool,
    website: normalizeUrl(tool.website),
    twitter: normalizeTwitter(tool.twitter),
  }))
}
