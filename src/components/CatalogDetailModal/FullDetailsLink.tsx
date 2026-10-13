import { ArrowRight } from "lucide-react"

/**
 * Link out of the modal to the listing's standalone page.
 *
 * Deliberate raw anchor (against the design-system "no raw <a>" rule) because
 * the modal already sits on that URL, so only a document navigation escapes the
 * interception. `LinkWithArrow` is out for the same reason; its markup is
 * mirrored here. Pass an already-localized pathname from `getPathname`.
 */
const FullDetailsLink = ({ href, label }: { href: string; label: string }) => (
  <a
    href={href}
    className="group mt-1 self-end text-sm no-underline visited:text-primary-visited"
  >
    <span className="group-hover:underline">{label}</span>
    <ArrowRight className="ms-1 mb-0.5 inline size-[1em] rtl:-scale-x-100" />
  </a>
)

export default FullDetailsLink
