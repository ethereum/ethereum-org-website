import { getTranslations } from "next-intl/server"

import { BaseLink } from "@/components/ui/Link"

import { cn } from "@/lib/utils/cn"

import {
  PERSONA_STYLES,
  WALLET_PERSONAS,
  type WalletPersonaId,
} from "@/data/wallets/personas"

type WalletPersonaCardsProps = {
  locale: string
  personaCounts: Record<WalletPersonaId, number>
  currentPersonaId?: WalletPersonaId
}

/**
 * Real links to persona pages, not client-side filters, so each persona is its
 * own indexable page. The active card links back to the full list.
 */
const WalletPersonaCards = async ({
  locale,
  personaCounts,
  currentPersonaId,
}: WalletPersonaCardsProps) => {
  const t = await getTranslations({
    locale,
    namespace: "page-wallets-find-wallet",
  })

  return (
    <nav
      className="relative min-w-0 overflow-x-clip"
      aria-label={t("page-find-wallet-persona-legend")}
    >
      <ul
        className="m-0 grid list-none auto-cols-[200px] grid-flow-col gap-4 overflow-x-auto px-4 lg:auto-cols-fr"
        data-testid="persona-cards-container"
      >
        {WALLET_PERSONAS.map((persona) => {
          const isActive = currentPersonaId === persona.id
          const color = PERSONA_STYLES[persona.id]
          const count = personaCounts[persona.id]
          return (
            <li key={persona.id} className="grid-rows-1 pb-5">
              <BaseLink
                href={
                  isActive
                    ? "/wallets/find-wallet/"
                    : `/wallets/find-wallet/personas/${persona.id}/`
                }
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "group flex h-[164px] w-full cursor-pointer flex-col items-start rounded-base border-2 p-3 no-underline shadow-lg transition-all duration-50 focus-visible:outline focus-visible:outline-4 focus-visible:-outline-offset-4 focus-visible:outline-primary-hover lg:h-full lg:p-6",
                  isActive
                    ? cn(color.border, color.bgTint)
                    : "border-primary-low-contrast hover:bg-background-highlight"
                )}
              >
                <span
                  className={cn(
                    "w-full px-1.5 text-left text-xl leading-normal font-bold hyphens-auto transition-all duration-50",
                    color.text
                  )}
                >
                  {t(persona.titleKey)}
                  <span aria-hidden="true" className="font-normal">
                    {" "}
                    ({count})
                  </span>
                  <span className="sr-only">
                    {" "}
                    {t("page-find-wallet-persona-count-available", { count })}
                  </span>
                </span>
                <p className="px-1.5 py-2 text-left text-sm leading-normal font-normal text-body transition-colors duration-500">
                  {t(persona.descKey)}
                </p>
              </BaseLink>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

export default WalletPersonaCards
