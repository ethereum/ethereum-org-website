import React from "react"
import styled from "styled-components"
import { Twemoji } from "react-emoji-render"

const StyledCard = styled.div`
  background: ${(props) => props.theme.colors.searchBackground};
  border-radius: 4px;
  border-color: ${(props) => props.theme.colors.lightBorder};
`

const Emoji = styled(Twemoji)`
  & > img {
    width: 3em !important;
    height: 3em !important;
    margin-bottom: 0 !important;
  }
`

const Card = ({ emoji, title, description, children, className }) => {
  return (
    <StyledCard className={className}>
      <Emoji svg text={emoji} />
      <h3>{title}</h3>
      <p>{description}</p>
      {children}
    </StyledCard>
  )
}

export default Card
