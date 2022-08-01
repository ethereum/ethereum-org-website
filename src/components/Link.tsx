import React from "react"
import { Icon, Link, LinkProps } from "@chakra-ui/react"
import { navigate as gatsbyNavigate } from "gatsby"
import { LocalizedLink as IntlLink } from "gatsby-theme-i18n"
import { NavigateOptions } from "@reach/router"
import { IntlShape } from "react-intl"

import { BsQuestionSquareFill } from "react-icons/bs"

import { Lang } from "../utils/languages"
import { trackCustomEvent, EventOptions } from "../utils/matomo"
import { Direction } from "../types"

const HASH_PATTERN = /^#.*/

const isHashLink = (to: string): boolean => HASH_PATTERN.test(to)

export interface IProps extends LinkProps {
  to: string
  dir?: Direction
  hideArrow?: boolean
  isPartiallyActive?: boolean
  customEventOptions?: EventOptions
  onClick?: () => void
}

const LinkWrapper: React.FC<IProps> = ({
  dir = "ltr",
  to,
  children,
  hideArrow = false,
  isPartiallyActive = true,
  customEventOptions,
  onClick = () => {},
  ...restProps
}) => {
  const isExternal = to.includes("http") || to.includes("mailto:")
  const isHash = isHashLink(to)
  const isGlossary = to.includes("glossary") && to.includes("#")
  const isStatic = to.includes("static")
  const isPdf = to.includes(".pdf")

  const commonProps = {
    dir,
    ...restProps,
  }

  const eventOptions: EventOptions = {
    eventCategory: `External link`,
    eventAction: `Clicked`,
    eventName: to,
  }

  // Must use <a> tags for anchor links
  // Otherwise <Link> functionality will navigate to homepage
  // See https://github.com/gatsbyjs/gatsby/issues/21909
  if (isHash) {
    return (
      <Link href={to} {...commonProps}>
        {children}
      </Link>
    )
  }

  // Download link for internally hosted PDF's (ex: whitepaper)
  // Links to static image assets must use <a> to avoid
  // <Link> redirection. Opens in separate window.
  if (isExternal || isPdf || isStatic) {
    return (
      <Link
        href={to}
        isExternal
        _after={{
          content: '"↗"',
        }}
        onClick={(e) => {
          // only track events on external links
          if (!isExternal) {
            return
          }

          e.stopPropagation()
          trackCustomEvent(
            customEventOptions ? customEventOptions : eventOptions
          )
        }}
        {...commonProps}
      >
        {children}
      </Link>
    )
  }

  // Use `gatsby-theme-i18n` Link (which prepends lang path)
  return (
    <Link
      to={to}
      as={IntlLink}
      activeClassName="active"
      partiallyActive={isPartiallyActive}
      onClick={onClick}
      whiteSpace={isGlossary ? "nowrap" : "normal"}
      {...commonProps}
    >
      {children}
      {isGlossary && (
        <Icon
          as={BsQuestionSquareFill}
          aria-label="See definition"
          fontSize="12px"
          margin="0 0.25rem 0 0.35rem"
        />
      )}
    </Link>
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

export default LinkWrapper
