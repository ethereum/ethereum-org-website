import React from "react"
import styled from "styled-components"
import Img from "gatsby-image"

const StyledCard = styled.div`
  background: ${(props) => props.theme.colors.searchBackground};
  border-radius: 4px;
  border: 1px solid ${(props) => props.theme.colors.lightBorder};
  padding: 1.5rem;
`

const Image = styled(Img)`
  & > img {
    width: 3em !important;
    height: 3em !important;
    margin-bottom: 1em !important;
  }
`

const Description = styled.p`
  opacity: 0.8;
`

const ImageCard = ({ image, title, description, children, className }) => (
  <StyledCard className={className}>
    <Image fluid={image} />
    <h3>{title}</h3>
    <Description>{description}</Description>
    {children}
  </StyledCard>
)

export default ImageCard
