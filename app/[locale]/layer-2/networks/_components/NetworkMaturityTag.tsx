import type { MaturityLevel } from "@/lib/types"

import { Tag } from "@/components/ui/tag"

import { cn } from "@/lib/utils/cn"

// Same blue scale as the "Network maturity explained" table.
const MATURITY_CLASSES: Partial<Record<MaturityLevel, string>> = {
  robust: "bg-blue-600 text-white",
  maturing: "bg-blue-400 text-white",
  developing: "bg-blue-200 text-black",
  emerging: "bg-blue-100 text-black",
}

/** Maturity pill; with no maturity it is Mainnet's "Main network" pill. */
const NetworkMaturityTag = ({
  maturity,
  label,
}: {
  maturity?: MaturityLevel
  label: string
}) =>
  maturity ? (
    <Tag
      variant="solid"
      size="small"
      className={cn("w-fit", MATURITY_CLASSES[maturity])}
    >
      {label}
    </Tag>
  ) : (
    <Tag status="tag" size="small" className="w-fit">
      {label}
    </Tag>
  )

export default NetworkMaturityTag
