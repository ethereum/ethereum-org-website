"use client"

import { Bar, BarChart, LabelList, YAxis } from "recharts"

import type { BlockspaceData } from "@/lib/types"

import { ChartConfig, ChartContainer, ChartLegend } from "@/components/ui/chart"

const COLORS: Record<keyof BlockspaceData, string> = {
  nft: "#0872FC",
  defi: "#C32E8A",
  social: "#1B9A92",
  token_transfers: "#8E30FF",
  unlabeled: "hsl(var(--body))",
}
const KEYS = Object.keys(COLORS) as (keyof BlockspaceData)[]

const CustomLegend = ({ payload, chartConfig }) => (
  <div className="mt-4 flex flex-wrap justify-center gap-2">
    {payload.map((entry, index) => (
      <div key={`legend-${index}`} className="flex items-center">
        <div
          className="me-2 h-3 w-3 rounded-full"
          style={{ backgroundColor: entry.color }}
        />
        <span className="text-sm">{chartConfig[entry.value].label}</span>
      </div>
    ))}
  </div>
)

/** Share of transactions per usage category; labels arrive built on the server. */
const NetworkUsageChart = ({
  usageData,
  labels,
}: {
  usageData: BlockspaceData
  labels: Record<keyof BlockspaceData, string>
}) => {
  const total = KEYS.reduce((sum, key) => sum + usageData[key], 0)
  const percentage = (value: number) => {
    const share = (value / total) * 100
    return share < 1 ? Number(share.toFixed(1)) : Math.round(share)
  }
  const chartData = [
    Object.fromEntries(KEYS.map((key) => [key, percentage(usageData[key])])),
  ]
  const chartConfig = Object.fromEntries(
    KEYS.map((key) => [key, { label: labels[key], color: COLORS[key] }])
  ) satisfies ChartConfig

  return (
    <ChartContainer
      config={chartConfig}
      className="h-[200px] max-w-[250px] sm:max-w-full"
    >
      <BarChart accessibilityLayer data={chartData} barGap={"10%"}>
        <YAxis
          domain={[0, (dataMax) => dataMax + 15]}
          axisLine={false}
          tickLine={false}
          fontSize={12}
          tickFormatter={(value) => `${value}%`}
          hide
        />
        {KEYS.map((key) => (
          <Bar
            key={key}
            dataKey={key}
            radius={4}
            fill={COLORS[key]}
            barSize={18}
          >
            <LabelList
              position="top"
              offset={12}
              fill="currentColor"
              fontSize={12}
              formatter={(value) => `${value}%`}
            />
          </Bar>
        ))}
        <ChartLegend
          content={<CustomLegend payload={[]} chartConfig={chartConfig} />}
        />
      </BarChart>
    </ChartContainer>
  )
}

export default NetworkUsageChart
