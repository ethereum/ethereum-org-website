import React from "react"

import { LearningToolsCardGridProps } from "@/lib/types"

import ProductCard from "./ProductCard"
import Translation from "./Translation"

const LearningToolsCardGrid = ({ category }: LearningToolsCardGridProps) => {
  return (
    <div className="mb-8 grid grid-cols-[repeat(auto-fill,minmax(min(100%,280px),1fr))] gap-8">
      {category
        .sort(({ locales }) => (locales?.length ? -1 : 0))
        .map(
          ({
            name,
            description,
            background,
            url,
            alt,
            image,
            subjects,
            priceType,
          }) => (
            <ProductCard
              key={name}
              background={background}
              url={url}
              alt={alt}
              image={image}
              name={name}
              subjects={subjects}
              priceType={priceType}
            >
              <Translation id={description} />
            </ProductCard>
          )
        )}
    </div>
  )
}

export default LearningToolsCardGrid
