"use client"

import { useEffect, useState } from "react"

import { Button } from "@/components/ui/buttons/Button"
import { BaseLink } from "@/components/ui/Link"

import { cn } from "@/lib/utils/cn"
import { numberFormat } from "@/lib/utils/numbers"

import CatalogFilterGroup from "./CatalogFilterGroup"
import type { CatalogNavGroupConfig, CatalogNavItem } from "./types"

const childRowClasses =
  "flex min-h-0 w-full items-center justify-between gap-2 rounded-md px-3 py-1.5 text-start text-xs font-normal no-underline hover:bg-background-highlight"

type CatalogNavGroupProps = {
  locale: string
  config: CatalogNavGroupConfig
  /** Currently selected child id (single-select), or undefined for none */
  selectedChildId?: string
  onSelectChild: (childId?: string) => void
}

/**
 * Controlled sidebar building block. Each top-level entry splits in two: the
 * chevron expands the group in place, the label is a link to that entry's own
 * listing page. Children are single-select filters — or links, for children
 * whose items this catalog doesn't hold (`child.href`). Purely presentational —
 * value in (`selectedChildId`), event out (`onSelectChild`); it holds no filter
 * state of its own.
 */
export default function CatalogNavGroup({
  locale,
  config,
  selectedChildId,
  onSelectChild,
}: CatalogNavGroupProps) {
  const nf = numberFormat(locale)
  const hasCurrentItem = config.items.some((item) => item.isCurrent)

  return (
    <div className="space-y-1">
      <BaseLink
        href={config.allHref}
        // Navigating to a route already rendered keeps this island mounted, so
        // the filter has to be cleared here or the "all" view stays filtered.
        onClick={() => onSelectChild(undefined)}
        className={cn(
          "flex w-full items-center justify-between gap-2 rounded-md px-3 py-2 text-start text-sm font-bold text-primary no-underline hover:bg-background-highlight",
          !hasCurrentItem && "bg-background-highlight"
        )}
      >
        <span>{config.allLabel}</span>
        <span className="text-xs font-normal text-body-medium">
          {nf.format(config.allCount)}
        </span>
      </BaseLink>

      {config.items.map((item) => (
        <NavItemGroup
          key={item.id}
          locale={locale}
          item={item}
          selectedChildId={selectedChildId}
          onSelectChild={onSelectChild}
        />
      ))}
    </div>
  )
}

function NavItemGroup({
  locale,
  item,
  selectedChildId,
  onSelectChild,
}: {
  locale: string
  item: CatalogNavItem
  selectedChildId?: string
  onSelectChild: (childId?: string) => void
}) {
  const nf = numberFormat(locale)
  const holdsSelectedChild = !!item.children?.some(
    (child) => child.id === selectedChildId
  )
  const [open, setOpen] = useState(!!item.isCurrent || holdsSelectedChild)

  // A deep link applies its filter after mount, so the matching group has to
  // open then. Only ever opens: deselecting shouldn't collapse the group the
  // pointer is in.
  useEffect(() => {
    if (holdsSelectedChild) setOpen(true)
  }, [holdsSelectedChild])

  return (
    <CatalogFilterGroup
      label={item.label}
      count={nf.format(item.count)}
      labelHref={item.href}
      onLabelClick={() => onSelectChild(undefined)}
      active={item.isCurrent && !selectedChildId}
      open={open}
      onOpenChange={setOpen}
      // Every category link stays in the DOM for crawlers.
      keepMounted
    >
      {item.children?.map((child) =>
        child.href ? (
          <BaseLink
            key={child.id}
            href={child.href}
            className={cn(childRowClasses, "text-body")}
          >
            <span>{child.label}</span>
          </BaseLink>
        ) : (
          <Button
            key={child.id}
            variant="ghost"
            isSecondary
            className={cn(
              childRowClasses,
              selectedChildId === child.id &&
                "bg-background-highlight font-bold"
            )}
            onClick={() => {
              onSelectChild(selectedChildId === child.id ? undefined : child.id)
            }}
          >
            <span>{child.label}</span>
            {typeof child.count === "number" && (
              <span className="text-2xs text-body-medium">
                {nf.format(child.count)}
              </span>
            )}
          </Button>
        )
      )}
    </CatalogFilterGroup>
  )
}
