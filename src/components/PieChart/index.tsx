"use client"

import { FaArrowTrendUp } from "react-icons/fa6"
import { Cell, Legend, Pie, PieChart as RechartsPieChart } from "recharts"

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
  ChartTooltipContent,
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
 */
type PieChartProps = {
  data: PieChartDataPoint[]
  title?: string
  description?: string
  footerText?: string
  footerSubText?: string
}

const defaultChartConfig = {
  value: {
    label: "Value",
    color: "hsl(var(--accent-a))",
  },
} satisfies ChartConfig

/**
 * Color palette for blue shades, ordered from deep blue (largest share) to light blue (smallest share).
 * Ensure your data is sorted from largest to smallest for this to work as intended.
 */
const COLORS = [
  "#00008B", // Deep Blue
  "#0000CD",
  "#0000FF",
  "#4169E1",
  "#6495ED",
  "#87CEFA",
  "#ADD8E6",
  "#B0E0E6", // Light Blue
]

/**
 * PieChart component renders a pie chart with distinct blue colors and a vertical legend.
 */
export function PieChart({
  data,
  title,
  description,
  footerText,
  footerSubText,
}: PieChartProps) {
  return (
    <Card>
      <CardHeader>
        {title && <CardTitle>{title}</CardTitle>}
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>
        <ChartContainer config={defaultChartConfig}>
          <RechartsPieChart
            width={400}
            height={400}
            margin={{
              left: 12,
              right: 12,
              top: 12,
              bottom: 12,
            }}
          >
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            {/* Vertical legend on the right */}
            <Legend layout="vertical" verticalAlign="middle" align="right" />
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              // Shift the pie chart leftward to make room for the legend
              cx="40%"
              cy="50%"
              outerRadius={80}
              label
            >
              {data.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
          </RechartsPieChart>
        </ChartContainer>
      </CardContent>
      {(footerText || footerSubText) && (
        <CardFooter>
          <div className="flex w-full items-start gap-2 text-sm">
            <div className="grid gap-2">
              {footerText && (
                <div className="flex items-center gap-2 font-medium leading-none">
                  {footerText} <FaArrowTrendUp className="h-4 w-4" />
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
