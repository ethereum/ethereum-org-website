import React from "react"
import {
  Box,
  Icon,
  Link as ChakraLink,
  LinkProps,
  useTheme,
  VisuallyHidden,
} from "@chakra-ui/react"
import { navigate as gatsbyNavigate } from "gatsby"
import { Link as IntlLink } from "gatsby-plugin-react-i18next"
import { NavigateOptions } from "@reach/router"

import { BsQuestionSquareFill } from "react-icons/bs"

import { Lang } from "../utils/languages"
import { trackCustomEvent, MatomoEventOptions } from "../utils/matomo"
import * as url from "../utils/url"
import { Direction } from "../types"
import { SITE_URL, DISCORD_PATH } from "../constants"

export interface IBaseProps {
  to?: string
  href?: string
  language?: Lang
  hideArrow?: boolean
  isPartiallyActive?: boolean
  customEventOptions?: MatomoEventOptions
  activeStyle?: object
}

export interface IProps extends IBaseProps, LinkProps {
  dir?: Direction // TODO: remove this prop once we use the native Chakra RTL support
}

/**
 * Link wrapper which handles:
 *
 * - Hashed links
 * e.g. <Link href="/page-2/#specific-section">
 *
 * - External links
 * e.g. <Link href="https://example.com/">
 *
 * - PDFs & static files (which open in a new tab)
 * e.g. <Link href="/eth-whitepaper.pdf">
 *
 * - Intl links
 * e.g. <Link href="/page-2/" language="de">
 */
const Link: React.FC<IProps> = ({
  to: toProp,
  href,
  language,
  dir = "ltr",
  children,
  hideArrow = false,
  isPartiallyActive = true,
  customEventOptions,
  activeStyle = null,
  ...restProps
}) => {
  const theme = useTheme()

  // TODO: in the next PR we are going to deprecate the `to` prop and just use `href`
  // this is to support the ButtonLink component which uses the `to` prop
  let to = (toProp ?? href)!

  const isDiscordInvite = url.isDiscordInvite(to)
  if (isDiscordInvite) to = new URL(DISCORD_PATH, SITE_URL).href
  const isExternal = url.isExternal(to)
  const isHash = url.isHash(to)
  const isGlossary = url.isGlossary(to)
  const isStatic = url.isStatic(to)
  const isPdf = url.isPdf(to)

  const externalLinkEvent: MatomoEventOptions = {
    eventCategory: `External link`,
    eventAction: `Clicked`,
    eventName: to,
  }

  const hashLinkEvent: MatomoEventOptions = {
    eventCategory: `Hash link`,
    eventAction: `Clicked`,
    eventName: to,
  }

  const commonProps = {
    dir,
    ...restProps,
  }

  // Must use Chakra's native <Link> for anchor links
  // Otherwise the Gatsby <Link> functionality will navigate to homepage
  // See https://github.com/gatsbyjs/gatsby/issues/21909
  if (isHash) {
    return (
      <ChakraLink
        href={to}
        onClick={(e) => {
          // only track events on external links and hash links
          if (!isHash) {
            return
          }

          e.stopPropagation()
          trackCustomEvent(
            customEventOptions ? customEventOptions : hashLinkEvent
          )
        }}
        {...commonProps}
      >
        {children}
      </ChakraLink>
    )
  }

  // Download link for internally hosted PDF's & static files (ex: whitepaper)
  // Opens in separate window.
  if (isExternal || isPdf || isStatic) {
    return (
      <ChakraLink
        href={to}
        isExternal
        onClick={(e) => {
          // only track events on external links and hash links
          if (!isExternal) {
            return
          }

          e.stopPropagation()
          trackCustomEvent(
            customEventOptions ? customEventOptions : externalLinkEvent
          )
        }}
        {...commonProps}
      >
        <>
          {children}
          <VisuallyHidden>(opens in a new tab)</VisuallyHidden>
          {!hideArrow && (
            <Box as="span" ml={0.5} mr={1.5} aria-hidden>
              ↗
            </Box>
          )}
        </>
      </ChakraLink>
    )
  }

  // Use `gatsby-theme-i18n` Link (which prepends lang path)
  return (
    <ChakraLink
      to={to}
      as={IntlLink}
      language={language}
      partiallyActive={isPartiallyActive}
      activeStyle={activeStyle ? activeStyle : { color: theme.colors.primary }}
      whiteSpace={isGlossary ? "nowrap" : "normal"}
      {...commonProps}
    >
      <>
        {children}
        {isGlossary && (
          <Icon
            as={BsQuestionSquareFill}
            aria-label="See definition"
            fontSize="12px"
            margin="0 0.25rem 0 0.35rem"
            _hover={{
              transition: "transform 0.1s",
              transform: "scale(1.2)",
            }}
          />
        )}
      </>
    </ChakraLink>
  )
}

export function navigate(
  to: string,
  language: Lang,
  options?: NavigateOptions<{}>
) {
  if (typeof window === "undefined") {
    return
  }

  const link = `/${language}${to}`
  gatsbyNavigate(link, options)
}

export default Link
