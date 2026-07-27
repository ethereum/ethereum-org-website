import { Check } from "lucide-react"
import { getTranslations } from "next-intl/server"

import { FieldLegend, FieldSet } from "@/components/ui/field"
import { BaseLink } from "@/components/ui/Link"

import { cn } from "@/lib/utils/cn"

import { WALLET_PERSONAS, type WalletPersonaId } from "@/data/wallets/personas"

type WalletPersonaCardsProps = {
  locale: string
  personaCounts: Record<WalletPersonaId, number>
  currentPersonaId?: WalletPersonaId
}

// Keyed by id, not array position, so reordering WALLET_PERSONAS can't desync
// a card from its color. Class strings must stay literal for Tailwind's
// scanner. Chip counterpart: `PERSONA_TAG_STATUS`.
type PersonaColor = { text: string; border: string; bg: string; bgTint: string }

const PERSONA_COLORS: Record<WalletPersonaId, PersonaColor> = {
  "new-to-crypto": {
    text: "text-primary",
    border: "border-primary",
    bg: "bg-primary",
    bgTint: "bg-primary/10",
  },
  developer: {
    text: "text-accent-b",
    border: "border-accent-b",
    bg: "bg-accent-b",
    bgTint: "bg-accent-b/10",
  },
  finance: {
    text: "text-accent-c",
    border: "border-accent-c",
    bg: "bg-accent-c",
    bgTint: "bg-accent-c/10",
  },
  hardware: {
    text: "text-accent-a",
    border: "border-accent-a",
    bg: "bg-accent-a",
    bgTint: "bg-accent-a/10",
  },
  // No accent-d token exists, so nfts rides the warning/yellow family — the
  // same tokens behind its `tag-yellow` chip.
  nfts: {
    text: "text-warning-dark dark:text-yellow-500",
    border: "border-warning-dark dark:border-yellow-500",
    bg: "bg-warning-dark dark:bg-yellow-500",
    bgTint: "bg-warning-dark/10 dark:bg-yellow-500/10",
  },
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
    <FieldSet className="relative min-w-0 gap-0 overflow-x-clip">
      <FieldLegend className="sr-only">
        {t("page-find-wallet-persona-legend")}
      </FieldLegend>
      <div
        className="grid auto-cols-[200px] grid-flow-col gap-4 overflow-x-auto px-4 lg:auto-cols-fr"
        data-testid="persona-cards-container"
      >
        {WALLET_PERSONAS.map((persona) => {
          const isActive = currentPersonaId === persona.id
          const color = PERSONA_COLORS[persona.id]
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
                  "group flex h-[164px] w-full cursor-pointer flex-col items-start rounded-base border-2 p-3 no-underline shadow-lg transition-all duration-50 focus-visible:outline focus-visible:outline-4 focus-visible:-outline-offset-4 focus-visible:outline-primary-hover lg:h-full lg:p-6",
                  isActive
                    ? cn(color.border, color.bgTint)
                    : "border-primary-low-contrast hover:bg-background-highlight"
                )}
              >
                <div className="items-top flex w-full gap-2 px-1.5 text-base leading-normal font-normal">
                  <span
                    aria-hidden
                    className={cn(
                      "relative mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded border-2",
                      color.border,
                      isActive && color.bg
                    )}
                  >
                    {isActive && (
                      <Check className="size-4 stroke-[3] text-background" />
                    )}
                  </span>
                  <span
                    className={cn(
                      "text-left text-xl font-bold hyphens-auto transition-all duration-50",
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
