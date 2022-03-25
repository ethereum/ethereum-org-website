import React, { useState, useEffect } from "react"
import styled from "styled-components"
import { useIntl } from "gatsby-plugin-intl"

import Translation from "./Translation"
import { getData } from "../utils/cache"
import calculateStakingRewards from "../utils/calculateStakingRewards"

const IndicatorSpan = styled.span`
  font-size: 2rem;
`

const ErrorMessage = () => (
  <IndicatorSpan>
    <Translation id="loading-error-refresh" />
  </IndicatorSpan>
)

const LoadingMessage = () => (
  <IndicatorSpan>
    <Translation id="loading" />
  </IndicatorSpan>
)

const StatsBoxGrid = () => {
  const intl = useIntl()
  const [totalEth, setTotalEth] = useState({
    value: 0,
    hasError: false,
  })
  const [totalValidators, setTotalValidators] = useState({
    value: 0,
    hasError: false,
  })
  const [currentApr, setCurrentApr] = useState({
    value: 0,
    hasError: false,
  })

  useEffect(() => {
    const formatInteger = (amount) =>
      new Intl.NumberFormat(intl.locale).format(amount)

    const formatPercentage = (amount) =>
      new Intl.NumberFormat(intl.locale, {
        style: "percent",
        minimumSignificantDigits: 2,
        maximumSignificantDigits: 3,
      }).format(amount)

    ;(async () => {
      try {
        const {
          data: { totalvalidatorbalance, validatorscount },
        } = await getData(
          "https://mainnet.beaconcha.in/api/v1/epoch/latest",
          true
        )

        const valueTotalEth = formatInteger(
          (totalvalidatorbalance * 1e-9).toFixed(0)
        )
        const valueTotalValidators = formatInteger(validatorscount)
        const currentAprDecimal = calculateStakingRewards(
          totalvalidatorbalance * 1e-9
        )
        const valueCurrentApr = formatPercentage(currentAprDecimal)
        setTotalEth({
          value: valueTotalEth,
          hasError: false,
        })
        setTotalValidators({
          value: valueTotalValidators,
          hasError: false,
        })
        setCurrentApr({
          value: valueCurrentApr,
          hasError: false,
        })
      } catch (error) {
        setTotalEth({ ...totalEth, hasError: true })
        setTotalValidators({ ...totalValidators, hasError: true })
        setCurrentApr({ ...currentApr, hasError: true })
      }
      // TODO: Verify all data is pulling and being formatted correctly, and available when page loads
    })()
  }, [])

  // TODO: Create component structure
  return null
}

export default StatsBoxGrid
