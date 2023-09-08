import { Flex, Icon, Text } from "@chakra-ui/react"
import { AnimatePresence, motion } from "framer-motion"
import React, { useEffect, useMemo, useState } from "react"
import { MdInfo } from "react-icons/md"
import { SimulatorNavProps } from "../../interfaces"
import type { TokenBalance } from "../../WalletHome/interfaces"
import { WalletHome } from "../../WalletHome"

interface IProps extends SimulatorNavProps {
  defaultTokenBalances: Array<TokenBalance>
  ethReceiveAmount: number
  ethPrice: number
}
export const ReceivedEther: React.FC<IProps> = ({
  nav,
  defaultTokenBalances,
  ethReceiveAmount,
  ethPrice,
}) => {
  const [received, setReceived] = useState(false)
  const [hideToast, setHideToast] = useState(false)
  const showToast = received && !hideToast

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
    [ethPrice]
  )

  const tokenBalances = received ? tokensWithEthBalance : defaultTokenBalances

  const displayEth: string = new Intl.NumberFormat("en", {
    maximumFractionDigits: 5,
  }).format(ethReceiveAmount)

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
        {showToast && (
          <Flex
            key="toast"
            position="absolute"
            inset={4}
            bottom={6}
            borderRadius="base"
            top="auto"
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
            <Text m={0} fontWeight="bold">
              You received {displayEth} ETH!
            </Text>
          </Flex>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
