// Import libraries
import React, { useState, useEffect, ReactNode } from "react"
import { useIntl } from "react-intl"
import { Code, Flex, Icon, Spinner } from "@chakra-ui/react"
// Import components
import Translation from "../Translation"
import Tooltip from "../Tooltip"
import Link from "../Link"
// Import utilities
import { Lang } from "../../utils/languages"
import { getData } from "../../utils/cache"
import { getLocaleForNumberFormat } from "../../utils/translations"
import { MdInfoOutline } from "react-icons/md"

// Constants
const NA_ERROR = "n/a"
const ZERO = "0"
const MAX_EFFECTIVE_BALANCE = 32

//TODO: check out borderLeftColor
const Cell: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <Flex
      direction="column"
      alignItems="center"
      py={4}
      px={8}
      borderLeft={{ base: "none", md: "1px solid" }}
      borderLeftColor={{ md: "preBorder" }}
      borderTop={{ base: "1px solid #33333355", md: "none" }}
      sx={{
        "&:first-child": {
          borderLeft: "none",
          borderTop: "none",
        },
      }}
    >
      {children}
    </Flex>
  )
}

//TODO: code and title
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
      display="flex"
      alignItems="center"
      textAlign="center"
      textTransform="uppercase"
      color="primary"
    >
      {children}
    </Code>
  )
}

const Label: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <Flex
      wrap="nowrap"
      alignItems="center"
      textTransform="uppercase"
      fontSize="sm"
      mt={2}
    >
      {children}
    </Flex>
  )
}

//TODO: size="16" hover, active and focus
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
    <Icon
      as={MdInfoOutline}
      fill="text"
      marginInlineStart={2}
      _hover={{ fill: "primary" }}
      _active={{ fill: "primary" }}
      _focus={{ fill: "primary" }}
      boxSize={4}
    />
  </Tooltip>
)

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
  }, [intl.locale])

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
    </Flex>
  )
}

export default StakingStatsBox
