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
  /** Visible caption for this figure alone -- the two values measure different populations */
  caption: string
}

type CryptoHoldersChartProps = {
  /** Exactly two items: current share first, expected share second */
  items: [CryptoHoldersItem, CryptoHoldersItem]
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
 * describe different populations), so each value gets its own 0-100% gauge
 * and its own caption -- one shared caption would assert a measure that
 * applies to only one of the two numbers.
 *
 * Accessibility: the arc itself is `aria-hidden` (it duplicates the value it
 * is drawn from, and Recharts renders nothing server-side). The real DOM text
 * -- value, label, caption -- is the accessible representation, which is why
 * the list carries no `role="img"`.
 */
const CryptoHoldersChart = ({ items, className }: CryptoHoldersChartProps) => (
  <ul className={cn("m-0 grid list-none grid-cols-2 gap-6 p-0", className)}>
    {items.map(({ key, value, display, label, caption }) => (
      <li key={key}>
        <figure className="m-0 flex flex-col items-center gap-3 text-center">
          <div className="relative w-full max-w-64">
            <ChartContainer
              config={chartConfig}
              className="aspect-square w-full"
              aria-hidden="true"
            >
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
          <figcaption className="text-sm text-body-medium">
            {caption}
          </figcaption>
        </figure>
      </li>
    ))}
  </ul>
)

export default CryptoHoldersChart
