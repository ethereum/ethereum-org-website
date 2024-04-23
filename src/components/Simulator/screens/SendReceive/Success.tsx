import React, { useEffect, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { PiCheckThin } from "react-icons/pi"
import { Flex, Icon, Spinner, Text } from "@chakra-ui/react"

import { getMaxFractionDigitsUsd } from "../../utils"
import { WalletHome } from "../../WalletHome"
import type { TokenBalance } from "../../WalletHome/interfaces"

const ICON_SIZE = "4.5rem" as const

type SuccessProps = {
  tokenBalances: Array<TokenBalance>
  sentEthAmount: number
  ethPrice: number
  recipient: string
}
export const Success = ({
  tokenBalances,
  sentEthAmount,
  ethPrice,
  recipient,
}: SuccessProps) => {
  const [txPending, setTxPending] = useState(true)
  const [showWallet, setShowWallet] = useState(false)
  const [categoryIndex, setCategoryIndex] = useState(0)

  const usdAmount = sentEthAmount * ethPrice

  const usdValue = new Intl.NumberFormat("en", {
    style: "currency",
    currency: "USD",
    notation: "compact",
    maximumFractionDigits: getMaxFractionDigitsUsd(usdAmount),
  }).format(usdAmount)

  const sentEthValue = new Intl.NumberFormat("en", {
    maximumFractionDigits: 5,
  }).format(sentEthAmount)

  // Show spinner for defined number of milliseconds, switching "loading" state to false when complete
  const SPINNER_DURATION = 1000
  useEffect(() => {
    const timeout = setTimeout(() => {
      setTxPending(false)
    }, SPINNER_DURATION)
    return () => {
      clearTimeout(timeout)
    }
  }, [])

  const WALLET_FADE_IN_DELAY = 3000
  useEffect(() => {
    if (txPending) return
    const timeout = setTimeout(() => {
      setShowWallet(true)
    }, WALLET_FADE_IN_DELAY)
    return () => {
      clearTimeout(timeout)
    }
  }, [txPending])

  return (
    <AnimatePresence>
      {showWallet ? (
        <motion.div animate={{ opacity: [0, 1] }} key="wallet-home">
          <WalletHome
            tokenBalances={tokenBalances}
            activeTabIndex={categoryIndex}
            setActiveTabIndex={setCategoryIndex}
          />
        </motion.div>
      ) : (
        <Flex
          animate={{ opacity: [0, 1] }}
          exit={{ opacity: 0 }}
          key="success-fade-out"
          as={motion.div}
          justify="center"
          h="full"
          bg="background.highlight"
          pt={{ base: 24, md: 0 }}
          alignItems={{ base: "start", md: "center" }}
        >
          <Flex direction="column" alignItems="center" pt={8} gap={4}>
            {txPending ? (
              <motion.div
                key="spinner"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <Spinner w={ICON_SIZE} h={ICON_SIZE} />
              </motion.div>
            ) : (
              <motion.div
                key="checkmark"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", delay: 0.25 }}
              >
                <Icon
                  as={PiCheckThin}
                  w={ICON_SIZE}
                  h={ICON_SIZE}
                  transform="rotate(-10deg)"
                />
              </motion.div>
            )}
            <Text textAlign="center" px={{ base: 4, md: 8 }}>
              {txPending ? (
                "Sending transaction"
              ) : (
                <Text as="span">
                  You sent{" "}
                  <strong>
                    <>{sentEthValue} ETH</>
                  </strong>{" "}
                  ({usdValue}) to <strong>{recipient}</strong>
                </Text>
              )}
            </Text>
          </Flex>
        </Flex>
      )}
    </AnimatePresence>
  )
}
