import React from "react"
import { Link as GatsbyLink } from "gatsby"
import { Link as IntlLink } from "gatsby-plugin-intl"
import styled from "styled-components"

import { languageMetadata } from "../utils/translations"

// TODO set globally to apply to markdown files
const ExternalLink = styled.a`
  &:after {
    color: ${(props) => props.theme.colors.primary};
    margin-left: 0.125em;
    margin-right: 0.3em;
    display: inline-block;
    content: "↗";
    transition: all 0.1s ease-in-out;
    font-style: normal;
  }
  &:hover {
    &:after {
      transform: translate(0.15em, -0.2em);
    }
  }
`

const InternalLink = styled(IntlLink)`
  &.active {
    color: ${(props) => props.theme.colors.primary};
  }
`

const Link = ({
  to,
  children,
  hideArrow = false,
  className,
  isPartiallyActive = true,
}) => {
  const isExternal = to.includes("http") || to.includes("mailto:")

  if (isExternal) {
    return hideArrow ? (
      <a
        className={className}
        href={to}
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    ) : (
      <ExternalLink
        className={className}
        href={to}
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </ExternalLink>
    )
  }

  // If lang path has been explicitly set, use `gatsby` Link
  const langPath = to.split("/")[1]
  if (Object.keys(languageMetadata).includes(langPath)) {
    return (
      <GatsbyLink
        className={className}
        to={to}
        activeClassName="active"
        partiallyActive={isPartiallyActive}
      >
        {children}
      </GatsbyLink>
    )
  }

  // Use `gatsby-plugin-intl` Link (which prepends lang path)
  return (
    <InternalLink
      className={className}
      to={to}
      activeClassName="active"
      partiallyActive={isPartiallyActive}
    >
      {children}
    </InternalLink>
  )
}

export default Link
