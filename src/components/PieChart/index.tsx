"use client"

import { TrendingUp } from "lucide-react"
import {
  Cell,
  Pie,
  PieChart as RechartsPieChart,
  type TooltipProps,
} from "recharts"

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardParagraph,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
} from "@/components/ui/chart"

type PieChartDataPoint = { name: string; value: number }

/**
 * PieChartProps defines the properties for the PieChart component.
 *
 * @property {PieChartDataPoint[]} data - The data to be displayed in the chart. Each object should have a `name` and `value` property.
 * @property {string} [title] - The title of the chart.
 * @property {string} [description] - The description of the chart.
 * @property {string} [footerText] - The footer text of the chart.
 * @property {string} [footerSubText] - The footer subtext of the chart.
 * @property {boolean} [showPercentage=true] - Whether to show percentage values in legend and tooltips.
 * @property {number} [minSlicePercentage=1] - Minimum percentage to show individual slices (smaller values grouped as "Other").
 */
type PieChartProps = {
  data: PieChartDataPoint[]
  title?: string
  description?: string
  footerText?: string
  footerSubText?: string
  showPercentage?: boolean
  minSlicePercentage?: number
}

const defaultChartConfig = {
  value: {
    label: "Value",
    color: "hsl(var(--accent-a))",
  },
} satisfies ChartConfig

const COLORS = [
  "hsla(var(--accent-a))",
  "hsla(var(--accent-b))",
  "hsla(var(--accent-c))",
  "hsla(var(--accent-a-hover))",
  "hsla(var(--accent-b-hover))",
  "hsla(var(--accent-c-hover))",
]

const generateColor = (index: number): string => {
  if (index < COLORS.length) {
    return COLORS[index]
  }
  const hue = (index * 137.508) % 360
  const saturation = 70 + (index % 2) * 15
  const lightness = 50 + (index % 3) * 8
  return `hsl(${hue}, ${saturation}%, ${lightness}%)`
}

// Utility function to validate and process data
const processData = (
  data: PieChartDataPoint[],
  minSlicePercentage: number = 1
): PieChartDataPoint[] => {
  const nonZeroData = data.filter((item) => item.value > 0)

  const total = nonZeroData.reduce((sum, item) => sum + item.value, 0)

  if (total === 0) return []

  const mainItems = nonZeroData.filter(
    (item) => (item.value / total) * 100 >= minSlicePercentage
  )
  const smallItems = nonZeroData.filter(
    (item) => (item.value / total) * 100 < minSlicePercentage
  )

  // Group small items into "Other" if there are any
  const processedData = [...mainItems]
  if (smallItems.length > 0) {
    const otherValue = smallItems.reduce((sum, item) => sum + item.value, 0)
    processedData.push({ name: "Other", value: otherValue })
  }

  return processedData
}

export function PieChart({
  data,
  title,
  description,
  footerText,
  footerSubText,
  showPercentage = true,
  minSlicePercentage = 0,
}: PieChartProps) {
  const processedData = processData(data, minSlicePercentage)

  if (processedData.length === 0) {
    return (
      <Card className="w-full">
        {(title || description) && (
          <CardHeader className="pt-0!">
            {title && <CardTitle>{title}</CardTitle>}
            {description && (
              <CardParagraph size="sm">{description}</CardParagraph>
            )}
          </CardHeader>
        )}
        <CardContent className="flex h-64 items-center justify-center">
          {/* // TODO: Extract intl string */}
          <CardParagraph>No data available</CardParagraph>
        </CardContent>
      </Card>
    )
  }

  // Calculate total for percentage display
  const total = processedData.reduce((sum, item) => sum + item.value, 0)

  // Custom tooltip content
  const customTooltipContent = ({
    active,
    payload,
  }: TooltipProps<number, string>) => {
    if (!active || !payload || !payload.length) return null

    const [data] = payload

    if (typeof data.value !== "number") return null

    const percentage = ((data.value / total) * 100).toFixed(1)

    return (
      <div className="rounded-lg border bg-background p-2 shadow-lg">
        <p className="font-medium">{data.name}</p>
        <p className="text-muted-foreground text-sm">
          {showPercentage ? `${percentage}%` : data.value}
        </p>
      </div>
    )
  }

  return (
    <Card
      className="w-full"
      role="img"
      aria-label={title ? `${title} pie chart` : "Pie chart"}
    >
      <CardHeader className="!pt-0">
        {title && <CardTitle>{title}</CardTitle>}
        {description && <CardParagraph size="sm">{description}</CardParagraph>}
      </CardHeader>

      <CardContent>
        {/* Stack the pie above the legend on mobile; centered side-by-side from `sm` up. */}
        <div className="flex flex-col items-center gap-6 sm:flex-row sm:justify-center sm:gap-10">
          <ChartContainer
            config={defaultChartConfig}
            // Square, fluid pie that scales with the container instead of a
            // fixed pixel radius (overrides ChartContainer's default aspect-video).
            className="aspect-square w-full max-w-[280px] shrink-0"
          >
            <RechartsPieChart>
              <ChartTooltip cursor={false} content={customTooltipContent} />
              <Pie
                data={processedData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius="90%"
                label={false}
                stroke="hsla(var(--background-highlight))"
                strokeWidth={2}
              >
                {processedData.map((_, i) => (
                  <Cell key={`cell-${i}`} fill={generateColor(i)} />
                ))}
              </Pie>
            </RechartsPieChart>
          </ChartContainer>

          <ul className="flex w-full max-w-[320px] flex-col gap-2.5">
            {processedData.map((item, i) => {
              const percentage = ((item.value / total) * 100).toFixed(1)
              return (
                <li
                  key={item.name}
                  className="flex items-center gap-2 text-sm/snug"
                >
                  <span
                    aria-hidden
                    className="size-3 shrink-0 rounded-xs"
                    style={{ backgroundColor: generateColor(i) }}
                  />
                  <span className="min-w-0 flex-1 truncate" title={item.name}>
                    {item.name}
                  </span>
                  {showPercentage && (
                    <span className="shrink-0 text-body-medium tabular-nums">
                      {percentage}%
                    </span>
                  )}
                </li>
              )
            })}
          </ul>
        </div>
      </CardContent>

      {(footerText || footerSubText) && (
        <CardFooter>
          <div className="flex w-full items-start gap-2 text-sm">
            <div className="grid gap-2">
              {footerText && (
                <div className="flex items-center gap-2 leading-none font-medium">
                  {footerText} <TrendingUp className="h-4 w-4" />
                </div>
              )}
              {footerSubText && (
                <div className="text-muted-foreground flex items-center gap-2 leading-none">
                  {footerSubText}
                </div>
              )}
            </div>
          </div>
        </CardFooter>
      )}
    </Card>
  )
}
