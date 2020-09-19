import React from "react"
import styled from "styled-components"

import Link from "./Link"

const StyledButton = styled(Link)`
  text-decoration: none;
  display: inline-block;
  white-space: nowrap;
  margin-top: 0.5rem;
  padding: 0.5rem 0.75rem;
  font-size: 1rem;
  border-radius: 0.25em;
  text-align: center;
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
  border: 1px solid ${(props) => props.theme.colors.text};

  &:hover {
    color: ${(props) => props.theme.colors.primary};
    border: 1px solid ${(props) => props.theme.colors.primary};
  }
  &:active {
    background-color: ${(props) =>
      props.theme.colors.secondaryButtonBackgroundActive};
  }
`

const Button = ({ to, isSecondary, children, className }) => {
  if (isSecondary) {
    return (
      <Secondary to={to} hideArrow={true} className={className}>
        {children}
      </Secondary>
    )
  }
  return (
    <Primary to={to} hideArrow={true} className={className}>
      {children}
    </Primary>
  )
}

export default Button
