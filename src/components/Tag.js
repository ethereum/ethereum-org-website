import React from "react"
import styled from "styled-components"

import Icon from "./Icon"

const StyledTag = styled.div`
  display: flex;
  align-items: center;
  padding: 4px 8px;
  margin-bottom: 0.5rem;
  margin-right: 0.5rem;
  background: radial-gradient(
    46.28% 66.31% at 66.95% 58.35%,
    rgba(127, 127, 213, 0.2) 0%,
    rgba(134, 168, 231, 0.2) 50%,
    rgba(145, 234, 228, 0.2) 100%
  );
  border-radius: 4px;
  text-transform: uppercase;
  font-size: 14px;
  box-shadow: ${(props) =>
    props.isActive ? 0 : props.theme.colors.tableBoxShadow};
  border: 1px solid
    ${(props) =>
      props.isActive
        ? props.theme.colors.primary300
        : props.theme.colors.white800};
  cursor: pointer;
  color: ${(props) => props.theme.colors.text};
  svg {
    fill: ${(props) => props.theme.colors.text};
  }
  opacity: ${(props) => (props.isActive ? 1 : 0.7)};

  &:hover {
    color: ${(props) => props.theme.colors.primary};
    border: 1px solid ${(props) => props.theme.colors.text200};
    opacity: 1;
    svg {
      fill: ${(props) => props.theme.colors.primary};
    }
  }
`

const StyledIcon = styled(Icon)`
  margin-left: 1em;
`

const Tag = ({
  name,
  onSelect,
  value,
  isActive = true,
  shouldShowIcon = true,
}) => {
  const handleSelect = () => {
    onSelect(value)
  }

  const iconName = isActive ? "close" : "add"

  return (
    <StyledTag onClick={handleSelect} isActive={isActive}>
      {name}
      {shouldShowIcon && <StyledIcon name={iconName} size="18" />}
    </StyledTag>
  )
}

export default Tag
