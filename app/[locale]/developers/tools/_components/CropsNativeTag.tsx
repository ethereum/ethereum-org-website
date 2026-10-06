import { Info } from "lucide-react"

import Tooltip from "@/components/Tooltip"
import InlineLink from "@/components/ui/Link"
import { Tag, type TagProps } from "@/components/ui/tag"

/**
 * "CROPS Native" tag with an explanatory tooltip linking to the EF mandate.
 * Shared by the standalone tool page and the intercepted tool modal.
 */
const CropsNativeTag = ({
  label,
  description,
  learnMoreLabel,
  size,
}: {
  label: string
  description: string
  learnMoreLabel: string
  size?: TagProps["size"]
}) => (
  <Tooltip
    asChild
    content={
      <p className="text-body">
        {description}{" "}
        <InlineLink href="/foundation/mandate/">{learnMoreLabel}</InlineLink>
      </p>
    }
  >
    <Tag asChild status="success" size={size} className="gap-1">
      <button type="button">
        {label}
        <Info className="size-3 shrink-0" />
      </button>
    </Tag>
  </Tooltip>
)

export default CropsNativeTag
