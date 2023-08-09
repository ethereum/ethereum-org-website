// Import libraries
import React, { useState, useEffect, ReactNode } from "react"
import { MdInfoOutline } from "react-icons/md"
import { useI18next } from "gatsby-plugin-react-i18next"
import { Code, Flex, Icon, Spinner, Text, VStack } from "@chakra-ui/react"
// Import components
import Translation from "../Translation"
import Tooltip from "../Tooltip"
import Link from "../Link"
// Import utilities
import { Lang } from "../../utils/languages"
import { getData } from "../../utils/cache"
import { getLocaleForNumberFormat } from "../../utils/translations"

// Constants
const NA_ERROR = "n/a"
const ZERO = "0"

const Cell: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <VStack
      spacing={2}
      py={4}
      px={8}
      borderLeft={{ md: "1px" }}
      borderTop={{ base: "1px", md: "none" }}
      // `!important` needed to force an override of the user-agent
      borderColor="preBorder !important"
      _first={{
        borderLeft: "none",
        borderTop: "none",
      }}
    >
      {children}
    </VStack>
  )
}

const Value: React.FC<{ children: ReactNode; title: string }> = ({
  children,
  title,
}) => {
  return (
    <Code
      title={title}
      fontWeight="bold"
      fontSize="2rem"
      background="none"
      color="primary.base"
      p={0}
    >
      {children}
    </Code>
  )
}

const Label: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <Flex alignItems="center" textTransform="uppercase" fontSize="sm">
      {children}
    </Flex>
  )
}

// BeaconchainTooltip component
interface BeaconchainTooltipProps {
  children: ReactNode
}
const BeaconchainTooltip: React.FC<BeaconchainTooltipProps> = ({
  children,
}) => (
  <Tooltip content={children}>
    <Icon
      as={MdInfoOutline}
      color="text"
      marginInlineStart={2}
      _hover={{ color: "primary.base" }}
      _active={{ color: "primary.base" }}
      _focus={{ color: "primary.base" }}
      boxSize={4}
    />
  </Tooltip>
)

// Interfaces
interface EthStoreResponse {
  data: {
    apr: number
    effective_balances_sum_wei: number
  }
}

interface EpochResponse {
  data: {
    validatorscount: number
  }
}

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

    // API calls, data formatting, and state setting
    const base = "https://beaconcha.in"
    const { href: ethstore } = new URL("api/v1/ethstore/latest", base)
    const { href: epoch } = new URL("api/v1/epoch/latest", base)
    // Get total ETH staked and current APR from ethstore endpoint
    ;(async () => {
      try {
        const ethStoreResponse = await getData<EthStoreResponse>(ethstore)
        const {
          data: { apr, effective_balances_sum_wei },
        } = ethStoreResponse
        const totalEffectiveBalance: number = effective_balances_sum_wei * 1e-18
        const valueTotalEth = formatInteger(Math.floor(totalEffectiveBalance))
        const valueCurrentApr = formatPercentage(apr)
        setTotalEth(valueTotalEth)
        setCurrentApr(valueCurrentApr)
      } catch (error) {
        setTotalEth(null)
        setCurrentApr(null)
      }
    })()
    // Get total active validators from latest epoch endpoint
    ;(async () => {
      try {
        const epochResponse = await getData<EpochResponse>(epoch)
        const {
          data: { validatorscount },
        } = epochResponse
        const valueTotalValidators = formatInteger(validatorscount)
        setTotalValidators(valueTotalValidators)
      } catch (error) {
        setTotalValidators(null)
      }
    })()
  }, [language])

  return (
    <Flex direction={{ base: "column", md: "row" }}>
      <Cell>
        {totalEth === ZERO ? (
          <Spinner />
        ) : (
          <Value title={totalEth ? "" : NA_ERROR}>{totalEth || NA_ERROR}</Value>
        )}
        <Label>
          <Translation id="page-staking-stats-box-metric-1" />
          <BeaconchainTooltip>
            <Text>
              <Translation id="page-staking-stats-box-metric-1-tooltip" />
            </Text>
            <Translation id="data-provided-by" />{" "}
            <Link to="https://beaconcha.in/">Beaconcha.in</Link>
          </BeaconchainTooltip>
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
          <BeaconchainTooltip>
            <Text>
              <Translation id="page-staking-stats-box-metric-2-tooltip" />
            </Text>
            <Translation id="data-provided-by" />{" "}
            <Link to="https://beaconcha.in/">Beaconcha.in</Link>
          </BeaconchainTooltip>
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
          <BeaconchainTooltip>
            <Text>
              <Translation id="page-staking-stats-box-metric-3-tooltip" />
            </Text>
            <Translation id="data-provided-by" />{" "}
            <Link to="https://beaconcha.in/ethstore">Beaconcha.in</Link>
          </BeaconchainTooltip>
        </Label>
      </Cell>
    </Flex>
  )
}

export default StakingStatsBox
