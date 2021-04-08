import React from "react"
import styled from "styled-components"
import Img from "gatsby-image"

import Link from "./Link"

const Content = styled.div`
  padding: 1.5rem;
`

const Description = styled.p`
  opacity: 0.8;
  margin-bottom: 0rem;
`

const ChildrenContainer = styled.div`
  margin-top: 2rem;
`

const ImageWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: ${(props) => (props.isRight ? `flex-end` : `center`)};
  align-items: ${(props) => (props.isBottom ? `flex-end` : `center`)};
  background: ${(props) => props.theme.colors.cardGradient};
  box-shadow: inset 0px -1px 0px rgba(0, 0, 0, 0.1);
  min-height: 260px;
`

const Title = styled.h3`
  margin-top: 0.5rem;
  margin-bottom: 1rem;
`

const Image = styled(Img)`
  width: 100%;
  height: 100%;
  min-width: 100px;
  min-height: 100px;
  max-width: 372px;
  max-height: 257px;
  @media (max-width: ${(props) => props.theme.breakpoints.s}) {
    max-width: 311px;
  }
`

const Card = styled(Link)`
  text-decoration: none;
  flex: 1 1 372px;
  color: ${(props) => props.theme.colors.text};
  box-shadow: 0px 14px 66px rgba(0, 0, 0, 0.07),
    0px 10px 17px rgba(0, 0, 0, 0.03), 0px 4px 7px rgba(0, 0, 0, 0.05);
  margin: 1rem;

  &:hover {
    border-radius: 4px;
    box-shadow: 0px 8px 17px rgba(0, 0, 0, 0.15);
    background: ${(props) => props.theme.colors.tableBackgroundHover};
    transition: transform 0.1s;
    transform: scale(1.02);
  }
`

const ActionCard = ({
  to,
  alt,
  image,
  title,
  description,
  children,
  className,
  isRight,
  isBottom = true,
}) => {
  const isImageURL = typeof image === "string" && image.includes("http")
  return (
    <Card to={to} className={className} hideArrow={true}>
      <ImageWrapper
        isRight={isRight}
        isBottom={isBottom}
        className="action-card-image-wrapper"
      >
        {!isImageURL && <Image fixed={image} alt={alt} />}
        {isImageURL && (
          <img src={image} alt={alt} className="action-card-image" />
        )}
      </ImageWrapper>
      <Content className="action-card-content">
        <Title>{title}</Title>
        <Description>{description}</Description>
        {children && <ChildrenContainer>{children}</ChildrenContainer>}
      </Content>
    </Card>
  )
}

export default ActionCard
