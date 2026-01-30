"use client"

import { useState } from "react"
import { ChevronDown, X } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"

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

type TagFilterProps = {
  tags: string[]
  tagLabels: Record<string, string>
  selectedTag?: string
  category: string
  count: number
  labels: {
    filterBy: string
    clearFilter: string
    noTags: string
    showing: string
  }
}

export default function TagFilter({
  tags,
  tagLabels,
  selectedTag,
  category,
  count,
  labels,
}: TagFilterProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [open, setOpen] = useState(false)

  const handleSelectTag = (tag: string) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set("tag", tag)
    router.push(`/developers/apps/${category}?${params.toString()}`, {
      scroll: false,
    })
    setOpen(false)
  }

  const handleClearTag = () => {
    const params = new URLSearchParams(searchParams.toString())
    params.delete("tag")
    const queryString = params.toString()
    router.push(
      `/developers/apps/${category}${queryString ? `?${queryString}` : ""}`,
      { scroll: false }
    )
  }

  const COMBOBOX_ID = "tag-filter-listbox"

  return (
    <div className="flex gap-4 border-b max-md:flex-col md:items-center md:justify-between">
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
                {selectedTag ? tagLabels[selectedTag] : labels.filterBy}
              </span>
              <ChevronDown className="size-5 shrink-0" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-64 p-0" align="start">
            <Command
              id={COMBOBOX_ID}
              className="w-full [&>div]:first:border-none"
            >
              <CommandInput placeholder={labels.filterBy} />
              <CommandList>
                <CommandEmpty>{labels.noTags}</CommandEmpty>
                {tags.map((tag) => (
                  <CommandItem
                    key={tag}
                    value={tag}
                    onSelect={() => handleSelectTag(tag)}
                  >
                    {tagLabels[tag]}
                  </CommandItem>
                ))}
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>

        {selectedTag && (
          <Button
            onClick={handleClearTag}
            variant="ghost"
            className="transition-colors hover:bg-background-highlight"
          >
            <X className="!size-4" />
            {labels.clearFilter}
          </Button>
        )}
      </div>

      <p className="p-2 text-body-medium">
        {labels.showing} <span className="text-body">({count})</span>
      </p>
    </div>
  )
}
