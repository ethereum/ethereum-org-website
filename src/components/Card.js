import React from "react"
import styled from "styled-components"
import Emoji from "./Emoji"

const StyledCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: ${(props) => props.theme.colors.ednBackground};
  border-radius: 2px;
  border: 1px solid ${(props) => props.theme.colors.lightBorder};
  padding: 1.5rem;
`

const Description = styled.p`
  opacity: 0.8;
`

const TopContent = styled.div``

const Card = ({ emoji, title, description, children, className }) => (
  <StyledCard className={className}>
    <TopContent>
      {emoji && <Emoji size={3} text={emoji} />}
      <h3>{title}</h3>
      <Description>{description}</Description>
    </TopContent>
    {children}
  </StyledCard>
)

export default Card
