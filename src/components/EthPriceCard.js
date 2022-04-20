import React, { useState, useEffect } from "react"
import styled from "styled-components"
import axios from "axios"

import Translation from "../components/Translation"
import Icon from "./Icon"
import Link from "./Link"
import Tooltip from "./Tooltip"

const InfoIcon = styled(Icon)`
  margin-left: 0.5rem;
  fill: ${(props) => props.theme.colors.text200};
`

const Card = styled.div`
  display: flex;
  flex-direction: column;
  align-items: ${(props) => (props.isLeftAlign ? `flex-start` : `center`)};
  justify-content: space-between;
  width: 100%;
  max-width: 420px;
  max-height: 192px;
  background: ${(props) =>
    props.isNegativeChange
      ? props.theme.colors.priceCardBackgroundNegative
      : props.theme.colors.priceCardBackgroundPositive};
  border-radius: 4px;
  border: 1px solid
    ${(props) =>
      props.isNegativeChange
        ? props.theme.colors.priceCardBorderNegative
        : props.theme.colors.priceCardBorder};
  padding: 1.5rem;
`

const Title = styled.h4`
  margin: 0;
  font-size: 0.875rem;
  line-height: 140%;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: ${(props) => props.theme.colors.text200};
`

const Price = styled.div`
  line-height: 1.4;
  font-weight: 400;
  margin: ${(props) => (props.hasError ? `1rem 0` : 0)};
  font-size: ${(props) => (props.hasError ? props.theme.fontSizes.m : `3rem`)};
  color: ${(props) =>
    props.hasError ? props.theme.colors.fail : props.theme.colors.text};
`

const ChangeContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: ${(props) => (props.isLeftAlign ? `flex-start` : `center`)};
  min-height: 33px; /* prevents jump when price loads*/
`

const Change = styled.div`
  font-size: 1.5rem;
  line-height: 140%;
  margin-right: 1rem;
  color: ${(props) =>
    props.isNegativeChange
      ? props.theme.colors.fail300
      : props.theme.colors.success};
`

const ChangeTime = styled.div`
  font-size: 0.875rem;
  line-height: 140%;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: ${(props) => props.theme.colors.text300};
`

// TODO add prop to left vs. center align
const EthPriceCard = ({ className, isLeftAlign }) => {
  const [state, setState] = useState({
    currentPriceUSD: "",
    percentChangeUSD: "",
    hasError: false,
  })

  useEffect(() => {
    axios
      .get(
        "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd&include_24hr_change=true"
      )
      .then((response) => {
        if (response.data && response.data.ethereum) {
          const currentPriceUSD = response.data.ethereum.usd
          const percentChangeUSD = +response.data.ethereum.usd_24h_change.toFixed(
            2
          )
          setState({
            currentPriceUSD,
            percentChangeUSD,
            hasError: false,
          })
        }
      })
      .catch((error) => {
        console.error(error)
        setState({
          hasError: true,
        })
      })
  }, [])

  const isLoading = !state.currentPriceUSD

  let price = isLoading ? (
    <Translation id="loading" />
  ) : (
    `$${state.currentPriceUSD}`
  )

  if (state.hasError) {
    price = <Translation id="loading-error-refresh" />
  }

  const isNegativeChange = state.percentChangeUSD && state.percentChangeUSD < 0

  const change = state.percentChangeUSD
    ? isNegativeChange
      ? `${state.percentChangeUSD}% ↘`
      : `${state.percentChangeUSD}% ↗`
    : ``

  const tooltipContent = (
    <div>
      <Translation id="data-provided-by" />{" "}
      <Link to="https://www.coingecko.com/en/api">coingecko.com</Link>
    </div>
  )

  return (
    <Card
      className={className}
      isLeftAlign={isLeftAlign}
      isNegativeChange={isNegativeChange}
    >
      <Title>
        <Translation id="eth-current-price" />
        <Tooltip content={tooltipContent}>
          <InfoIcon name="info" size="14" />
        </Tooltip>
      </Title>
      <Price hasError={state.hasError}>{price}</Price>
      <ChangeContainer isLeftAlign={isLeftAlign}>
        <Change isNegativeChange={isNegativeChange}>{change}</Change>
        <ChangeTime>
          (<Translation id="last-24-hrs" />)
        </ChangeTime>
      </ChangeContainer>
    </Card>
  )
}

export default EthPriceCard
