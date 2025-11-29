// NOTE: language-trust.json now uses ONLY internal codes (see i18n.config.json 'code' field)
import fs from "fs"
import path from "path"

type TrustBucket = {
  lastUpdated?: string
  Aplus?: string[]
  A?: string[]
  Aminus?: string[]
  Bplus?: string[]
  B?: string[]
  Bminus?: string[]
  Cplus?: string[]
  C?: string[]
  Dplus?: string[]
}

type TrustMatrix = Record<string, TrustBucket>

export type QaLevel = "skip" | "copilot" | "copilot+claude"

export function loadTrustMatrix(): TrustMatrix {
  const p = path.join(
    process.cwd(),
    "src/scripts/i18n/config/language-trust.json"
  )
  try {
    const raw = fs.readFileSync(p, "utf8")
    return JSON.parse(raw)
  } catch {
    return { default: {} }
  }
}

/**
 * Find the most recent model key in the trust matrix by lastUpdated timestamp
 */
export function getMostRecentModelKey(matrix: TrustMatrix): string | null {
  let mostRecent: string | null = null
  let latestTime = 0
  for (const [key, bucket] of Object.entries(matrix)) {
    if (bucket.lastUpdated) {
      const timestamp = new Date(bucket.lastUpdated).getTime()
      if (timestamp > latestTime) {
        latestTime = timestamp
        mostRecent = key
      }
    }
  }
  return mostRecent
}

export function planQaForLanguages(
  languageIds: string[],
  modelKey?: string
): Record<string, QaLevel> {
  const matrix = loadTrustMatrix()
  // Try to use the specified model, fallback to most recent, then default
  let bucket: TrustBucket = {}
  if (modelKey && matrix[modelKey]) {
    bucket = matrix[modelKey]
    console.log(`[QA-ROUTING] Using trust matrix for model: ${modelKey}`)
  } else {
    const fallbackKey = getMostRecentModelKey(matrix) || "default"
    bucket = matrix[fallbackKey] || {}
    if (modelKey) {
      console.log(
        `[QA-ROUTING] Model "${modelKey}" not found, using fallback: ${fallbackKey}`
      )
    } else {
      console.log(`[QA-ROUTING] Using fallback trust matrix: ${fallbackKey}`)
    }
  }

  const groupIndex = new Map<string, QaLevel>([
    ["Aplus", "skip"],
    ["A", "skip"],
    ["Aminus", "skip"],
    ["Bplus", "copilot"],
    ["B", "copilot"],
    ["Bminus", "copilot"],
    ["Cplus", "copilot+claude"],
    ["C", "copilot+claude"],
    ["Dplus", "copilot+claude"],
  ])

  const index = new Map<string, QaLevel>()
  for (const [group, list] of Object.entries(bucket)) {
    if (group === "lastUpdated") continue // skip metadata
    const level = groupIndex.get(group as string)
    if (!level) continue
    for (const code of list || []) index.set(code, level)
  }

  const plan: Record<string, QaLevel> = {}
  // All languageIds should be internal codes (not Crowdin codes)
  for (const lang of languageIds) {
    plan[lang] = index.get(lang) || "copilot" // conservative default
  }
  return plan
}
