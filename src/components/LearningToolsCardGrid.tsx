// Library imports
import React from "react"
import styled from "styled-components"
import { useIntl } from "react-intl"
// Component imports
import { CardGrid } from "./SharedStyledComponents"
import ProductCard from "./ProductCard"
import Translation from "./Translation"
// Util imports
import { translateMessageId } from "../utils/translations"
import { Lang } from "../utils/languages"
// Type imports
import { LearningToolsCardGridProps } from "../types"

// Styled components
const StyledCardGrid = styled(CardGrid)`
  margin-bottom: 2rem;
`

// Component
const LearningToolsCardGrid: React.FC<LearningToolsCardGridProps> = ({
  category,
}) => {
  const intl = useIntl()
  return (
    <StyledCardGrid>
      {category
        .filter(
          ({ locales }) =>
            !locales?.length || locales.includes(intl.locale as Lang)
        )
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
    </StyledCardGrid>
  )
}

export default LearningToolsCardGrid
