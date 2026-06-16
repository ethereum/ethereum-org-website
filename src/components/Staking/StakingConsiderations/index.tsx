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

  // Hover is tracked in JS (not CSS) so the panel can square the corner where a
  // highlighted first/last tab meets it, and so a hovered tab flares into the
  // panel like the active one.
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
                  {title}
                </ListItem>
              )
            })}
          </List>
        )}
      </div>
      <Flex
        className={cn(
          "flow min-h-96 flex-2 flex-col items-center rounded-base bg-background-highlight p-6 text-center",
          // Square the panel's start corner where the highlighted (active or
          // hovered) first/last tab meets it, so the tab flows flush (desktop only).
          isHighlighted(0) && "md:rounded-ss-none",
          isHighlighted(lastIndex) && "md:rounded-es-none"
        )}
      >
        <Svg className="text-8xl" />
        <h3>{title}</h3>
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
