import React from "react"
import styled from "styled-components"
import { Twemoji } from "react-emoji-render"

const StyledCard = styled.div`
  background: ${(props) => props.theme.colors.searchBackground};
  border-radius: 4px;
  border: 1px solid ${(props) => props.theme.colors.lightBorder};
  padding: 1.5rem;
`

const Emoji = styled(Twemoji)`
  & > img {
    width: 3em !important;
    height: 3em !important;
    margin-bottom: 1em !important;
  }
`

const Description = styled.p`
  opacity: 0.8;
`

const Card = ({ emoji, title, description, children, className }) => {
  return (
    <StyledCard className={className}>
      <Emoji svg text={emoji} />
      <h3>{title}</h3>
      <Description>{description}</Description>
      {children}
    </StyledCard>
  )
}

export default Card
