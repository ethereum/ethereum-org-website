"use client"

import { ChevronRight } from "lucide-react"

import { Button } from "@/components/ui/buttons/Button"
import { BaseLink } from "@/components/ui/Link"

import { cn } from "@/lib/utils/cn"
import { numberFormat } from "@/lib/utils/numbers"

import type { CatalogNavGroupConfig } from "./types"

type CatalogNavGroupProps = {
  locale: string
  config: CatalogNavGroupConfig
  /** Currently selected child id (single-select), or undefined for none */
  selectedChildId?: string
  onSelectChild: (childId?: string) => void
  /** Hide the "all" entry where it would duplicate a surrounding label */
  showAllItem?: boolean
}

/**
 * Controlled sidebar building block: top-level entries are route links to
 * server-rendered listing pages; the children of the current entry are a
 * single-select filter. Purely presentational — value in (`selectedChildId`),
 * event out (`onSelectChild`); it holds no filter state of its own.
 */
export default function CatalogNavGroup({
  locale,
  config,
  selectedChildId,
  onSelectChild,
  showAllItem = true,
}: CatalogNavGroupProps) {
  const nf = numberFormat(locale)
  const hasCurrentItem = config.items.some((item) => item.isCurrent)

  return (
    <div className="space-y-1">
      {showAllItem && (
        <BaseLink
          href={config.allHref}
          className={cn(
            "flex w-full items-center justify-between rounded-md px-3 py-2 text-start text-sm no-underline hover:bg-background-highlight",
            !hasCurrentItem && "bg-background-highlight text-primary"
          )}
        >
          <span>{config.allLabel}</span>
          <span className="text-xs text-body-medium">
            {nf.format(config.allCount)}
          </span>
        </BaseLink>
      )}

      {config.items.map((item) => {
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
