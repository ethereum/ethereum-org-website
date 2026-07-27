"use client"

import { memo } from "react"

import { Tag } from "@/components/ui/tag"

import {
  PERSONA_TAG_STATUS,
  type WalletPersonaId,
} from "@/data/wallets/personas"

type WalletPersonaTagsProps = {
  personas: WalletPersonaId[]
  labels: Record<WalletPersonaId, string>
}

/**
 * Keep `"use client"`: WalletCard imports this, and dropping the directive
 * breaks hydration of the whole catalog island (dead clicks, stalled images).
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
