import { AnchorHTMLAttributes, forwardRef } from "react"
import NextLink, { type LinkProps as NextLinkProps } from "next/link"
import { useRouter } from "next/router"
import { RxExternalLink } from "react-icons/rx"
import { VisuallyHidden } from "@radix-ui/react-visually-hidden"

import { cn } from "@/lib/utils/cn"
import { type MatomoEventOptions, trackCustomEvent } from "@/lib/utils/matomo"
import { getRelativePath } from "@/lib/utils/relativePath"
import * as url from "@/lib/utils/url"

import { DISCORD_PATH, SITE_URL } from "@/lib/constants"

import { useRtlFlip } from "@/hooks/useRtlFlip"

type BaseProps = {
  hideArrow?: boolean
  isPartiallyActive?: boolean
  activeClassName?: string
  customEventOptions?: MatomoEventOptions
}

export type LinkProps = BaseProps &
  AnchorHTMLAttributes<HTMLAnchorElement> &
  Omit<NextLinkProps, "href">

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
export const BaseLink = forwardRef<HTMLAnchorElement, LinkProps>(function Link(
  {
    href,
    children,
    className,
    hideArrow,
    isPartiallyActive = true,
    activeClassName = "text-primary",
    customEventOptions,
    ...props
  }: LinkProps,
  ref
) {
  const { asPath } = useRouter()
  const { twFlipForRtl } = useRtlFlip()

  if (!href) {
    console.warn("Link component is missing href prop")
    return <a {...props} />
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
    className: cn(className, { [activeClassName]: isActive }),
    href,
  }

  if (isExternal) {
    return (
      <a
        target="_blank"
        rel="noopener"
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
          <RxExternalLink
            className={cn(
              "-me-1 inline h-6 w-6 p-1 align-middle",
              twFlipForRtl
            )}
          />
        )}
      </a>
    )
  }

  if (isInternalPdf) {
    return (
      <NextLink
        target="_blank"
        rel="noopener"
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
      >
        {children}
      </NextLink>
    )
  }

  if (isHash) {
    return (
      <a
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
      </a>
    )
  }

  return (
    <NextLink
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
    >
      {children}
    </NextLink>
  )
})
BaseLink.displayName = "BaseLink"

const InlineLink = forwardRef<HTMLAnchorElement, LinkProps>(
  (props: LinkProps, ref) => {
    return (
      <BaseLink className="visited:text-primary-visited" ref={ref} {...props} />
    )
  }
)
InlineLink.displayName = "InlineLink"

export default InlineLink
