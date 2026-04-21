/**
 * Shared regex patterns and heuristics for the i18n pipeline.
 *
 * Single source of truth for patterns used across:
 *   - content-normalizer.ts
 *   - code-block-extractor.ts
 *   - manifest-generator.ts
 *   - jsx-attributes/
 *
 * All regex constants use the _RE suffix by convention.
 */

// ---------------------------------------------------------------------------
// Fenced code blocks
// ---------------------------------------------------------------------------

/**
 * Matches ``` or ~~~ fenced code blocks with optional language tag.
 * Handles both non-empty content and empty blocks (just fences, no body).
 *
 * WARNING: This regex uses the /g flag. When used with String.replace()
 * this is safe (replace resets lastIndex). When used with RegExp.exec()
 * in a loop, reset lastIndex to 0 before each new input string.
 *
 * Capture groups (non-empty block):
 *   1: indent, 2: fence chars, 3: language tag, 4: content
 * Capture groups (empty block):
 *   5: indent, 6: fence chars, 7: language tag
 */
export const FENCED_BLOCK_RE =
  /^([ \t]*)(```|~~~)([^\n]*)\n([\s\S]*?)\n\1\2[ \t]*$|^([ \t]*)(```|~~~)([^\n]*)\n\5\6[ \t]*$/gm

// ---------------------------------------------------------------------------
// JSX/HTML attributes
// ---------------------------------------------------------------------------

/**
 * Matches JSX/HTML-style attributes with quoted values.
 * Handles both double and single quotes, with escape sequences.
 *
 * Capture groups:
 *   1: attribute name, 2: double-quoted value, 3: single-quoted value
 */
export const ATTRIBUTE_RE =
  /\b([a-zA-Z][\w-]*)\s*=\s*(?:"([^"\\]*(?:\\.[^"\\]*)*)"|'([^'\\]*(?:\\.[^'\\]*)*)')/g

/**
 * Attributes that contain human-readable text requiring translation.
 * Used by both the JSX attribute translator and the content normalizer.
 */
export const TRANSLATABLE_ATTRIBUTES = [
  "title",
  "description",
  "alt",
  "label",
  "aria-label",
  "placeholder",
  "buttonLabel",
  "name",
  "caption",
  "contentPreview",
  "location",
] as const

export type TranslatableAttribute = (typeof TRANSLATABLE_ATTRIBUTES)[number]

// ---------------------------------------------------------------------------
// Translatable value heuristic
// ---------------------------------------------------------------------------

/**
 * Check if a string value looks like human-readable text that should
 * be translated, as opposed to a URL, path, variable, or identifier.
 *
 * Used for filtering JSX attribute values before sending to Gemini.
 */
export function isTranslatableValue(value: string): boolean {
  if (!value || value.length < 3) return false
  // Any URI scheme (http, https, ftp, mailto, data, javascript, etc.)
  if (/^[a-zA-Z][\w+.-]*:/.test(value)) return false
  // Absolute or relative paths
  if (/^[/.]/.test(value)) return false
  // Path-like values with slashes but no spaces (e.g., "images/foo")
  if (/\//.test(value) && !/\s/.test(value)) return false
  // File extensions
  if (/\.(png|jpg|svg|gif|json|md|webp|css|js|ts)$/i.test(value)) return false
  // JSX expressions / template variables
  if (/^\{.*\}$/.test(value)) return false
  // Single-word identifiers (camelCase, kebab-case, PascalCase)
  if (/^[a-zA-Z][a-zA-Z0-9-]*$/.test(value) && !value.includes(" "))
    return false
  // Numeric-only values
  if (/^[\d.,\s%$]+$/.test(value)) return false
  return true
}

// ---------------------------------------------------------------------------
// Frontmatter
// ---------------------------------------------------------------------------

/**
 * Matches YAML frontmatter at the start of a markdown file.
 * Capture group 1 is the entire frontmatter block including delimiters.
 */
export const FRONTMATTER_RE = /^(---\n[\s\S]*?\n---\n)/
