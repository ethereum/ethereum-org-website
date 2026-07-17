import { getLocale } from "next-intl/server"

import type { Lang } from "@/lib/types"

import { isLangRightToLeft } from "@/lib/utils/translations"

import MobileMenuClient from "./MobileMenuClient"

type MobileMenuProps = {
  className?: string
}

/**
 * Mobile navigation menu wrapper
 *
 * This is intentionally lightweight - the actual menu content is lazy-loaded
 * client-side in MobileMenuClient to avoid including ~82KB of navigation data
 * in the initial RSC payload. The navigation is behind a hamburger button
 * click, so it doesn't need to be SSR'd.
 */
export default async function MobileMenu({
  className,
  ...props
}: MobileMenuProps) {
  const locale = await getLocale()
  const isRtl = isLangRightToLeft(locale as Lang)
  const side = isRtl ? "right" : "left"

  return <MobileMenuClient className={className} side={side} {...props} />
}
