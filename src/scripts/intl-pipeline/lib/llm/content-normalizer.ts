/**
 * Content normalizer for the translation manifest.
 *
 * Parses markdown section content into a tree of translatable and
 * non-translatable nodes. Non-translatable content is replaced with
 * stable, content-addressed placeholders so that changes to URLs,
 * code, whitespace, etc. do not alter the manifest hash or trigger
 * retranslation.
 *
 * The normalized form is used for:
 *   1. Hashing -- only translatable content affects the manifest hash
 *   2. Translation -- Gemini receives normalized text with placeholders
 *   3. Verification -- inert attributes (className, href) are verified
 *      against English originals post-translation
 *
 * Placeholder format:
 *   Block:   <HTML-PLACEHOLDER-{TYPE}-{HASH}>
 *   Wrapper: <HTML-PLACEHOLDER-{TYPE}-{HASH}>text</HTML-PLACEHOLDER-{TYPE}-{HASH}>
 *
 * TYPE values: CODEBLOCK, CODE, COMPONENT, IMAGE, LINK
 * HASH: 6-char hex SHA-256 digest of extracted content (content-addressed
 *        so insertions above don't renumber placeholders below).
 *
 * Tree structure (document is a tree, not flat text):
 *
 *   Section (interior)
 *   +-- Prose (leaf, hashed)
 *   +-- Code fence (interior)
 *   |   +-- Comment 0 (leaf, hashed -- translatable)
 *   |   +-- Comment 1 (leaf, hashed -- translatable)
 *   |   +-- Code body  (inert -- not hashed)
 *   +-- <InfoBanner> (interior)
 *   |   +-- title attr  (leaf, hashed -- translatable)
 *   |   +-- className   (inert -- verified against English)
 *   |   +-- children    (leaf, hashed -- translatable)
 *   +-- Link (wrapper)
 *       +-- href        (inert -- verified against English)
 *       +-- link text   (leaf, hashed -- translatable)
 */

import { createHash } from "crypto"

import {
  ATTRIBUTE_RE,
  FENCED_BLOCK_RE,
  isTranslatableValue,
  TRANSLATABLE_ATTRIBUTES,
  type TranslatableAttribute,
} from "../shared-patterns"

import { extractComments } from "./code-block-extractor"

// ---------------------------------------------------------------------------
// Hashing utilities
// ---------------------------------------------------------------------------

/** 6-char hex digest for content-addressed placeholder IDs */
function shortHash(content: string): string {
  return createHash("sha256").update(content, "utf8").digest("hex").slice(0, 6)
}

/** 12-char hex digest for trie leaf hashes (matches manifest-generator) */
function leafHash(content: string): string {
  return createHash("sha256").update(content, "utf8").digest("hex").slice(0, 12)
}

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

/** Shared fields for all content nodes */
interface BaseNode {
  /** The extracted content */
  content: string
}

/** Translatable leaf -- prose remaining after all extractions */
interface ProseNode extends BaseNode {
  type: "prose"
  translatable: true
  hash: string
}

/** Interior node wrapping a fenced code block */
interface CodeFenceNode extends BaseNode {
  type: "code-fence"
  translatable: false
  placeholder: string
  children: ContentNode[]
}

/** Translatable leaf -- a comment extracted from a code block */
interface CodeCommentNode extends BaseNode {
  type: "code-comment"
  translatable: true
  hash: string
  meta: { language: string; line: string; commentType: string }
}

/** Inert leaf -- the code body (no comments) */
interface CodeBodyNode extends BaseNode {
  type: "code-body"
  translatable: false
  meta: { language: string; indent: string }
}

/** Interior node wrapping a JSX/HTML component */
interface ComponentNode extends BaseNode {
  type: "component"
  translatable: false
  placeholder: string
  children: ContentNode[]
  meta: { componentName: string; inertAttributes: Record<string, string> }
}

/** Translatable leaf -- a JSX attribute value */
interface ComponentAttributeNode extends BaseNode {
  type: "component-attribute"
  translatable: true
  hash: string
  meta: { attributeName: string; componentName: string }
}

/** Inert leaf -- inline code span */
interface InlineCodeNode extends BaseNode {
  type: "inline-code"
  translatable: false
  placeholder: string
}

/** Interior node wrapping a markdown image */
interface ImageNode extends BaseNode {
  type: "image"
  translatable: false
  placeholder: string
  children: ContentNode[]
  meta: { path: string }
}

/** Translatable leaf -- image alt text */
interface ImageAltNode extends BaseNode {
  type: "image-alt"
  translatable: true
  hash: string
}

/** Interior node wrapping a markdown link */
interface LinkNode extends BaseNode {
  type: "link"
  translatable: false
  placeholder: string
  children: ContentNode[]
  meta: { url: string }
}

/** Translatable leaf -- link display text */
interface LinkTextNode extends BaseNode {
  type: "link-text"
  translatable: true
  hash: string
}

/** Interior node wrapping an embedded HTML element (a, div, span, etc.) */
interface HtmlTagNode extends BaseNode {
  type: "html-tag"
  translatable: false
  placeholder: string
  children: ContentNode[]
  meta: { tagName: string; inertAttributes: Record<string, string> }
}

/** Translatable leaf -- text content inside an HTML element */
interface HtmlTagTextNode extends BaseNode {
  type: "html-tag-text"
  translatable: true
  hash: string
}

/** Discriminated union of all content node types */
export type ContentNode =
  | ProseNode
  | CodeFenceNode
  | CodeCommentNode
  | CodeBodyNode
  | ComponentNode
  | ComponentAttributeNode
  | InlineCodeNode
  | ImageNode
  | ImageAltNode
  | LinkNode
  | LinkTextNode
  | HtmlTagNode
  | HtmlTagTextNode

/** Result of normalizing markdown content */
export interface NormalizedContent {
  /** Markdown with non-translatable parts replaced by placeholders */
  normalized: string
  /** Content tree for trie construction */
  tree: ContentNode[]
  /** Placeholder -> original content (for reconstruction) */
  extractions: Map<string, string>
}

// ---------------------------------------------------------------------------
// Placeholder tag generators
// ---------------------------------------------------------------------------

function codeblockTag(hash: string): string {
  return `<HTML-PLACEHOLDER-CODEBLOCK-${hash} />`
}

function codeTag(hash: string): string {
  return `<HTML-PLACEHOLDER-CODE-${hash} />`
}

function componentSelfClosingTag(hash: string): string {
  return `<HTML-PLACEHOLDER-COMPONENT-${hash} />`
}

function componentOpenTag(hash: string): string {
  return `<HTML-PLACEHOLDER-COMPONENT-${hash}>`
}

function componentCloseTag(hash: string): string {
  return `</HTML-PLACEHOLDER-COMPONENT-${hash}>`
}

function imageTag(hash: string): string {
  return `<HTML-PLACEHOLDER-IMAGE-${hash} />`
}

function htmlTagOpenTag(hash: string, selfClosing = false): string {
  return selfClosing
    ? `<HTML-PLACEHOLDER-HTMLTAG-${hash} />`
    : `<HTML-PLACEHOLDER-HTMLTAG-${hash}>`
}

function htmlTagCloseTag(hash: string): string {
  return `</HTML-PLACEHOLDER-HTMLTAG-${hash}>`
}

function linkOpenTag(hash: string): string {
  return `<HTML-PLACEHOLDER-LINK-${hash}>`
}

function linkCloseTag(hash: string): string {
  return `</HTML-PLACEHOLDER-LINK-${hash}>`
}

// ---------------------------------------------------------------------------
// Pass 1: Fenced code blocks
// ---------------------------------------------------------------------------

/** Language tags that indicate prose content, not executable code */
const PROSE_FENCE_TAGS = new Set(["md", "markdown", "mdx", "text", "txt", ""])

function extractCodeFences(
  markdown: string,
  tree: ContentNode[],
  extractions: Map<string, string>
): string {
  return markdown.replace(
    FENCED_BLOCK_RE,
    (fullMatch: string, ...groups: (string | undefined)[]) => {
      const indent = groups[0] ?? groups[4] ?? ""
      const langTag = (groups[2] ?? groups[6] ?? "").trim()
      const codeContent = groups[3] ?? ""

      const hash = shortHash(fullMatch)
      const language = langTag.toLowerCase().split(/\s+/)[0] || ""

      // Markdown/text fences contain prose, not code.
      // Treat the body as translatable content (like component children).
      if (PROSE_FENCE_TAGS.has(language) && codeContent.trim()) {
        const open = `<HTML-PLACEHOLDER-CODEBLOCK-${hash}>`
        const close = `</HTML-PLACEHOLDER-CODEBLOCK-${hash}>`

        // Recursively normalize the prose content inside the fence
        const childResult = normalizeContent(codeContent)
        const children: ContentNode[] = []
        for (const childNode of childResult.tree) {
          children.push(childNode)
        }
        childResult.extractions.forEach((v, k) => {
          extractions.set(k, v)
        })

        tree.push({
          type: "code-fence",
          translatable: false,
          content: fullMatch,
          placeholder: `${open}...${close}`,
          children,
        })

        extractions.set(`CODEBLOCK:${hash}`, fullMatch)
        return `${indent}${open}\n${childResult.normalized}\n${indent}${close}`
      }

      // True code fences: extract comments as translatable leaves
      const placeholder = codeblockTag(hash)
      const { comments } = extractComments(codeContent, language)

      const children: ContentNode[] = []

      for (const comment of comments) {
        if (comment.text.trim()) {
          children.push({
            type: "code-comment",
            translatable: true,
            content: comment.text,
            hash: leafHash(comment.text),
            meta: {
              language,
              line: String(comment.line),
              commentType: comment.type,
            },
          })
        }
      }

      // Code body is inert
      children.push({
        type: "code-body",
        translatable: false,
        content: codeContent,
        meta: { language: langTag, indent },
      })

      tree.push({
        type: "code-fence",
        translatable: false,
        content: fullMatch,
        placeholder,
        children,
      })

      extractions.set(placeholder, fullMatch)
      return placeholder
    }
  )
}

// ---------------------------------------------------------------------------
// Pass 2: JSX/HTML components
// ---------------------------------------------------------------------------

/**
 * Self-closing JSX components: <Component attr="value" />
 *
 * We match PascalCase names to avoid catching standard HTML tags.
 * Uses a non-greedy match for the attribute body.
 */
const SELF_CLOSING_COMPONENT_RE = /<([A-Z][a-zA-Z0-9]*)(\s[^>]*)?\s*\/>/g

/**
 * JSX components with children: <Component attr="value">...</Component>
 *
 * Non-greedy match on children. Does NOT handle nested same-name
 * components -- for those, the outer match wins (acceptable for
 * ethereum.org content where deep nesting of same component is rare).
 */
const COMPONENT_WITH_CHILDREN_RE =
  /<([A-Z][a-zA-Z0-9]*)(\s[^>]*)?\s*>([\s\S]*?)<\/\1>/g

function parseAttributes(
  attrString: string,
  componentName: string
): { translatable: ContentNode[]; inert: Record<string, string> } {
  const translatable: ContentNode[] = []
  const inert: Record<string, string> = {}

  let match: RegExpExecArray | null
  ATTRIBUTE_RE.lastIndex = 0

  while ((match = ATTRIBUTE_RE.exec(attrString)) !== null) {
    const name = match[1]
    const value = match[2] ?? match[3]

    if (
      TRANSLATABLE_ATTRIBUTES.includes(name as TranslatableAttribute) &&
      isTranslatableValue(value)
    ) {
      translatable.push({
        type: "component-attribute",
        translatable: true,
        content: value,
        hash: leafHash(value),
        meta: { attributeName: name, componentName },
      })
    } else {
      inert[name] = value
    }
  }

  return { translatable, inert }
}

function extractComponents(
  markdown: string,
  tree: ContentNode[],
  extractions: Map<string, string>
): string {
  // Pass 2a: Components with children
  let result = markdown.replace(
    COMPONENT_WITH_CHILDREN_RE,
    (fullMatch: string, name: string, attrStr: string, children: string) => {
      const { translatable, inert } = parseAttributes(attrStr, name)

      // If no translatable attributes AND children are simple prose,
      // don't replace -- let Gemini translate inline. Only extract if
      // component has translatable attributes that need separate handling.
      if (translatable.length === 0) {
        return fullMatch
      }

      const hash = shortHash(fullMatch)

      const childNodes: ContentNode[] = [...translatable]

      // Recursively normalize children to decompose nested HTML tags,
      // inline code, links, etc. into their own sub-nodes.
      let normalizedChildren = ""
      if (children.trim()) {
        const childResult = normalizeContent(children)
        normalizedChildren = childResult.normalized
        for (const childNode of childResult.tree) {
          childNodes.push(childNode)
        }
        childResult.extractions.forEach((v, k) => {
          extractions.set(k, v)
        })
      }

      // Wrapper style: children text stays visible to Gemini.
      // Translatable attributes (title, etc.) are in the tree for
      // the JSX attribute translation phase to handle separately.
      const open = componentOpenTag(hash)
      const close = componentCloseTag(hash)
      const placeholder = `${open}...${close}`

      tree.push({
        type: "component",
        translatable: false,
        content: fullMatch,
        placeholder,
        children: childNodes,
        meta: { componentName: name, inertAttributes: inert },
      })

      extractions.set(`COMPONENT:${hash}`, fullMatch)
      return `${open}${normalizedChildren}${close}`
    }
  )

  // Pass 2b: Self-closing components
  result = result.replace(
    SELF_CLOSING_COMPONENT_RE,
    (fullMatch: string, name: string, attrStr: string) => {
      const { translatable, inert } = parseAttributes(attrStr, name)

      if (translatable.length === 0) {
        return fullMatch
      }

      const hash = shortHash(fullMatch)
      const placeholder = componentSelfClosingTag(hash)

      tree.push({
        type: "component",
        translatable: false,
        content: fullMatch,
        placeholder,
        children: translatable,
        meta: { componentName: name, inertAttributes: inert },
      })

      extractions.set(placeholder, fullMatch)
      return placeholder
    }
  )

  return result
}

// ---------------------------------------------------------------------------
// Pass 2c: Embedded HTML elements
// ---------------------------------------------------------------------------

/**
 * Common HTML tags found in ethereum.org markdown content.
 * Lowercase only -- PascalCase is handled by component extraction.
 */
const HTML_TAGS =
  "a|div|span|p|table|tr|td|th|thead|tbody|img|br|hr|ul|ol|li|strong|em|b|i|code|pre|blockquote|iframe|video|source|details|summary"

/**
 * Matches opening+closing HTML tags with attributes and content.
 * Requires at least one attribute (\s+) to avoid matching bare tags
 * like <li> that would consume nested <a href="..."> children.
 */
const HTML_TAG_WITH_CHILDREN_RE = new RegExp(
  `<(${HTML_TAGS})(\\s[^>]+)>([\\s\\S]*?)<\\/\\1>`,
  "gi"
)

/** Self-closing HTML tags with attributes: <img src="..." />, etc. */
const HTML_SELF_CLOSING_RE = new RegExp(
  `<(${HTML_TAGS})(\\s[^>]+)\\s*\\/?>`,
  "gi"
)

function extractHtmlTags(
  markdown: string,
  tree: ContentNode[],
  extractions: Map<string, string>
): string {
  // Loop until no more matches -- handles nested tags (e.g., <a> inside <li>)
  // where the outer tag has no attributes and passes through, exposing the inner tag.
  let result = markdown
  let prevResult = ""
  while (prevResult !== result) {
    prevResult = result
    result = result.replace(
      HTML_TAG_WITH_CHILDREN_RE,
      (
        fullMatch: string,
        tagName: string,
        attrStr: string,
        children: string
      ) => {
        const hash = shortHash(fullMatch)
        const open = htmlTagOpenTag(hash)
        const close = htmlTagCloseTag(hash)

        // Parse all attributes as inert (HTML attrs are structural)
        const inert: Record<string, string> = {}
        let match: RegExpExecArray | null
        ATTRIBUTE_RE.lastIndex = 0
        while ((match = ATTRIBUTE_RE.exec(attrStr)) !== null) {
          inert[match[1]] = match[2] ?? match[3]
        }

        const childNodes: ContentNode[] = []
        if (children.trim()) {
          childNodes.push({
            type: "html-tag-text",
            translatable: true,
            content: children,
            hash: leafHash(children),
          })
        }

        tree.push({
          type: "html-tag",
          translatable: false,
          content: fullMatch,
          placeholder: `${open}...${close}`,
          children: childNodes,
          meta: { tagName, inertAttributes: inert },
        })

        extractions.set(`HTMLTAG:${hash}`, fullMatch)

        // Wrapper style: text stays visible for Gemini, tags become placeholders
        if (children.trim()) {
          return `${open}${children}${close}`
        }
        return open
      }
    )
  } // end while loop for nested tags

  // Self-closing tags with attributes (e.g., <img src="..." />)
  result = result.replace(
    HTML_SELF_CLOSING_RE,
    (fullMatch: string, tagName: string, attrStr: string) => {
      // Skip if already wrapped by the children pass above
      if (fullMatch.includes("HTML-PLACEHOLDER")) {
        return fullMatch
      }

      const hash = shortHash(fullMatch)
      const placeholder = htmlTagOpenTag(hash, true)

      const inert: Record<string, string> = {}
      let match: RegExpExecArray | null
      ATTRIBUTE_RE.lastIndex = 0
      while ((match = ATTRIBUTE_RE.exec(attrStr)) !== null) {
        inert[match[1]] = match[2] ?? match[3]
      }

      tree.push({
        type: "html-tag",
        translatable: false,
        content: fullMatch,
        placeholder,
        children: [],
        meta: { tagName, inertAttributes: inert },
      })

      extractions.set(placeholder, fullMatch)
      return placeholder
    }
  )

  return result
}

// ---------------------------------------------------------------------------
// Pass 3: Inline code
// ---------------------------------------------------------------------------

/**
 * Matches inline code: `content` (single backtick, non-greedy).
 * Does not match inside already-extracted placeholders.
 */
const INLINE_CODE_RE = /`([^`\n]+)`/g

function extractInlineCode(
  markdown: string,
  tree: ContentNode[],
  extractions: Map<string, string>
): string {
  return markdown.replace(
    INLINE_CODE_RE,
    (fullMatch: string, content: string) => {
      const hash = shortHash(content)
      const placeholder = codeTag(hash)

      tree.push({
        type: "inline-code",
        translatable: false,
        content,
        placeholder,
      })

      extractions.set(placeholder, fullMatch)
      return placeholder
    }
  )
}

// ---------------------------------------------------------------------------
// Pass 4: Images
// ---------------------------------------------------------------------------

/**
 * Matches markdown images: ![alt text](path "optional title")
 * Alt text is translatable; path and title are inert.
 */
const IMAGE_RE = /!\[([^\]]*)\]\(([^)]+)\)/g

function extractImages(
  markdown: string,
  tree: ContentNode[],
  extractions: Map<string, string>
): string {
  return markdown.replace(
    IMAGE_RE,
    (fullMatch: string, altText: string, pathAndTitle: string) => {
      const hash = shortHash(fullMatch)
      const placeholder = imageTag(hash)

      const children: ContentNode[] = []

      // Alt text is a translatable leaf
      if (altText.trim()) {
        children.push({
          type: "image-alt",
          translatable: true,
          content: altText,
          hash: leafHash(altText),
        })
      }

      tree.push({
        type: "image",
        translatable: false,
        content: fullMatch,
        placeholder,
        children,
        meta: { path: pathAndTitle },
      })

      extractions.set(placeholder, fullMatch)
      return placeholder
    }
  )
}

// ---------------------------------------------------------------------------
// Pass 5: Links (wrapper style)
// ---------------------------------------------------------------------------

/**
 * Matches markdown links: [text](url "optional title")
 * Link text is translatable; URL is inert.
 *
 * Uses wrapper placeholders so Gemini can reorder links within
 * translated sentences while preserving the URL association.
 */
const LINK_RE = /\[([^\]]+)\]\(([^)]+)\)/g

function extractLinks(
  markdown: string,
  tree: ContentNode[],
  extractions: Map<string, string>
): string {
  return markdown.replace(
    LINK_RE,
    (fullMatch: string, linkText: string, url: string) => {
      const hash = shortHash(fullMatch)
      const open = linkOpenTag(hash)
      const close = linkCloseTag(hash)

      const children: ContentNode[] = [
        {
          type: "link-text",
          translatable: true,
          content: linkText,
          hash: leafHash(linkText),
        },
      ]

      tree.push({
        type: "link",
        translatable: false,
        content: fullMatch,
        placeholder: `${open}...${close}`,
        children,
        meta: { url },
      })

      // Store full original for reconstruction
      extractions.set(`LINK:${hash}`, fullMatch)

      // Wrapper: Gemini sees the text and can move it
      return `${open}${linkText}${close}`
    }
  )
}

// ---------------------------------------------------------------------------
// Pass 6: Heading anchor IDs
// ---------------------------------------------------------------------------

/**
 * Strips {#anchor-id} from heading lines.
 * These are non-translatable metadata added by content authors.
 */
const HEADING_ID_RE = /^(#{1,6}\s+.+?)[ \t]*\{#[^}]+\}[ \t]*$/gm

function stripHeadingIds(markdown: string): string {
  return markdown.replace(HEADING_ID_RE, "$1")
}

// ---------------------------------------------------------------------------
// Pass 7: Whitespace normalization
// ---------------------------------------------------------------------------

/**
 * Normalize whitespace to eliminate spurious hash changes from
 * trailing spaces, inconsistent blank lines, etc.
 */
function normalizeWhitespace(markdown: string): string {
  return (
    markdown
      // Trim trailing whitespace per line
      .replace(/[ \t]+$/gm, "")
      // Collapse 3+ consecutive blank lines to 2
      .replace(/\n{3,}/g, "\n\n")
      // Trim leading/trailing whitespace from the whole string
      .trim()
  )
}

// ---------------------------------------------------------------------------
// Prose hashing helper
// ---------------------------------------------------------------------------

/**
 * Strip all HTML-PLACEHOLDER tags from text before hashing.
 *
 * Block placeholders (CODEBLOCK, CODE, COMPONENT, IMAGE) are removed
 * entirely. Wrapper placeholders (LINK) have their tags removed but
 * inner text preserved.
 *
 * This ensures the prose hash depends ONLY on translatable text,
 * not on the content-addressed hashes embedded in placeholder tags.
 */
const BLOCK_PLACEHOLDER_RE = /<HTML-PLACEHOLDER-(?:CODE|IMAGE)-[a-f0-9]+ \/>/g
const WRAPPER_TAG_RE =
  /<\/?HTML-PLACEHOLDER-(?:CODEBLOCK|LINK|HTMLTAG|COMPONENT)-[a-f0-9]+(?:\s\/)?>/g

function stripPlaceholderTags(text: string): string {
  return text.replace(BLOCK_PLACEHOLDER_RE, "").replace(WRAPPER_TAG_RE, "")
}

// ---------------------------------------------------------------------------
// Main API
// ---------------------------------------------------------------------------

/**
 * Normalize markdown content for hashing and translation.
 *
 * Extraction order (each pass operates on the output of the previous):
 *   1. Fenced code blocks -> placeholders (comments extracted as leaves)
 *   2. JSX components (PascalCase) -> placeholders (translatable attrs as leaves)
 *   3. Embedded HTML tags (lowercase) -> wrapper placeholders (attrs as inert)
 *   4. Inline code -> placeholders
 *   5. Images -> placeholders (alt text extracted as leaf)
 *   6. Links -> wrapper placeholders (text stays, URL in metadata)
 *   7. Heading anchor IDs -> stripped
 *   8. Whitespace -> normalized
 *
 * @param markdown - Raw markdown section content
 * @returns Normalized content with tree and extraction map
 */
export function normalizeContent(markdown: string): NormalizedContent {
  const tree: ContentNode[] = []
  const extractions = new Map<string, string>()

  // Pre-validation: reject content containing reserved placeholder syntax.
  // A contributor could innocently include these strings in docs about
  // the normalizer itself, which would corrupt the translation pipeline.
  const RESERVED_PLACEHOLDER = /<\/?HTML-PLACEHOLDER-[A-Z]+-[a-f0-9]+[\s/]*>/
  if (RESERVED_PLACEHOLDER.test(markdown)) {
    throw new Error(
      "Content contains reserved <HTML-PLACEHOLDER-...> syntax. " +
        "Use backtick-escaped inline code to reference placeholder tags."
    )
  }

  // Extraction passes in dependency order
  let normalized = markdown

  // 1. Code fences first (prevents # comments from being parsed as headings)
  normalized = extractCodeFences(normalized, tree, extractions)

  // 2. JSX components (PascalCase, before inline code to avoid matching backticks in attrs)
  normalized = extractComponents(normalized, tree, extractions)

  // 3. Embedded HTML tags (lowercase -- a, div, span, img, etc.)
  normalized = extractHtmlTags(normalized, tree, extractions)

  // 4. Inline code
  normalized = extractInlineCode(normalized, tree, extractions)

  // 5. Images (before links -- image syntax ![...] would otherwise match [...])
  normalized = extractImages(normalized, tree, extractions)

  // 6. Links (wrapper style -- text stays in normalized form)
  normalized = extractLinks(normalized, tree, extractions)

  // 7. Strip heading anchor IDs
  normalized = stripHeadingIds(normalized)

  // The remaining prose is translatable.
  // For HASHING: strip placeholder tags and normalize whitespace so
  // that blank-line changes don't trigger retranslation.
  // For GEMINI: return `normalized` with original whitespace intact
  // so the translated output preserves the same paragraph structure.
  if (normalized.trim()) {
    const proseForHashing = normalizeWhitespace(
      stripPlaceholderTags(normalized)
    )
    tree.push({
      type: "prose",
      translatable: true,
      content: normalized,
      hash: leafHash(proseForHashing),
    })
  }

  return { normalized, tree, extractions }
}

/**
 * Collect all translatable leaf hashes from a content tree.
 *
 * Returns a flat map of "{nodeType}:{index}" -> hash, suitable
 * for inclusion in the manifest trie as child nodes.
 */
export function collectLeafHashes(tree: ContentNode[]): Record<string, string> {
  const result: Record<string, string> = {}
  const counters: Record<string, number> = {}

  function visit(node: ContentNode): void {
    if (node.translatable) {
      const prefix = node.type
      const idx = counters[prefix] ?? 0
      counters[prefix] = idx + 1
      result[`${prefix}:${idx}`] = node.hash
    }
    if ("children" in node && node.children) {
      for (const child of node.children) {
        visit(child)
      }
    }
  }

  for (const node of tree) {
    visit(node)
  }

  return result
}
