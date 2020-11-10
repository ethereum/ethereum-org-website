import React from "react"
import styled from "styled-components"
import Emoji from "../components/Emoji"

import Checkbox from "./Checkbox"

const StyledCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: ${(props) => props.theme.colors.searchBackground};
  border-radius: 4px;
  border: 1px solid ${(props) => props.theme.colors.lightBorder};
  padding: 1.5rem;
  cursor: pointer;
`

const StyledCheckbox = styled(Checkbox)`
  position: absolute;
  right: 0;
`

const Description = styled.p`
  opacity: 0.8;
`

const TopContent = styled.div`
  position: relative;
`

const Card = ({
  emoji,
  title,
  description,
  children,
  className,
  onSelect,
  value,
  isSelected,
}) => {
  const handleSelect = () => {
    onSelect(value)
  }

  return (
    <StyledCard
      isSelected={isSelected}
      className={className}
      onClick={handleSelect}
    >
      <TopContent>
        <Emoji text={emoji} size={3} mb={`1em`} />
        <StyledCheckbox checked={isSelected} />
        <h3>{title}</h3>
        <Description>{description}</Description>
      </TopContent>
      {children}
    </StyledCard>
  )
}

export default Card
