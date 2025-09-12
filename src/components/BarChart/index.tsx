"use client"

import { TrendingUp } from "lucide-react"
import {
  Bar,
  BarChart as RechartsBarChart,
  CartesianGrid,
  XAxis,
} from "recharts"

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

type BarChartDataPoint = { category: string; value: number }

/**
 * BarChartProps defines the properties for the BarChart component.
 *
 * @property {BarChartItem[]} data - The data to be displayed in the chart. Each object should have a `category` and `value` property.
 * @property {string} [title] - The title of the chart.
 * @property {string} [description] - The description of the chart.
 * @property {string} [footerText] - The footer text of the chart.
 * @property {string} [footerSubText] - The footer subtext of the chart.
 */
type BarChartProps = {
  data: BarChartDataPoint[]
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
 * BarChart component renders a bar chart with the provided data and optional title, description, footer text, and footer subtext.
 *
 * @param {BarChartProps} props - The properties for the BarChart component.
 * @returns {JSX.Element} The rendered BarChart component.
 */
export function BarChart({
  data,
  title,
  description,
  footerText,
  footerSubText,
}: BarChartProps) {
  return (
    <Card>
      <CardHeader>
        {title && <CardTitle>{title}</CardTitle>}
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>
        <ChartContainer config={defaultChartConfig}>
          <RechartsBarChart
            accessibilityLayer
            data={data}
            margin={{
              left: 12,
              right: 12,
              top: 12,
              bottom: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="category"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Bar
              dataKey="value"
              fill="hsl(var(--accent-a))"
              barSize={16}
              radius={[8, 8, 0, 0]}
            />
          </RechartsBarChart>
        </ChartContainer>
      </CardContent>
      {(footerText || footerSubText) && (
        <CardFooter>
          <div className="flex w-full items-start gap-2 text-sm">
            <div className="grid gap-2">
              {footerText && (
                <div className="flex items-center gap-2 font-medium leading-none">
                  {footerText} <TrendingUp className="h-4 w-4 text-base" />
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
