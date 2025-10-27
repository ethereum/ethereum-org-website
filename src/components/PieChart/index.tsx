"use client"

import { TrendingUp } from "lucide-react"
import {
  Cell,
  Legend,
  Pie,
  PieChart as RechartsPieChart,
  ResponsiveContainer,
  type TooltipProps,
} from "recharts"
import type { Formatter } from "recharts/types/component/DefaultLegendContent"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
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
          <CardHeader className="!pt-0">
            {title && <CardTitle>{title}</CardTitle>}
            {description && <CardDescription>{description}</CardDescription>}
          </CardHeader>
        )}
        <CardContent className="flex h-64 items-center justify-center">
          <p className="text-muted-foreground">No data available</p>
        </CardContent>
      </Card>
    )
  }

  // Calculate total for percentage display
  const total = processedData.reduce((sum, item) => sum + item.value, 0)

  // Function to calculate optimal chart dimensions based on data size and screen
  const getChartDimensions = () => {
    const dataCount = processedData.length
    const baseHeight =
      dataCount <= 4 ? 320 : Math.min(380, 280 + dataCount * 15)

    return {
      height: baseHeight,
      outerRadius: Math.max(50, Math.min(80, 400 / Math.max(6, dataCount))),
      cx: dataCount <= 3 ? "40%" : dataCount <= 5 ? "35%" : "30%",
    }
  }

  const dimensions = getChartDimensions()

  const legendFormatter: Formatter = (label: string, { payload }) => {
    const numeric = typeof payload?.value === "number" ? payload.value : 0
    const percentage = ((numeric / total) * 100).toFixed(1)

    const isSmallScreen =
      typeof window !== "undefined" ? window.innerWidth < 640 : false
    const maxLength = isSmallScreen ? 10 : 15
    const displayName =
      label.length > maxLength ? `${label.substring(0, maxLength)}...` : label

    return (
      <span className="text-xs sm:text-sm" title={label}>
        {displayName} {showPercentage && `(${percentage}%)`}
      </span>
    )
  }

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
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>

      <CardContent>
        <ChartContainer config={defaultChartConfig}>
          <ResponsiveContainer width="100%" height={dimensions.height}>
            <RechartsPieChart className="-me-12 ms-4">
              <ChartTooltip cursor={false} content={customTooltipContent} />

              <Legend
                layout="vertical"
                verticalAlign="middle"
                align="right"
                className="max-w-1/2 break-all text-sm/snug"
                formatter={legendFormatter}
              />

              <Pie
                data={processedData}
                dataKey="value"
                nameKey="name"
                cx={dimensions.cx}
                cy="50%"
                outerRadius={dimensions.outerRadius}
                label={false}
                stroke="#ffffff"
                strokeWidth={1}
              >
                {processedData.map((_, i) => (
                  <Cell key={`cell-${i}`} fill={generateColor(i)} />
                ))}
              </Pie>
            </RechartsPieChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>

      {(footerText || footerSubText) && (
        <CardFooter>
          <div className="flex w-full items-start gap-2 text-sm">
            <div className="grid gap-2">
              {footerText && (
                <div className="flex items-center gap-2 font-medium leading-none">
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
