import type { AgentTagText } from "@/lib/types"

import { DIAGRAM } from "./remarkFigureNumbers"

const FENCE = /^\s*(`{3,}|~{3,})/
const INLINE_CODE = /(`+).*?\1/g
const TAG_NAME = /<([A-Z]\w*)\b/g
const TAG_LINE = /^(\s*)<([A-Z]\w*)(?:\s+fig=(?:\{(\d+)\}|"(\d+)"))?\s*\/>\s*$/
const RELATIVE_URL = /(\]\(<?|^\s*\[[^\]]+\]:\s*<?|\bsrc=["'])(\.\.?\/)/g

/**
 * The markdown an agent reads in place of `markdown`: each tag in `tags`
 * becomes its text, diagrams numbered like the page, and relative links point
 * into `dir` (the source's public directory, e.g.
 * `/content/developers/docs/gas/`), since the copy is served from elsewhere.
 * Throws on a diagram tag missing from `tags` or a tag it can't resolve, so a
 * build never ships one.
 */
export const toAgentMarkdown = (
  markdown: string,
  { dir, tags }: { dir: string; tags: Record<string, AgentTagText> }
) => {
  const handled = (name: string) => name in tags || DIAGRAM.test(name)
  let fence = ""
  let n = 0
  return markdown
    .split("\n")
    .map((line, i) => {
      const marker = line.match(FENCE)?.[1]
      if (fence) {
        if (marker?.[0] === fence[0] && marker.length >= fence.length)
          fence = ""
        return line
      }
      if (marker) {
        fence = marker
        return line
      }
      const rebased = line.replace(
        RELATIVE_URL,
        (_, lead: string, rel: string) =>
          lead + new URL(rel, `https://x${dir}`).pathname
      )
      const names = [...line.replace(INLINE_CODE, "").matchAll(TAG_NAME)]
      if (!names.some(([, name]) => handled(name))) return rebased

      const match = line.match(TAG_LINE)
      if (!match)
        throw new Error(
          `line ${i + 1}: a tag with agent text must stand alone on its line, with no props but fig: ${line.trim()}`
        )
      const [, indent, name, figExpr, figString] = match
      if (DIAGRAM.test(name)) n += 1
      const write = tags[name]
      if (!write)
        throw new Error(`line ${i + 1}: <${name} /> has no agent text entry`)
      return write(Number(figExpr ?? figString ?? n))
        .split("\n")
        .map((out) => (out ? indent + out : out))
        .join("\n")
    })
    .join("\n")
}

/** Whether `markdown` has a tag `toAgentMarkdown` would write out. */
export const hasAgentTags = (
  markdown: string,
  tags: Record<string, AgentTagText>
) =>
  [...markdown.matchAll(TAG_NAME)].some(
    ([, name]) => name in tags || DIAGRAM.test(name)
  )
