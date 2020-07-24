import React from "react"
import { Link } from "gatsby-plugin-intl"
import styled from "styled-components"

// TODO can styled-components be more composable?
// Want to share styles across `Link` & `a` tags
const Mixin = {
  button: `
    display: inline-block;
    margin-top: 0.5rem;
    padding: 0.5rem 0.75rem;
    font-size: 1rem;
    border-radius: 0.25em;
    text-align: center;
  `,
}

const StyledButton = styled(Link)`
  text-decoration: none;
  ${Mixin.button}
`
const StyledButtonExternal = styled.a`
  text-decoration: none;
  ${Mixin.button}
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
const PrimaryExternal = styled(StyledButtonExternal)`
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
const SecondaryExternal = styled(StyledButtonExternal)`
  background-color: ${(props) => props.theme.colors.secondaryButtonBackground};
  color: ${(props) => props.theme.colors.secondaryButtonColor};
  border: 1px solid ${(props) => props.theme.colors.secondaryButtonBorder};

  &:hover {
    background-color: ${(props) => props.theme.colors.secondary};
    color: ${(props) => props.theme.colors.secondaryButtonHoverColor};
  }
  &:active {
    background-color: ${(props) =>
      props.theme.colors.secondaryButtonBackgroundActive};
    color: ${(props) => props.theme.colors.secondaryButtonHoverColor};
  }
`

// TODO rename to ButtonLink?
const Button = ({ to, isSecondary, children }) => {
  const isExternal = to.includes("http")

  if (isExternal && isSecondary) {
    return (
      <SecondaryExternal href={to} target="_blank" rel="noopener noreferrer">
        {children}
      </SecondaryExternal>
    )
  }
  if (isExternal) {
    return (
      <PrimaryExternal href={to} target="_blank" rel="noopener noreferrer">
        {children}
      </PrimaryExternal>
    )
  }
  if (isSecondary) {
    return <Secondary to={to}>{children}</Secondary>
  }
  return <Primary to={to}>{children}</Primary>
}

export default Button
