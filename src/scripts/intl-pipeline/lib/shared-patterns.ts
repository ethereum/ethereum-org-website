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

/**
 * Fence language tags whose body is prose, not code -- the only fences whose
 * contents may be translated.
 *
 * An untagged fence (`""`) is deliberately absent. It used to be treated as
 * prose, which sent every untagged fence body to the model and is how German
 * words ended up inside a reproduced `clef` console transcript. Prose that
 * wants translating must say so with an explicit ```text tag. Matches
 * `intl-content-tree`'s `proseFenceTags` default.
 *
 * Lives here so the normalizer (which decides what to send) and
 * `verify-structure` (which checks what came back) cannot drift apart -- them
 * disagreeing is the bug this constant was extracted to prevent.
 */
export const PROSE_FENCE_TAGS: ReadonlySet<string> = new Set([
  "md",
  "markdown",
  "mdx",
  "text",
  "txt",
])

/**
 * Split a document into alternating prose and code segments.
 *
 * `split()` with a capturing group yields prose at even indices and code at
 * odd ones, which is why every call site reads `if (i % 2 === 1) continue`.
 *
 * The inline-code alternative excludes newlines deliberately. A CommonMark
 * code span never spans a line, but `` `[^`]+` `` happily does: because the
 * alternation matches leftmost, one stray backtick in prose pairs with the
 * first backtick of the next fence, and every line between them -- headings,
 * JSX tags, anchors -- is handed back as "code" and skipped. That is how the
 * empty-anchor fixer cleared 8 of the 11 anchors in `developers/docs/networks`
 * and left 3 for the gate to fail on, in all 24 locales.
 *
 * Shared rather than redeclared so a fix lands everywhere at once;
 * `tests/unit/intl-pipeline/prose-segments.spec.ts` keeps local copies from
 * creeping back in.
 */
export const CODE_SPLIT_RE = /(```[\s\S]*?```|~~~[\s\S]*?~~~|`[^`\n]+`)/g

/**
 * Like {@link CODE_SPLIT_RE}, but inline code counts as prose.
 *
 * For fixers that must reach inside a code span -- repairing the span itself,
 * or text the author wrapped in backticks for emphasis.
 */
export const FENCE_SPLIT_RE = /(```[\s\S]*?```|~~~[\s\S]*?~~~)/g

/**
 * Mark which lines of a markdown document sit outside fenced code.
 *
 * Fence state follows the fence CHARACTER, so a ``` line inside a ~~~ block
 * does not close it; a plain toggle gets that wrong. The fence delimiters
 * themselves are marked as code.
 *
 * Shared so that a gate and the fixer meant to satisfy it cannot disagree
 * about where code begins -- #19481 exists because they did.
 */
export function proseLineMask(lines: readonly string[]): boolean[] {
  let fence: string | null = null
  return lines.map((line) => {
    const f = line.match(/^\s*(`{3,}|~{3,})/)
    if (f) {
      if (!fence) fence = f[1][0]
      else if (line.trim().startsWith(fence)) fence = null
      return false
    }
    return fence === null
  })
}

/** Inline code span, bounded to one line -- see {@link CODE_SPLIT_RE}. */
const INLINE_CODE_RE = /`[^`\n]+`/g

/**
 * Rewrite the prose runs of a single line, leaving inline code spans alone.
 *
 * `fn` sees each run between code spans, never the spans themselves, so a
 * documented literal such as `` `{#}` `` survives a fixer that strips the
 * same characters from prose.
 */
export function replaceOutsideInlineCode(
  line: string,
  fn: (prose: string) => string
): string {
  let out = ""
  let last = 0
  for (const m of line.matchAll(INLINE_CODE_RE)) {
    out += fn(line.slice(last, m.index)) + m[0]
    last = m.index + m[0].length
  }
  return out + fn(line.slice(last))
}

/** Normalize a fence info string to its bare language tag. */
export function fenceLanguage(infoString: string): string {
  return infoString.trim().toLowerCase().split(/\s+/)[0] || ""
}

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
  "ctaLabel",
  "name",
  "caption",
  "contentPreview",
  "location",
  // Frontmatter-only fields. Rendered to readers, so the LLM translates them;
  // `topic` and other taxonomy slugs stay inert.
  "summaryPoints",
  "tags",
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
