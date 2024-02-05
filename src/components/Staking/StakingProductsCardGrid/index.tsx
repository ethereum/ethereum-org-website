import React from "react"
import { SimpleGrid } from "@chakra-ui/react"

import { StakingProductCard } from "./StakingProductCard"
import { StakingProductsCategoryKeys } from "./types"
import { useStakingProductsCardGrid } from "./useStakingProductsCardGrid"

export interface IProps {
  category: StakingProductsCategoryKeys
}

const StakingProductCardGrid: React.FC<IProps> = ({ category }) => {
  const { rankedProducts } = useStakingProductsCardGrid({ category })

  if (!rankedProducts) return null

  return (
    <SimpleGrid
      templateColumns="repeat(auto-fill, minmax(min(100%, 280px), 1fr))"
      gap={8}
      my={12}
      mx={0}
    >
      {rankedProducts.map((product) => (
        <StakingProductCard key={product.name} product={product} />
      ))}
    </SimpleGrid>
  )
}

export default StakingProductCardGrid
