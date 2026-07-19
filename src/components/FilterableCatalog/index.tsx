"use client"

import {
  type ReactNode,
  useDeferredValue,
  useMemo,
  useRef,
  useState,
} from "react"
import { ChevronRight } from "lucide-react"

import { Button } from "@/components/ui/buttons/Button"
import Checkbox from "@/components/ui/checkbox"
import Input from "@/components/ui/input"
import { BaseLink } from "@/components/ui/Link"
import { Section } from "@/components/ui/section"

import { cn } from "@/lib/utils/cn"
import { numberFormat } from "@/lib/utils/numbers"

import type {
  CatalogCheckboxGroup,
  CatalogFilterFn,
  CatalogFilterGroup,
  CatalogFilterState,
  CatalogNavGroup,
} from "./types"

const PATH_SEPARATOR = "\u00A0\u00A0/\u00A0\u00A0"

function formatPathSegment(value: string): string {
  return value.toLocaleUpperCase()
}

type NavGroupProps = {
  locale: string
  group: CatalogNavGroup
  selectedChildId?: string
  onSelectChild: (childId?: string) => void
}

function NavGroup({
  locale,
  group,
  selectedChildId,
  onSelectChild,
}: NavGroupProps) {
  const nf = numberFormat(locale)
  const hasCurrentItem = group.items.some((item) => item.isCurrent)

  return (
    <div className="space-y-1">
      <BaseLink
        href={group.allHref}
        className={cn(
          "flex w-full items-center justify-between rounded-md px-3 py-2 text-start text-sm no-underline hover:bg-background-highlight",
          !hasCurrentItem && "bg-background-highlight text-primary"
        )}
      >
        <span>{group.allLabel}</span>
        <span className="text-xs text-body-medium">
          {nf.format(group.allCount)}
        </span>
      </BaseLink>

      {group.items.map((item) => {
        const isItemActive = item.isCurrent && !selectedChildId

        return (
          <div key={item.id} className="space-y-1">
            <BaseLink
              href={item.href}
              className={cn(
                "flex w-full items-center gap-2 rounded-md px-3 py-2 text-start text-sm no-underline hover:bg-background-highlight",
                isItemActive && "bg-background-highlight text-primary"
              )}
              onClick={() => {
                if (item.isCurrent) onSelectChild(undefined)
              }}
            >
              <ChevronRight
                className={cn(
                  "size-4 text-body-medium transition-transform",
                  item.isCurrent && "rotate-90"
                )}
              />
              <span className="flex-1">{item.label}</span>
              <span className="text-xs text-body-medium">
                {nf.format(item.count)}
              </span>
            </BaseLink>
            {item.isCurrent && item.children && (
              <div className="ms-5 space-y-1 border-s ps-2">
                {item.children.map((child) => (
                  <Button
                    key={child.id}
                    variant="ghost"
                    isSecondary
                    className={cn(
                      "flex min-h-0 w-full items-center justify-between rounded-md px-3 py-1.5 text-start text-xs font-normal hover:bg-background-highlight",
                      selectedChildId === child.id && "bg-background-highlight"
                    )}
                    onClick={() => {
                      onSelectChild(
                        selectedChildId === child.id ? undefined : child.id
                      )
                    }}
                  >
                    <span>{child.label}</span>
                    {typeof child.count === "number" && (
                      <span className="text-2xs text-body-medium">
                        {nf.format(child.count)}
                      </span>
                    )}
                  </Button>
                ))}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}

type CheckboxGroupProps = {
  locale: string
  group: CatalogCheckboxGroup
  selectedIds: string[]
  onToggle: (optionId: string) => void
}

function CheckboxGroup({
  locale,
  group,
  selectedIds,
  onToggle,
}: CheckboxGroupProps) {
  const nf = numberFormat(locale)

  return (
    <div className="space-y-1">
      <p className="px-3 py-2 text-sm font-bold">{group.label}</p>
      {group.options.map((option) => (
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

export type FilterableCatalogLabels = {
  searchPlaceholder: string
  resultsLabel: string
  noResults: string
}

export type FilterableCatalogProps<TItem> = {
  locale: string
  items: TItem[]
  filterGroups: CatalogFilterGroup[]
  filterFn: CatalogFilterFn<TItem>
  labels: FilterableCatalogLabels
  renderResults: (items: TItem[]) => ReactNode
  className?: string
}

/**
 * Client island for filterable listing pages: sidebar filter groups + search
 * input + count header + results area, with `useDeferredValue` so typing and
 * filtering stay responsive on large catalogs. Consumers describe the sidebar
 * via `filterGroups` config, decide membership via `filterFn` (including how
 * search matches an item), and own the results markup via `renderResults`.
 */
export default function FilterableCatalog<TItem>({
  locale,
  items,
  filterGroups,
  filterFn,
  labels,
  renderResults,
  className,
}: FilterableCatalogProps<TItem>) {
  const nf = numberFormat(locale)
  const [search, setSearch] = useState("")
  const [selection, setSelection] = useState<CatalogFilterState>({})
  const resultsTopRef = useRef<HTMLDivElement | null>(null)

  // Defer the heavy filter + grid render so typing and filtering stay responsive
  const deferredSearch = useDeferredValue(search)
  const deferredSelection = useDeferredValue(selection)
  const isStale = search !== deferredSearch || selection !== deferredSelection

  const handleSelect = (key: string, value: string | string[] | undefined) => {
    setSelection((prev) => ({ ...prev, [key]: value }))
    resultsTopRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    })
  }

  const filteredItems = useMemo(
    () =>
      items.filter((item) => filterFn(item, deferredSelection, deferredSearch)),
    [items, filterFn, deferredSelection, deferredSearch]
  )

  // Uppercased breadcrumb of the current nav item (and its selected child)
  // shown above the results count
  const activePath = filterGroups.flatMap((group) => {
    if (group.type !== "nav") return []
    const currentItem = group.items.find((item) => item.isCurrent)
    const selectedChild = currentItem?.children?.find(
      (child) => child.id === selection[group.key]
    )
    const segments: string[] = []
    if (currentItem) segments.push(currentItem.label)
    if (selectedChild) segments.push(selectedChild.label)
    return segments
  })

  const sidebar = filterGroups.map((group) => {
    if (group.type === "nav") {
      const selectedChildId = selection[group.key]
      return (
        <NavGroup
          key={group.key}
          locale={locale}
          group={group}
          selectedChildId={
            typeof selectedChildId === "string" ? selectedChildId : undefined
          }
          onSelectChild={(childId) => handleSelect(group.key, childId)}
        />
      )
    }

    const selectedIds = selection[group.key]
    const selectedArray = Array.isArray(selectedIds) ? selectedIds : []
    return (
      <CheckboxGroup
        key={group.key}
        locale={locale}
        group={group}
        selectedIds={selectedArray}
        onToggle={(optionId) => {
          handleSelect(
            group.key,
            selectedArray.includes(optionId)
              ? selectedArray.filter((id) => id !== optionId)
              : [...selectedArray, optionId]
          )
        }}
      />
    )
  })

  return (
    <Section id="catalog" className={cn("space-y-5", className)}>
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[280px_1fr]">
        <aside className="hidden lg:block">
          <div className="sticky top-24 space-y-4">
            <Input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder={labels.searchPlaceholder}
              className="w-full"
            />
            <div className="max-h-[calc(100vh-11rem)] space-y-4 overflow-y-auto rounded-xl border p-2">
              {sidebar}
            </div>
          </div>
        </aside>

        <div className="space-y-4 lg:-mt-5">
          <div className="space-y-3 lg:hidden">
            <Input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder={labels.searchPlaceholder}
              className="w-full"
            />
            <div className="space-y-4 rounded-xl border p-2">{sidebar}</div>
          </div>
          <div ref={resultsTopRef} className="scroll-mt-24" />
          {activePath.length > 0 && (
            <p className="text-sm text-body-medium">
              {activePath.map(formatPathSegment).join(PATH_SEPARATOR)}
            </p>
          )}

          <p className="text-sm text-body-medium">
            {labels.resultsLabel}:{" "}
            <strong>{nf.format(filteredItems.length)}</strong> /{" "}
            {nf.format(items.length)}
          </p>

          <div
            className={cn(
              "space-y-8 transition-opacity",
              isStale && "opacity-60"
            )}
          >
            {renderResults(filteredItems)}
          </div>
          {filteredItems.length === 0 && (
            <div className="rounded-xl border p-8 text-center text-body-medium">
              {labels.noResults}
            </div>
          )}
        </div>
      </div>
    </Section>
  )
}
