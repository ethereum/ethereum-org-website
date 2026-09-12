"use client"

import { type ReactNode, useEffect, useState } from "react"
import { ChevronDown } from "lucide-react"

import { Button } from "@/components/ui/buttons/Button"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { BaseLink } from "@/components/ui/Link"

import { cn } from "@/lib/utils/cn"
import { numberFormat } from "@/lib/utils/numbers"

import type { CatalogNavGroupConfig } from "./types"

const rowClasses =
  "flex w-full items-center gap-2 rounded-md px-3 py-2 text-start text-sm no-underline hover:bg-background-highlight"

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
 * Controlled sidebar building block: each top-level entry expands in place to
 * reveal its children, which are single-select filters — or links, for children
 * whose items this catalog doesn't hold (`child.href`). The entry's own listing
 * page stays reachable through the link at the top of the expanded group.
 * Purely presentational — value in (`selectedChildId`), event out
 * (`onSelectChild`); it holds no filter state of its own.
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
          rowClasses,
          "justify-between",
          !hasCurrentItem && "bg-background-highlight text-primary"
        )}
      >
        <span>{config.allLabel}</span>
        <span className="text-xs text-body-medium">
          {nf.format(config.allCount)}
        </span>
      </BaseLink>

      {config.items.map((item) => {
        const isItemActive = item.isCurrent && !selectedChildId
        const holdsSelectedChild = item.children?.some(
          (child) => child.id === selectedChildId
        )

        return (
          <NavGroupCollapsible
            key={item.id}
            defaultOpen={!!item.isCurrent}
            holdsSelectedChild={!!holdsSelectedChild}
          >
            <CollapsibleTrigger
              className={cn(
                "group",
                rowClasses,
                isItemActive && "bg-background-highlight text-primary"
              )}
            >
              <ChevronDown className="size-4 shrink-0 text-body-medium transition-transform group-data-[state=closed]:-rotate-90 rtl:group-data-[state=closed]:rotate-90" />
              <span className="flex-1">{item.label}</span>
              <span className="text-xs text-body-medium">
                {nf.format(item.count)}
              </span>
            </CollapsibleTrigger>
            {/* forceMount keeps every category link in the DOM for crawlers, so
                collapsing is CSS-only: grid rows animate 1fr <-> 0fr. See
                ui/accordion for why the duration needs `!`. */}
            <CollapsibleContent
              forceMount
              className="grid grid-rows-[1fr] transition-[grid-template-rows,visibility] duration-200! ease-out data-[state=closed]:invisible data-[state=closed]:grid-rows-[0fr]"
            >
              <div className="min-h-0 overflow-hidden">
                <div className="ms-5 space-y-1 border-s ps-2">
                  <BaseLink
                    href={item.href}
                    onClick={() => onSelectChild(undefined)}
                    className={cn(childRowClasses, "text-body-medium")}
                  >
                    {/* Every group's link would otherwise read "Show all":
                        ambiguous to a screen reader, and this is the site's
                        only internal link to the listing page. */}
                    <span>
                      {config.itemAllLabel}
                      <span className="sr-only"> {item.label}</span>
                    </span>
                  </BaseLink>

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
                            "bg-background-highlight"
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
                    )
                  )}
                </div>
              </div>
            </CollapsibleContent>
          </NavGroupCollapsible>
        )
      })}
    </div>
  )
}

/**
 * Opens itself when its group gains the selected child — a deep link applies
 * its filter after mount, so `defaultOpen` alone would leave the matching
 * group collapsed. Never force-closes: deselecting shouldn't collapse the
 * group the pointer is in.
 */
function NavGroupCollapsible({
  defaultOpen,
  holdsSelectedChild,
  children,
}: {
  defaultOpen: boolean
  holdsSelectedChild: boolean
  children: ReactNode
}) {
  const [open, setOpen] = useState(defaultOpen || holdsSelectedChild)

  useEffect(() => {
    if (holdsSelectedChild) setOpen(true)
  }, [holdsSelectedChild])

  return (
    <Collapsible open={open} onOpenChange={setOpen}>
      {children}
    </Collapsible>
  )
}
