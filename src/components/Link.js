import React from "react"
import { Link as InternalLink } from "gatsby-plugin-intl"
import styled from "styled-components"

// TODO this should be set globally for markdown files
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

const Link = ({ to, children }) => {
  const isExternal = to.includes("http")

  if (isExternal) {
    return (
      <ExternalLink href={to} target="_blank" rel="noopener noreferrer">
        {children}
      </ExternalLink>
    )
  }
  return <InternalLink to={to}>{children}</InternalLink>
}

export default Link
