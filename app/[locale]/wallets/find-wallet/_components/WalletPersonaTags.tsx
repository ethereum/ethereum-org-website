"use client"

import { memo } from "react"

import { Tag } from "@/components/ui/tag"

import {
  PERSONA_TAG_STATUS,
  type WalletPersonaId,
} from "@/data/wallets/personas"

type WalletPersonaTagsProps = {
  personas: WalletPersonaId[]
  /** Localized persona titles keyed by id, built on the server. */
  labels: Record<WalletPersonaId, string>
}

/**
 * Persona chips for a wallet. Each chip carries its persona's accent color via
 * `PERSONA_TAG_STATUS`. Titles come in pre-localized as props so this stays a
 * plain, i18n-runtime-free component. Renders nothing when there are no personas.
 */
const WalletPersonaTags = ({ personas, labels }: WalletPersonaTagsProps) => {
  if (personas.length === 0) return null

  return (
    <div className="flex flex-row flex-wrap gap-1">
      {personas.map((persona) => (
        <Tag
          key={persona}
          variant="subtle"
          status={PERSONA_TAG_STATUS[persona]}
          size="small"
        >
          {labels[persona]}
        </Tag>
      ))}
    </div>
  )
}

export default memo(WalletPersonaTags)
