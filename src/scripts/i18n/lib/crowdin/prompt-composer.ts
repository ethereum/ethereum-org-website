/**
 * Prompt Composer
 *
 * Composes translation prompts from modular segments for use in Crowdin
 * pre-translation and Gemini JSX translation workflows.
 *
 * The prompt system uses:
 * - Segment files: Individual .md files in prompts/segments/
 * - Routing config: JSON file mapping file paths to required segments
 * - Glossary injection: EthGlossary terms added dynamically per language
 */

import * as fs from "fs"
import * as path from "path"

// ============================================================================
// GLOB MATCHING
// ============================================================================

/**
 * Simple glob pattern matching for file paths
 * Supports:
 * - ** (matches any path segments, including none)
 * - * (matches any characters except /)
 *
 * @param filePath - The file path to test
 * @param pattern - The glob pattern to match against
 * @returns true if the path matches the pattern
 */
function matchGlob(filePath: string, pattern: string): boolean {
  // Normalize path separators
  const normalizedPath = filePath.replace(/\\/g, "/")
  const normalizedPattern = pattern.replace(/\\/g, "/")

  // Convert glob pattern to regex
  const regexPattern = normalizedPattern
    // Escape regex special characters (except * which we handle specially)
    .replace(/[.+^${}()|[\]\\]/g, "\\$&")
    // ** matches any path segments (including none)
    .replace(/\*\*/g, "{{GLOBSTAR}}")
    // * matches any characters except /
    .replace(/\*/g, "[^/]*")
    // Replace GLOBSTAR placeholder with regex for any path
    .replace(/\{\{GLOBSTAR\}\}/g, ".*")

  const regex = new RegExp(`^${regexPattern}$`)
  return regex.test(normalizedPath)
}

// ============================================================================
// TYPES
// ============================================================================

/** Routing configuration schema */
export interface PromptRoutingConfig {
  /** Routes evaluated in order; first match wins */
  routes: Array<{
    /** Glob patterns to match file paths (array for flexibility) */
    patterns: string[]
    /** Segments to include for matching files */
    segments: string[]
    /** Human-readable description of the route */
    description?: string
  }>
  /** Segments included in all prompts */
  baseSegments: string[]
  /** Segments only included for Crowdin (not Gemini) */
  crowdinOnlySegments: string[]
}

/** Options for composing a prompt */
export interface ComposePromptOptions {
  /** Whether to include Crowdin-specific segments (default: true) */
  includeCrowdin?: boolean
  /** Language code for glossary injection */
  languageCode?: string
  /** Glossary terms for the language (if pre-fetched) */
  glossaryTerms?: Map<string, string>
  /** Enable verbose logging */
  verbose?: boolean
}

/** File grouped by prompt key for batching */
export interface FilesByPromptKey {
  /** The prompt key (e.g., "formal" or "informal") */
  promptKey: string
  /** Files that should use this prompt */
  filePaths: string[]
  /** Required segments for this group */
  segments: string[]
}

// ============================================================================
// CONSTANTS
// ============================================================================

/** Path to segments directory relative to this file */
const SEGMENTS_DIR = path.join(__dirname, "..", "..", "prompts", "segments")

/** Path to routing config relative to this file */
const ROUTING_CONFIG_PATH = path.join(
  __dirname,
  "..",
  "..",
  "prompts",
  "prompt-routing.json"
)

// ============================================================================
// SEGMENT LOADING
// ============================================================================

/** Cache for loaded segments */
const segmentCache = new Map<string, string>()

/** Cache for routing config */
let routingConfigCache: PromptRoutingConfig | null = null

/**
 * Load a segment file by name
 * @param segmentName - Name of the segment (without .md extension)
 * @returns Segment content
 */
export function loadSegment(segmentName: string): string {
  if (segmentCache.has(segmentName)) {
    return segmentCache.get(segmentName)!
  }

  const segmentPath = path.join(SEGMENTS_DIR, `${segmentName}.md`)

  if (!fs.existsSync(segmentPath)) {
    throw new Error(
      `Segment not found: ${segmentName} (looked at ${segmentPath})`
    )
  }

  const content = fs.readFileSync(segmentPath, "utf8").trim()
  segmentCache.set(segmentName, content)
  return content
}

/**
 * Load the routing configuration
 * @returns Parsed routing config
 */
export function loadRoutingConfig(): PromptRoutingConfig {
  if (routingConfigCache) {
    return routingConfigCache
  }

  if (!fs.existsSync(ROUTING_CONFIG_PATH)) {
    throw new Error(`Routing config not found: ${ROUTING_CONFIG_PATH}`)
  }

  const content = fs.readFileSync(ROUTING_CONFIG_PATH, "utf8")
  routingConfigCache = JSON.parse(content) as PromptRoutingConfig
  return routingConfigCache
}

/**
 * Clear all caches (useful for testing)
 */
export function clearPromptComposerCache(): void {
  segmentCache.clear()
  routingConfigCache = null
}

// ============================================================================
// PATH NORMALIZATION
// ============================================================================

/** Prefixes to strip from file paths for simplified matching */
const PATH_PREFIXES_TO_STRIP = [
  "public/content",
  "/public/content",
  "src/intl/en",
  "/src/intl/en",
]

/**
 * Normalize a file path for pattern matching
 * Strips known prefixes to allow simpler patterns like "/developers/docs/**"
 * @param filePath - The full file path
 * @returns Normalized path starting with /
 */
function normalizePathForMatching(filePath: string): string {
  let normalized = filePath.replace(/\\/g, "/")

  // Strip known prefixes
  for (const prefix of PATH_PREFIXES_TO_STRIP) {
    if (normalized.startsWith(prefix)) {
      normalized = normalized.slice(prefix.length)
      break
    }
  }

  // Ensure path starts with /
  if (!normalized.startsWith("/")) {
    normalized = "/" + normalized
  }

  return normalized
}

// ============================================================================
// ROUTE RESOLUTION
// ============================================================================

/**
 * Resolve which segments are needed for a given file path
 * @param filePath - The file path to match (e.g., "public/content/developers/docs/intro.md")
 * @returns Array of segment names that should be included
 */
export function resolveSegmentsForPath(filePath: string): string[] {
  const config = loadRoutingConfig()
  const normalizedPath = normalizePathForMatching(filePath)

  // Find first matching route
  for (const route of config.routes) {
    // Check if any pattern in the array matches
    for (const pattern of route.patterns) {
      if (matchGlob(normalizedPath, pattern)) {
        return route.segments
      }
    }
  }

  // No match found - this shouldn't happen if ** catch-all exists
  console.warn(
    `[PROMPT-COMPOSER] No route matched for path: ${filePath} (normalized: ${normalizedPath})`
  )
  return []
}

/**
 * Derive a prompt key from segments for grouping files
 * @param segments - Array of segment names
 * @returns A key string for grouping (e.g., "formal" or "informal")
 */
export function derivePromptKey(segments: string[]): string {
  // The tone segment determines the key
  if (segments.includes("tone-formal")) {
    return "formal"
  }
  if (segments.includes("tone-informal")) {
    return "informal"
  }
  // Fallback to hash of all segments
  return segments.sort().join("-") || "default"
}

/**
 * Group files by their prompt key for efficient batching
 * @param filePaths - Array of file paths
 * @returns Array of file groups, each with its prompt key and segments
 */
export function groupFilesByPromptKey(filePaths: string[]): FilesByPromptKey[] {
  const groups = new Map<string, FilesByPromptKey>()

  for (const filePath of filePaths) {
    const routeSegments = resolveSegmentsForPath(filePath)
    const promptKey = derivePromptKey(routeSegments)

    if (!groups.has(promptKey)) {
      groups.set(promptKey, {
        promptKey,
        filePaths: [],
        segments: routeSegments,
      })
    }
    groups.get(promptKey)!.filePaths.push(filePath)
  }

  return Array.from(groups.values())
}

// ============================================================================
// GLOSSARY FORMATTING
// ============================================================================

/**
 * Format glossary terms for inclusion in a prompt
 * @param glossaryTerms - Map of English term → translated term
 * @returns Formatted glossary section or empty string
 */
export function formatGlossarySection(
  glossaryTerms: Map<string, string>
): string {
  if (!glossaryTerms || glossaryTerms.size === 0) {
    return ""
  }

  const lines = Array.from(glossaryTerms.entries())
    .map(([term, translation]) => `- "${term}" → "${translation}"`)
    .join("\n")

  return `---

# REQUIRED TERMINOLOGY (EthGlossary)

The following terms have been approved by the community for this language. Use these exact translations when the English term appears in the source text.

${lines}`
}

// ============================================================================
// PROMPT COMPOSITION
// ============================================================================

/**
 * Compose a complete prompt from segments
 * @param routeSegments - Segments from the matched route (e.g., ["tone-formal"])
 * @param options - Composition options
 * @returns Complete prompt text
 */
export function composePrompt(
  routeSegments: string[],
  options: ComposePromptOptions = {}
): string {
  const { includeCrowdin = true, glossaryTerms, verbose = false } = options

  const config = loadRoutingConfig()

  // Collect all required segments in order
  const allSegments: string[] = [...config.baseSegments, ...routeSegments]

  // Add Crowdin-specific segments if requested
  if (includeCrowdin) {
    allSegments.push(...config.crowdinOnlySegments)
  }

  // Deduplicate while preserving order
  const uniqueSegments = [...new Set(allSegments)]

  if (verbose) {
    console.log(
      `[PROMPT-COMPOSER] Composing prompt with segments: ${uniqueSegments.join(", ")}`
    )
  }

  // Load and concatenate segments
  const parts: string[] = []

  for (const segmentName of uniqueSegments) {
    try {
      const content = loadSegment(segmentName)
      parts.push(content)
    } catch (error) {
      console.error(
        `[PROMPT-COMPOSER] Failed to load segment "${segmentName}":`,
        error
      )
      throw error
    }
  }

  // Add glossary section if provided
  if (glossaryTerms && glossaryTerms.size > 0) {
    const glossarySection = formatGlossarySection(glossaryTerms)
    if (glossarySection) {
      parts.push(glossarySection)
    }
  }

  const composedPrompt = parts.join("\n\n---\n\n")

  if (verbose) {
    console.log(
      `[PROMPT-COMPOSER] Composed prompt length: ${composedPrompt.length} characters`
    )
  }

  return composedPrompt
}

/**
 * Compose a prompt for a specific file path
 * Convenience function that resolves segments and composes in one call
 * @param filePath - The file path to compose a prompt for
 * @param options - Composition options
 * @returns Complete prompt text
 */
export function composePromptForPath(
  filePath: string,
  options: ComposePromptOptions = {}
): string {
  const routeSegments = resolveSegmentsForPath(filePath)
  return composePrompt(routeSegments, options)
}

/**
 * Compose a prompt for a prompt key (used when files are pre-grouped)
 * @param promptKey - The prompt key (e.g., "formal" or "informal")
 * @param options - Composition options
 * @returns Complete prompt text
 */
export function composePromptForKey(
  promptKey: string,
  options: ComposePromptOptions = {}
): string {
  // Derive segments from key
  const routeSegments =
    promptKey === "formal" ? ["tone-formal"] : ["tone-informal"]

  return composePrompt(routeSegments, options)
}

// ============================================================================
// VERBOSE LOGGING
// ============================================================================

/**
 * Log the full composed prompt for debugging
 * @param prompt - The composed prompt text
 * @param label - Label for the log output
 */
export function logFullPrompt(prompt: string, label: string): void {
  console.log(`\n${"=".repeat(80)}`)
  console.log(`[PROMPT-COMPOSER] ${label}`)
  console.log(`${"=".repeat(80)}`)
  console.log(prompt)
  console.log(`${"=".repeat(80)}\n`)
}
