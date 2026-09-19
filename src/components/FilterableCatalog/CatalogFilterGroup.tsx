"use client"

import { ChevronDown } from "lucide-react"
import type { ReactNode } from "react"

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { BaseLink } from "@/components/ui/Link"

import { cn } from "@/lib/utils/cn"

const labelClasses = "flex-1 text-sm font-bold text-primary"
const countClasses = "text-xs font-normal text-body-medium"
const hoverClasses = "rounded-md hover:bg-background-highlight"

type CatalogFilterGroupProps = {
  label: string
  /** Trailing count, already formatted; omit to render none. */
  count?: ReactNode
  /**
   * Turns the label into a link to its own listing page. The chevron then
   * becomes the only toggle, since the label has a job of its own.
   */
  labelHref?: string
  onLabelClick?: () => void
  /** Marks the label row as the active one. */
  active?: boolean
  defaultOpen?: boolean
  /** Pass with `onOpenChange` to drive the group from outside. */
  open?: boolean
  onOpenChange?: (open: boolean) => void
  /**
   * Keep closed content in the DOM and collapse it with CSS instead. Costs
   * markup on every render, so it's for content that must stay crawlable.
   */
  keepMounted?: boolean
  /** Cap the height and scroll long option lists (e.g. languages). */
  scrollable?: boolean
  children: ReactNode
}

/**
 * The collapsible filter group shared by the catalog sidebars: chevron, bold
 * label, optional count, and an indented rail of options. Several can be open
 * at once (Collapsible, not Accordion). The options themselves are the
 * consumer's — checkboxes for multi-select, links or buttons for single-select.
 */
export default function CatalogFilterGroup({
  label,
  count,
  labelHref,
  onLabelClick,
  active,
  defaultOpen,
  open,
  onOpenChange,
  keepMounted,
  scrollable,
  children,
}: CatalogFilterGroupProps) {
  const chevron = (
    <ChevronDown className="size-4 shrink-0 text-primary transition-transform group-data-[state=closed]:-rotate-90 rtl:group-data-[state=closed]:rotate-90" />
  )

  return (
    <Collapsible
      defaultOpen={defaultOpen}
      open={open}
      onOpenChange={onOpenChange}
    >
      {labelHref ? (
        <div className="flex items-center gap-1">
          <CollapsibleTrigger
            className={cn(
              "group grid size-8 shrink-0 place-items-center",
              hoverClasses
            )}
          >
            {chevron}
            {/* The toggle is icon-only, so it borrows the group's name. */}
            <span className="sr-only">{label}</span>
          </CollapsibleTrigger>
          <BaseLink
            href={labelHref}
            onClick={onLabelClick}
            className={cn(
              "flex w-full items-center justify-between gap-2 px-3 py-2 text-start no-underline",
              labelClasses,
              hoverClasses,
              active && "bg-background-highlight"
            )}
          >
            <span>{label}</span>
            {count !== undefined && (
              <span className={countClasses}>{count}</span>
            )}
          </BaseLink>
        </div>
      ) : (
        <CollapsibleTrigger
          className={cn(
            "group flex w-full items-center gap-2 px-2 py-2.5 text-start",
            hoverClasses,
            active && "bg-background-highlight"
          )}
        >
          {chevron}
          <span className={labelClasses}>{label}</span>
          {count !== undefined && <span className={countClasses}>{count}</span>}
        </CollapsibleTrigger>
      )}

      <CollapsibleContent
        forceMount={keepMounted || undefined}
        className={cn(
          keepMounted &&
            // Collapse is CSS-only when nothing unmounts: grid rows animate
            // 1fr <-> 0fr. See ui/accordion for why the duration needs `!`.
            "grid grid-rows-[1fr] transition-[grid-template-rows,visibility] duration-200! ease-out data-[state=closed]:invisible data-[state=closed]:grid-rows-[0fr]"
        )}
      >
        <div className={cn(keepMounted && "min-h-0 overflow-hidden")}>
          <div
            className={cn(
              "space-y-0.5 border-s pb-3",
              // Line the options up under the label, past the chevron.
              labelHref ? "ms-9 ps-2" : "ms-4 ps-1",
              scrollable && "max-h-64 overflow-y-auto"
            )}
          >
            {children}
          </div>
        </div>
      </CollapsibleContent>
    </Collapsible>
  )
}
