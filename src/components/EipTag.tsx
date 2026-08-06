import { getTranslations } from "next-intl/server"

import { Tag } from "@/components/ui/tag"

import { type EipStatus, upgrades } from "@/data/upgrades"

export type EipTagProps = {
  /** Key into `src/data/upgrades`, e.g. "glamsterdam". */
  upgrade: string
  /** EIP number, e.g. 7732. */
  id: number
}

/**
 * How firm an EIP's inclusion is, using the reader-facing wording rather than
 * the All Core Devs acronyms. `pfi` and `cfi` collapse to one label because the
 * distinction between "proposed" and "considered" is process detail a general
 * reader can't act on — Forkcast has it if they want it.
 */
const STATUS_LABELS: Partial<
  Record<EipStatus, { key: string; status: "success" | "normal" }>
> = {
  sfi: { key: "page-roadmap-eip-status-scheduled", status: "success" },
  cfi: { key: "page-roadmap-eip-status-considered", status: "normal" },
  pfi: { key: "page-roadmap-eip-status-considered", status: "normal" },
}

/**
 * Inclusion-status chip for one EIP on an upgrade page.
 *
 * In July the page described already-scheduled EIPs as "being considered for
 * inclusion". Driving this from `eips[].status` means that framing can't drift
 * again: the chip is whatever the data says, and the data is checked against
 * Forkcast rather than written by hand into prose.
 *
 * Declined EIPs render nothing — a declined EIP should be removed from the
 * page, not labelled.
 */
const EipTag = async ({ upgrade, id }: EipTagProps) => {
  const eip = upgrades[upgrade]?.eips.find((e) => e.id === id)
  if (!eip) return null

  const label = STATUS_LABELS[eip.status]
  if (!label) return null

  const t = await getTranslations("page-roadmap")

  return (
    <Tag status={label.status} size="small">
      {t(label.key)}
    </Tag>
  )
}

export default EipTag
