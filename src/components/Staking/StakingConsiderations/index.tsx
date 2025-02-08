import { List, ListItem } from "@chakra-ui/react"
import { VStack, Flex } from "@/components/ui/flex"

import type { StakingPage } from "@/lib/types"

import ButtonDropdown from "@/components/ButtonDropdown"
import {
  CautionProductGlyphIcon,
  GreenCheckProductGlyphIcon,
  WarningProductGlyphIcon,
} from "@/components/icons/staking"
import Translation from "@/components/Translation"

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
    <VStack className="flex-1 p-2">
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

  const activeStyles = {
    bg: "background.highlight",
    color: "body.base",
    transition: "background 0.5s, color 0.5s",
  }

  return (
    <Flex className="flex-col md:flex-row">
      <ButtonDropdown list={dropdownLinks} className="mb-4 md:hidden" />
      {/* TODO: Improve a11y */}
      <div className="hidden flex-1 md:block">
        {!!pageData && (
          <List m={0}>
            {/* TODO: Make mobile responsive */}
            {pageData.map(({ title, matomo }, idx) => (
              <ListItem
                key={idx}
                onClick={() => {
                  handleSelection(idx)
                  trackCustomEvent(matomo)
                }}
                py={1}
                cursor="pointer"
                display="table"
                w="full"
                h={8}
                p="3"
                mb="0"
                _hover={activeStyles}
                position="relative"
                {...(idx === activeIndex
                  ? activeStyles
                  : { color: "primary.base" })}
              >
                {title}
              </ListItem>
            ))}
          </List>
        )}
      </div>
      <Flex className="felx-col bg-highlight flex-2 min-h-[410px] items-center p-6">
        <StyledSvg />
        <h3 className="mt-10 text-[27px] font-bold leading-[1.4]">{title}</h3>
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
