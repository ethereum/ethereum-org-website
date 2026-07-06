"use client"

import { useId } from "react"
import { Check } from "lucide-react"

import Checkbox from "@/components/ui/checkbox"
import {
  FieldDescription,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field"

import { cn } from "@/lib/utils/cn"
import { trackCustomEvent } from "@/lib/utils/matomo"

import type { WalletPersonaConfig } from "./types"
import {
  useWalletFilterActions,
  useWalletFilters,
} from "./WalletFilterProvider"

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

const PresetCard = ({
  persona,
  idx,
  isActive,
  count,
  showMobileSidebar,
  onSelect,
}: {
  persona: WalletPersonaConfig
  idx: number
  isActive: boolean
  count: number
  showMobileSidebar: boolean
  onSelect: (idx: number) => void
}) => {
  const id = useId()
  const descriptionId = !showMobileSidebar ? `${id}-description` : undefined
  const colorIdx = colors.text[idx] ? idx : idx % colors.text.length

  const handleCardClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // Avoid double-toggle when clicks on the label area already forward to the checkbox
    if ((e.target as HTMLElement).closest("label")) return
    onSelect(idx)
  }

  return (
    <div className={showMobileSidebar ? "w-full" : "grid-rows-1 pb-5"}>
      <div
        onClick={handleCardClick}
        className={cn(
          "group flex h-[164px] w-full cursor-pointer flex-col items-start rounded-base border p-3 shadow-lg transition-all duration-50 hover:bg-background-highlight lg:h-full lg:p-6",
          "has-[:focus-visible]:outline has-[:focus-visible]:outline-4 has-[:focus-visible]:-outline-offset-4 has-[:focus-visible]:outline-primary-hover",
          isActive ? "border-primary" : "border-primary-low-contrast",
          showMobileSidebar && "h-full"
        )}
      >
        <FieldLabel
          htmlFor={id}
          className="items-top flex w-full gap-2 px-1.5 text-base leading-normal font-normal has-data-[state=checked]:bg-transparent dark:has-data-[state=checked]:bg-transparent"
        >
          <Checkbox
            id={id}
            className="sr-only"
            aria-describedby={descriptionId}
            checked={isActive}
            onCheckedChange={() => onSelect(idx)}
          />
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
              "text-left text-xl hyphens-auto transition-all duration-50",
              colors.text[colorIdx]
            )}
          >
            {persona.title}
            {count > 0 && (
              <>
                <span aria-hidden="true" className="font-normal">
                  {" "}
                  ({count})
                </span>
                <span className="sr-only">
                  {" "}
                  {persona.countLabelTemplate.replace("{count}", String(count))}
                </span>
              </>
            )}
          </span>
        </FieldLabel>
        {!showMobileSidebar && (
          <FieldDescription
            id={descriptionId}
            className="p-2 text-left text-sm leading-normal font-normal text-body transition-colors duration-500"
          >
            {persona.description}
          </FieldDescription>
        )}
      </div>
    </div>
  )
}

const PresetCards = ({
  personas,
  legend,
  showMobileSidebar = false,
}: {
  personas: WalletPersonaConfig[]
  legend: string
  showMobileSidebar?: boolean
}) => {
  const { activePresets, presetCounts } = useWalletFilters()
  const { togglePreset } = useWalletFilterActions()

  const handleSelect = (idx: number) => {
    const isActive = activePresets.includes(idx)
    trackCustomEvent({
      eventCategory: "UserPersona",
      eventAction: `${personas[idx].title}`,
      eventName: `${personas[idx].title} ${!isActive}`,
    })
    togglePreset(idx)
  }

  return (
    <FieldSet className="relative min-w-0 gap-0 overflow-x-clip">
      <FieldLegend className="sr-only">{legend}</FieldLegend>
      <div
        className={`lg:pb-11 ${
          showMobileSidebar
            ? "grid grid-cols-2 gap-2 pb-5"
            : "grid auto-cols-[200px] grid-flow-col gap-4 overflow-x-auto px-4 lg:auto-cols-fr"
        }`}
        data-testid="preset-filters-container"
      >
        {personas.map((persona, idx) => (
          <PresetCard
            key={idx}
            persona={persona}
            idx={idx}
            isActive={activePresets.includes(idx)}
            count={presetCounts[idx]}
            showMobileSidebar={showMobileSidebar}
            onSelect={handleSelect}
          />
        ))}
      </div>
    </FieldSet>
  )
}

export default PresetCards
