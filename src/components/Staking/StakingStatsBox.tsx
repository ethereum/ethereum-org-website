import { Info } from "lucide-react"
import { useLocale, useTranslations } from "next-intl"

import type { ChildOnlyProp, StakingStatsData } from "@/lib/types"

import Tooltip from "@/components/Tooltip"
import { Flex } from "@/components/ui/flex"

import { numberFormat } from "@/lib/utils/numbers"

import InlineLink from "../ui/Link"

const Cell = ({ children }: ChildOnlyProp) => (
  <Flex className="flex-col gap-2 border-s p-4 pe-12">{children}</Flex>
)

const Value = ({ children }: ChildOnlyProp) => (
  <div className="inline-block bg-none font-monospace text-3xl font-bold text-primary">
    {children}
  </div>
)

const Label = ({ children }: ChildOnlyProp) => (
  <Flex className="gap-2 text-sm uppercase">{children}</Flex>
)

// DataSourceTooltip component
const DataSourceTooltip = ({ children }: ChildOnlyProp) => (
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
  const t = useTranslations("page-staking")
  const tCommon = useTranslations("common")

  // Helper functions
  const formatInteger = (amount: number): string =>
    amount
      ? numberFormat(locale, { maximumFractionDigits: 0 }).format(amount)
      : "—"

  const formatPercentage = (amount: number): string =>
    numberFormat(locale, {
      style: "percent",
      minimumSignificantDigits: 2,
      maximumSignificantDigits: 2,
    }).format(amount)

  const totalEth = formatInteger(data.totalEthStaked)
  const percentStaked = formatPercentage(data.stakedPercentage)
  const currentApr = formatPercentage(data.apr)

  return (
    <Flex className="flex-col md:flex-row">
      <Cell>
        <Value>{totalEth}</Value>
        <Label>
          {t("page-staking-stats-box-metric-1")}
          <DataSourceTooltip>
            <div className="normal-case">
              <p>{t("page-staking-stats-box-metric-1-tooltip")}</p>
              {tCommon("data-provided-by")}{" "}
              <InlineLink href="https://dune.com/">Dune Analytics</InlineLink>
            </div>
          </DataSourceTooltip>
        </Label>
      </Cell>
      <Cell>
        <Value>{percentStaked}</Value>
        <Label>
          {t("page-staking-stats-box-metric-2")}
          <DataSourceTooltip>
            <div className="normal-case">
              <p>{t("page-staking-stats-box-metric-2-tooltip")}</p>
              {tCommon("data-provided-by")}{" "}
              <InlineLink href="https://dune.com/">Dune Analytics</InlineLink>
            </div>
          </DataSourceTooltip>
        </Label>
      </Cell>
      <Cell>
        <Value>{currentApr}</Value>
        <Label>
          {t("page-staking-stats-box-metric-3")}
          <DataSourceTooltip>
            <div className="normal-case">
              <p>{t("page-staking-stats-box-metric-3-tooltip")}</p>
              {tCommon("data-provided-by")}{" "}
              <InlineLink href="https://dune.com/">Dune Analytics</InlineLink>
            </div>
          </DataSourceTooltip>
        </Label>
      </Cell>
    </Flex>
  )
}

export default StakingStatsBox
