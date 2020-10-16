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
  margin-left: ${(props) => props.marginLeft}em !important;
  margin-right: ${(props) => props.marginRight}em !important;
  margin-bottom: ${(props) => props.marginBottom}em !important;
  margin-top: ${(props) => props.marginTop}em !important;

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
  margin-left: ${(props) => props.marginLeft}em !important;
  margin-right: ${(props) => props.marginRight}em !important;
  margin-bottom: ${(props) => props.marginBottom}em !important;
  margin-top: ${(props) => props.marginTop}em !important;

  &:hover {
    color: ${(props) => props.theme.colors.primary};
    border: 1px solid ${(props) => props.theme.colors.primary};
  }
  &:active {
    background-color: ${(props) =>
      props.theme.colors.secondaryButtonBackgroundActive};
  }
`

const Button = ({
  to,
  isSecondary,
  children,
  className,
  marginLeft = 0,
  marginRight = 0,
  marginBottom = 0,
  marginTop = 0,
}) => {
  if (isSecondary) {
    return (
      <Secondary
        to={to}
        hideArrow={true}
        className={className}
        marginLeft={marginLeft}
        marginRight={marginRight}
        marginBottom={marginBottom}
        marginTop={marginTop}
      >
        {children}
      </Secondary>
    )
  }
  return (
    <Primary
      to={to}
      hideArrow={true}
      className={className}
      marginLeft={marginLeft}
      marginRight={marginRight}
      marginBottom={marginBottom}
      marginTop={marginTop}
    >
      {children}
    </Primary>
  )
}

export default Button
