import React from "react"
import styled from "styled-components"
import Img from "gatsby-image"
import { Twemoji } from "react-emoji-render"

const Banner = styled.div`
  margin: 2rem;
`

const StyledCard = styled.div`
  display: flex;
  flex-direction: row-reverse;
  background: #f8f8fe;
  border-radius: 4px;
  max-height: 300px;
  margin: 1rem;
  align-items: center;
`

const Left = styled.div`
  display: flex;
  width: 50%;
  justify-content: center;
`

const Right = styled.div`
  display: flex;
  width: 50%;
  justify-content: center;
`

const Content = styled.div`
  padding-top: 1rem;
  padding-bottom: 1rem;
  padding-left: 10rem;
`

const Description = styled.p`
  font-size: 20px;
  line-height: 140%;
  color: ${(props) => props.theme.colors.text200};
`

const Emoji = styled(Twemoji)`
  & > img {
    width: 24rem !important;
    height: 24rem !important;
  }
`

const EmojiBanner = ({ emoji, title, description, children, className }) => {
  return (
    <Banner>
      <StyledCard className={className}>
        <Left>
          <Emoji svg text={emoji} />
        </Left>
        <Right>
          <Content>
            <h2>{title}</h2>
            <Description>{description}</Description>
            {children}
          </Content>
        </Right>
      </StyledCard>
    </Banner>
  )
}

export default EmojiBanner
