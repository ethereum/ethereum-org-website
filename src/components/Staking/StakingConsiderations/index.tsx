"use client"

import { type CSSProperties, type KeyboardEvent, useId, useState } from "react"

import type { MatomoEventOptions, StakingPage } from "@/lib/types"

import ButtonDropdown from "@/components/ButtonDropdown"
import {
  CautionProductGlyph,
  GreenCheckProductGlyph,
  WarningProductGlyph,
} from "@/components/icons/staking"
import Translation from "@/components/Translation"
import { Flex, VStack } from "@/components/ui/flex"
import { List, ListItem } from "@/components/ui/list"

import { cn } from "@/lib/utils/cn"
import { trackCustomEvent } from "@/lib/utils/matomo"

import { useStakingConsiderations } from "@/hooks/useStakingConsiderations"

// Concave fillets that flare a highlighted tab's top/bottom edges into the panel.
// Driven by the local `--tab-r` custom property; `ltr`/`rtl` swap the gradient's
// open corner so the curve always faces away from the panel seam.
const TOP_FILLET =
  "before:absolute before:bottom-full before:end-0 before:size-(--tab-r) before:content-[''] ltr:before:[background-image:radial-gradient(circle_at_top_left,transparent_var(--tab-r),var(--color-background-highlight)_var(--tab-r))] rtl:before:[background-image:radial-gradient(circle_at_top_right,transparent_var(--tab-r),var(--color-background-highlight)_var(--tab-r))]"
const BOTTOM_FILLET =
  "after:absolute after:top-full after:end-0 after:size-(--tab-r) after:content-[''] ltr:after:[background-image:radial-gradient(circle_at_bottom_left,transparent_var(--tab-r),var(--color-background-highlight)_var(--tab-r))] rtl:after:[background-image:radial-gradient(circle_at_bottom_right,transparent_var(--tab-r),var(--color-background-highlight)_var(--tab-r))]"

const IndicatorGroup = ({
  label,
  styleObj,
  indicatorType,
}: {
  label: string
  styleObj: CSSProperties
  indicatorType?: "valid" | "caution"
}) => {
  const IndicatorIcon = ({ style }: { style: CSSProperties }) => {
    if (indicatorType === "valid") {
      return <GreenCheckProductGlyph aria-hidden style={style} />
    }

    if (indicatorType === "caution") {
      return <CautionProductGlyph aria-hidden style={style} />
    }

    return <WarningProductGlyph aria-hidden style={style} />
  }
  return (
    <VStack className="w-full max-w-40 gap-2 sm:flex-1">
      <IndicatorIcon style={styleObj} />
      <p className="max-w-[10rem] text-center text-xs">
        <Translation id={label} />
      </p>
    </VStack>
  )
}

export type StakingConsiderationsProps = {
  page: StakingPage
}

const StakingConsiderations = ({ page }: StakingConsiderationsProps) => {
  const {
    Svg,
    caution,
    description,
    dropdownLinks,
    handleSelection,
    indicatorSvgStyle,
    title,
    valid,
    warning,
    pageData,
    activeIndex,
  } = useStakingConsiderations({ page })

  const tabsId = useId()
  const panelId = useId()
  const headingId = useId()

  // Hover is tracked in JS (not CSS) so the panel can square the corner where a
  // highlighted first/last tab meets it, and so a hovered tab flares into the
  // panel like the active one.
  const [hovered, setHovered] = useState<number | null>(null)
  const isHighlighted = (i: number) => i === activeIndex || i === hovered
  const lastIndex = (pageData?.length ?? 0) - 1

  const selectConsideration = (idx: number, matomo: MatomoEventOptions) => {
    handleSelection(idx)
    trackCustomEvent(matomo)
  }

  const handleTabKeyDown = (
    event: KeyboardEvent<HTMLButtonElement>,
    idx: number
  ) => {
    if (!pageData?.length) return

    const keyActions: Partial<Record<string, number>> = {
      ArrowDown: Math.min(idx + 1, lastIndex),
      ArrowUp: Math.max(idx - 1, 0),
      End: lastIndex,
      Home: 0,
    }
    const nextIndex = keyActions[event.key]

    if (nextIndex === undefined) return

    event.preventDefault()

    const nextItem = pageData[nextIndex]
    selectConsideration(nextIndex, nextItem.matomo)

    const tabs = event.currentTarget
      .closest('[role="tablist"]')
      ?.querySelectorAll<HTMLButtonElement>('[role="tab"]')
    tabs?.[nextIndex]?.focus()
  }

  return (
    <Flex className="flex-col gap-4 md:flex-row md:gap-0">
      <ButtonDropdown list={dropdownLinks} className="w-full md:hidden" />
      <div className="hidden flex-1 md:block">
        {!!pageData && (
          <List
            aria-label={dropdownLinks.ariaLabel}
            className="m-0 [--tab-r:0.75rem]"
            onMouseLeave={() => setHovered(null)}
            role="tablist"
            aria-orientation="vertical"
          >
            {pageData.map(({ title, matomo }, idx) => {
              const highlighted = isHighlighted(idx)
              const tabId = `${tabsId}-tab-${idx}`
              return (
                <ListItem
                  key={idx}
                  onMouseEnter={() => setHovered(idx)}
                  role="presentation"
                  className={cn(
                    "relative mb-0 table h-8 w-full",
                    highlighted
                      ? "bg-background-highlight text-body"
                      : "text-primary",
                    // Each highlighted tab is its own rounded pill flaring into
                    // the panel -- the inter-item gap keeps neighbours visually
                    // separate, so we always round both start corners rather
                    // than flattening a shared seam.
                    highlighted && "rounded-s-(--tab-r)",
                    // Fillets curve the top/bottom edge into the panel, but never
                    // poke past the list ends (the panel rounds those corners).
                    highlighted && idx !== 0 && TOP_FILLET,
                    highlighted && idx !== lastIndex && BOTTOM_FILLET
                  )}
                >
                  <button
                    id={tabId}
                    type="button"
                    role="tab"
                    aria-controls={panelId}
                    aria-selected={idx === activeIndex}
                    tabIndex={idx === activeIndex ? 0 : -1}
                    onClick={() => selectConsideration(idx, matomo)}
                    onKeyDown={(event) => handleTabKeyDown(event, idx)}
                    className="block size-full cursor-pointer appearance-none border-0 bg-transparent p-3 text-start text-inherit [font:inherit] outline-offset-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
                  >
                    {title}
                  </button>
                </ListItem>
              )
            })}
          </List>
        )}
      </div>
      <Flex
        id={panelId}
        role="tabpanel"
        aria-labelledby={`${tabsId}-tab-${activeIndex} ${headingId}`}
        className={cn(
          "flow min-h-80 flex-2 flex-col items-center rounded-base bg-background-highlight p-4 text-center sm:p-6 md:min-h-96",
          // Square the panel's start corner where the highlighted (active or
          // hovered) first/last tab meets it, so the tab flows flush (desktop only).
          isHighlighted(0) && "md:rounded-ss-none",
          isHighlighted(lastIndex) && "md:rounded-es-none"
        )}
      >
        <Svg aria-hidden className="text-8xl" />
        <h3 id={headingId}>{title}</h3>
        <p>{description}</p>
        <Flex className="mt-8 flex-col items-center justify-center gap-6 sm:flex-row sm:gap-8 md:mt-auto">
          {!!valid && (
            <IndicatorGroup
              label={valid}
              styleObj={indicatorSvgStyle}
              indicatorType="valid"
            />
          )}
          {!!caution && (
            <IndicatorGroup
              label={caution}
              styleObj={indicatorSvgStyle}
              indicatorType="caution"
            />
          )}
          {!!warning && (
            <IndicatorGroup label={warning} styleObj={indicatorSvgStyle} />
          )}
        </Flex>
      </Flex>
    </Flex>
  )
}

export default StakingConsiderations
