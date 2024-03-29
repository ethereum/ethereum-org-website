import { SimpleGrid } from "@chakra-ui/react"

import { StakingProductCard } from "./StakingProductCard"
import { StakingProductsCategoryKeys } from "./types"
import { useStakingProductsCardGrid } from "./useStakingProductsCardGrid"

export type StakingProductsCardGridProps = {
  category: StakingProductsCategoryKeys
}

const StakingProductsCardGrid = ({
  category,
}: StakingProductsCardGridProps) => {
  const { rankedProducts } = useStakingProductsCardGrid({ category })

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

export default StakingProductsCardGrid
