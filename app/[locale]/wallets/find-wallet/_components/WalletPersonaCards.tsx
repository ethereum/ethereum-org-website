import { Check } from "lucide-react"
import { getTranslations } from "next-intl/server"

import { BaseLink } from "@/components/ui/Link"

import { cn } from "@/lib/utils/cn"
import type { WalletPersonaId } from "@/lib/utils/walletData"

import { PERSONA_STYLES, WALLET_PERSONAS } from "@/data/wallets/personas"

type WalletPersonaCardsProps = {
  locale: string
  personaCounts: Record<WalletPersonaId, number>
  currentPersonaId?: WalletPersonaId
}

/**
 * Persona navigation: server-rendered `<Link>` cards that route to persona
 * pages (`/wallets/find-wallet/personas/[persona]`). Each persona page bakes
 * its wallet subset into the HTML for real SEO differentiation — this is
 * navigation, not a client-side filter (revamp plan, decision #4).
 *
 * Styling mirrors the Figma redesign / legacy ProductTable persona cards:
 * a colored checkbox indicator + colored title, description, and count. The
 * currently-active persona reads as "checked" and links back to the full list,
 * so clicking it again clears the persona (matching the old toggle behavior).
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
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
      {WALLET_PERSONAS.map((persona) => {
        const isCurrent = currentPersonaId === persona.id
        const style = PERSONA_STYLES[persona.id]
        const count = personaCounts[persona.id]
        return (
          <BaseLink
            key={persona.id}
            // Re-clicking the active persona clears it back to the full list.
            href={
              isCurrent
                ? "/wallets/find-wallet/"
                : `/wallets/find-wallet/personas/${persona.id}/`
            }
            aria-current={isCurrent ? "page" : undefined}
            className={cn(
              "group flex h-full min-h-[156px] flex-col items-start rounded-base border p-4 no-underline shadow-lg transition-colors hover:bg-background-highlight lg:p-6",
              isCurrent ? style.border : "border-primary-low-contrast"
            )}
          >
            <div className="flex w-full items-start gap-2">
              <span
                aria-hidden
                className={cn(
                  "relative mt-0.5 flex size-5 shrink-0 items-center justify-center rounded border-2",
                  style.border,
                  isCurrent && style.bg
                )}
              >
                {isCurrent && (
                  <Check className="size-4 stroke-[3] text-background" />
                )}
              </span>
              <span
                className={cn(
                  "text-left text-xl font-bold hyphens-auto",
                  style.text
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
            <p className="mt-2 text-left text-sm leading-normal text-body">
              {t(persona.descKey)}
            </p>
          </BaseLink>
        )
      })}
    </div>
  )
}

export default WalletPersonaCards
