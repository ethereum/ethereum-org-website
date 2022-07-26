import React, { useState, useEffect } from "react"
import styled from "styled-components"
import { useIntl } from "react-intl"

import Translation from "../Translation"
import StatErrorMessage from "../StatErrorMessage"
import { getLocaleForNumberFormat } from "../../utils/translations"
import { getData } from "../../utils/cache"
import calculateStakingRewards from "../../utils/calculateStakingRewards"
import { Lang } from "../../utils/languages"

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

export interface IProps {}

const StatsBoxGrid: React.FC<IProps> = () => {
  const intl = useIntl()
  const [totalEth, setTotalEth] = useState<string>("0")
  const [totalValidators, setTotalValidators] = useState<string>("0")
  const [currentApr, setCurrentApr] = useState<string>("0")
  const [error, setError] = useState(false)

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
        const currentAprDecimal = calculateStakingRewards(
          totalvalidatorbalance * 1e-9
        )
        const valueCurrentApr = formatPercentage(currentAprDecimal)
        setTotalEth(valueTotalEth)
        setTotalValidators(valueTotalValidators)
        setCurrentApr(`~${valueCurrentApr}`)
        setError(false)
      } catch (error) {
        setTotalEth("n/a")
        setTotalValidators("n/a")
        setCurrentApr("n/a")
        setError(true)
      }
    })()
  }, [intl.locale])

  // TODO: Improve error handling
  if (error) return <StatErrorMessage />

  return (
    <Container>
      <Cell>
        <Value>{totalEth}</Value>
        <Label>
          <Translation id="page-staking-stats-box-metric-1" />
        </Label>
      </Cell>
      <Cell>
        <Value>{totalValidators}</Value>
        <Label>
          <Translation id="page-staking-stats-box-metric-2" />
        </Label>
      </Cell>
      <Cell>
        <Value>{currentApr}</Value>
        <Label>
          <Translation id="page-staking-stats-box-metric-3" />
        </Label>
      </Cell>
    </Container>
  )
}

export default StatsBoxGrid
