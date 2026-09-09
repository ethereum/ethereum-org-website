"use client"

import { memo, useId } from "react"
import { Check } from "lucide-react"

import Checkbox from "@/components/ui/checkbox"
import { FieldLegend, FieldSet } from "@/components/ui/field"

import { cn } from "@/lib/utils/cn"
import { numberFormat } from "@/lib/utils/numbers"

import { PERSONA_STYLES, type WalletPersonaId } from "@/data/wallets/personas"

export type WalletPersonaCard = {
  id: WalletPersonaId
  title: string
  description: string
}

type WalletPersonaCardsProps = {
  locale: string
  personas: WalletPersonaCard[]
  counts: Record<WalletPersonaId, number>
  selected: WalletPersonaId[]
  onToggle: (persona: WalletPersonaCard) => void
  labels: {
    legend: string
    /** Raw message with a `{count}` placeholder. */
    countAvailable: string
  }
}

const PersonaCard = memo(function PersonaCard({
  persona,
  count,
  isActive,
  countLabel,
  onToggle,
}: {
  persona: WalletPersonaCard
  count: string
  isActive: boolean
  countLabel: string
  onToggle: (persona: WalletPersonaCard) => void
}) {
  const descriptionId = useId()
  const color = PERSONA_STYLES[persona.id]

  return (
    <li className="grid-rows-1 pb-5">
      <label
        className={cn(
          "group flex h-[164px] w-full cursor-pointer flex-col items-start rounded-base border-2 p-3 shadow-lg transition-all duration-50 lg:h-full lg:p-6",
          "has-[:focus-visible]:outline has-[:focus-visible]:outline-4 has-[:focus-visible]:-outline-offset-4 has-[:focus-visible]:outline-primary-hover",
          isActive
            ? cn(color.border, color.bgTint)
            : "border-primary-low-contrast hover:bg-background-highlight"
        )}
      >
        <span className="items-top flex w-full gap-2 px-1.5 leading-normal">
          <Checkbox
            className="sr-only"
            aria-describedby={descriptionId}
            checked={isActive}
            onCheckedChange={() => onToggle(persona)}
          />
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
            {persona.title}
            <span aria-hidden="true" className="font-normal">
              {" "}
              ({count})
            </span>
            <span className="sr-only"> {countLabel}</span>
          </span>
        </span>
        <span
          id={descriptionId}
          className="block p-2 text-left text-sm leading-normal text-body"
        >
          {persona.description}
        </span>
      </label>
    </li>
  )
})

/** Multi-select presets; the page owns the state and combines them with AND. */
const WalletPersonaCards = ({
  locale,
  personas,
  counts,
  selected,
  onToggle,
  labels,
}: WalletPersonaCardsProps) => {
  const nf = numberFormat(locale)

  return (
    <FieldSet className="relative min-w-0 gap-0 overflow-x-clip">
      <FieldLegend className="sr-only">{labels.legend}</FieldLegend>
      <ul
        className="m-0 grid list-none auto-cols-[200px] grid-flow-col gap-4 overflow-x-auto px-4 lg:auto-cols-fr"
        data-testid="persona-cards-container"
      >
        {personas.map((persona) => {
          const count = nf.format(counts[persona.id])
          return (
            <PersonaCard
              key={persona.id}
              persona={persona}
              count={count}
              countLabel={labels.countAvailable.replace("{count}", count)}
              isActive={selected.includes(persona.id)}
              onToggle={onToggle}
            />
          )
        })}
      </ul>
    </FieldSet>
  )
}

export default memo(WalletPersonaCards)
