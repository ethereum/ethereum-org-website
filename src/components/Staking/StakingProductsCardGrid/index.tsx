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
    <div
      className={
        "mx-0 my-12 grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-6"
      }
    >
      {rankedProducts.map((product) => (
        <StakingProductCard key={product.name} product={product} />
      ))}
    </div>
  )
}

export default StakingProductsCardGrid
