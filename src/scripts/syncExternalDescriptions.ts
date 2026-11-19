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

import { slugify } from "@/lib/utils/url"

import { get, KEYS } from "@/data-layer/storage"

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
  resources: ToolItem[]
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

  for (const tool of toolsData.resources) {
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
    `Reading from ${process.env.USE_MOCK_DATA === "true" ? "mock data" : "Netlify Blobs"}...`
  )

  const [appsData, toolsData] = await Promise.all([
    get<Record<string, AppItem[]>>(KEYS.APPS),
    get<ToolsEnvelope>(KEYS.DEVELOPER_TOOLS),
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

  console.log(
    `Extracted ${Object.keys(appDescriptions).length} app descriptions`
  )
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
