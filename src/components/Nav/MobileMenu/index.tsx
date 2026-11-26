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
export default function MobileMenu({ className, ...props }: MobileMenuProps) {
  return <MobileMenuClient className={className} {...props} />
}
