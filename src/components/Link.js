import React from "react"
import { Link as GatsbyLink } from "gatsby"
import { Link as IntlLink } from "gatsby-plugin-intl"
import styled from "styled-components"
import Icon from "./Icon"

import { languageMetadata } from "../utils/translations"
import { trackCustomEvent } from "../utils/matomo"

const HASH_PATTERN = /^#.*/
// const DOMAIN_PATTERN = /^(?:https?:)?[/]{2,}([^/]+)/
// const INTERNAL_PATTERN = /^\/(?!\/)/
// const FILE_PATTERN = /.*[/](.+\.[^/]+?)([/].*?)?([#?].*)?$/

const isHashLink = (to) => HASH_PATTERN.test(to)

const ExternalLink = styled.a`
  &:after {
    margin-left: 0.125em;
    margin-right: 0.3em;
    display: inline;
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
  .is-glossary {
    white-space: nowrap;
  }
  &.active {
    color: ${(props) => props.theme.colors.primary};
  }
  &:hover {
    svg {
      fill: ${(props) => props.theme.colors.primary};
      transition: transform 0.1s;
      transform: scale(1.2);
    }
  }
`

const ExplicitLangInternalLink = styled(GatsbyLink)`
  &.active {
    color: ${(props) => props.theme.colors.primary};
  }
`

const GlossaryIcon = styled(Icon)`
  margin: 0 0.25rem 0 0.35rem;
  fill: ${(props) => props.theme.colors.primary400};
  text-decoration: underline;
  &:hover {
    transition: transform 0.1s;
    transform: scale(1.2);
  }
`

const Link = ({
  to,
  href,
  children,
  hideArrow = false,
  className,
  isPartiallyActive = true,
  ariaLabel,
}) => {
  // markdown pages pass `href`, not `to`
  to = to || href

  const isExternal = to.includes("http") || to.includes("mailto:")
  const isHash = isHashLink(to)
  const isGlossary = to.includes("glossary")
  const isStatic = to.includes("static")

  // Must use <a> tags for anchor links
  // Otherwise <Link> functionality will navigate to homepage
  // See https://github.com/gatsbyjs/gatsby/issues/21909
  if (isHash) {
    return (
      <a className={className} href={to} aria-label={ariaLabel}>
        {children}
      </a>
    )
  }

  // Links to static image assets must use <a> to avoid
  // <Link> redirection. Opens in separate window.
  if (isStatic) {
    return (
      <a
        className={className}
        href={to}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={ariaLabel}
      >
        {children}
      </a>
    )
  }

  const eventOptions = {
    eventCategory: `External link`,
    eventAction: `Clicked`,
    eventName: to,
  }

  if (isExternal) {
    return hideArrow ? (
      <a
        className={className}
        href={to}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => trackCustomEvent(eventOptions)}
        aria-label={ariaLabel}
      >
        {children}
      </a>
    ) : (
      <ExternalLink
        className={className}
        href={to}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => trackCustomEvent(eventOptions)}
        aria-label={ariaLabel}
      >
        {children}
      </ExternalLink>
    )
  }

  // If lang path has been explicitly set, use `gatsby` Link
  const langPath = to.split("/")[1]
  if (Object.keys(languageMetadata).includes(langPath)) {
    return (
      <ExplicitLangInternalLink
        className={className}
        to={to}
        activeClassName="active"
        partiallyActive={isPartiallyActive}
      >
        {children}
      </ExplicitLangInternalLink>
    )
  }

  // Use `gatsby-plugin-intl` Link (which prepends lang path)
  return (
    <InternalLink
      className={isGlossary ? `is-glossary ${className}` : className}
      to={to}
      activeClassName="active"
      partiallyActive={isPartiallyActive}
    >
      {children}
      {isGlossary && (
        <GlossaryIcon aria-label="See definition" size="12px" name="glossary" />
      )}
    </InternalLink>
  )
}

export default Link
