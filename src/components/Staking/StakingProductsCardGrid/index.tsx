"use client"

import { Grid } from "@/components/ui/grid"

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
    <Grid className="mx-0 my-12">
      {rankedProducts.map((product) => (
        <StakingProductCard key={product.name} product={product} />
      ))}
    </Grid>
  )
}

export default StakingProductsCardGrid
