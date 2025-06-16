import { getLocale } from "next-intl/server"

import type { StatsBoxMetric } from "@/lib/types"

import { cn } from "@/lib/utils/cn"

import BigNumber from "../BigNumber"

type ActivityStatsProps = {
  metrics: StatsBoxMetric[]
  className?: string
}
const ActivityStats = async ({ metrics, className }: ActivityStatsProps) => {
  const locale = await getLocale()
  const gridBorderClasses = [
    "border-b border-body-light xl:border-e xl:pe-8",
    "border-b border-body-light xl:ps-8",
    "border-b border-body-light xl:border-b-0 xl:border-e xl:pe-8",
    "xl:ps-8",
  ]
  return (
    <div className={cn("grid w-full grid-cols-1 xl:grid-cols-2", className)}>
      {metrics.map(({ label, apiProvider, apiUrl, state }, idx) => (
        <BigNumber
          locale={locale}
          className={gridBorderClasses[idx]}
          key={label}
          value={"value" in state ? state.value : undefined}
          sourceName={apiProvider}
          sourceUrl={apiUrl}
          lastUpdated={"timestamp" in state ? state.timestamp : undefined}
        >
          {label}
        </BigNumber>
      ))}
    </div>
  )
}

export default ActivityStats
