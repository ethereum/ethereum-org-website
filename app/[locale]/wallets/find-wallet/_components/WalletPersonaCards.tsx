import { Check } from "lucide-react"
import { getTranslations } from "next-intl/server"

import { FieldLegend, FieldSet } from "@/components/ui/field"
import { BaseLink } from "@/components/ui/Link"

import { cn } from "@/lib/utils/cn"
import type { WalletPersonaId } from "@/lib/utils/walletData"

import { WALLET_PERSONAS } from "@/data/wallets/personas"

type WalletPersonaCardsProps = {
  locale: string
  personaCounts: Record<WalletPersonaId, number>
  currentPersonaId?: WalletPersonaId
}

const colors = {
  text: [
    "text-primary",
    "text-accent-b",
    "text-accent-c",
    "text-accent-a",
    "text-[#BEBF3B]",
  ],
  border: [
    "border-primary",
    "border-accent-b",
    "border-accent-c",
    "border-accent-a",
    "border-[#BEBF3B]",
  ],
  bg: [
    "bg-primary",
    "bg-accent-b",
    "bg-accent-c",
    "bg-accent-a",
    "bg-[#BEBF3B]",
  ],
}

/**
 * Persona navigation: server-rendered `<Link>` cards that route to persona
 * pages (`/wallets/find-wallet/personas/[persona]`) for real SEO
 * differentiation, not client-side filters. The active persona reads as
 * "checked" and links back to the full list, so clicking it again clears it.
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
    <FieldSet className="relative min-w-0 gap-0 overflow-x-clip">
      <FieldLegend className="sr-only">
        {t("page-find-wallet-persona-legend")}
      </FieldLegend>
      <div
        className="grid auto-cols-[200px] grid-flow-col gap-4 overflow-x-auto px-4 lg:auto-cols-fr"
        data-testid="preset-filters-container"
      >
        {WALLET_PERSONAS.map((persona, idx) => {
          const isActive = currentPersonaId === persona.id
          const colorIdx = colors.text[idx] ? idx : idx % colors.text.length
          const count = personaCounts[persona.id]
          return (
            <div key={persona.id} className="grid-rows-1 pb-5">
              <BaseLink
                href={
                  isActive
                    ? "/wallets/find-wallet/"
                    : `/wallets/find-wallet/personas/${persona.id}/`
                }
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "group flex h-[164px] w-full cursor-pointer flex-col items-start rounded-base border p-3 no-underline shadow-lg transition-all duration-50 hover:bg-background-highlight focus-visible:outline focus-visible:outline-4 focus-visible:-outline-offset-4 focus-visible:outline-primary-hover lg:h-full lg:p-6",
                  isActive ? "border-primary" : "border-primary-low-contrast"
                )}
              >
                <div className="items-top flex w-full gap-2 px-1.5 text-base leading-normal font-normal">
                  <span
                    aria-hidden
                    className={cn(
                      "relative mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded border-2",
                      colors.border[colorIdx],
                      isActive && colors.bg[colorIdx]
                    )}
                  >
                    {isActive && (
                      <Check className="size-4 stroke-[3] text-background" />
                    )}
                  </span>
                  <span
                    className={cn(
                      "text-left text-xl font-bold hyphens-auto transition-all duration-50",
                      colors.text[colorIdx]
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
                </div>
                <p className="p-2 text-left text-sm leading-normal font-normal text-body transition-colors duration-500">
                  {t(persona.descKey)}
                </p>
              </BaseLink>
            </div>
          )
        })}
      </div>
    </FieldSet>
  )
}

export default WalletPersonaCards
