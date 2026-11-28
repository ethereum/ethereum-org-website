import { createTranslator } from "next-intl"

import type { AgentTagText, DiagramFigureText, DiagramText } from "@/lib/types"

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
  { prefix, values, captionValues, presets }: DiagramFigureText,
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
    text.t(`${prefix}-caption`, captionValues?.(text) ?? v),
    ...(shared
      ? [descriptions[0].description]
      : descriptions.map(
          ({ label, description }) => `**${text.t(label)}:** ${description}`
        )),
  ].join("\n\n")
}

/**
 * Each diagram tag as agent text in one locale. With `fallback`, a figure
 * whose strings fail in this locale (a stale argument, a broken plural) is
 * written from the fallback text instead, and `onFallback` hears why.
 */
export const diagramAgentTags = (
  figures: Record<string, DiagramFigureText>,
  text: DiagramText,
  fallback?: {
    text: DiagramText
    onFallback: (tag: string, error: Error) => void
  }
): Record<string, AgentTagText> =>
  Object.fromEntries(
    Object.entries(figures).map(([tag, figure]) => [
      tag,
      (fig: number) => {
        try {
          return diagramFigureText(figure, fig, text)
        } catch (error) {
          if (!fallback) throw error
          fallback.onFallback(tag, error as Error)
          return diagramFigureText(figure, fig, fallback.text)
        }
      },
    ])
  )
