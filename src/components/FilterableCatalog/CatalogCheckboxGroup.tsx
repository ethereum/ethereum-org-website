"use client"

import Checkbox from "@/components/ui/checkbox"

import { numberFormat } from "@/lib/utils/numbers"

import type { CatalogCheckboxGroupConfig } from "./types"

type CatalogCheckboxGroupProps = {
  locale: string
  config: CatalogCheckboxGroupConfig
  /** Currently selected option ids */
  selectedIds: string[]
  onToggle: (optionId: string) => void
}

/**
 * Controlled sidebar building block: a labelled group of independent checkboxes.
 * Purely presentational — value in (`selectedIds`), event out (`onToggle`); it
 * holds no filter state of its own and doesn't know how selections are stored or
 * how the group combines with others (that's the consumer's `filterFn`).
 */
export default function CatalogCheckboxGroup({
  locale,
  config,
  selectedIds,
  onToggle,
}: CatalogCheckboxGroupProps) {
  const nf = numberFormat(locale)

  return (
    <div className="space-y-1">
      <p className="px-3 py-2 text-sm font-bold">{config.label}</p>
      {config.options.map((option) => (
        <label
          key={option.id}
          className="flex cursor-pointer items-center gap-2 rounded-md px-3 py-1.5 text-sm hover:bg-background-highlight"
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
  )
}
