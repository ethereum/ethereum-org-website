import { LearningToolsCardGridProps } from "@/lib/types"

import { CardGrid } from "@/components/ui/card-grid"

import ProductCard from "./ProductCard"

const LearningToolsCardGrid = ({ products }: LearningToolsCardGridProps) => (
  <CardGrid className="mb-8">
    {products
      .sort(({ locales }) => (locales?.length ? -1 : 0))
      .map(({ description, ...product }) => (
        <ProductCard key={product.name} {...product}>
          {description}
        </ProductCard>
      ))}
  </CardGrid>
)

export default LearningToolsCardGrid
