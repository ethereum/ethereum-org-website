/**
 * JSON batching and HTML placeholder extraction for large JSON translation.
 *
 * For large JSON files (>120 top-level keys), splits into ~100-key batches
 * to stay within Gemini's reliable output range.
 *
 * For JSON values containing embedded HTML (<a>, <strong>, <br/>, etc.),
 * extracts tags to numbered placeholders before translation and restores
 * them after. This prevents Gemini from mangling or dropping HTML structure.
 */

type JsonValue =
  | string
  | number
  | boolean
  | null
  | JsonValue[]
  | { [key: string]: JsonValue }

interface PlaceholderEntry {
  placeholder: string
  original: string
}

/** Map of JSON path -> placeholder entries for that value */
export type PlaceholderMap = Map<string, PlaceholderEntry[]>

export interface PreparedJsonBatches {
  /** JSON strings with HTML extracted, ready for Gemini */
  batchContents: string[]
  /** Per-batch placeholder maps for HTML restoration */
  placeholderMaps: PlaceholderMap[]
  /** Whether any HTML was actually extracted */
  htmlExtracted: boolean
  /** Total top-level key count */
  totalKeys: number
  /** Key count per batch (for logging) */
  batchSizes: number[]
}

/** Keys per Gemini request */
const BATCH_SIZE = 100
/** Avoid tiny final batches -- absorb up to this many extra keys */
const BATCH_BUFFER = 20

/** HTML tag pattern: opening, closing, and self-closing tags */
const HTML_TAG_RE = /<\/?[a-zA-Z][^>]*\/?>/g

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/**
 * Prepare a JSON file for batched translation.
 *
 * 1. Parses the JSON
 * 2. Splits top-level keys into batches (~100 per batch)
 * 3. Extracts HTML tags from string values, replacing with placeholders
 * 4. Returns batch contents ready for Gemini + restoration maps
 */
export function prepareJsonBatches(jsonContent: string): PreparedJsonBatches {
  const parsed = JSON.parse(jsonContent) as Record<string, JsonValue>
  const keys = Object.keys(parsed)
  const keyBatches = splitIntoBatches(keys, BATCH_SIZE, BATCH_BUFFER)

  let htmlExtracted = false
  const batchContents: string[] = []
  const placeholderMaps: PlaceholderMap[] = []
  const batchSizes: number[] = []

  for (const batchKeys of keyBatches) {
    // Build sub-object for this batch
    const batchObj: Record<string, JsonValue> = {}
    for (const key of batchKeys) {
      batchObj[key] = parsed[key]
    }

    // Extract HTML from string values
    const placeholderMap: PlaceholderMap = new Map()
    const sanitized = extractHtmlFromObject(batchObj, placeholderMap)

    if (placeholderMap.size > 0) htmlExtracted = true

    batchContents.push(JSON.stringify(sanitized, null, 2))
    placeholderMaps.push(placeholderMap)
    batchSizes.push(batchKeys.length)
  }

  return {
    batchContents,
    placeholderMaps,
    htmlExtracted,
    totalKeys: keys.length,
    batchSizes,
  }
}

/**
 * Restore HTML tags in a translated JSON batch from its placeholder map.
 *
 * Returns the restored JSON string and a list of any placeholder failures
 * (missing placeholders that could not be restored).
 */
export function restoreJsonBatch(
  translatedJson: string,
  placeholderMap: PlaceholderMap
): { content: string; failures: string[] } {
  if (placeholderMap.size === 0) {
    return { content: translatedJson, failures: [] }
  }

  const parsed = JSON.parse(translatedJson) as Record<string, JsonValue>
  const failures: string[] = []
  const restored = restoreHtmlInObject(parsed, placeholderMap, "", failures)
  return {
    content: JSON.stringify(restored, null, 2),
    failures,
  }
}

/**
 * Merge multiple translated JSON batch strings into a single JSON string.
 * Preserves key order from the original batches.
 */
export function mergeJsonBatches(batchContents: string[]): string {
  if (batchContents.length === 1) return batchContents[0]

  const merged: Record<string, JsonValue> = {}
  for (const content of batchContents) {
    const parsed = JSON.parse(content) as Record<string, JsonValue>
    Object.assign(merged, parsed)
  }
  return JSON.stringify(merged, null, 2)
}

/**
 * Check whether a JSON file needs batching (has more keys than the threshold).
 */
export function needsBatching(jsonContent: string): boolean {
  const parsed = JSON.parse(jsonContent) as Record<string, JsonValue>
  return Object.keys(parsed).length > BATCH_SIZE + BATCH_BUFFER
}

// ---------------------------------------------------------------------------
// Batching
// ---------------------------------------------------------------------------

function splitIntoBatches(
  keys: string[],
  size: number,
  buffer: number
): string[][] {
  if (keys.length <= size + buffer) return [keys]

  const batches: string[][] = []
  for (let i = 0; i < keys.length; i += size) {
    const remaining = keys.length - i
    // If remaining fits in one more batch (with buffer), take it all
    if (remaining <= size + buffer) {
      batches.push(keys.slice(i))
      break
    }
    batches.push(keys.slice(i, i + size))
  }
  return batches
}

// ---------------------------------------------------------------------------
// HTML extraction (pre-translation)
// ---------------------------------------------------------------------------

function extractHtmlFromObject(
  obj: Record<string, JsonValue>,
  map: PlaceholderMap,
  prefix = ""
): Record<string, JsonValue> {
  const result: Record<string, JsonValue> = {}
  for (const [key, value] of Object.entries(obj)) {
    const path = prefix ? `${prefix}.${key}` : key
    result[key] = extractHtmlFromValue(value, map, path)
  }
  return result
}

function extractHtmlFromValue(
  value: JsonValue,
  map: PlaceholderMap,
  path: string
): JsonValue {
  if (typeof value === "string") {
    return extractHtmlFromString(value, map, path)
  }
  if (Array.isArray(value)) {
    return value.map((item, i) =>
      extractHtmlFromValue(item, map, `${path}[${i}]`)
    )
  }
  if (value !== null && typeof value === "object") {
    return extractHtmlFromObject(
      value as Record<string, JsonValue>,
      map,
      path
    )
  }
  return value
}

function extractHtmlFromString(
  text: string,
  map: PlaceholderMap,
  path: string
): string {
  const entries: PlaceholderEntry[] = []
  let counter = 0

  const result = text.replace(HTML_TAG_RE, (match) => {
    const placeholder = `<!-- HTML_${counter} -->`
    entries.push({ placeholder, original: match })
    counter++
    return placeholder
  })

  if (entries.length > 0) {
    map.set(path, entries)
  }
  return result
}

// ---------------------------------------------------------------------------
// HTML restoration (post-translation)
// ---------------------------------------------------------------------------

function restoreHtmlInObject(
  obj: Record<string, JsonValue>,
  map: PlaceholderMap,
  prefix: string,
  failures: string[]
): Record<string, JsonValue> {
  const result: Record<string, JsonValue> = {}
  for (const [key, value] of Object.entries(obj)) {
    const path = prefix ? `${prefix}.${key}` : key
    result[key] = restoreHtmlInValue(value, map, path, failures)
  }
  return result
}

function restoreHtmlInValue(
  value: JsonValue,
  map: PlaceholderMap,
  path: string,
  failures: string[]
): JsonValue {
  if (typeof value === "string") {
    return restoreHtmlInString(value, map, path, failures)
  }
  if (Array.isArray(value)) {
    return value.map((item, i) =>
      restoreHtmlInValue(item, map, `${path}[${i}]`, failures)
    )
  }
  if (value !== null && typeof value === "object") {
    return restoreHtmlInObject(
      value as Record<string, JsonValue>,
      map,
      path,
      failures
    )
  }
  return value
}

function restoreHtmlInString(
  text: string,
  map: PlaceholderMap,
  path: string,
  failures: string[]
): string {
  const entries = map.get(path)
  if (!entries) return text

  let result = text
  for (const { placeholder, original } of entries) {
    if (!result.includes(placeholder)) {
      failures.push(`${path}: missing ${placeholder} (was: ${original})`)
      continue
    }
    result = result.replace(placeholder, original)
  }
  return result
}
