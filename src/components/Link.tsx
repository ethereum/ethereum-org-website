import NextLink, { type LinkProps as NextLinkProps } from "next/link"
import { useRouter } from "next/router"
import { RxExternalLink } from "react-icons/rx"
import {
  forwardRef,
  Icon,
  Link as ChakraLink,
  type LinkProps as ChakraLinkProps,
  type StyleProps,
  VisuallyHidden,
} from "@chakra-ui/react"

import { type MatomoEventOptions, trackCustomEvent } from "@/lib/utils/matomo"
import { getRelativePath } from "@/lib/utils/relativePath"
import * as url from "@/lib/utils/url"

import { DISCORD_PATH, SITE_URL } from "@/lib/constants"

import { useRtlFlip } from "@/hooks/useRtlFlip"

type BaseProps = {
  hideArrow?: boolean
  isPartiallyActive?: boolean
  activeStyle?: StyleProps
  customEventOptions?: MatomoEventOptions
}

export type LinkProps = BaseProps &
  ChakraLinkProps &
  Omit<NextLinkProps, "as" | "legacyBehavior" | "passHref" | "href">

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
 */
export const BaseLink = forwardRef(function Link(
  {
    href,
    children,
    hideArrow,
    isPartiallyActive = true,
    activeStyle = { color: "primary.base" },
    customEventOptions,
    ...props
  }: LinkProps,
  ref
) {
  const { locale, asPath } = useRouter()
  const { flipForRtl } = useRtlFlip()

  if (!href) {
    console.warn("Link component is missing href prop:", asPath, locale)
    return <ChakraLink {...props} />
  }

  const isActive = url.isHrefActive(href, asPath, isPartiallyActive)
  const isDiscordInvite = url.isDiscordInvite(href)
  const isPdf = url.isPdf(href)
  const isExternal = url.isExternal(href)
  const isInternalPdf = isPdf && !isExternal
  const isHash = url.isHash(href)

  // Get proper download link for internally hosted PDF's & static files (ex: whitepaper)
  // Opens in separate window.
  if (isInternalPdf) {
    href = getRelativePath(asPath, href)
  }

  if (isDiscordInvite) {
    href = new URL(DISCORD_PATH, SITE_URL).href
  }

  const commonProps = {
    ref,
    ...props,
    ...(isActive && activeStyle),
    href,
  }

  if (isExternal) {
    return (
      <ChakraLink
        isExternal
        onClick={() =>
          trackCustomEvent(
            customEventOptions ?? {
              eventCategory: `Link`,
              eventAction: `Clicked`,
              eventName: "Clicked on external link",
              eventValue: href,
            }
          )
        }
        {...commonProps}
      >
        {children}
        <VisuallyHidden>(opens in a new tab)</VisuallyHidden>
        {!hideArrow && (
          <Icon
            as={RxExternalLink}
            boxSize="6"
            p="1"
            verticalAlign="middle"
            me="-1"
            transform={flipForRtl}
          />
        )}
      </ChakraLink>
    )
  }

  if (isInternalPdf) {
    return (
      <ChakraLink
        isExternal
        // disable locale prefixing for internal PDFs
        // TODO: add i18n support using a rehype plugin (similar as we do for
        // images)
        locale={false}
        onClick={() =>
          trackCustomEvent(
            customEventOptions ?? {
              eventCategory: `Link`,
              eventAction: `Clicked`,
              eventName: "Clicked on internal PDF",
              eventValue: href,
            }
          )
        }
        {...commonProps}
        as={NextLink}
      >
        {children}
      </ChakraLink>
    )
  }

  if (isHash) {
    return (
      <ChakraLink
        onClick={(e) => {
          e.stopPropagation()
          trackCustomEvent(
            customEventOptions ?? {
              eventCategory: "Link",
              eventAction: "Clicked",
              eventName: "Clicked on hash link",
              eventValue: href,
            }
          )
        }}
        {...commonProps}
      >
        {children}
      </ChakraLink>
    )
  }

  return (
    <ChakraLink
      onClick={() =>
        trackCustomEvent(
          customEventOptions ?? {
            eventCategory: `Link`,
            eventAction: `Clicked`,
            eventName: `Clicked on internal link`,
            eventValue: href,
          }
        )
      }
      {...commonProps}
      as={NextLink}
    >
      {children}
    </ChakraLink>
  )
})

const InlineLink = forwardRef((props: LinkProps, ref) => {
  return <BaseLink data-inline-link ref={ref} {...props} />
})

export default InlineLink
