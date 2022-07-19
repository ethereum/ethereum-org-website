import React from "react"
import styled from "styled-components"
import { margin, MarginProps } from "styled-system"

import { scrollIntoView } from "../utils/scrollIntoView"

import Link, { IProps as ILinkProps } from "./Link"

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

export interface IProps extends ILinkProps, MarginProps {
  toId?: string
  isSecondary?: boolean
}

const ButtonLink: React.FC<IProps> = ({
  to,
  toId,
  isSecondary,
  children,
  className,
  hideArrow = false,
  ...props
}) => {
  const handleOnClick = () => {
    if (!toId) {
      return
    }

    scrollIntoView(toId)
  }

  const Link = isSecondary ? SecondaryLink : PrimaryLink
  const ScrollLink = isSecondary ? SecondaryScrollLink : PrimaryScrollLink

  return to ? (
    <Link to={to} hideArrow={hideArrow} className={className} {...props}>
      {children}
    </Link>
  ) : (
    <ScrollLink onClick={handleOnClick} className={className} {...props}>
      {children}
    </ScrollLink>
  )
}

export default ButtonLink
