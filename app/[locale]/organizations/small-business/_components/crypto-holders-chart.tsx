"use client"

import { PolarAngleAxis, RadialBar, RadialBarChart } from "recharts"

import { type ChartConfig, ChartContainer } from "@/components/ui/chart"

import { cn } from "@/lib/utils/cn"

export type CryptoHoldersItem = {
  key: "now" | "expected"
  /** Percentage as a number (0-100), drives the arc length */
  value: number
  /** Locale-formatted value shown in the gauge center, e.g. "40%" */
  display: string
  label: string
}

type CryptoHoldersChartProps = {
  /** Exactly two items: current share first, expected share second */
  items: [CryptoHoldersItem, CryptoHoldersItem]
  /** Accessible description of what the percentages measure */
  caption: string
  className?: string
}

const chartConfig = {
  now: { color: "hsla(var(--primary-high-contrast))" },
  expected: { color: "hsla(var(--primary))" },
  track: { color: "hsla(var(--primary-low-contrast))" },
} satisfies ChartConfig

/**
 * Two side-by-side donut gauges, one per figure. The design draws a single
 * decorative pie whose wedges do not encode the two values (40% and 72%
 * describe different populations), so each value gets its own 0-100% gauge.
 */
const CryptoHoldersChart = ({
  items,
  caption,
  className,
}: CryptoHoldersChartProps) => (
  <ul
    className={cn("m-0 grid list-none grid-cols-2 gap-6 p-0", className)}
    role="img"
    aria-label={caption}
  >
    {items.map(({ key, value, display, label }) => (
      <li key={key} className="flex flex-col items-center gap-3 text-center">
        <div className="relative w-full max-w-64">
          <ChartContainer config={chartConfig} className="aspect-square w-full">
            <RadialBarChart
              data={[{ key, value, fill: `var(--color-${key})` }]}
              startAngle={90}
              endAngle={-270}
              innerRadius="72%"
              outerRadius="100%"
              cx="50%"
              cy="50%"
            >
              <PolarAngleAxis
                type="number"
                domain={[0, 100]}
                tick={false}
                axisLine={false}
              />
              <RadialBar
                dataKey="value"
                cornerRadius={999}
                background={{ fill: "var(--color-track)" }}
                isAnimationActive={false}
              />
            </RadialBarChart>
          </ChartContainer>
          <p className="absolute inset-0 flex items-center justify-center text-h3 font-black">
            {display}
          </p>
        </div>
        <p className="text-body-medium">{label}</p>
      </li>
    ))}
  </ul>
)

export default CryptoHoldersChart
