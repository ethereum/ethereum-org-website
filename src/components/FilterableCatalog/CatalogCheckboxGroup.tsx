"use client"

import { memo, useEffect, useState } from "react"

import Checkbox from "@/components/ui/checkbox"

import { numberFormat } from "@/lib/utils/numbers"

import CatalogFilterGroup from "./CatalogFilterGroup"
import type { CatalogSelectOption } from "./types"

type CatalogCheckboxGroupProps = {
  locale: string
  label: string
  options: CatalogSelectOption[]
  /** Currently selected option ids */
  selectedIds: string[]
  onToggle: (optionId: string) => void
  defaultOpen?: boolean
  /** Cap the height and scroll long option lists (e.g. languages). */
  scrollable?: boolean
}

/**
 * Controlled sidebar building block: a collapsible group of independent
 * checkboxes, counting its own selections in the header. Purely presentational
 * — value in (`selectedIds`), event out (`onToggle`); it holds no filter state
 * of its own and doesn't know how the group combines with others (that's the
 * consumer's `filterFn`). Memoized: pass stable `options` and `onToggle` so
 * toggling one group doesn't re-render its siblings.
 */
function CatalogCheckboxGroup({
  locale,
  label,
  options,
  selectedIds,
  onToggle,
  defaultOpen,
  scrollable,
}: CatalogCheckboxGroupProps) {
  const nf = numberFormat(locale)
  const selectedCount = options.filter((option) =>
    selectedIds.includes(option.id)
  ).length
  const [open, setOpen] = useState(defaultOpen || selectedCount > 0)

  // URL filters arrive after mount, so a collapsed group can gain a selection
  // it would otherwise hide. Never auto-closes: that is the reader's call.
  useEffect(() => {
    if (selectedCount > 0) setOpen(true)
  }, [selectedCount])

  return (
    <CatalogFilterGroup
      label={label}
      count={selectedCount > 0 ? nf.format(selectedCount) : undefined}
      open={open}
      onOpenChange={setOpen}
      scrollable={scrollable}
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
    </CatalogFilterGroup>
  )
}

export default memo(CatalogCheckboxGroup)
