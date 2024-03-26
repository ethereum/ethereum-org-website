import React, { useEffect, useMemo, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { MdClose, MdInfo } from "react-icons/md"
import { Flex, Icon, Text } from "@chakra-ui/react"

import type { SimulatorNavProps } from "@/lib/types"

import { getMaxFractionDigitsUsd } from "../../utils"
import { WalletHome } from "../../WalletHome"
import type { TokenBalance } from "../../WalletHome/interfaces"

type ReceivedEtherProps = SimulatorNavProps & {
  defaultTokenBalances: Array<TokenBalance>
  ethReceiveAmount: number
  ethPrice: number
  sender?: string
}
export const ReceivedEther = ({
  nav,
  defaultTokenBalances,
  ethReceiveAmount,
  ethPrice,
  sender,
}: ReceivedEtherProps) => {
  const [received, setReceived] = useState(false)
  const [hideToast, setHideToast] = useState(false)
  const showToast = received && !hideToast
  const [hidden, setHidden] = useState(false)
  useEffect(() => {
    const timeout = setTimeout(() => {
      setReceived(true)
    }, 800)
    return () => {
      clearTimeout(timeout)
    }
  }, [])

  useEffect(() => {
    if (!received) return
    const timeout = setTimeout(() => {
      setHideToast(true)
    }, 8000)
    return () => {
      clearTimeout(timeout)
    }
  }, [received])

  const tokensWithEthBalance = useMemo<Array<TokenBalance>>(
    () =>
      defaultTokenBalances.map((token) =>
        token.ticker === "ETH"
          ? {
              ...token,
              amount: ethReceiveAmount,
              usdConversion: ethPrice,
            }
          : token
      ),
    [defaultTokenBalances, ethPrice, ethReceiveAmount]
  )

  const tokenBalances = received ? tokensWithEthBalance : defaultTokenBalances

  const displayEth: string = new Intl.NumberFormat("en", {
    maximumFractionDigits: 5,
  }).format(ethReceiveAmount)
  const usdReceiveAmount = ethReceiveAmount * ethPrice
  const displayUsd: string = new Intl.NumberFormat("en", {
    style: "currency",
    currency: "USD",
    notation: "compact",
    maximumFractionDigits: getMaxFractionDigitsUsd(usdReceiveAmount),
  }).format(usdReceiveAmount)
  return (
    <motion.div
      key="wallet-step-index-2"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.25 }}
    >
      <WalletHome
        nav={nav}
        isEnabled={[received, false]}
        tokenBalances={tokenBalances}
      />
      <AnimatePresence>
        {showToast && !hidden && (
          <Flex
            key="toast"
            position="absolute"
            inset={4}
            top="auto"
            bottom={32}
            borderRadius="base"
            h="fit-content"
            bg="primary300"
            gap={3}
            fontSize="md"
            align="center"
            p={4}
            color="background.base"
            as={motion.div}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Icon as={MdInfo} fontSize="xl" />
            <Text m={0} fontWeight="bold" fontSize="xs">
              You received {displayEth} ETH ({displayUsd})
              {sender ? ` from ${sender}` : ""}!
            </Text>
            <Icon as={MdClose} fontSize="xl" onClick={() => setHidden(true)} />
          </Flex>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
