import React from "react"
import styled from "styled-components"
import Img from "gatsby-image"

import Link from "./Link"
import GitStars from "./GitStars"

const ImageWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background: ${(props) => props.background};
  box-shadow: inset 0px -1px 0px rgba(0, 0, 0, 0.1);
  min-height: 200px;
`

const Image = styled(Img)`
  width: 100%;
  align-self: center;
  max-width: 372px;
  max-height: 257px;
  @media (max-width: ${(props) => props.theme.breakpoints.s}) {
    max-width: 311px;
  }
`

const Card = styled(Link)`
  margin: 1rem;
  flex: 1 0 20%;
  min-width: 280px;
  max-width: 23%;

  @media (max-width: 1280px) {
    max-width: 31%;
  }
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    max-width: 46%;
  }
  @media (max-width: ${(props) => props.theme.breakpoints.m}) {
    max-width: 100%;
  }

  color: ${(props) => props.theme.colors.text};
  box-shadow: 0px 14px 66px rgba(0, 0, 0, 0.07),
    0px 10px 17px rgba(0, 0, 0, 0.03), 0px 4px 7px rgba(0, 0, 0, 0.05);

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: ${(props) => props.theme.colors.searchBackground};
  border-radius: 4px;
  border: 1px solid ${(props) => props.theme.colors.lightBorder};
  text-decoration: none;

  &:hover {
    box-shadow: 0px 8px 17px rgba(0, 0, 0, 0.15);
    background: ${(props) => props.theme.colors.tableBackgroundHover};
    transition: transform 0.1s;
    transform: scale(1.02);
  }
`

const Content = styled.div`
  padding: 1.5rem;
  text-align: left;
  height: 100%;
`

const FloatedGitStars = styled(GitStars)`
  float: right;
`

const Title = styled.h3`
  margin-bottom: 0.75rem;
`

const Description = styled.p`
  opacity: 0.8;
  font-size: ${(props) => props.theme.fontSizes.s};
  margin-bottom: 0.5rem;
  line-height: 140%;
`

const ProductCard = ({
  url,
  background,
  image,
  name,
  description,
  children,
  gitAccount,
  gitRepo,
}) => {
  return (
    <Card to={url} hideArrow={true}>
      <ImageWrapper background={background}>
        <Image fixed={image} alt={`${name} logo`} />
      </ImageWrapper>
      <Content>
        {gitAccount && gitRepo && (
          <FloatedGitStars gitAccount={gitAccount} gitRepo={gitRepo} />
        )}
        <Title>{name}</Title>
        <Description>{description}</Description>
        {children}
      </Content>
    </Card>
  )
}

export default ProductCard
