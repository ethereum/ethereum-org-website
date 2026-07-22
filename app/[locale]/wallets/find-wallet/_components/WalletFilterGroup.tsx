"use client"

import { memo } from "react"
import { ChevronDown } from "lucide-react"

import Checkbox from "@/components/ui/checkbox"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"

import { cn } from "@/lib/utils/cn"
import { numberFormat } from "@/lib/utils/numbers"

export type WalletFilterOption = {
  id: string
  label: string
  count?: number
}

type WalletFilterGroupProps = {
  locale: string
  label: string
  options: WalletFilterOption[]
  selectedIds: string[]
  onToggle: (optionId: string) => void
  defaultOpen?: boolean
  /** Cap the height and scroll long option lists (e.g. languages). */
  scrollable?: boolean
}

/**
 * Collapsible sidebar filter group: a header (chevron + label + selected-count
 * badge) over an indented, railed list of checkbox options. Independent per
 * group (Collapsible, not Accordion) so several can stay open at once.
 */
function WalletFilterGroup({
  locale,
  label,
  options,
  selectedIds,
  onToggle,
  defaultOpen = false,
  scrollable = false,
}: WalletFilterGroupProps) {
  const nf = numberFormat(locale)
  const selectedCount = options.filter((option) =>
    selectedIds.includes(option.id)
  ).length

  return (
    <Collapsible defaultOpen={defaultOpen}>
      <CollapsibleTrigger className="group flex w-full items-center gap-2 px-2 py-2.5 text-start">
        <ChevronDown className="size-4 shrink-0 text-primary transition-transform group-data-[state=closed]:-rotate-90 rtl:group-data-[state=closed]:rotate-90" />
        <span className="flex-1 text-sm font-bold text-primary">{label}</span>
        {selectedCount > 0 && (
          <span className="text-xs font-normal text-body-medium">
            {nf.format(selectedCount)}
          </span>
        )}
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div
          className={cn(
            "ms-4 space-y-0.5 border-s ps-1 pb-3",
            scrollable && "max-h-64 overflow-y-auto"
          )}
        >
          {options.map((option) => (
            <label
              key={option.id}
              className="flex cursor-pointer items-center gap-2 rounded-md px-2 py-1.5 text-sm hover:bg-background-highlight"
            >
              <Checkbox
                checked={selectedIds.includes(option.id)}
                onCheckedChange={() => onToggle(option.id)}
              />
              <span className="flex-1 select-none">{option.label}</span>
              {typeof option.count === "number" && (
                <span className="text-xs text-body-medium">
                  {nf.format(option.count)}
                </span>
              )}
            </label>
          ))}
        </div>
      </CollapsibleContent>
    </Collapsible>
  )
}

export default memo(WalletFilterGroup)
