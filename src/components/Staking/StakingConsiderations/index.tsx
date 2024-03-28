import { Box, Flex, List, ListItem, useToken, VStack } from "@chakra-ui/react"

import type { StakingPage } from "@/lib/types"

import ButtonDropdown from "@/components/ButtonDropdown"
import {
  CautionProductGlyphIcon,
  GreenCheckProductGlyphIcon,
  WarningProductGlyphIcon,
} from "@/components/icons/staking"
import OldHeading from "@/components/OldHeading"
import Text from "@/components/OldText"
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
    <VStack spacing={2} flex={1}>
      <IndicatorIcon style={styleObj} />
      <Text fontSize="xs" textAlign="center" maxW="{40}">
        <Translation id={label} />
      </Text>
    </VStack>
  )
}

export type StakingConsiderationsProps = {
  page: StakingPage
}

const StakingConsiderations = ({ page }: StakingConsiderationsProps) => {
  // TODO: Replace with direct token implementation after UI migration is completed
  const mdBp = useToken("breakpoints", "md")

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
    transition: "background 0.5s, color 0.5s"
  }

  return (
    <Flex flexDir={{ base: "column", md: "row" }}>
      <ButtonDropdown list={dropdownLinks} hideFrom={mdBp} />
      {/* TODO: Improve a11y */}
      <Box flex={1} hideBelow={mdBp}>
        {!!pageData && (
          <List m={0}>
            {/* TODO: Make mobile responsive */}
            {pageData.map(({ title, matomo }, idx) => (
              <ListItem
                key={idx}
                onClick={(e) => {
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
      </Box>
      <Flex
        alignItems="center"
        flexDir="column"
        bg="background.highlight"
        flex={2}
        minH="410px"
        p={6}
      >
        <StyledSvg />
        <OldHeading
          as="h3"
          fontWeight={700}
          fontSize="27px"
          lineHeight={1.4}
          mt={10}
        >
          {title}
        </OldHeading>
        <Text>{description}</Text>
        <Flex gap={8} justifyContent="center" mt="auto">
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
