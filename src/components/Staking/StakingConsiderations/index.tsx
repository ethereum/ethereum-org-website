"use client"

import type { StakingPage } from "@/lib/types"

import {
  CautionProductGlyph,
  GreenCheckProductGlyph,
  WarningProductGlyph,
} from "@/components/icons/staking"
import { Flex } from "@/components/ui/flex"
import TabNav from "@/components/ui/TabNav"

import { trackCustomEvent } from "@/lib/utils/matomo"

import { useStakingConsiderations } from "@/hooks/useStakingConsiderations"

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
    <Flex className="items-center gap-2">
      <IndicatorIcon style={styleObj} />
      {/* `label` arrives already translated from the hook */}
      <p>{label}</p>
    </Flex>
  )
}

export type StakingConsiderationsProps = {
  page: StakingPage
}

const StakingConsiderations = ({ page }: StakingConsiderationsProps) => {
  const {
    caution,
    description,
    handleSelection,
    indicatorSvgStyle,
    title,
    valid,
    warning,
    pageData,
    activeIndex,
  } = useStakingConsiderations({ page })

  return (
    // `contain-inline-size` stops TabNav's scrollable row from leaking its full
    // width out as an intrinsic minimum, which would otherwise stop the article
    // shrinking and push the ToC aside off-screen just above the lg breakpoint.
    <div className="flex flex-col gap-6 contain-inline-size">
      <TabNav
        className="justify-start"
        sections={pageData.map(({ title, Svg }, idx) => ({
          key: String(idx),
          label: title,
          // Attribute icons stay primary-colored whether or not the tab is active.
          // `size-6` overrides the 1em width/height the glyphs carry, which TabNav's
          // `[&_svg]:text-sm` would otherwise render at 14px.
          icon: <Svg className="size-6 text-primary" />,
        }))}
        activeSection={String(activeIndex)}
        onSelect={(key) => {
          const idx = Number(key)
          handleSelection(idx)
          trackCustomEvent(pageData[idx].matomo)
        }}
      />
      {/* min-h keeps the panel from jumping as descriptions change length between
          tabs; taller on mobile where the text wraps more */}
      <div className="flow flex min-h-72 flex-col rounded-4xl bg-background-highlight p-6 md:min-h-64">
        <h3 className="text-2xl font-bold">{title}</h3>
        <p className="text-lg">{description}</p>
        {/* `mt-auto` pins the legend to the panel bottom so it holds position across
            tabs; `pt-space-2x` keeps the flow gap once the text fills the panel */}
        <Flex
          data-flow="cta"
          className="mt-auto flex-wrap gap-x-8 gap-y-2 pt-space-2x"
        >
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
      </div>
    </div>
  )
}

export default StakingConsiderations
