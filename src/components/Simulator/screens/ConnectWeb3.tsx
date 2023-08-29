import React, { useMemo } from "react"
import { Box, Flex, Text } from "@chakra-ui/react"
import { SimulatorStateProps } from "../interfaces"
import { ProgressCta } from "../ProgressCta"
import { Slider, Web3App } from "./ConnectWeb3/index"
import { AnimatePresence } from "framer-motion"
import { WalletHome } from "../WalletHome"
import { defaultTokenBalances } from "../data"
import { TokenBalance } from "../Wallet/interfaces"
import { useEthPrice } from "../hooks"

export const ConnectWeb3: React.FC<SimulatorStateProps> = ({ state }) => {
  const { step } = state
  const ethPrice = useEthPrice()
  const tokensWithEthBalance = useMemo<Array<TokenBalance>>(
    () =>
      defaultTokenBalances.map((token) =>
        token.ticker === "ETH"
          ? {
              ...token,
              amount: 500 / ethPrice,
              usdConversion: ethPrice,
            }
          : token
      ),
    [ethPrice]
  )

  return (
    <>
      {[0, 1, 2].includes(step) && (
        <Web3App>
          <Flex
            px={6}
            py={16}
            gap={16}
            bg="background.highlight"
            h="full"
            direction="column"
            textAlign="center"
          >
            <Text fontSize={{ base: "xl", md: "2xl" }} m={0}>
              Welcome to
              <Text as="span" display="block" fontWeight="bold">
                Web3
              </Text>
            </Text>
            <Text>Stake ETH to earn rewards and help secure the network</Text>
          </Flex>
        </Web3App>
      )}
      <AnimatePresence>
        {[1, 2].includes(step) && <Slider isConnected={step === 2} />}
      </AnimatePresence>
      {[3].includes(step) && (
        <Web3App bg="background.base">
          <Box px={6} py={{ base: 2, md: 6 }} fontSize="lg">
            <Text fontWeight="bold" mb={2}>
              Your staked ETH
            </Text>
            <Text mb={{ base: 4, md: 6 }}>2.1824 ETH</Text>
          </Box>
          <Box
            h="full"
            w="full"
            bg="background.highlight"
            px={6}
            py={{ base: 4, md: 6 }}
          >
            <Text fontWeight="bold" m={0}>
              Yearly APR
            </Text>
            <Text>4.15%</Text>
            <Text fontWeight="bold" m={0}>
              Rewards
            </Text>
            <Text>0.1824 ETH</Text>
          </Box>
        </Web3App>
      )}
      {[0, 1, 2, 3].includes(step) && <ProgressCta state={state} />}
      {[4].includes(step) && (
        <WalletHome tokenBalances={tokensWithEthBalance} />
      )}
    </>
  )
}
