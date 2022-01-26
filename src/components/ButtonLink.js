import React from "react"
import styled from "styled-components"
import { margin } from "styled-system"

import Link from "./Link"

const buttonStyling = `
  text-decoration: none;
  display: inline-block;
  padding: 0.5rem 0.75rem;
  font-size: 1rem;
  border-radius: 0.25em;
  text-align: center;
  cursor: pointer;
  ${margin}
`

const StyledLinkButton = styled(Link)`
  ${buttonStyling}
`

const StyledScrollButton = styled.button`
  ${buttonStyling}
`

const PrimaryLink = styled(StyledLinkButton)`
  background-color: ${(props) => props.theme.colors.primary};
  color: ${(props) => props.theme.colors.buttonColor} !important;
  border: 1px solid transparent;

  &:hover {
    background-color: ${(props) => props.theme.colors.primaryHover};
    box-shadow: ${(props) => props.theme.colors.cardBoxShadow};
  }
  &:active {
    background-color: ${(props) => props.theme.colors.primaryActive};
  }
`

const SecondaryLink = styled(StyledLinkButton)`
  color: ${(props) => props.theme.colors.text};
  border: 1px solid ${(props) => props.theme.colors.text};
  background-color: transparent;

  &:hover {
    color: ${(props) => props.theme.colors.primary};
    border: 1px solid ${(props) => props.theme.colors.primary};
    box-shadow: ${(props) => props.theme.colors.cardBoxShadow};
  }
  &:active {
    background-color: ${(props) =>
      props.theme.colors.secondaryButtonBackgroundActive};
  }
`

const PrimaryScrollLink = styled(StyledScrollButton)`
  color: ${(props) => props.theme.colors.buttonColor} !important;
  background-color: ${(props) => props.theme.colors.primary};
  border: 1px solid transparent;

  &:hover {
    background-color: ${(props) => props.theme.colors.primaryHover};
    box-shadow: ${(props) => props.theme.colors.cardBoxShadow};
  }
  &:active {
    background-color: ${(props) => props.theme.colors.primaryActive};
  }
`

const SecondaryScrollLink = styled(StyledScrollButton)`
  color: ${(props) => props.theme.colors.text};
  border: 1px solid ${(props) => props.theme.colors.text};
  background-color: transparent;

  &:hover {
    color: ${(props) => props.theme.colors.primary};
    border: 1px solid ${(props) => props.theme.colors.primary};
    box-shadow: ${(props) => props.theme.colors.cardBoxShadow};
  }
  &:active {
    background-color: ${(props) =>
      props.theme.colors.secondaryButtonBackgroundActive};
  }
`

const scrollToId = (id) => {
  const element = document.getElementById(id)
  if (!element) return
  element.scrollIntoView({ behavior: "smooth", block: "start" })
}

const ButtonLink = ({
  to,
  toId,
  isSecondary,
  children,
  className,
  ...props
}) => {
  if (isSecondary) {
    return to ? (
      <SecondaryLink to={to} hideArrow={true} className={className} {...props}>
        {children}
      </SecondaryLink>
    ) : (
      <SecondaryScrollLink
        onClick={() => scrollToId(toId)}
        hideArrow={true}
        className={className}
        {...props}
      >
        {children}
      </SecondaryScrollLink>
    )
  }
  return to ? (
    <PrimaryLink to={to} hideArrow={true} className={className} {...props}>
      {children}
    </PrimaryLink>
  ) : (
    <PrimaryScrollLink
      onClick={() => scrollToId(toId)}
      hideArrow={true}
      className={className}
      {...props}
    >
      {children}
    </PrimaryScrollLink>
  )
}

export default ButtonLink
