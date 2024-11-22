"use client"

import { Bar, BarChart, CartesianGrid, LabelList, YAxis } from "recharts"

import { ChartConfig, ChartContainer, ChartLegend } from "@/components/ui/chart"

const CustomLegend = ({ payload, chartConfig }) => {
  return (
    <div className="mt-4 flex flex-wrap justify-center gap-2">
      {payload.map((entry, index) => (
        <div key={`legend-${index}`} className="flex items-center">
          <div
            className="mr-2 h-3 w-3 rounded-full"
            style={{ backgroundColor: entry.color }}
          />
          <span className="text-sm">{chartConfig[entry.value].label}</span>
        </div>
      ))}
    </div>
  )
}

const NetworkUsageChart = ({ usageData }) => {
  const chartData = [
    {
      nft: (usageData.nft * 100).toFixed(2),
      defi: (usageData.defi * 100).toFixed(2),
      social: (usageData.social * 100).toFixed(2),
      token_transfers: (usageData.token_transfers * 100).toFixed(2),
      unlabeled: (usageData.unlabeled * 100).toFixed(2),
    },
  ]

  const chartConfig = {
    nft: {
      label: "NFT",
      color: "#0872FC",
    },
    defi: {
      label: "DeFi",
      color: "#C32E8A",
    },
    social: {
      label: "Social",
      color: "#1B9A92",
    },
    token_transfers: {
      label: "Token Transfers",
      color: "#8E30FF",
    },
    unlabeled: {
      label: "Unlabeled",
      color: "hsl(var(--body))",
    },
  } satisfies ChartConfig

  return (
    <ChartContainer config={chartConfig} className="max-h-[180px] w-full">
      <BarChart accessibilityLayer data={chartData} barGap={"10%"}>
        <CartesianGrid vertical={false} />
        <YAxis domain={[0, 100]} hide />
        <Bar dataKey="nft" radius={4} fill={chartConfig.nft.color} barSize={28}>
          <LabelList
            position="top"
            offset={12}
            fill="currentColor"
            fontSize={12}
          />
        </Bar>
        <Bar
          dataKey="defi"
          radius={4}
          fill={chartConfig.defi.color}
          barSize={28}
        >
          <LabelList
            position="top"
            offset={12}
            fill="currentColor"
            fontSize={12}
          />
        </Bar>
        <Bar
          dataKey="social"
          radius={4}
          fill={chartConfig.social.color}
          barSize={28}
        >
          <LabelList
            position="top"
            offset={12}
            fill="currentColor"
            fontSize={12}
          />
        </Bar>
        <Bar
          dataKey="token_transfers"
          radius={4}
          fill={chartConfig.token_transfers.color}
          barSize={28}
        >
          <LabelList
            position="top"
            offset={12}
            fill="currentColor"
            fontSize={12}
          />
        </Bar>
        <Bar
          dataKey="unlabeled"
          radius={4}
          fill={chartConfig.unlabeled.color}
          barSize={28}
        >
          <LabelList
            position="top"
            offset={12}
            fill="currentColor"
            fontSize={12}
          />
        </Bar>
        <ChartLegend
          content={<CustomLegend payload={[]} chartConfig={chartConfig} />}
        />
      </BarChart>
    </ChartContainer>
  )
}

export default NetworkUsageChart
