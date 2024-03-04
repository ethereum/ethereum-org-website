import { useRouter } from "next/router"
import { useTranslation } from "next-i18next"
import { MdInfoOutline } from "react-icons/md"
import { Code, Flex, Icon, VStack } from "@chakra-ui/react"

import type { ChildOnlyProp, Lang, StakingStatsData } from "@/lib/types"

import InlineLink from "@/components/Link"
import Text from "@/components/OldText"
import Tooltip from "@/components/Tooltip"

import { getLocaleForNumberFormat } from "@/lib/utils/translations"

const Cell = ({ children }: ChildOnlyProp) => (
  <VStack
    spacing={2}
    py={4}
    px={8}
    borderInlineStart={{ md: "1px" }}
    borderTop={{ base: "1px", md: "none" }}
    // `!important` needed to force an override of the user-agent
    borderColor="preBorder !important"
    _first={{
      borderInlineStart: "none",
      borderTop: "none",
    }}
  >
    {children}
  </VStack>
)

const Value = ({ children }: ChildOnlyProp) => (
  <Code
    fontWeight="bold"
    fontSize="2rem"
    background="none"
    color="primary.base"
    p={0}
  >
    {children}
  </Code>
)

const Label = ({ children }: ChildOnlyProp) => (
  <Flex alignItems="center" textTransform="uppercase" fontSize="sm">
    {children}
  </Flex>
)

// BeaconchainTooltip component
const BeaconchainTooltip = ({ children }: ChildOnlyProp) => (
  <Tooltip content={children}>
    <Icon
      as={MdInfoOutline}
      color="text"
      marginInlineStart={2}
      _hover={{ color: "primary.base" }}
      _active={{ color: "primary.base" }}
      _focus={{ color: "primary.base" }}
      boxSize={4}
    />
  </Tooltip>
)

// StatsBox component
type StakingStatsBoxProps = {
  data: StakingStatsData
}
const StakingStatsBox = ({ data }: StakingStatsBoxProps) => {
  const { locale } = useRouter()
  const { t } = useTranslation("page-staking")

  const localeForStatsBoxNumbers = getLocaleForNumberFormat(locale! as Lang)

  // Helper functions
  const formatInteger = (amount: number): string =>
    new Intl.NumberFormat(localeForStatsBoxNumbers).format(amount)

  const formatPercentage = (amount: number): string =>
    new Intl.NumberFormat(localeForStatsBoxNumbers, {
      style: "percent",
      minimumSignificantDigits: 2,
      maximumSignificantDigits: 2,
    }).format(amount)

  const totalEth = formatInteger(data.totalEthStaked)
  const totalValidators = formatInteger(data.validatorscount)
  const currentApr = formatPercentage(data.apr)

  return (
    <Flex direction={{ base: "column", md: "row" }}>
      <Cell>
        <Value>{totalEth}</Value>
        <Label>
          {t("page-staking-stats-box-metric-1")}
          <BeaconchainTooltip>
            <Text>{t("page-staking-stats-box-metric-1-tooltip")}</Text>
            {t("common:data-provided-by")}{" "}
            <InlineLink to="https://beaconcha.in/">Beaconcha.in</InlineLink>
          </BeaconchainTooltip>
        </Label>
      </Cell>
      <Cell>
        <Value>{totalValidators}</Value>
        <Label>
          {t("page-staking-stats-box-metric-2")}
          <BeaconchainTooltip>
            <Text>{t("page-staking-stats-box-metric-2-tooltip")}</Text>
            {t("common:data-provided-by")}{" "}
            <InlineLink to="https://beaconcha.in/">Beaconcha.in</InlineLink>
          </BeaconchainTooltip>
        </Label>
      </Cell>
      <Cell>
        <Value>{currentApr}</Value>
        <Label>
          {t("page-staking-stats-box-metric-3")}
          <BeaconchainTooltip>
            <Text>{t("page-staking-stats-box-metric-3-tooltip")}</Text>
            {t("common:data-provided-by")}{" "}
            <InlineLink to="https://beaconcha.in/ethstore">
              Beaconcha.in
            </InlineLink>
          </BeaconchainTooltip>
        </Label>
      </Cell>
    </Flex>
  )
}

export default StakingStatsBox
