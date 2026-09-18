"use client"

import { PolarAngleAxis, RadialBar, RadialBarChart } from "recharts"

import { type ChartConfig, ChartContainer } from "@/components/ui/chart"

export type AdoptionChartItem = {
  /** Already-formatted display value, e.g. "716M" */
  value: string
  label: string
}

type AdoptionChartProps = {
  /** Exactly three items, outermost ring first */
  items: [AdoptionChartItem, AdoptionChartItem, AdoptionChartItem]
  className?: string
}

const RING_KEYS = ["outer", "middle", "inner"] as const

const chartConfig = {
  outer: { color: "hsla(var(--primary-low-contrast))" },
  middle: { color: "hsla(var(--primary))" },
  inner: { color: "hsla(var(--primary-high-contrast))" },
} satisfies ChartConfig

/**
 * Decorative "adoption is on the rise" chart: three nested half-discs anchored
 * to the bottom edge, with the value/label pairs listed beside them. The disc
 * sizes are illustrative, not proportional to the values (matches the design).
 */
const AdoptionChart = ({ items, className }: AdoptionChartProps) => {
  // Recharts draws the first datum innermost, so reverse the outer-first input
  const data = [...RING_KEYS].reverse().map((key) => ({
    key,
    value: 1,
    fill: `var(--color-${key})`,
  }))

  return (
    <div className={className}>
      <div className="grid items-end gap-6 md:grid-cols-[minmax(10rem,1fr)_2fr]">
        <ul className="m-0 flex list-none flex-col gap-6 p-0">
          {items.map(({ value, label }, idx) => (
            <li key={RING_KEYS[idx]} className="border-b border-body pb-1">
              <p className="text-xl font-black">{value}</p>
              <p className="text-body-medium">{label}</p>
            </li>
          ))}
        </ul>
        <ChartContainer
          config={chartConfig}
          className="aspect-2/1 w-full max-w-2xl justify-self-end"
        >
          {/* Recharts caps percentage radii at half the SHORTER side; in a
              2:1 box anchored at the bottom, 200% makes the outer half-disc
              span the full width. */}
          <RadialBarChart
            data={data}
            startAngle={180}
            endAngle={0}
            innerRadius={0}
            outerRadius="200%"
            cx="50%"
            cy="100%"
            barCategoryGap={0}
            barGap={0}
          >
            <PolarAngleAxis type="number" domain={[0, 1]} tick={false} />
            <RadialBar dataKey="value" isAnimationActive={false} />
          </RadialBarChart>
        </ChartContainer>
      </div>
    </div>
  )
}

export default AdoptionChart
