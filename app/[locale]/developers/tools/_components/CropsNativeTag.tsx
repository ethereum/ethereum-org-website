import { Info } from "lucide-react"

import Tooltip from "@/components/Tooltip"
import { BaseLink } from "@/components/ui/Link"
import { Tag, type TagProps } from "@/components/ui/tag"

/**
 * "CROPS Native" tag. The label links to the EF mandate, and a separate info
 * button opens the explanation tooltip, so both stay reachable by keyboard.
 * Shared by the standalone tool page and the intercepted tool modal.
 */
const CropsNativeTag = ({
  label,
  description,
  infoLabel,
  size,
}: {
  label: string
  description: string
  /** Accessible name for the info button */
  infoLabel: string
  size?: TagProps["size"]
}) => (
  <Tag status="success" size={size} className="gap-1">
    <BaseLink
      href="/foundation/mandate/"
      className="text-current no-underline hover:text-current hover:underline"
    >
      {label}
    </BaseLink>
    <Tooltip asChild content={<p className="text-body">{description}</p>}>
      <button type="button" aria-label={infoLabel} className="rounded-full">
        <Info aria-hidden className="size-3 shrink-0" />
      </button>
    </Tooltip>
  </Tag>
)

export default CropsNativeTag
