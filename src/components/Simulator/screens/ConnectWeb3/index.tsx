import React, { useMemo } from "react"
import { Box, Flex, Text } from "@chakra-ui/react"
import { AnimatePresence, motion } from "framer-motion"
import { Slider } from "./Slider"
import { Web3App } from "./Web3App"
import { ProgressCta, WalletHome } from "../.."
import { defaultTokenBalances } from "../../data"
import type { PhoneScreenProps } from "../../interfaces"
import type { TokenBalance } from "../../Wallet/interfaces"
import { useEthPrice } from "../../hooks"

export const ConnectWeb3: React.FC<PhoneScreenProps> = ({ nav, ctaLabel }) => {
  const { progressStepper, step } = nav
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

  const fadeInProps = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
  }
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
            <Text
              as={motion.p}
              fontSize={{ base: "xl", md: "2xl" }}
              m={0}
              {...fadeInProps}
              transitionDuration="0.75s"
            >
              Welcome to
              <Text display="block" mt={2} fontWeight="bold">
                Web3
              </Text>
            </Text>
            <Text
              as={motion.p}
              {...fadeInProps}
              transitionDuration="0.75s"
              transitionDelay="0.5s"
            >
              Stake ETH to earn rewards and help secure the network
            </Text>
          </Flex>
        </Web3App>
      )}
      <AnimatePresence>
        {[1, 2].includes(step) && <Slider isConnected={step === 2} />}
      </AnimatePresence>
      {[3].includes(step) && (
        <motion.div
          {...fadeInProps}
          exit={{ opacity: 0 }}
          style={{ height: "100%" }}
        >
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
        </motion.div>
      )}
      {[0, 1, 2, 3].includes(step) && (
        <ProgressCta isAnimated={step === 0} progressStepper={progressStepper}>
          {ctaLabel}
        </ProgressCta>
      )}
      {[4].includes(step) && (
        <motion.div
          key="final-wallet-display"
          {...fadeInProps}
          transition={{ duration: 0.5 }}
          style={{ height: "100%" }}
        >
          <WalletHome tokenBalances={tokensWithEthBalance} />
        </motion.div>
      )}
    </>
  )
}
