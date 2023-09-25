import React, { useState, useEffect } from "react"
import { useTheme } from "@emotion/react"
import { useStaticQuery, graphql } from "gatsby"
import { Box, Flex, Icon } from "@chakra-ui/react"
import axios from "axios"

import Emoji from "./Emoji"
import Translation from "./Translation"
import InlineLink from "./Link"
import Tooltip from "./Tooltip"
import Text from "./OldText"
import OldHeading from "./OldHeading"
import GatsbyImage from "./GatsbyImage"

import { getImage } from "../utils/image"
import { MdInfoOutline } from "react-icons/md"

export const TokenLogo = graphql`
  fragment TokenLogo on File {
    childImageSharp {
      gatsbyImageData(
        height: 24
        layout: FIXED
        placeholder: BLURRED
        quality: 100
      )
    }
  }
`

const USD_PER_POINT = 2

interface State {
  currentETHPriceUSD: number
  currentDAIPriceUSD: number
  hasError: boolean
}

type GetPriceResponse = {
  ethereum: { usd: number }
  dai: { usd: number }
}

export interface IProps {}

const BugBountyPoints: React.FC<IProps> = () => {
  const [state, setState] = useState<State>({
    currentETHPriceUSD: 1,
    currentDAIPriceUSD: 1,
    hasError: false,
  })
  const theme = useTheme()
  const isDarkTheme = theme.isDark

  useEffect(() => {
    axios
      .get<GetPriceResponse>(
        "https://api.coingecko.com/api/v3/simple/price?ids=ethereum%2Cdai&vs_currencies=usd"
      )
      .then((response) => {
        if (response.data && response.data.ethereum && response.data.dai) {
          const currentETHPriceUSD = response.data.ethereum.usd
          const currentDAIPriceUSD = response.data.dai.usd
          setState({
            currentETHPriceUSD,
            currentDAIPriceUSD,
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

  const isLoading = !state.currentETHPriceUSD

  const pointsInETH = !state.hasError
    ? (USD_PER_POINT / state.currentETHPriceUSD!).toFixed(5)
    : 0
  const pointsInDAI = !state.hasError
    ? (USD_PER_POINT / state.currentDAIPriceUSD!).toFixed(5)
    : 0

  const tooltipContent = (
    <Box>
      <Translation id="data-provided-by" />{" "}
      <InlineLink to="https://www.coingecko.com/en/api">
        coingecko.com
      </InlineLink>
    </Box>
  )

  const data = useStaticQuery(graphql`
    query {
      dai: file(relativePath: { eq: "upgrades/dai.png" }) {
        ...TokenLogo
      }
      ethLight: file(relativePath: { eq: "upgrades/eth-black.png" }) {
        ...TokenLogo
      }
      ethDark: file(relativePath: { eq: "upgrades/eth-orange.png" }) {
        ...TokenLogo
      }
    }
  `)
  const ethImage = isDarkTheme ? data.ethDark : data.ethLight

  return (
    <Box
      flex="1 1 560px"
      mx={{ base: 0, lg: 8 }}
      my={{ base: 8, lg: 0 }}
      p={6}
      border="1px solid"
      borderColor="border"
      borderRadius="2px"
      textTransform="uppercase"
    >
      <Box mb={4} fontSize="sm">
        <Translation id="page-upgrades-bug-bounty-points-exchange" />{" "}
        <Tooltip content={tooltipContent}>
          <Icon as={MdInfoOutline} fill="text200" boxSize="4" />
        </Tooltip>
      </Box>
      <OldHeading
        as="h2"
        mt={0}
        fontFamily="monospace"
        fontSize="2xl"
        fontWeight="bold"
      >
        <Translation id="page-upgrades-bug-bounty-points-point" />
      </OldHeading>
      {state.hasError && (
        <Flex
          align={{ base: "start", sm: "center" }}
          direction={{ base: "column", sm: "row" }}
          wrap="wrap"
          mb={8}
        >
          <Text fontSize="xl" m={0} mr={4}>
            <Translation id="page-upgrades-bug-bounty-points-error" />
          </Text>
        </Flex>
      )}
      {isLoading && !state.hasError && (
        <Flex
          align={{ base: "start", sm: "center" }}
          direction={{ base: "column", sm: "row" }}
          wrap="wrap"
          mb={8}
        >
          <Text fontSize="xl" m={0} mr={4}>
            <Translation id="page-upgrades-bug-bounty-points-loading" />
          </Text>
        </Flex>
      )}
      {!isLoading && !state.hasError && (
        <Flex
          align={{ base: "start", sm: "center" }}
          direction={{ base: "column", sm: "row" }}
          wrap="wrap"
          mb={8}
          gap={2}
        >
          <Flex align="center" wrap="wrap">
            <Emoji fontSize="xl" mr={2} text=":dollar:" />
            <Text fontSize="xl" m={0} mr={4}>
              <Translation id="page-upgrades-bug-bounty-points-usd" />
            </Text>
          </Flex>
          <Flex align="center" wrap="wrap">
            <GatsbyImage image={getImage(data.dai)!} alt="" me="2" />
            <Text fontSize="xl" m={0} mr={4}>
              {pointsInDAI} DAI
            </Text>
          </Flex>
          <Flex align="center" wrap="wrap">
            <GatsbyImage image={getImage(ethImage)!} alt="" me="2" />
            <Text fontSize="xl" m={0} mr={4}>
              {pointsInETH} ETH
            </Text>
          </Flex>
        </Flex>
      )}
      <Text>
        <Translation id="page-upgrades-bug-bounty-points-payout-desc" />
      </Text>
      <Text mb={0}>
        <Text as="em">
          <Translation id="page-upgrades-bug-bounty-points-rights-desc" />
        </Text>
      </Text>
    </Box>
  )
}

export default BugBountyPoints
