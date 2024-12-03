import { Bar, BarChart, LabelList, YAxis } from "recharts"

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
  const chartData = (() => {
    // Calculate the sum of all values to normalize the data
    const total = Object.values(usageData).reduce(
      (sum: number, value: unknown) => sum + (value as number),
      0
    )

    return [
      {
        nft: Math.max(1, Math.round((usageData.nft / total) * 100)),
        defi: Math.max(1, Math.round((usageData.defi / total) * 100)),
        social: Math.max(1, Math.round((usageData.social / total) * 100)),
        token_transfers: Math.max(
          1,
          Math.round((usageData.token_transfers / total) * 100)
        ),
        unlabeled: Math.max(1, Math.round((usageData.unlabeled / total) * 100)),
      },
    ]
  })()

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
        <Bar dataKey="nft" radius={4} fill={chartConfig.nft.color} barSize={18}>
          <LabelList
            position="top"
            offset={12}
            fill="currentColor"
            fontSize={12}
            formatter={(value) => `${value}%`}
          />
        </Bar>
        <Bar
          dataKey="defi"
          radius={4}
          fill={chartConfig.defi.color}
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
        <Bar
          dataKey="social"
          radius={4}
          fill={chartConfig.social.color}
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
        <Bar
          dataKey="token_transfers"
          radius={4}
          fill={chartConfig.token_transfers.color}
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
        <Bar
          dataKey="unlabeled"
          radius={4}
          fill={chartConfig.unlabeled.color}
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
        <ChartLegend
          content={<CustomLegend payload={[]} chartConfig={chartConfig} />}
        />
      </BarChart>
    </ChartContainer>
  )
}

export default NetworkUsageChart
