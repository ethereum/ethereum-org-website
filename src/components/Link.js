import React from "react"
import { Link as GatsbyLink } from "gatsby"
import { Link as IntlLink } from "gatsby-plugin-intl"
import styled from "styled-components"

import { languageMetadata } from "../utils/translations"

// TODO this should be set globally
// in order to apply to markdown files
const ExternalLink = styled.a`
  &:after {
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

const InternalLink = styled(IntlLink)``

const Link = ({ to, children, className }) => {
  const isExternal = to.includes("http") || to.includes("mailto:")

  if (isExternal) {
    return (
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

  // If lang path has been explicitly set in to
  // Use `gatsby` Link, not `gatsby-plugin-intl` Link (which prepends lang path)
  const langPath = to.split("/")[1]
  if (Object.keys(languageMetadata).includes(langPath)) {
    return (
      <GatsbyLink className={className} to={to}>
        {children}
      </GatsbyLink>
    )
  }

  return (
    <InternalLink className={className} to={to}>
      {children}
    </InternalLink>
  )
}

export default Link
