/**
 * Sync external data descriptions into i18n namespace files.
 *
 * Reads app and tool data from Netlify Blobs (or local mocks),
 * extracts descriptions, and writes them to src/intl/en/ as
 * JSON namespace files for the translation pipeline.
 *
 * Run by the i18n-sync-external-descriptions GitHub Action (weekly).
 * Change detection is handled by git diff in the workflow, not this script.
 */

import * as fs from "fs"
import * as path from "path"

import { getStore } from "@netlify/blobs"

// Replicate slugify from src/lib/utils/url.ts to avoid importing app code.
// IMPORTANT: Keep in sync with the canonical version in src/lib/utils/url.ts.
// Follow-up: consider extracting slugify into a dependency-free module both can import.
function slugify(text: string): string {
  return encodeURIComponent(
    text
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "")
  )
}

// ── Storage access (mirrors src/data-layer/storage.ts) ──────────────────────

const USE_MOCK = process.env.USE_MOCK_DATA === "true"

let blobStore: ReturnType<typeof getStore> | null = null

function getBlobs() {
  if (blobStore) return blobStore

  const siteID = process.env.NETLIFY_SITE_ID || process.env.SITE_ID
  const token = process.env.NETLIFY_BLOBS_TOKEN

  if (!siteID || !token) {
    throw new Error(
      "Missing NETLIFY_SITE_ID or NETLIFY_BLOBS_TOKEN. " +
        "Set USE_MOCK_DATA=true for local development."
    )
  }

  blobStore = getStore({
    name: process.env.BLOB_STORE_NAME || "data-layer",
    siteID,
    token,
  } as Parameters<typeof getStore>[0])

  return blobStore
}

async function readBlob<T>(key: string): Promise<T | null> {
  if (USE_MOCK) {
    const mockPath = path.resolve(
      process.cwd(),
      `src/data-layer/mocks/${key}.json`
    )
    if (!fs.existsSync(mockPath)) return null
    return JSON.parse(fs.readFileSync(mockPath, "utf-8")) as T
  }

  const blob = await getBlobs().get(key, { type: "text" })
  return blob ? (JSON.parse(blob) as T) : null
}

// ── Types (minimal, matching data-layer shapes) ─────────────────────────────

interface AppItem {
  name: string
  description: string
}

interface ToolItem {
  name: string
  description: string
}

interface ToolsEnvelope {
  toolsById: Record<string, ToolItem>
}

// ── Extraction ──────────────────────────────────────────────────────────────

function extractAppDescriptions(
  appsData: Record<string, AppItem[]>
): Record<string, string> {
  const namespace: Record<string, string> = {}

  for (const apps of Object.values(appsData)) {
    for (const app of apps) {
      if (!app.name || !app.description) continue
      const key = `app-${slugify(app.name)}-description`
      namespace[key] = app.description
    }
  }

  return namespace
}

function extractToolDescriptions(
  toolsData: ToolsEnvelope
): Record<string, string> {
  const namespace: Record<string, string> = {}

  for (const tool of Object.values(toolsData.toolsById)) {
    if (!tool.name || !tool.description) continue
    const key = `tool-${slugify(tool.name)}-description`
    namespace[key] = tool.description
  }

  return namespace
}

// ── File I/O ────────────────────────────────────────────────────────────────

const INTL_DIR = path.resolve(process.cwd(), "src/intl/en")

function writeNamespace(filename: string, data: Record<string, string>): void {
  const filePath = path.join(INTL_DIR, filename)

  // Sort keys for stable diffs
  const sorted: Record<string, string> = {}
  for (const key of Object.keys(data).sort()) {
    sorted[key] = data[key]
  }

  fs.writeFileSync(filePath, JSON.stringify(sorted, null, 2) + "\n", "utf-8")
}

// ── Main ────────────────────────────────────────────────────────────────────

async function main() {
  console.log(
    `Reading from ${USE_MOCK ? "mock data" : "Netlify Blobs"}...`
  )

  const [appsData, toolsData] = await Promise.all([
    readBlob<Record<string, AppItem[]>>("fetch-apps"),
    readBlob<ToolsEnvelope>("fetch-developer-tools"),
  ])

  if (!appsData) {
    console.error("Failed to read apps data")
    process.exit(2)
  }

  if (!toolsData) {
    console.error("Failed to read developer tools data")
    process.exit(2)
  }

  const appDescriptions = extractAppDescriptions(appsData)
  const toolDescriptions = extractToolDescriptions(toolsData)

  console.log(`Extracted ${Object.keys(appDescriptions).length} app descriptions`)
  console.log(
    `Extracted ${Object.keys(toolDescriptions).length} tool descriptions`
  )

  writeNamespace("page-app-descriptions.json", appDescriptions)
  writeNamespace("page-developers-tools-descriptions.json", toolDescriptions)

  console.log("Namespace files written. Use git diff to check for changes.")
}

main().catch((err) => {
  console.error("Fatal error:", err)
  process.exit(1)
})
