// Import libraries
import React, { useState, useEffect } from "react"
import styled from "@emotion/styled"
import { useIntl } from "react-intl"
import { Spinner } from "@chakra-ui/react"
// Import components
import Translation from "../Translation"
// Import utilities
import { Lang } from "../../utils/languages"
import { getData } from "../../utils/cache"
import { getLocaleForNumberFormat } from "../../utils/translations"

// Constants
const NA_ERROR = "n/a"
const ZERO = "0"

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

const Label = styled.p`
  text-transform: uppercase;
  font-size: 0.875rem;
  margin-top: 0.5rem;
`

// Interfaces
export interface IProps {}

// StatsBox component
const StakingStatsBox: React.FC<IProps> = () => {
  const intl = useIntl()
  /**
   * State variables:
   * - ZERO is default string, "0", representing loading state
   * - null is error state
   */
  const [totalEth, setTotalEth] = useState<string | null>(ZERO)
  const [totalValidators, setTotalValidators] = useState<string | null>(ZERO)
  const [currentApr, setCurrentApr] = useState<string | null>(ZERO)

  useEffect(() => {
    const localeForStatsBoxNumbers = getLocaleForNumberFormat(
      intl.locale as Lang
    )

    const formatInteger = (amount: number): string =>
      new Intl.NumberFormat(localeForStatsBoxNumbers).format(amount)

    const formatPercentage = (amount: number): string =>
      new Intl.NumberFormat(localeForStatsBoxNumbers, {
        style: "percent",
        minimumSignificantDigits: 2,
        maximumSignificantDigits: 2,
      }).format(amount)

    ;(async () => {
      try {
        const {
          data: { totalvalidatorbalance, validatorscount },
        } = await getData<{
          data: { totalvalidatorbalance: number; validatorscount: number }
        }>("https://mainnet.beaconcha.in/api/v1/epoch/latest")
        const valueTotalEth = formatInteger(
          Number((totalvalidatorbalance * 1e-9).toFixed(0))
        )
        const valueTotalValidators = formatInteger(validatorscount)
        setTotalEth(valueTotalEth)
        setTotalValidators(valueTotalValidators)
      } catch (error) {
        setTotalEth(null)
        setTotalValidators(null)
      }
    })()
    ;(async () => {
      try {
        const {
          data: { apr },
        } = await getData<{
          data: { apr: number }
        }>("https://beaconcha.in/api/v1/ethstore/650")
        const valueCurrentApr = formatPercentage(apr)
        setCurrentApr(valueCurrentApr)
      } catch (error) {
        setCurrentApr(null)
      }
    })()
  }, [intl.locale])

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
        </Label>
      </Cell>
    </Container>
  )
}

export default StakingStatsBox
