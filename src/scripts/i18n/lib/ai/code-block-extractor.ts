/**
 * Extract, restore, and process fenced code blocks in markdown.
 *
 * Used to reduce translation payload size: code blocks are replaced
 * with lightweight placeholders before sending to Gemini, then
 * restored afterward. Code comments can optionally be extracted
 * for separate translation.
 */

/** A single extracted code block */
export interface CodeBlock {
  index: number
  language: string
  content: string
}

/** Result of extracting code blocks from markdown */
export interface ExtractionResult {
  /** Markdown with code blocks replaced by placeholders */
  prose: string
  /** Map of placeholder index -> original code block */
  blocks: CodeBlock[]
}

/** A single extracted comment from a code block */
export interface CodeComment {
  blockIndex: number
  line: number
  type: "single" | "multi"
  text: string
}

const PLACEHOLDER_PREFIX = "<!-- CODE_BLOCK_"
const PLACEHOLDER_SUFFIX = " -->"

function makePlaceholder(index: number): string {
  return `${PLACEHOLDER_PREFIX}${index}${PLACEHOLDER_SUFFIX}`
}

// Matches ``` or ~~~ fenced code blocks (with optional language tag)
// Matches fenced code blocks: non-empty content OR empty (just a newline between fences)
const FENCED_BLOCK_RE =
  /^([ \t]*)(```|~~~)([^\n]*)\n([\s\S]*?)\n\1\2[ \t]*$|^([ \t]*)(```|~~~)([^\n]*)\n\5\6[ \t]*$/gm

/**
 * Extract all fenced code blocks from markdown, replacing each
 * with a numbered HTML comment placeholder.
 *
 * Handles both ``` and ~~~ fences, with or without language tags.
 * Preserves the fence's indentation level in the placeholder.
 */
export function extractCodeBlocks(markdown: string): ExtractionResult {
  const blocks: CodeBlock[] = []

  const prose = markdown.replace(
    FENCED_BLOCK_RE,
    (...args: (string | undefined)[]) => {
      // Non-empty: groups 1-4, Empty: groups 5-7
      const indent = args[1] ?? args[5] ?? ""
      const langTag = args[3] ?? args[7] ?? ""
      const content = args[4] ?? ""
      const ind = indent
      const lang = langTag.trim().toLowerCase()
      const index = blocks.length
      blocks.push({
        index,
        language: lang,
        content,
      })
      return `${ind}${makePlaceholder(index)}`
    }
  )

  return { prose, blocks }
}

/**
 * Restore code blocks from placeholders.
 * Rebuilds the original fences using the stored language tag.
 */
export function restoreCodeBlocks(prose: string, blocks: CodeBlock[]): string {
  let result = prose

  for (const block of blocks) {
    const placeholder = makePlaceholder(block.index)
    const fence = "```"
    const langTag = block.language ? block.language : ""
    const restored = `${fence}${langTag}\n${block.content}\n${fence}`
    result = result.replace(placeholder, restored)
  }

  return result
}

// ---------------------------------------------------------------------------
// Comment extraction state machine
// ---------------------------------------------------------------------------

type CommentSyntax = "js" | "python" | "shell"

/** Map fence language tags to comment syntax family */
function getCommentSyntax(language: string): CommentSyntax {
  const lang = language.toLowerCase()

  // JS/Solidity/TS family: // and /* */
  if (
    [
      "js",
      "javascript",
      "ts",
      "typescript",
      "jsx",
      "tsx",
      "solidity",
      "sol",
      "java",
      "c",
      "cpp",
      "c++",
      "cs",
      "csharp",
      "go",
      "rust",
      "rs",
      "swift",
      "kotlin",
    ].includes(lang)
  ) {
    return "js"
  }

  // Python/Vyper family: # and """ """
  if (["python", "py", "vyper", "ruby", "rb"].includes(lang)) {
    return "python"
  }

  // Shell family: # only
  if (
    ["bash", "sh", "shell", "zsh", "fish", "yaml", "yml", "toml"].includes(lang)
  ) {
    return "shell"
  }

  // Default to JS syntax (most common in ethereum.org docs)
  return "js"
}

/**
 * Extract comments from a code block using a state machine.
 *
 * Tracks string literals to avoid false positives (e.g., "https://..."
 * is not a comment, '#fff' is not a comment).
 *
 * Returns the code with comments replaced by empty lines (preserving
 * line count for reinsertion) and a list of extracted comments.
 */
export function extractComments(
  code: string,
  language: string
): { strippedCode: string; comments: CodeComment[] } {
  const syntax = getCommentSyntax(language)
  const lines = code.split("\n")
  const comments: CodeComment[] = []
  const outputLines: string[] = []

  let inMultiLineComment = false
  let multiLineBuffer = ""
  let multiLineStart = -1
  let inString: string | null = null // tracks the opening delimiter

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]

    // If we're inside a multi-line comment, accumulate
    if (inMultiLineComment) {
      const endIndex =
        syntax === "js"
          ? line.indexOf("*/")
          : line.indexOf('"""') >= 0
            ? line.indexOf('"""')
            : line.indexOf("'''")

      if (endIndex >= 0) {
        const endLen = syntax === "js" ? 2 : 3
        multiLineBuffer += "\n" + line.substring(0, endIndex)
        comments.push({
          blockIndex: -1, // filled in by caller
          line: multiLineStart,
          type: "multi",
          text: multiLineBuffer.trim(),
        })
        // Keep any code after the comment end
        const rest = line.substring(endIndex + endLen).trim()
        outputLines.push(rest)
        inMultiLineComment = false
        multiLineBuffer = ""
      } else {
        multiLineBuffer += "\n" + line
        outputLines.push("")
      }
      continue
    }

    // Scan character by character for comments (respecting strings)
    let result = ""
    let foundComment = false
    let j = 0

    while (j < line.length) {
      const ch = line[j]
      const next = j + 1 < line.length ? line[j + 1] : ""

      // String tracking
      if (inString) {
        result += ch
        if (ch === "\\" && next) {
          result += next
          j += 2
          continue
        }
        if (ch === inString) {
          inString = null
        }
        j++
        continue
      }

      // Check for string openers
      if (ch === '"' || ch === "'" || ch === "`") {
        // Python triple-quote check
        if (
          syntax === "python" &&
          (ch === '"' || ch === "'") &&
          line.substring(j, j + 3) === ch + ch + ch
        ) {
          // Multi-line docstring
          const closer = ch + ch + ch
          const endIdx = line.indexOf(closer, j + 3)
          if (endIdx >= 0) {
            // Single-line docstring
            const docContent = line.substring(j + 3, endIdx)
            comments.push({
              blockIndex: -1,
              line: i,
              type: "multi",
              text: docContent.trim(),
            })
            j = endIdx + 3
            continue
          } else {
            // Starts multi-line
            inMultiLineComment = true
            multiLineStart = i
            multiLineBuffer = line.substring(j + 3)
            outputLines.push(result)
            foundComment = true
            break
          }
        }
        inString = ch
        result += ch
        j++
        continue
      }

      // JS-style single-line comment
      if (syntax === "js" && ch === "/" && next === "/") {
        const commentText = line.substring(j + 2).trim()
        if (commentText) {
          comments.push({
            blockIndex: -1,
            line: i,
            type: "single",
            text: commentText,
          })
        }
        foundComment = true
        outputLines.push(result)
        break
      }

      // JS-style multi-line comment
      if (syntax === "js" && ch === "/" && next === "*") {
        const endIdx = line.indexOf("*/", j + 2)
        if (endIdx >= 0) {
          // Inline multi-line comment
          const commentText = line.substring(j + 2, endIdx).trim()
          if (commentText) {
            comments.push({
              blockIndex: -1,
              line: i,
              type: "multi",
              text: commentText,
            })
          }
          j = endIdx + 2
          continue
        } else {
          // Spans multiple lines
          inMultiLineComment = true
          multiLineStart = i
          multiLineBuffer = line.substring(j + 2)
          outputLines.push(result)
          foundComment = true
          break
        }
      }

      // Python/Shell single-line comment
      if ((syntax === "python" || syntax === "shell") && ch === "#") {
        const commentText = line.substring(j + 1).trim()
        if (commentText) {
          comments.push({
            blockIndex: -1,
            line: i,
            type: "single",
            text: commentText,
          })
        }
        foundComment = true
        outputLines.push(result)
        break
      }

      result += ch
      j++
    }

    if (!foundComment && !inMultiLineComment) {
      outputLines.push(line)
    }
  }

  return { strippedCode: outputLines.join("\n"), comments }
}

/**
 * Restore translated comments into code.
 *
 * For single-line comments, appends the translated text at the original
 * line position. For multi-line comments, replaces the content.
 */
export function restoreComments(
  code: string,
  comments: CodeComment[],
  syntax: CommentSyntax
): string {
  if (comments.length === 0) return code

  const lines = code.split("\n")

  // Process in reverse line order so insertions don't shift indices
  const sorted = [...comments].sort((a, b) => b.line - a.line)

  for (const comment of sorted) {
    if (comment.line >= lines.length) continue

    const prefix = syntax === "js" ? "// " : "# "
    const existing = lines[comment.line]

    if (comment.type === "single") {
      // Append comment to the existing line content
      const trimmed = existing.trimEnd()
      const indent = existing.match(/^(\s*)/)?.[1] || ""
      if (trimmed) {
        lines[comment.line] = `${trimmed} ${prefix}${comment.text}`
      } else {
        lines[comment.line] = `${indent}${prefix}${comment.text}`
      }
    } else {
      // Multi-line: wrap in block comment syntax
      const indent = existing.match(/^(\s*)/)?.[1] || ""
      if (syntax === "js") {
        lines[comment.line] = `${indent}/* ${comment.text} */\n${existing}`
      } else {
        lines[comment.line] = `${indent}# ${comment.text}\n${existing}`
      }
    }
  }

  return lines.join("\n")
}

// ---------------------------------------------------------------------------
// Prose chunking
// ---------------------------------------------------------------------------

/** Size threshold in characters. ~40KB leaves headroom under 65k output token limit */
export const PROSE_SIZE_THRESHOLD = 40_000

/**
 * Recursively chunk prose by heading boundaries.
 *
 * Splits at ## headings first, then ### if chunks are still too large,
 * then #### etc. Falls back to splitting at blank lines, then hard
 * truncation as a last resort.
 *
 * Each chunk includes the file's frontmatter (if any) and a heading
 * breadcrumb for translation context.
 */
export function chunkProse(
  prose: string,
  threshold: number = PROSE_SIZE_THRESHOLD
): string[] {
  if (prose.length <= threshold) return [prose]

  // Extract frontmatter if present
  let frontmatter = ""
  let body = prose
  const fmMatch = prose.match(/^(---\n[\s\S]*?\n---\n)/)
  if (fmMatch) {
    frontmatter = fmMatch[1]
    body = prose.slice(fmMatch[1].length)
  }

  const chunks = splitRecursive(body, threshold - frontmatter.length, 2)

  // Prepend frontmatter to the first chunk only
  if (frontmatter && chunks.length > 0) {
    chunks[0] = frontmatter + chunks[0]
  }

  return chunks
}

/**
 * Recursively split text at heading boundaries.
 * headingLevel starts at 2 (##) and increases to 6 (######).
 */
function splitRecursive(
  text: string,
  threshold: number,
  headingLevel: number
): string[] {
  if (text.length <= threshold) return [text]

  // Try splitting at current heading level
  if (headingLevel <= 6) {
    const headingPrefix = "#".repeat(headingLevel) + " "
    const sections = splitAtHeadings(text, headingPrefix)

    if (sections.length > 1) {
      // Recursively check each section
      const result: string[] = []
      for (const section of sections) {
        if (section.length <= threshold) {
          result.push(section)
        } else {
          // Try next heading level
          result.push(...splitRecursive(section, threshold, headingLevel + 1))
        }
      }
      return result
    }

    // Couldn't split at this level, try next
    return splitRecursive(text, threshold, headingLevel + 1)
  }

  // Exhausted heading levels -- split at blank lines
  const paragraphs = text.split(/\n\n+/)
  if (paragraphs.length > 1) {
    const result: string[] = []
    let current = ""
    for (const para of paragraphs) {
      if (current.length + para.length + 2 > threshold && current) {
        result.push(current)
        current = para
      } else {
        current = current ? current + "\n\n" + para : para
      }
    }
    if (current) result.push(current)
    return result
  }

  // Last resort: hard split
  const result: string[] = []
  for (let i = 0; i < text.length; i += threshold) {
    result.push(text.slice(i, i + threshold))
  }
  return result
}

/**
 * Split text at heading markers, keeping each heading with its content.
 */
function splitAtHeadings(text: string, headingPrefix: string): string[] {
  const escaped = headingPrefix.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
  const re = new RegExp(`(?=^${escaped})`, "gm")
  const parts = text.split(re).filter((s) => s.trim())
  return parts
}

// Re-export getCommentSyntax for restoreComments callers
export { getCommentSyntax }
