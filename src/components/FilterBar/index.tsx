"use client"

import { useState } from "react"
import { Check, ChevronDown, X } from "lucide-react"
import { useTranslations } from "next-intl"

import type { MatomoEventOptions } from "@/lib/types"

import { Button } from "@/components/ui/buttons/Button"
import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import { trackCustomEvent } from "@/lib/utils/matomo"

export type FilterBarProps = {
  /** Items available for filtering */
  items: { value: string; label: string }[]

  /** Currently selected value (undefined = no filter) */
  value?: string

  /** Callback when selection changes */
  onValueChange: (value: string | undefined) => void

  /** Number of items after filtering */
  count: number

  /** Total number of items (unfiltered) */
  totalCount: number

  /** Optional Matomo tracking config */
  matomoEvent?: MatomoEventOptions
}

export default function FilterBar({
  items,
  value,
  onValueChange,
  count,
  totalCount,
  matomoEvent,
}: FilterBarProps) {
  const t = useTranslations("common")
  const [open, setOpen] = useState(false)

  const selectedLabel = items.find((item) => item.value === value)?.label

  const handleSelect = (selectedValue: string) => {
    onValueChange(selectedValue)
    setOpen(false)
    if (matomoEvent) {
      trackCustomEvent({
        ...matomoEvent,
        eventName: `filter: ${selectedValue}`,
      })
    }
  }

  const handleClear = () => {
    onValueChange(undefined)
    if (matomoEvent) {
      trackCustomEvent({
        ...matomoEvent,
        eventName: "filter: cleared",
      })
    }
  }

  const COMBOBOX_ID = "filter-bar-listbox"

  const countDisplay =
    count !== totalCount ? `${count}/${totalCount}` : `${count}`

  return (
    <div className="flex w-full gap-4 border-b max-md:flex-col md:items-center md:justify-between">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              role="combobox"
              aria-expanded={open}
              aria-controls={COMBOBOX_ID}
              variant="ghost"
              className="w-full items-center justify-between gap-2 p-2 text-body transition-colors hover:bg-background-highlight sm:w-64"
            >
              <span className="truncate">
                {selectedLabel ?? t("filter-bar-placeholder")}
              </span>
              <ChevronDown className="size-5 shrink-0" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-64 p-0" align="start">
            <Command
              id={COMBOBOX_ID}
              className="w-full [&>div]:first:border-none"
            >
              <CommandInput placeholder={t("filter-bar-placeholder")} />
              <CommandList>
                <CommandEmpty>{t("filter-bar-no-results")}</CommandEmpty>
                {items.map((item) => (
                  <CommandItem
                    key={item.value}
                    value={item.label}
                    onSelect={() => handleSelect(item.value)}
                    className="flex items-center justify-between"
                  >
                    {item.label}
                    {value === item.value && (
                      <Check className="size-4 shrink-0" />
                    )}
                  </CommandItem>
                ))}
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>

        {value && (
          <Button
            onClick={handleClear}
            variant="link"
            className="no-underline max-sm:self-start"
          >
            <X className="!size-4" />
            {t("filter-bar-clear")}
          </Button>
        )}
      </div>

      <p className="p-2 text-body-medium">
        {t("filter-bar-showing")}{" "}
        <span className="text-body">({countDisplay})</span>
      </p>
    </div>
  )
}
