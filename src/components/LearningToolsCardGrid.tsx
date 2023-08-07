// Library imports
import React from "react"
import { Grid } from "@chakra-ui/react"
// Component imports
import ProductCard from "./ProductCard"
import Translation from "./Translation"
// Type imports
import { LearningToolsCardGridProps } from "../types"

// Component
const LearningToolsCardGrid: React.FC<LearningToolsCardGridProps> = ({
  category,
}) => {
  return (
    <Grid
      templateColumns="repeat(auto-fill, minmax(min(100%, 280px), 1fr))"
      gap={8}
      mb={8}
    >
      {category
        .sort(({ locales }) => (locales?.length ? -1 : 0))
        .map(({ name, description, background, url, alt, image, subjects }) => (
          <ProductCard
            key={name}
            background={background}
            url={url}
            alt={alt}
            image={image}
            name={name}
            subjects={subjects}
          >
            <Translation id={description} />
          </ProductCard>
        ))}
    </Grid>
  )
}

export default LearningToolsCardGrid
