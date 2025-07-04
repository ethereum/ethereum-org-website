import { Info } from "lucide-react"
import { useLocale } from "next-intl"

import type { ChildOnlyProp, Lang, StakingStatsData } from "@/lib/types"

import Tooltip from "@/components/Tooltip"
import { Flex, VStack } from "@/components/ui/flex"

import { getLocaleForNumberFormat } from "@/lib/utils/translations"

import InlineLink from "../ui/Link"

import { useTranslation } from "@/hooks/useTranslation"

const Cell = ({ children }: ChildOnlyProp) => (
  <VStack className="gap-2 px-8 py-4">{children}</VStack>
)

const Value = ({ children }: ChildOnlyProp) => (
  <code className="inline-block bg-none p-0 pe-1 font-monospace text-3xl font-bold text-primary">
    {children}
  </code>
)

const Label = ({ children }: ChildOnlyProp) => (
  <Flex className="items-center justify-center gap-2 text-sm uppercase">
    {children}
  </Flex>
)

// BeaconchainTooltip component
const BeaconchainTooltip = ({ children }: ChildOnlyProp) => (
  <Tooltip content={children}>
    <Info className="active:primary focus:primary size-[1em] text-md hover:text-primary" />
  </Tooltip>
)

// StatsBox component
type StakingStatsBoxProps = {
  data: StakingStatsData
}
const StakingStatsBox = ({ data }: StakingStatsBoxProps) => {
  const locale = useLocale()
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
    <Flex className="flex-col md:flex-row">
      <Cell>
        <Value>{totalEth}</Value>
        <Label>
          {t("page-staking-stats-box-metric-1")}
          <BeaconchainTooltip>
            <div className="normal-case">
              <p>{t("page-staking-stats-box-metric-1-tooltip")}</p>
              {t("common:data-provided-by")}{" "}
              <InlineLink href="https://beaconcha.in/">Beaconcha.in</InlineLink>
            </div>
          </BeaconchainTooltip>
        </Label>
      </Cell>
      <Cell>
        <Value>{totalValidators}</Value>
        <Label>
          {t("page-staking-stats-box-metric-2")}
          <BeaconchainTooltip>
            <div className="normal-case">
              <p>{t("page-staking-stats-box-metric-2-tooltip")}</p>
              {t("common:data-provided-by")}{" "}
              <InlineLink href="https://beaconcha.in/">Beaconcha.in</InlineLink>
            </div>
          </BeaconchainTooltip>
        </Label>
      </Cell>
      <Cell>
        <Value>{currentApr}</Value>
        <Label>
          {t("page-staking-stats-box-metric-3")}
          <BeaconchainTooltip>
            <div className="normal-case">
              <p>{t("page-staking-stats-box-metric-3-tooltip")}</p>
              {t("common:data-provided-by")}{" "}
              <InlineLink href="https://beaconcha.in/ethstore">
                Beaconcha.in
              </InlineLink>
            </div>
          </BeaconchainTooltip>
        </Label>
      </Cell>
    </Flex>
  )
}

export default StakingStatsBox
