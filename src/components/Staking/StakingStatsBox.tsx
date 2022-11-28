// Import libraries
import React, { useState, useEffect } from "react"
import styled from "@emotion/styled"
import { useI18next } from "gatsby-plugin-react-i18next"
import { Spinner } from "@chakra-ui/react"
// Import components
import Translation from "../Translation"
import Tooltip from "../Tooltip"
import Link from "../Link"
import Icon from "../Icon"
// Import utilities
import { Lang } from "../../utils/languages"
import { getData } from "../../utils/cache"
import { getLocaleForNumberFormat } from "../../utils/translations"

// Constants
const NA_ERROR = "n/a"
const ZERO = "0"
const MAX_EFFECTIVE_BALANCE = 32

// Styled components
const Container = styled.div`
  display: flex;
  @media (max-width: ${({ theme }) => theme.breakpoints.m}) {
    flex-direction: column;
  }
`

const Cell = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem 2rem;
  border-left: 1px solid ${({ theme }) => theme.colors.preBorder};
  @media (max-width: ${({ theme }) => theme.breakpoints.m}) {
    border-left: none;
    border-top: 1px solid #33333355;
  }
  &:first-child {
    border-left: none;
    border-top: none;
  }
`

const Value = styled.code`
  font-weight: 700;
  font-size: 2rem;
  background: none;
  display: flex;
  align-items: center;
  text-align: center;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.primary};
`

const Label = styled.div`
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  text-transform: uppercase;
  font-size: 0.875rem;
  margin-top: 0.5rem;
`

const StyledIcon = styled(Icon)`
  fill: ${({ theme }) => theme.colors.text};
  margin-inline-start: 0.5rem;
  @media (max-width: ${({ theme }) => theme.breakpoints.l}) {
  }
  &:hover,
  &:active,
  &:focus {
    fill: ${({ theme }) => theme.colors.primary};
  }
`

// BeaconchainTooltip component
const BeaconchainTooltip = ({ isEthStore }: { isEthStore?: boolean }) => (
  <Tooltip
    content={
      <div>
        <Translation id="data-provided-by" />{" "}
        {isEthStore && (
          <Link to="https://github.com/gobitfly/eth.store/">ETH.STORE, </Link>
        )}
        <Link to="https://beaconcha.in">Beaconcha.in</Link>
      </div>
    }
  >
    <StyledIcon name="info" size="16" />
  </Tooltip>
)

// Interfaces
export interface IProps {}

// StatsBox component
const StakingStatsBox: React.FC<IProps> = () => {
  const { language } = useI18next()
  /**
   * State variables:
   * - ZERO is default string, "0", representing loading state
   * - null is error state
   */
  const [totalEth, setTotalEth] = useState<string | null>(ZERO)
  const [totalValidators, setTotalValidators] = useState<string | null>(ZERO)
  const [currentApr, setCurrentApr] = useState<string | null>(ZERO)

  useEffect(() => {
    const localeForStatsBoxNumbers = getLocaleForNumberFormat(language as Lang)

    // Helper functions
    const formatInteger = (amount: number): string =>
      new Intl.NumberFormat(localeForStatsBoxNumbers).format(amount)

    const formatPercentage = (amount: number): string =>
      new Intl.NumberFormat(localeForStatsBoxNumbers, {
        style: "percent",
        minimumSignificantDigits: 2,
        maximumSignificantDigits: 2,
      }).format(amount)

    // API call, data formatting, and state setting
    ;(async () => {
      try {
        const {
          data: { apr, effective_balances_sum_wei },
        } = await getData<{
          data: { apr: number; effective_balances_sum_wei: number }
        }>("https://beaconcha.in/api/v1/ethstore/latest")
        const totalEffectiveBalance: number = effective_balances_sum_wei * 1e-18
        const valueTotalEth = formatInteger(Math.floor(totalEffectiveBalance))
        const valueTotalValidators = formatInteger(
          totalEffectiveBalance / MAX_EFFECTIVE_BALANCE
        )
        const valueCurrentApr = formatPercentage(apr)
        setTotalEth(valueTotalEth)
        setTotalValidators(valueTotalValidators)
        setCurrentApr(valueCurrentApr)
      } catch (error) {
        setTotalEth(null)
        setCurrentApr(null)
        setTotalValidators(null)
      }
    })()
  }, [language])

  return (
    <Container>
      <Cell>
        {totalEth === ZERO ? (
          <Spinner />
        ) : (
          <Value title={totalEth ? "" : NA_ERROR}>{totalEth || NA_ERROR}</Value>
        )}
        <Label>
          <Translation id="page-staking-stats-box-metric-1" />
          <BeaconchainTooltip />
        </Label>
      </Cell>
      <Cell>
        {totalValidators === ZERO ? (
          <Spinner />
        ) : (
          <Value title={totalValidators ? "" : NA_ERROR}>
            {totalValidators || NA_ERROR}
          </Value>
        )}
        <Label>
          <Translation id="page-staking-stats-box-metric-2" />
          <BeaconchainTooltip />
        </Label>
      </Cell>
      <Cell>
        {currentApr === ZERO ? (
          <Spinner />
        ) : (
          <Value title={currentApr ? "" : NA_ERROR}>
            {currentApr || NA_ERROR}
          </Value>
        )}
        <Label>
          <Translation id="page-staking-stats-box-metric-3" />
          <BeaconchainTooltip isEthStore />
        </Label>
      </Cell>
    </Container>
  )
}

export default StakingStatsBox
