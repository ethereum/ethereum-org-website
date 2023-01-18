import React from "react"
import { SimpleGrid } from "@chakra-ui/react"

import { GridItem } from "./GridItem"
import { useStatsBoxGrid } from "./useStatsBoxGrid"

export interface IProps {}

const StatsBoxGrid: React.FC<IProps> = () => {
  const { metrics, dir } = useStatsBoxGrid()

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
        <GridItem key={idx} metric={metric} dir={dir} />
      ))}
    </SimpleGrid>
  )
}

export default StatsBoxGrid
