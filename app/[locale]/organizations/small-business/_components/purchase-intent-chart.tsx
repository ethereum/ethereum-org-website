"use client"

import { Bar, BarChart, Cell, LabelList, XAxis, YAxis } from "recharts"

import { type ChartConfig, ChartContainer } from "@/components/ui/chart"

import { cn } from "@/lib/utils/cn"

export type PurchaseIntentItem = {
  key: "retailers" | "grocery" | "apparel" | "travel" | "convenience" | "cafes"
  /** Percentage as a number, drives the bar height */
  value: number
  /** Locale-formatted value shown above the bar, e.g. "54%" */
  display: string
  label: string
}

type PurchaseIntentChartProps = {
  items: PurchaseIntentItem[]
  className?: string
}

const chartConfig = {
  retailers: { color: "hsla(var(--primary-high-contrast))" },
  grocery: { color: "hsla(var(--primary))" },
  apparel: { color: "hsla(var(--accent-a))" },
  travel: { color: "hsla(var(--accent-b))" },
  convenience: { color: "hsla(var(--accent-c))" },
  // `--warning-dark` resolves to the same near-black yellow-900 in both themes,
  // so a single colour leaves this bar invisible on the dark background. The
  // theme pair keeps the design's yellow while stepping light in dark mode.
  cafes: {
    theme: {
      light: "hsla(var(--warning-dark))",
      dark: "hsla(var(--warning))",
    },
  },
} satisfies ChartConfig

const MAX_LINE_CHARS = 12

/** Greedy word-wrap so multi-word category labels fit under a narrow bar */
const wrapLabel = (label: string) =>
  label.split(" ").reduce<string[]>((lines, word) => {
    const last = lines[lines.length - 1]
    if (last !== undefined && `${last} ${word}`.length <= MAX_LINE_CHARS) {
      lines[lines.length - 1] = `${last} ${word}`
    } else {
      lines.push(word)
    }
    return lines
  }, [])

type TickProps = {
  x?: number
  y?: number
  payload?: { value: string }
}

const CategoryTick = ({ x = 0, y = 0, payload }: TickProps) => {
  const lines = wrapLabel(payload?.value ?? "")
  return (
    <text
      x={x}
      y={y}
      textAnchor="middle"
      fill="currentColor"
      className="text-2xs @sm:text-xs @lg:text-sm"
    >
      {lines.map((line, idx) => (
        <tspan key={idx} x={x} dy={idx === 0 ? "1em" : "1.2em"}>
          {line}
        </tspan>
      ))}
    </text>
  )
}

/**
 * Six-bar vertical column chart: value label above each bar, wrapped category
 * label below, one theme color per bar. Data is static (NCA 2026 report).
 * The wrapper is a CSS container so the category labels can step down in size
 * when six columns share a phone-width track.
 *
 * The figure is `aria-hidden` and carries no accessible name: Recharts renders
 * nothing server-side, so the six values would be missing from the DOM for
 * assistive tech and for no-JS visitors alike. The caller owns the accessible
 * (and no-JS) representation -- a server-rendered `sr-only` description list
 * of the same six pairs, inside the `<figure>` that wraps this chart.
 */
const PurchaseIntentChart = ({
  items,
  className,
}: PurchaseIntentChartProps) => (
  <div className={cn("@container w-full", className)} aria-hidden="true">
    <ChartContainer config={chartConfig} className="aspect-4/3 w-full">
      <BarChart
        data={items}
        margin={{ top: 28, right: 0, bottom: 8, left: 0 }}
        barCategoryGap="18%"
      >
        <XAxis
          dataKey="label"
          axisLine={false}
          tickLine={false}
          interval={0}
          height={56}
          tick={<CategoryTick />}
        />
        <YAxis hide domain={[0, 100]} />
        <Bar dataKey="value" radius={[8, 8, 0, 0]} isAnimationActive={false}>
          {items.map(({ key }) => (
            <Cell key={key} fill={`var(--color-${key})`} />
          ))}
          <LabelList
            dataKey="display"
            position="top"
            offset={10}
            fill="currentColor"
            className="text-base font-bold @lg:text-lg"
          />
        </Bar>
      </BarChart>
    </ChartContainer>
  </div>
)

export default PurchaseIntentChart
