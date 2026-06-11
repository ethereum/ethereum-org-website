"use client"

import { useState } from "react"

import type { StakingPage } from "@/lib/types"

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

// Concave fillets that flare a highlighted tab's exposed edge into the panel.
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
  styleObj: object
  indicatorType?: "valid" | "caution"
}) => {
  const IndicatorIcon = ({ style }) => {
    if (indicatorType === "valid") {
      return <GreenCheckProductGlyph style={style} />
    }

    if (indicatorType === "caution") {
      return <CautionProductGlyph style={style} />
    }

    return <WarningProductGlyph style={style} />
  }
  return (
    <VStack className="flex-1 gap-2">
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
    StyledSvg,
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

  // Hover is tracked in JS (not CSS) so each item knows whether its neighbor is
  // also highlighted -- letting an active + hovered pair merge without a seam.
  const [hovered, setHovered] = useState<number | null>(null)
  const isHighlighted = (i: number) => i === activeIndex || i === hovered
  const lastIndex = (pageData?.length ?? 0) - 1

  return (
    <Flex className="flex-col md:flex-row">
      <ButtonDropdown list={dropdownLinks} className="mb-4 md:hidden" />
      {/* TODO: Improve a11y */}
      <div className="hidden flex-1 md:block">
        {!!pageData && (
          <List
            className="m-0 [--tab-r:0.75rem]"
            onMouseLeave={() => setHovered(null)}
          >
            {/* TODO: Make mobile responsive */}
            {pageData.map(({ title, matomo }, idx) => {
              const highlighted = isHighlighted(idx)
              // Round/fillet only the edges of a highlighted run that are exposed
              // (neighbor not highlighted); merged neighbors share a flat seam.
              const roundTop = highlighted && !isHighlighted(idx - 1)
              const roundBottom = highlighted && !isHighlighted(idx + 1)
              return (
                <ListItem
                  key={idx}
                  onClick={() => {
                    handleSelection(idx)
                    trackCustomEvent(matomo)
                  }}
                  onMouseEnter={() => setHovered(idx)}
                  className={cn(
                    "relative mb-0 table h-8 w-full cursor-pointer p-3",
                    highlighted
                      ? "bg-background-highlight text-body"
                      : "text-primary",
                    roundTop && "rounded-ss-(--tab-r)",
                    roundBottom && "rounded-es-(--tab-r)",
                    // Fillets only on exposed edges, never at the list ends.
                    roundTop && idx !== 0 && TOP_FILLET,
                    roundBottom && idx !== lastIndex && BOTTOM_FILLET
                  )}
                >
                  {title}
                </ListItem>
              )
            })}
          </List>
        )}
      </div>
      <Flex
        className={cn(
          "min-h-[410px] flex-[2] flex-col items-center rounded-base bg-background-highlight p-6",
          // Square the panel's start corner where the highlighted (active or
          // hovered) first/last tab meets it, so the tab flows flush (desktop only).
          isHighlighted(0) && "md:rounded-ss-none",
          isHighlighted(lastIndex) && "md:rounded-es-none"
        )}
      >
        <StyledSvg />
        <h3 className="mt-10 text-2xl leading-[1.4]">{title}</h3>
        <p>{description}</p>
        <Flex className="mt-auto justify-center gap-8">
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
