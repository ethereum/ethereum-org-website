import { memo } from "react"

import { Tag } from "../ui/tag"

import { useTranslation } from "@/hooks/useTranslation"

type PersonaTagsProps = {
  walletPersonas: string[]
}

const PersonaTags = ({ walletPersonas }: PersonaTagsProps) => {
  const { t } = useTranslation("page-wallets-find-wallet")

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
