import React from "react"
import {
  forwardRef,
  Icon,
  Link as ChakraLink,
  LinkProps,
  useTheme,
  VisuallyHidden,
} from "@chakra-ui/react"
import { navigate as gatsbyNavigate } from "gatsby"
import { Link as IntlLink } from "gatsby-plugin-react-i18next"
import { NavigateOptions } from "@reach/router"
import { RxExternalLink } from "react-icons/rx"

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
export const BaseLink = forwardRef<IProps, "a">(
  (
    {
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
    },
    ref
  ) => {
    const theme = useTheme()

    // TODO: in the next PR we are going to deprecate the `to` prop and just use `href`
    // this is to support the ButtonLink component which uses the `to` prop
    let to = (toProp ?? href)!

    const isDiscordInvite = url.isDiscordInvite(to)
    if (isDiscordInvite) to = new URL(DISCORD_PATH, SITE_URL).href
    const isExternal = url.isExternal(to)
    const isHash = url.isHash(to)
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

    const commonProps: LinkProps & { ref: React.ForwardedRef<any> } = {
      ref,
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
              <Icon
                as={RxExternalLink}
                boxSize="6"
                p="1"
                verticalAlign="middle"
                me="-1"
              />
            )}
          </>
        </ChakraLink>
      )
    }

    // Use `gatsby-theme-i18n` Link (which prepends lang path)
    return (
      <ChakraLink
        as={IntlLink}
        to={to}
        language={language}
        partiallyActive={isPartiallyActive}
        activeStyle={
          activeStyle ? activeStyle : { color: theme.colors.primary }
        }
        whiteSpace={"normal"}
        {...commonProps}
      >
        {children}
      </ChakraLink>
    )
  }
)

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

const InlineLink = (props: IProps) => <BaseLink data-inline-link {...props} />

export default InlineLink
