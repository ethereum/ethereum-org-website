import { memo } from "react"
import { useTranslations } from "next-intl"

import { Tag } from "../ui/tag"

type PersonaTagsProps = {
  walletPersonas: string[]
}

const PersonaTags = ({ walletPersonas }: PersonaTagsProps) => {
  const t = useTranslations("page-wallets-find-wallet")

  if (walletPersonas.length === 0) return null

  return (
    <div className="flex flex-row flex-wrap gap-1">
      {walletPersonas.map((persona) => (
        <Tag key={persona} variant="high-contrast" size="small">
          {t(persona)}
        </Tag>
      ))}
    </div>
  )
}

export default memo(PersonaTags)
