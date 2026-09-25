"use client"

import { Cell, Pie, PieChart } from "recharts"

import { type ChartConfig, ChartContainer } from "@/components/ui/chart"

import { cn } from "@/lib/utils/cn"

export type CryptoHoldersCallout = {
  key: string
  /** Locale-formatted value, e.g. "40%" */
  display: string
  label: string
}

type CryptoHoldersChartProps = {
  /** Exactly two callouts: current share first, expected share second */
  callouts: [CryptoHoldersCallout, CryptoHoldersCallout]
  className?: string
}

/**
 * Wedge sizes are measured off the Figma frame (node 402:557), not derived
 * from the callout values: the design's pie is an illustrative shape, and the
 * two figures beside it describe different populations, so neither is a share
 * of this circle. Kept at the designed proportions so the drawing matches.
 */
const WEDGES = [
  { key: "deep", share: 47 },
  { key: "pale", share: 33 },
  { key: "mid", share: 20 },
]

/** Orientation from the frame: the first wedge starts just above due east. */
const START_ANGLE = 13

/**
 * Light values are the frame's own purples. Dark mode can't reuse them — the
 * palette vars are fixed, so `purple-800` would sink into a black page — hence
 * an explicit per-theme set that keeps all three wedges distinguishable from
 * each other and from the background.
 */
const chartConfig = {
  deep: {
    theme: {
      light: "hsla(var(--purple-800))",
      dark: "hsla(var(--purple-300))",
    },
  },
  mid: {
    theme: {
      light: "hsla(var(--purple-600))",
      dark: "hsla(var(--purple-500))",
    },
  },
  pale: {
    theme: {
      light: "hsla(var(--purple-100))",
      dark: "hsla(var(--purple-700))",
    },
  },
} satisfies ChartConfig

/**
 * The design's single pie with its two callouts beside it.
 *
 * The pie is `aria-hidden`: it encodes nothing (see `WEDGES`), Recharts renders
 * nothing server-side, and the figures beside it are real DOM text. That text
 * is the accessible representation, which is why the list carries no
 * `role="img"` — that would collapse the very content a screen reader needs.
 */
const CryptoHoldersChart = ({
  callouts,
  className,
}: CryptoHoldersChartProps) => (
  // No gap once side by side: the design's leader lines run from the text
  // back to the pie's edge, so any gap breaks the connection.
  <div
    className={cn(
      "flex items-center gap-6 max-sm:flex-col sm:gap-0",
      className
    )}
  >
    <ChartContainer
      config={chartConfig}
      className="aspect-square w-full max-w-72 shrink-0"
      aria-hidden="true"
    >
      <PieChart>
        <Pie
          data={WEDGES}
          dataKey="share"
          nameKey="key"
          cx="50%"
          cy="50%"
          outerRadius="100%"
          startAngle={START_ANGLE}
          endAngle={START_ANGLE + 360}
          isAnimationActive={false}
          stroke="none"
        >
          {WEDGES.map(({ key }) => (
            <Cell key={key} fill={`var(--color-${key})`} />
          ))}
        </Pie>
      </PieChart>
    </ChartContainer>

    {/* Right-aligned value/label pairs, each underlined by a rule running back
        toward the pie — the design's leader lines. */}
    <ul className="m-0 flex w-full list-none flex-col gap-12 p-0">
      {callouts.map(({ key, display, label }) => (
        <li key={key} className="border-b border-body pb-1 text-end">
          <p className="font-black">{display}</p>
          <p className="text-body-medium">{label}</p>
        </li>
      ))}
    </ul>
  </div>
)

export default CryptoHoldersChart
