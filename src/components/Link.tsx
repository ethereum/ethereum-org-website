import React from "react"
import { Link as GatsbyLink, navigate as gatsbyNavigate } from "gatsby"
import { LocalizedLink as IntlLink } from "gatsby-theme-i18n"
import { NavigateOptions } from "@reach/router"
import { IntlShape } from "react-intl"
import styled from "styled-components"

import Icon from "./Icon"

import { isLang, Lang } from "../utils/languages"
import { trackCustomEvent, EventOptions } from "../utils/matomo"
import { Direction } from "../types"

const HASH_PATTERN = /^#.*/
// const DOMAIN_PATTERN = /^(?:https?:)?[/]{2,}([^/]+)/
// const INTERNAL_PATTERN = /^\/(?!\/)/
// const FILE_PATTERN = /.*[/](.+\.[^/]+?)([/].*?)?([#?].*)?$/

const isHashLink = (to: string): boolean => HASH_PATTERN.test(to)

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

export interface IProps {
  to?: string
  href?: string
  dir?: Direction
  hideArrow?: boolean
  className?: string
  isPartiallyActive?: boolean
  ariaLabel?: string
  customEventOptions?: EventOptions
  onClick?: () => void
}

const Link: React.FC<IProps> = ({
  to,
  dir = "ltr",
  href,
  children,
  hideArrow = false,
  className,
  isPartiallyActive = true,
  ariaLabel,
  customEventOptions,
  onClick = () => {},
}) => {
  // markdown pages pass `href`, not `to`
  to = to || href

  if (!to) {
    throw new Error("Either 'to' or 'href' props must be provided")
  }

  const isExternal = to.includes("http") || to.includes("mailto:")
  const isHash = isHashLink(to)
  const isGlossary = to.includes("glossary") && to.includes("#")
  const isStatic = to.includes("static")
  const isPdf = to.includes(".pdf")

  // Must use <a> tags for anchor links
  // Otherwise <Link> functionality will navigate to homepage
  // See https://github.com/gatsbyjs/gatsby/issues/21909
  if (isHash) {
    return (
      <a dir={dir} className={className} href={to} aria-label={ariaLabel}>
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

  const eventOptions: EventOptions = {
    eventCategory: `External link`,
    eventAction: `Clicked`,
    eventName: to,
  }

  if (isExternal) {
    return hideArrow ? (
      <a
        dir={dir}
        className={className}
        href={to}
        target="_blank"
        rel="noopener noreferrer"
        onClick={(e) => {
          e.stopPropagation()
          trackCustomEvent(
            customEventOptions ? customEventOptions : eventOptions
          )
        }}
        aria-label={ariaLabel}
      >
        {children}
      </a>
    ) : (
      <ExternalLink
        dir={dir}
        className={className}
        href={to}
        target="_blank"
        rel="noopener noreferrer"
        onClick={(e) => {
          e.stopPropagation()
          trackCustomEvent(
            customEventOptions ? customEventOptions : eventOptions
          )
        }}
        aria-label={ariaLabel}
      >
        {children}
      </ExternalLink>
    )
  }

  // If lang path has been explicitly set, use `gatsby` Link
  const langPath = to.split("/")[1]
  if (isLang(langPath)) {
    return (
      <ExplicitLangInternalLink
        dir={dir}
        className={className}
        to={to}
        activeClassName="active"
        partiallyActive={isPartiallyActive}
        onClick={onClick}
      >
        {children}
      </ExplicitLangInternalLink>
    )
  }

  // Download link for internally hosted PDF's (ex: whitepaper)
  if (isPdf && !isExternal) {
    return (
      <a
        dir={dir}
        href={to}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={ariaLabel}
      >
        {children}
      </a>
    )
  }

  // Use `gatsby-theme-i18n` Link (which prepends lang path)
  return (
    <InternalLink
      dir={dir}
      className={isGlossary ? `is-glossary ${className}` : className}
      to={to}
      activeClassName="active"
      partiallyActive={isPartiallyActive}
      onClick={onClick}
    >
      {children}
      {isGlossary && (
        <GlossaryIcon aria-label="See definition" size="12px" name="glossary" />
      )}
    </InternalLink>
  )
}

export function navigate(
  to: string,
  intl: IntlShape,
  options?: NavigateOptions<{}>
) {
  if (typeof window === "undefined") {
    return
  }

  const link = `/${intl.locale as Lang}${to}`
  gatsbyNavigate(link, options)
}

export default Link
