import type { AllMetricData } from "@/lib/types"

import { GridItem } from "./GridItem"
import { useStatsBoxGrid } from "./useStatsBoxGrid"

type StatsBoxGridProps = {
  data: AllMetricData
}

const StatsBoxGrid = ({ data }: StatsBoxGridProps) => {
  const metrics = useStatsBoxGrid(data)

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 rounded-sm m-0 sm:mt-8 lg:mt-8 lg:mx-8">
      {metrics.map((metric, idx) => (
        <GridItem key={idx} metric={metric} />
      ))}
    </div>
  )
}

export default StatsBoxGrid
