import { LearningToolsCardGridProps } from "@/lib/types"

import ProductCard from "./ProductCard"

const LearningToolsCardGrid = ({ products }: LearningToolsCardGridProps) => (
  <div className="mb-8 grid grid-cols-[repeat(auto-fill,minmax(min(100%,280px),1fr))] gap-8">
    {products
      .sort(({ locales }) => (locales?.length ? -1 : 0))
      .map(({ description, ...product }) => (
        <ProductCard key={product.name} {...product}>
          {description}
        </ProductCard>
      ))}
  </div>
)

export default LearningToolsCardGrid
