import React from "react"
import styled from "styled-components"
import Img from "gatsby-image"

import ButtonLink from "./ButtonLink"
import Translation from "./Translation"

const Product = styled.div`
  width: 100%;
  margin-bottom: 2rem;
  margin-top: 4rem;
`

const Item = styled.div`
  display: flex;
  color: ${(props) => props.theme.colors.text} !important;
  margin-bottom: 1px;
  margin-top: 2rem;
  @media (max-width: ${(props) => props.theme.breakpoints.s}) {
    align-items: flex-start;
  }
`

const ItemTitle = styled.div``

const CategoryTitle = styled.h3`
  border-bottom: 2px solid ${(props) => props.theme.colors.border};
  padding-bottom: 1rem;
  margin-bottom: 0rem;
`

const TextContent = styled.div`
  padding-bottom: 1rem;
  width: 100%;
  display: flex;
  align-items: center;
  margin-left: 1.5rem;
  justify-content: space-between;
  border-bottom: 1px solid ${(props) => props.theme.colors.border};
  @media (max-width: ${(props) => props.theme.breakpoints.s}) {
    flex-direction: column;
    align-items: flex-start;
    margin-left: 1rem;
  }
`

const ItemDesc = styled.div`
  font-size: ${(props) => props.theme.fontSizes.s};
  margin-bottom: 0;
  opacity: 0.6;
`

const ImageContainer = styled.div`
  width: 80px;
`

const LeftContainer = styled.div`
  display: flex;
  flex-direction: column;
`

const Image = styled(Img)`
  box-shadow: ${(props) => props.theme.colors.tableBoxShadow};
  border-radius: 2px;
`

const StyledButton = styled(ButtonLink)`
  margin-left: 2rem;
  padding: 0.25rem 1.5rem;
  border-radius: 2px;
  @media (max-width: ${(props) => props.theme.breakpoints.s}) {
    margin-top: 1rem;
    margin-left: 0rem;
  }
`

const ProductList = ({ content, category }) => (
  <Product>
    <CategoryTitle>{category}</CategoryTitle>
    {content.map(({ title, description, link, image, alt, id }, idx) => (
      <Item key={id || idx}>
        <ImageContainer>
          {image && <Image fluid={image} alt={alt} />}
        </ImageContainer>
        <TextContent>
          <LeftContainer>
            <ItemTitle>{title}</ItemTitle>
            <ItemDesc>{description}</ItemDesc>
          </LeftContainer>
          {link && (
            <StyledButton isSecondary to={link}>
              <Translation id="page-dapps-ready-button" />
            </StyledButton>
          )}
        </TextContent>
      </Item>
    ))}
  </Product>
)

export default ProductList
