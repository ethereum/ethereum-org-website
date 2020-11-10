import React, { useState, useEffect } from "react"
import styled from "styled-components"
import axios from "axios"

import Translation from "../components/Translation"
import Icon from "./Icon"
import Link from "./Link"
import Tooltip from "./Tooltip"
import { Mixins } from "../theme"

const InfoIcon = styled(Icon)`
  margin-left: 0.5rem;
  fill: ${(props) => props.theme.colors.text200};
`

const Card = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-width: 416px;
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
  margin-bottom: 2rem;
`

const Title = styled.h4`
  margin: 0;
  font-size: 14px;
  line-height: 140%;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: ${(props) => props.theme.colors.text200};
`

const Price = styled.div`
  ${Mixins.textLevel1}
  margin: ${(props) => (props.hasError ? `1rem 0` : 0)};
  font-size: ${(props) => (props.hasError ? props.theme.fontSizes.m : `3rem`)};
  color: ${(props) =>
    props.hasError ? props.theme.colors.fail : props.theme.colors.text};
`

const ChangeContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 33px; /* prevents jump when price loads*/
`

const Change = styled.div`
  font-size: 24px;
  line-height: 140%;
  margin-right: 1rem;
  color: ${(props) =>
    props.isNegativeChange
      ? props.theme.colors.fail300
      : props.theme.colors.success};
`

const ChangeTime = styled.div`
  font-size: 14px;
  line-height: 140%;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: ${(props) => props.theme.colors.text300};
`

// TODO add prop to left vs. center align
const EthPriceCard = () => {
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
    <Translation id="page-get-eth-loading" />
  ) : (
    `$${state.currentPriceUSD}`
  )

  if (state.hasError) {
    price = <Translation id="page-get-eth-error" />
  }

  const isNegativeChange = state.percentChangeUSD && state.percentChangeUSD < 0

  const change = state.percentChangeUSD
    ? isNegativeChange
      ? `${state.percentChangeUSD}% ↘`
      : `${state.percentChangeUSD}% ↗`
    : ``

  const tooltipContent = (
    <div>
      <Translation id="page-get-eth-data" />{" "}
      <Link to="https://www.coingecko.com/en/api">coingecko.com</Link>
    </div>
  )

  return (
    <Card isNegativeChange={isNegativeChange}>
      <Title>
        <Translation id="page-get-eth-current-price" />
        <Tooltip content={tooltipContent}>
          <InfoIcon name="info" size="14" />
        </Tooltip>
      </Title>
      <Price hasError={state.hasError}>{price}</Price>
      <ChangeContainer>
        <Change isNegativeChange={isNegativeChange}>{change}</Change>
        <ChangeTime>
          <Translation id="page-get-eth-24-hrs" />
        </ChangeTime>
      </ChangeContainer>
    </Card>
  )
}

export default EthPriceCard
