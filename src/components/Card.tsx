import React, { ReactNode } from "react"
import styled from "styled-components"
import Emoji from "./Emoji"

const StyledCard = styled.div`
  display: flex;
  flex-direction: column;
  background: ${(props) => props.theme.colors.ednBackground};
  border-radius: 2px;
  border: 1px solid ${(props) => props.theme.colors.lightBorder};
  padding: 1.5rem;
`

const Title = styled.h3`
  margin-top: 0;
`

const Description = styled.p`
  opacity: 0.8;
  margin: 0;
`

const StyledEmoji = styled(Emoji)`
  margin-bottom: 1rem;
`

const TopContent = styled.div``

export interface IProps {
  emoji?: string
  title?: ReactNode
  description?: ReactNode
  className?: string
}

const Card: React.FC<IProps> = ({
  emoji,
  title,
  description,
  children,
  className,
}) => (
  <StyledCard className={className}>
    <TopContent>
      {emoji && <StyledEmoji size={3} text={emoji} />}
      {title && <Title>{title}</Title>}
      {description && <Description>{description}</Description>}
    </TopContent>
    {children}
  </StyledCard>
)

export default Card
