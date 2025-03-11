import type { StakingPage } from "@/lib/types"

import ButtonDropdown from "@/components/ButtonDropdown"
import {
  CautionProductGlyphIcon,
  GreenCheckProductGlyphIcon,
  WarningProductGlyphIcon,
} from "@/components/icons/staking"
import Translation from "@/components/Translation"
import { Flex, VStack } from "@/components/ui/flex"
import { List, ListItem } from "@/components/ui/list"

import { cn } from "@/lib/utils/cn"
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
      return <GreenCheckProductGlyphIcon style={style} />
    }

    if (indicatorType === "caution") {
      return <CautionProductGlyphIcon style={style} />
    }

    return <WarningProductGlyphIcon style={style} />
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

  return (
    <Flex className="flex-col md:flex-row">
      <ButtonDropdown list={dropdownLinks} className="mb-4 md:hidden" />
      {/* TODO: Improve a11y */}
      <div className="hidden flex-1 md:block">
        {!!pageData && (
          <List className="m-0">
            {/* TODO: Make mobile responsive */}
            {pageData.map(({ title, matomo }, idx) => (
              <ListItem
                key={idx}
                onClick={() => {
                  handleSelection(idx)
                  trackCustomEvent(matomo)
                }}
                className={cn(
                  "transition-background relative mb-0 table h-8 w-full cursor-pointer p-3 duration-500 hover:bg-background-highlight hover:text-body",
                  idx === activeIndex
                    ? "bg-background-highlight text-body"
                    : "text-primary"
                )}
              >
                {title}
              </ListItem>
            ))}
          </List>
        )}
      </div>
      <Flex className="min-h-[410px] flex-[2] flex-col items-center bg-background-highlight p-6">
        <StyledSvg />
        <h3 className="mt-10 text-2xl font-bold leading-[1.4]">{title}</h3>
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
