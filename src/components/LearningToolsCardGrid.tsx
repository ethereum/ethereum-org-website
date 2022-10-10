// Library imports
import React from "react"
import { Grid } from "@chakra-ui/react"
import { useIntl } from "react-intl"
// Component imports
import ProductCard from "./ProductCard"
import Translation from "./Translation"
// Util imports
import { translateMessageId } from "../utils/translations"
// Type imports
import { LearningToolsCardGridProps } from "../types"

// Component
const LearningToolsCardGrid: React.FC<LearningToolsCardGridProps> = ({
  category,
}) => {
  const intl = useIntl()
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
            alt={translateMessageId(alt, intl)}
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
