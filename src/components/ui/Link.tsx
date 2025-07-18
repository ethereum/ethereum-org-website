"use client"

import { AnchorHTMLAttributes, ComponentProps, forwardRef } from "react"
import { ExternalLink, Mail } from "lucide-react"
import NextLink from "next/link"
import { VisuallyHidden } from "@radix-ui/react-visually-hidden"

import { cn } from "@/lib/utils/cn"
import { type MatomoEventOptions, trackCustomEvent } from "@/lib/utils/matomo"
import { getRelativePath } from "@/lib/utils/relativePath"
import * as url from "@/lib/utils/url"

import { DISCORD_PATH, SITE_URL } from "@/lib/constants"

import { useRtlFlip } from "@/hooks/useRtlFlip"
import { Link as I18nLink } from "@/i18n/routing"
import { usePathname } from "@/i18n/routing"

type BaseProps = {
  hideArrow?: boolean
  isPartiallyActive?: boolean
  activeClassName?: string
  customEventOptions?: MatomoEventOptions
}

export type LinkProps = BaseProps &
  AnchorHTMLAttributes<HTMLAnchorElement> &
  Omit<ComponentProps<typeof I18nLink>, "href">

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
  const pathname = usePathname()
  const { twFlipForRtl } = useRtlFlip()

  if (!href) {
    // If troubleshooting this warning, check for multiple h1's in markdown content—these will result in broken id hrefs
    console.warn(`Link component missing href prop, pathname: ${pathname}`)
    return <a {...props} />
  }

  const isActive = url.isHrefActive(href, pathname || "", isPartiallyActive)
  const isDiscordInvite = url.isDiscordInvite(href)
  const isFile = url.isFile(href)
  const isExternal = url.isExternal(href)
  const isMailto = url.isMailto(href)
  const isInternalFile = isFile && !isExternal
  const isHash = url.isHash(href)

  // Get proper download link for internally hosted files (ex: whitepaper.pdf)
  // Opens in separate window.
  if (isInternalFile && !href.startsWith("/")) {
    href = "/" + getRelativePath(pathname, href)
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
        rel="noopener noreferrer"
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
        {isMailto ? (
          <span className="text-nowrap">
            {!hideArrow && (
              <Mail className="!mb-0.5 me-1 inline-block size-[1em] shrink-0" />
            )}
            {children}
          </span>
        ) : (
          children
        )}
        <VisuallyHidden>
          {isMailto ? "opens email client" : "opens in a new tab"}
        </VisuallyHidden>
        {!hideArrow && !isMailto && (
          <ExternalLink
            data-label="arrow"
            className={cn(
              "!mb-0.5 ms-1 inline-block size-[0.875em] max-h-4 max-w-4 shrink-0",
              twFlipForRtl
            )}
          />
        )}
      </a>
    )
  }

  if (isInternalFile) {
    return (
      <NextLink
        target="_blank"
        rel="noopener noreferrer"
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
    <I18nLink
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
    </I18nLink>
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
