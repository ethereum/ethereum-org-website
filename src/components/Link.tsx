import React from "react"
import { Icon, Link, LinkProps, useTheme } from "@chakra-ui/react"
import { navigate as gatsbyNavigate } from "gatsby"
import { LocalizedLink as IntlLink } from "gatsby-theme-i18n"
import { NavigateOptions } from "@reach/router"
import { IntlShape } from "react-intl"

import { BsQuestionSquareFill } from "react-icons/bs"

import { Lang } from "../utils/languages"
import { trackCustomEvent, EventOptions } from "../utils/matomo"

const HASH_PATTERN = /^#.*/

const isHashLink = (to: string): boolean => HASH_PATTERN.test(to)

export interface IBaseProps {
  to?: string
  href?: string
  hideArrow?: boolean
  isPartiallyActive?: boolean
  customEventOptions?: EventOptions
}

export interface IProps extends IBaseProps, LinkProps {}

const LinkWrapper: React.FC<IProps> = ({
  to: toProp,
  href,
  children,
  hideArrow = false,
  isPartiallyActive = true,
  customEventOptions,
  ...restProps
}) => {
  const theme = useTheme()

  // TODO: in the next PR we are going to deprecate `to` prop and just use `href`
  const to = (toProp || href)!

  const isExternal = to.includes("http") || to.includes("mailto:")
  const isHash = isHashLink(to)
  const isGlossary = to.includes("glossary") && to.includes("#")
  const isStatic = to.includes("static")
  const isPdf = to.includes(".pdf")

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
      <Link href={to} {...restProps}>
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
          content: !hideArrow ? '"↗"' : undefined,
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
        {...restProps}
      >
        {children}
      </Link>
    )
  }

  // Use `gatsby-theme-i18n` Link (which prepends lang path)
  return (
    // @ts-ignore: IntlLink is requiring a `language` prop but that prop should
    // be optional. Opened issue: https://github.com/gatsbyjs/themes/issues/171
    <Link
      to={to}
      as={IntlLink}
      isPartiallyActive={isPartiallyActive}
      activeStyle={{ color: theme.colors.primary }}
      whiteSpace={isGlossary ? "nowrap" : "normal"}
      {...restProps}
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
