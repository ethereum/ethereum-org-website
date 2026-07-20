import { getTranslations } from "next-intl/server"

import { BaseLink } from "@/components/ui/Link"

import { cn } from "@/lib/utils/cn"
import type { WalletPersonaId } from "@/lib/utils/walletData"

import { WALLET_PERSONAS } from "@/data/wallets/personas"

type WalletPersonaCardsProps = {
  locale: string
  personaCounts: Record<WalletPersonaId, number>
  totalCount: number
  currentPersonaId?: WalletPersonaId
}

/**
 * Persona navigation: server-rendered `<Link>` cards that route to persona
 * pages (`/wallets/find-wallet/personas/[persona]`). Each persona page bakes
 * its wallet subset into the HTML for real SEO differentiation — this is
 * navigation, not a client-side filter (revamp plan, decision #4).
 */
const WalletPersonaCards = async ({
  locale,
  personaCounts,
  totalCount,
  currentPersonaId,
}: WalletPersonaCardsProps) => {
  const t = await getTranslations({
    locale,
    namespace: "page-wallets-find-wallet",
  })

  const cardClass = (isCurrent: boolean) =>
    cn(
      "flex flex-col gap-1 rounded-xl border p-4 no-underline transition-colors hover:bg-background-highlight",
      isCurrent ? "border-primary bg-background-highlight" : "border-body-light"
    )

  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
      <BaseLink
        href="/wallets/find-wallet/"
        className={cardClass(!currentPersonaId)}
        aria-current={!currentPersonaId ? "page" : undefined}
      >
        <span className="font-bold text-body">
          {t("page-find-wallet-table-title")}
        </span>
        <span className="text-sm text-body-medium">
          {t("page-find-wallet-persona-count-available", { count: totalCount })}
        </span>
      </BaseLink>

      {WALLET_PERSONAS.map((persona) => {
        const isCurrent = currentPersonaId === persona.id
        return (
          <BaseLink
            key={persona.id}
            href={`/wallets/find-wallet/personas/${persona.id}/`}
            className={cardClass(isCurrent)}
            aria-current={isCurrent ? "page" : undefined}
          >
            <span className="font-bold text-body">{t(persona.titleKey)}</span>
            <span className="text-sm text-body-medium">
              {t("page-find-wallet-persona-count-available", {
                count: personaCounts[persona.id],
              })}
            </span>
          </BaseLink>
        )
      })}
    </div>
  )
}

export default WalletPersonaCards
