import React from "react"
import styled from "styled-components"
import { Twemoji } from "react-emoji-render"

const StyledCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: ${(props) => props.theme.colors.searchBackground};
  border-radius: 4px;
  border: 1px solid ${(props) => props.theme.colors.lightBorder};
  padding: 1.5rem;
  flex: 1 1 30%;
  min-width: 240px;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    flex: 1 1 30%;
  }
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

const TopContent = styled.div``

const MarkdownCard = ({ emoji, title, description, children, className }) => {
  return (
    <StyledCard className={className}>
      <TopContent>
        <Emoji svg text={emoji} />
        <h3>{title}</h3>
        <Description>{description}</Description>
      </TopContent>
      {children}
    </StyledCard>
  )
}

export default MarkdownCard
