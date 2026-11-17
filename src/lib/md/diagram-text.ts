import { createTranslator } from "next-intl"

import type { DiagramFigureText, DiagramText } from "@/lib/types"

import { numberFormat } from "@/lib/utils/numbers"

export const createDiagramText = (
  locale: string,
  t: DiagramText["t"]
): DiagramText => {
  // Readout count-ups format every frame, so reuse each formatter.
  const formats = new Map<string, Intl.NumberFormat>()
  const number: DiagramText["number"] = (value, options) => {
    const key = JSON.stringify(options ?? {})
    if (!formats.has(key)) formats.set(key, numberFormat(locale, options))
    return formats.get(key)!.format(value)
  }
  return {
    number,
    t,
    steps: (last) =>
      Object.fromEntries(
        Array.from({ length: last }, (_, i) => [`step${i + 1}`, number(i + 1)])
      ),
  }
}

/**
 * `DiagramText` outside React, over `component-diagrams` messages. Throws on
 * a missing key or an unfilled value instead of rendering a fallback.
 */
export const diagramTextFromMessages = (
  locale: string,
  messages: Record<string, string>
) => {
  const t = createTranslator({
    locale,
    messages,
    onError: (error) => {
      throw error
    },
  })
  return createDiagramText(locale, (key, values) =>
    t(key as never, values as never)
  )
}

/**
 * A figure as text: "**Figure N: Title.**", its caption and description. With
 * presets whose descriptions differ, one description per preset, each led by
 * its label.
 */
export const diagramFigureText = (
  { prefix, values, presets }: DiagramFigureText,
  fig: number,
  text: DiagramText
) => {
  const v = values(text)
  const descriptions = (presets ?? [{ label: "", values }]).map((preset) => ({
    label: preset.label,
    description: text.t(`${prefix}-description`, preset.values(text)),
  }))
  const shared = descriptions.every(
    ({ description }) => description === descriptions[0].description
  )
  return [
    `**Figure ${text.number(fig)}: ${text.t(`${prefix}-title`, v)}.**`,
    text.t(`${prefix}-caption`, v),
    ...(shared
      ? [descriptions[0].description]
      : descriptions.map(
          ({ label, description }) => `**${text.t(label)}:** ${description}`
        )),
  ].join("\n\n")
}

const FENCE = /^\s*(`{3,}|~{3,})/
const INLINE_CODE = /(`+).*?\1/g
const DIAGRAM_TAG = /<[A-Z]\w*Diagram\b/
// Same tags `remarkFigureNumbers` numbers: flow elements named `*Diagram`.
const FIGURE_LINE =
  /^(\s*)<([A-Z]\w*Diagram)(?:\s+fig=(?:\{(\d+)\}|"(\d+)"))?\s*\/>\s*$/
const RELATIVE_URL = /(\]\(<?|^\s*\[[^\]]+\]:\s*<?|\bsrc=["'])(\.\.?\/)/g

/**
 * The markdown an agent reads in place of `markdown`: each diagram tag
 * becomes its figure as text, numbered like the page, and relative links
 * point into `dir` (the source's public directory, e.g.
 * `/content/developers/docs/gas/`), since the copy is served from elsewhere.
 * Throws on a tag it can't resolve, so a build never ships one.
 */
export const toAgentMarkdown = (
  markdown: string,
  {
    dir,
    figures,
    text,
  }: {
    dir: string
    figures: Record<string, DiagramFigureText>
    text: DiagramText
  }
) => {
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
      if (!DIAGRAM_TAG.test(line.replace(INLINE_CODE, ""))) return rebased

      const match = line.match(FIGURE_LINE)
      if (!match)
        throw new Error(
          `line ${i + 1}: a diagram tag must stand alone on its line, with no props but fig: ${line.trim()}`
        )
      const [, indent, name, figExpr, figString] = match
      n += 1
      const figure = figures[name]
      if (!figure)
        throw new Error(
          `line ${i + 1}: <${name} /> has no entry in DIAGRAM_FIGURE_TEXT`
        )
      const fig = Number(figExpr ?? figString ?? n)
      return diagramFigureText(figure, fig, text)
        .split("\n")
        .map((out) => (out ? indent + out : out))
        .join("\n")
    })
    .join("\n")
}
