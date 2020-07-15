import React from "react"
import styled from "styled-components"
import Img from "gatsby-image"
import { Twemoji } from "react-emoji-render"

import Link from "./Link"

const Content = styled.div``

const Description = styled.p`
  opacity: 0.8;
  font-size: 14px;
  margin: 1.5rem;
  margin-bottom: 2rem;
  margin-top: 0.5rem;
`
const Emoji = styled(Twemoji)`
  & > img {
    width: 20px !important;
    height: 20px !important;
  }
  margin-right: 1.5rem;
`

const Title = styled.h3`
  margin: 1.5rem;
  margin-bottom: 1rem;
`

const CardBG = styled.div`
  background-color: ${(props) => props.theme.colors.background};
  box-shadow: ${(props) => props.theme.colors.tableBoxShadow};
  width: fit-content;
  border-radius: 4px;
  margin: 2rem;
`

const ImageWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background: {background};
  box-shadow: inset 0px -1px 0px rgba(0, 0, 0, 0.1);
  min-height: 200px;
`

const Image = styled(Img)`
  width: 100%;
  max-width: 372px;
  max-height: 257px;
  @media (max-width: ${(props) => props.theme.breakpoints.s}) {
    max-width: 311px;
  }
`

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  box-shadow: inset 0px -1px 0px #f7f7f7;
  margin-bottom: 1rem;
`

const RowText = styled.p`
  margin-bottom: 0.75rem;
  margin-left: 1.5rem;
`

const Card = styled.a`
  flex: 1 1 372px;
  color: ${(props) => props.theme.colors.text};
  box-shadow: 0px 14px 66px rgba(0, 0, 0, 0.07),
    0px 10px 17px rgba(0, 0, 0, 0.03), 0px 4px 7px rgba(0, 0, 0, 0.05);

  &:hover {
    border-radius: 4px;
    box-shadow: 0px 8px 17px rgba(0, 0, 0, 0.15);
    background: ${(props) => props.theme.colors.tableBackgroundHover};
    transition: transform 0.1s;
    transform: scale(1.02);
  }
`

const WalletCard = ({
  to,
  alt,
  image,
  title,
  background,
  description,
  className,
  content,
}) => {
  return (
    <CardBG>
      <Card to={to} className={className}>
        <ImageWrapper background={background}>
          <Image fixed={image} alt={alt} />
        </ImageWrapper>
        <Content>
          <Title>{title}</Title>
          <Description>{description}</Description>
          {content.map((rowItem, idx) => {
            const { emoji, category } = rowItem
            return (
              <Row>
                <RowText>{category}</RowText>
                <Emoji svg text={emoji} />
              </Row>
            )
          })}
        </Content>
      </Card>
    </CardBG>
  )
}

export default WalletCard
