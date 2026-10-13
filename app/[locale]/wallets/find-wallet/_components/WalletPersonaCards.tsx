"use client"

import { memo, useId } from "react"
import { Check } from "lucide-react"

import Checkbox from "@/components/ui/checkbox"
import { FieldLegend, FieldSet } from "@/components/ui/field"
import { BaseLink } from "@/components/ui/Link"

import { cn } from "@/lib/utils/cn"
import { isModified } from "@/lib/utils/keyboard"

import { PERSONA_STYLES, type WalletPersonaId } from "@/data/wallets/personas"

export type WalletPersonaCard = {
  id: WalletPersonaId
  title: string
  description: string
}

type WalletPersonaCardsProps = {
  personas: WalletPersonaCard[]
  /** Already locale-formatted. */
  counts: Record<WalletPersonaId, string>
  selected: WalletPersonaId[]
  onToggle: (persona: WalletPersonaCard) => void
  labels: {
    legend: string
    /** Raw message with a `{count}` placeholder. */
    countAvailable: string
  }
}

const PersonaCard = ({
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
}) => {
  const descriptionId = useId()
  const color = PERSONA_STYLES[persona.id]

  return (
    <li className="grid-rows-1 pb-5">
      <label
        className={cn(
          "group relative flex h-[164px] w-full cursor-pointer flex-col items-start rounded-base border-2 p-3 shadow-lg transition-all duration-50 lg:h-full lg:p-6",
          "has-[:focus-visible]:outline has-[:focus-visible]:outline-4 has-[:focus-visible]:-outline-offset-4 has-[:focus-visible]:outline-primary-hover",
          isActive
            ? cn(color.border, color.bgTint)
            : "border-primary-low-contrast hover:bg-background-highlight"
        )}
      >
        {/* The checkbox is the control -- a persona is a multi-select filter --
            and keeping it the only tab stop is why this link is not one. It is
            here so crawlers and modifier-clicks reach the persona page; a plain
            click anywhere on the card filters in place. */}
        <BaseLink
          href={`/wallets/find-wallet/personas/${persona.id}/`}
          prefetch={false}
          tabIndex={-1}
          aria-hidden
          activeClassName=""
          className="absolute inset-0 rounded-base"
          onClick={(event) => {
            if (event.button !== 0 || isModified(event)) return
            event.preventDefault()
            // Or the label would forward the click on to the checkbox and
            // toggle it straight back.
            event.stopPropagation()
            onToggle(persona)
          }}
        />
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
              "text-start text-xl font-bold hyphens-auto transition-all duration-50",
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
          className="block p-2 text-start text-sm leading-normal text-body"
        >
          {persona.description}
        </span>
      </label>
    </li>
  )
}

/** Shortcuts over the base filters; the page derives which read as selected. */
const WalletPersonaCards = ({
  personas,
  counts,
  selected,
  onToggle,
  labels,
}: WalletPersonaCardsProps) => {
  return (
    <FieldSet className="relative min-w-0 gap-0 overflow-x-clip">
      <FieldLegend className="sr-only">{labels.legend}</FieldLegend>
      <ul
        className="m-0 grid list-none auto-cols-[200px] grid-flow-col gap-4 overflow-x-auto px-4 lg:auto-cols-fr"
        data-testid="persona-cards-container"
      >
        {personas.map((persona) => {
          const count = counts[persona.id]
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
