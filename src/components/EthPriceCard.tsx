import React, { useState, useEffect } from "react"
import { Box, Flex, Heading, Icon } from "@chakra-ui/react"
import { MdInfoOutline } from "react-icons/md"
import axios from "axios"

import Translation from "./Translation"
import Link from "./Link"
import Tooltip from "./Tooltip"

export interface IProps {
  className?: string
  isLeftAlign?: boolean
}

// TODO add prop to left vs. center align
const EthPriceCard: React.FC<IProps> = ({ className, isLeftAlign = false }) => {
  const [state, setState] = useState({
    currentPriceUSD: "",
    percentChangeUSD: 0,
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
          const percentChangeUSD =
            +response.data.ethereum.usd_24h_change.toFixed(2)
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
          ...state,
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

  const isNegativeChange = state?.percentChangeUSD < 0

  const change = state.percentChangeUSD
    ? isNegativeChange
      ? `${state.percentChangeUSD}% ↘`
      : `${state.percentChangeUSD}% ↗`
    : ``

  const tooltipContent = (
    <Box>
      <Translation id="data-provided-by" />{" "}
      <Link to="https://www.coingecko.com/en/api">coingecko.com</Link>
    </Box>
  )

  return (
    <Flex
      className={className}
      direction="column"
      align={isLeftAlign ? "flex-start" : "center"}
      justify="space-between"
      background={
        isNegativeChange
          ? "priceCardBackgroundNegative"
          : "priceCardBackgroundPositive"
      }
      border="1px solid"
      borderColor={
        isNegativeChange ? "priceCardBorderNegative" : "priceCardBorder"
      }
      p={6}
      w="full"
      maxW="420px"
      maxH="192px"
      borderRadius="base"
    >
      <Heading
        as="h4"
        color="text200"
        m={0}
        fontSize="sm"
        fontWeight="medium"
        lineHeight="140%"
        letterSpacing="0.04em"
        textTransform="uppercase"
      >
        <Translation id="eth-current-price" />
        <Tooltip content={tooltipContent}>
          <Icon as={MdInfoOutline} boxSize="14px" ml={2} />
        </Tooltip>
      </Heading>

      <Box
        m={state.hasError ? "1rem 0" : 0}
        lineHeight="1.4"
        fontSize={state.hasError ? "md" : "5xl"}
        color={state.hasError ? "fail" : "text"}
      >
        {price}
      </Box>
      <Flex
        w="full"
        align="center"
        justify={isLeftAlign ? "flex-start" : "center"}
        minH="33px" /* prevents jump when price loads*/
      >
        <Box
          fontSize="2xl"
          lineHeight="140%"
          mr={4}
          color={isNegativeChange ? "fail300" : "success.base"}
        >
          {change}
        </Box>
        <Box
          fontSize="sm"
          lineHeight="140%"
          letterSpacing="0.04em"
          textTransform="uppercase"
          color="text300"
        >
          (<Translation id="last-24-hrs" />)
        </Box>
      </Flex>
    </Flex>
  )
}

export default EthPriceCard
