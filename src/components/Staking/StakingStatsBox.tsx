import { useLocale, useTranslations } from "next-intl"

import type { StakingStatsData } from "@/lib/types"

import BigNumber from "@/components/BigNumber"

import { numberFormat } from "@/lib/utils/numbers"

const DUNE = { sourceName: "Dune Analytics", sourceUrl: "https://dune.com/" }

// StatsBox component
type StakingStatsBoxProps = {
  data: StakingStatsData
}
const StakingStatsBox = ({ data }: StakingStatsBoxProps) => {
  const locale = useLocale()
  const t = useTranslations("page-staking")

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
    <div className="flex flex-col md:flex-row">
      <BigNumber
        variant="ruled"
        center={false}
        value={totalEth}
        sourceDescription={t("page-staking-stats-box-metric-1-tooltip")}
        {...DUNE}
      >
        {t("page-staking-stats-box-metric-1")}
      </BigNumber>
      <BigNumber
        variant="ruled"
        center={false}
        value={percentStaked}
        sourceDescription={t("page-staking-stats-box-metric-2-tooltip")}
        {...DUNE}
      >
        {t("page-staking-stats-box-metric-2")}
      </BigNumber>
      <BigNumber
        variant="ruled"
        center={false}
        value={currentApr}
        sourceDescription={t("page-staking-stats-box-metric-3-tooltip")}
        {...DUNE}
      >
        {t("page-staking-stats-box-metric-3")}
      </BigNumber>
    </div>
  )
}

export default StakingStatsBox
