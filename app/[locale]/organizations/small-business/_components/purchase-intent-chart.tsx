"use client"

import { Bar, BarChart, Cell, LabelList, XAxis, YAxis } from "recharts"

import { type ChartConfig, ChartContainer } from "@/components/ui/chart"

import { cn } from "@/lib/utils/cn"

import { useRtlFlip } from "@/hooks/useRtlFlip"

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
  // `--warning-dark` is near-black in both themes
  cafes: {
    theme: {
      light: "hsla(var(--warning-dark))",
      dark: "hsla(var(--warning))",
    },
  },
} satisfies ChartConfig

/** `aria-hidden`: the caller must supply an sr-only server-rendered list of the values */
const PurchaseIntentChart = ({
  items,
  className,
}: PurchaseIntentChartProps) => {
  const { isRtl } = useRtlFlip()

  return (
    <div className={cn("@container w-full", className)} aria-hidden="true">
      <ChartContainer config={chartConfig} className="aspect-4/3 w-full">
        <BarChart
          data={items}
          margin={{ top: 28, right: 0, bottom: 0, left: 0 }}
          barCategoryGap="18%"
        >
          <XAxis dataKey="label" hide reversed={isRtl} />
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
      {/* HTML labels so the browser handles hyphenation, CJK line breaks and RTL order */}
      <ul className="m-0 grid list-none grid-cols-6 gap-x-1 pt-2 text-center text-2xs leading-tight hyphens-auto @sm:text-xs @lg:text-sm">
        {items.map(({ key, label }) => (
          <li
            key={key}
            // balance: no lone trailing glyph; strict: no small kana opening a line; keep-all: Korean breaks between words
            className="m-0 text-balance break-words [line-break:strict] [&:lang(ko)]:break-keep"
          >
            {label}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default PurchaseIntentChart
