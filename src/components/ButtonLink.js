import React from "react"
import styled from "styled-components"
import { margin } from "styled-system"

import Link from "./Link"

const StyledButton = styled(Link)`
  text-decoration: none;
  display: inline-block;
  white-space: nowrap;
  padding: 0.5rem 0.75rem;
  font-size: 1rem;
  border-radius: 0.25em;
  text-align: center;
  ${margin}
`

const Primary = styled(StyledButton)`
  background-color: ${(props) => props.theme.colors.primary};
  color: ${(props) => props.theme.colors.buttonColor};
  border: 1px solid transparent;

  &:hover {
    background-color: ${(props) => props.theme.colors.primaryHover};
  }
  &:active {
    background-color: ${(props) => props.theme.colors.primaryActive};
  }
`

const Secondary = styled(StyledButton)`
  color: ${(props) => props.theme.colors.text};
  background-color: ${(props) => props.theme.colors.white600};
  border: 1px solid ${(props) => props.theme.colors.text};
  background-color: transparent;

  &:hover {
    color: ${(props) => props.theme.colors.primary};
    border: 1px solid ${(props) => props.theme.colors.primary};
  }
  &:active {
    background-color: ${(props) =>
      props.theme.colors.secondaryButtonBackgroundActive};
  }
`

const ButtonLink = ({ to, isSecondary, children, className, ...props }) => {
  if (isSecondary) {
    return (
      <Secondary to={to} hideArrow={true} className={className} {...props}>
        {children}
      </Secondary>
    )
  }
  return (
    <Primary to={to} hideArrow={true} className={className} {...props}>
      {children}
    </Primary>
  )
}

export default ButtonLink
