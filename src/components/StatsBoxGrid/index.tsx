import type { AllMetricData } from "@/lib/types"

import BigNumber from "../BigNumber"

import { useStatsBoxGrid } from "./useStatsBoxGrid"

type StatsBoxGridProps = {
  metricResults: AllMetricData
}
const StatsBoxGrid = ({ metricResults }: StatsBoxGridProps) => {
  const metrics = useStatsBoxGrid(metricResults)

  const gridBorderClasses = [
    "border-b border-body-light xl:border-e xl:pe-8",
    "border-b border-body-light xl:ps-8",
    "border-b border-body-light xl:border-b-0 xl:border-e xl:pe-8",
    "xl:ps-8",
  ]
  return (
    <div className="grid w-full grid-cols-1 xl:grid-cols-2">
      {metrics.map(({ label, apiProvider, apiUrl, state }, idx) => (
        <BigNumber
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

export default StatsBoxGrid
