import { SimpleGrid } from "@chakra-ui/react"

import type { AllMetricData } from "@/lib/types"

import { GridItem } from "./GridItem"
import { useStatsBoxGrid } from "./useStatsBoxGrid"

type StatsBoxGridProps = {
  data: AllMetricData
}

const StatsBoxGrid = ({ data }: StatsBoxGridProps) => {
  const metrics = useStatsBoxGrid(data)

  return (
    <SimpleGrid
      columns={{ base: 1, lg: 2 }}
      margin={{
        base: "0",
        sm: "2rem 0 0",
        lg: "2rem 2rem 0",
      }}
      borderRadius="sm"
    >
      {metrics.map((metric, idx) => (
        <GridItem key={idx} metric={metric} />
      ))}
    </SimpleGrid>
  )
}

export default StatsBoxGrid
