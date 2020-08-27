import React from "react"
import styled from "styled-components"

import Link from "./Link"

const StyledButton = styled(Link)`
  text-decoration: none;
  display: inline-block;
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
  background-color: ${(props) => props.theme.colors.secondaryButtonBackground};
  color: ${(props) => props.theme.colors.secondaryButtonColor};
  border: 1px solid ${(props) => props.theme.colors.secondaryButtonBorder};

  &:hover {
    background-color: ${(props) =>
      props.theme.colors.secondaryButtonBackgroundHover};
    color: ${(props) => props.theme.colors.secondaryButtonHoverColor};
  }
  &:active {
    background-color: ${(props) =>
      props.theme.colors.secondaryButtonBackgroundActive};
    color: ${(props) => props.theme.colors.secondaryButtonHoverColor};
  }
`

const Button = ({ to, isSecondary, children }) => {
  if (isSecondary) {
    return (
      <Secondary to={to} hideArrow={true}>
        {children}
      </Secondary>
    )
  }
  return (
    <Primary to={to} hideArrow={true}>
      {children}
    </Primary>
  )
}

export default Button
