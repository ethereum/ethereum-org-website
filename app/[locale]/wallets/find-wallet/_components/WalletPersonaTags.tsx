import { memo } from "react"
import { useTranslations } from "next-intl"

import { Tag } from "@/components/ui/tag"

import {
  PERSONA_TITLE_KEYS,
  type WalletPersonaId,
} from "@/data/wallets/personas"

type WalletPersonaTagsProps = {
  personas: WalletPersonaId[]
}

/** Persona chips for a wallet card, resolving persona ids to localized titles. */
const WalletPersonaTags = ({ personas }: WalletPersonaTagsProps) => {
  const t = useTranslations("page-wallets-find-wallet")

  if (personas.length === 0) return null

  return (
    <div className="flex flex-row flex-wrap gap-1">
      {personas.map((persona) => (
        <Tag key={persona} variant="high-contrast" size="small">
          {t(PERSONA_TITLE_KEYS[persona])}
        </Tag>
      ))}
    </div>
  )
}

export default memo(WalletPersonaTags)
