import React from "react"
import styled from "styled-components"
import { Twemoji } from "react-emoji-render"

const StyledCard = styled.div`
  background: ${(props) => props.theme.colors.searchBackground};
  border-radius: 4px;
  border: 1px solid ${(props) => props.theme.colors.lightBorder};
  padding: 1rem;
  display: flex;
  flex-direction: row;
  align-content: flex-start;
`

const Emoji = styled(Twemoji)`
  & > img {
    width: 5em !important;
    height: 5em !important;
  }
`

const Content = styled.div`
  margin-left: 1.3rem;
  margin-bottom: -1rem;
`

const Description = styled.p`
  opacity: 0.8;
  margin-top: -1rem;
`

const Title = styled.p`
  font-size: 20px;
`

const HorizontalCard = ({ emoji, title, description, children, className }) => {
  return (
    <StyledCard className={className}>
      <Emoji svg text={emoji} />
      <Content>
        <Title>{title}</Title>
        <Description>{description}</Description>
        {children}
      </Content>
    </StyledCard>
  )
}

export default HorizontalCard
