"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"
import { useLocale } from "next-intl"

import { TagButton } from "@/components/ui/tag"

import { cn } from "@/lib/utils/cn"
import { numberFormat } from "@/lib/utils/numbers"

import useTranslation from "@/hooks/useTranslation"

export interface TagFilterProps {
  /**
   * Tag entries to render, as `[name, count]`. The caller controls ordering and
   * which tags are eligible (e.g. pre-sort by count, drop tags below a
   * threshold) -- the component renders them as-is.
   */
  tags: Array<[string, number]>
  /** Currently selected tag names (controlled). */
  value: Array<string>
  /** Called with the next selection whenever a chip is toggled. */
  onChange: (next: Array<string>) => void
  /**
   * How many tags to show before collapsing the rest behind a "show more"
   * toggle. Selected tags beyond the cutoff stay visible while collapsed.
   * Defaults to showing all tags.
   */
  defaultVisible?: number
  /** Render the occurrence count next to each tag name. Defaults to `true`. */
  showCount?: boolean
  className?: string
}

/**
 * Controlled, presentational multi-select tag filter: a wrapping row of toggle
 * chips with an optional "show more / show less" expander. Selection state and
 * match semantics (AND vs OR) live in the parent -- this component only renders
 * chips and reports toggles via `onChange`.
 */
const TagFilter = ({
  tags,
  value,
  onChange,
  defaultVisible,
  showCount = true,
  className,
}: TagFilterProps) => {
  const { t } = useTranslation("common")
  const locale = useLocale()
  const [expanded, setExpanded] = useState(false)

  const cutoff = defaultVisible ?? tags.length
  const hasOverflow = tags.length > cutoff
  const collapsed = hasOverflow && !expanded

  const base = collapsed ? tags.slice(0, cutoff) : tags
  // Keep selected-but-hidden tags visible while collapsed so an active filter
  // never disappears behind the expander.
  const baseNames = new Set(base.map(([name]) => name))
  const pinned = collapsed
    ? tags.filter(([name]) => value.includes(name) && !baseNames.has(name))
    : []
  const visible = [...base, ...pinned]

  const formatCount = (count: number) => numberFormat(locale).format(count)

  const toggle = (name: string) => {
    onChange(
      value.includes(name)
        ? value.filter((tag) => tag !== name)
        : [...value, name]
    )
  }

  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      {visible.map(([name, count]) => {
        const isActive = value.includes(name)
        return (
          <TagButton
            key={name}
            type="button"
            variant={isActive ? "solid" : "outline"}
            status={isActive ? "tag" : "normal"}
            className="justify-center"
            aria-pressed={isActive}
            onClick={() => toggle(name)}
          >
            {showCount ? `${name} (${formatCount(count)})` : name}
          </TagButton>
        )
      })}

      {hasOverflow && (
        <button
          type="button"
          onClick={() => setExpanded((prev) => !prev)}
          aria-expanded={expanded}
          className="inline-flex min-h-8 items-center gap-1 rounded-full border border-dashed border-body-medium px-3 py-0.5 text-xs text-body-medium uppercase transition-colors hover:border-primary hover:text-primary"
        >
          {expanded ? (
            <>
              {t("show-less")} <ChevronUp className="size-3" />
            </>
          ) : (
            <>
              {t("show-more")} ({formatCount(tags.length - visible.length)}){" "}
              <ChevronDown className="size-3" />
            </>
          )}
        </button>
      )}
    </div>
  )
}

export default TagFilter
