import React, { useEffect, useMemo, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import {
  RiAuctionLine,
  RiFileTransferLine,
  RiPriceTag2Line,
} from "react-icons/ri"
import { Box, Button, Flex, Icon, Text } from "@chakra-ui/react"

import type { PhoneScreenProps } from "@/lib/types"

import { Image } from "@/components/Image"

import { useEthPrice } from "../../../../hooks/useEthPrice"
import {
  BASE_ANIMATION_DELAY_SEC,
  defaultTokenBalances,
  FALLBACK_ETH_PRICE,
  USD_RECEIVE_AMOUNT,
} from "../../constants"
import { NotificationPopover } from "../../NotificationPopover"
import { ProgressCta } from "../../ProgressCta"
import { WalletHome } from "../../WalletHome"
import type { TokenBalance } from "../../WalletHome/interfaces"

import { Browser } from "./Browser"
import { EXAMPLE_APP_URL } from "./constants"
import { Slider } from "./Slider"
import { Web3App } from "./Web3App"

import NFTImage from "@/public/images/deep-panic.png"

export const ConnectWeb3 = ({ nav, ctaLabel }: PhoneScreenProps) => {
  const { progressStepper, step } = nav
  const NFTs = [
    {
      title: "Cool art",
      image: NFTImage,
    },
  ]
  const fetchedPrice = useEthPrice()
  const ethPrice = fetchedPrice > 1 ? fetchedPrice : FALLBACK_ETH_PRICE
  const tokensWithEthBalance = useMemo<Array<TokenBalance>>(
    () =>
      defaultTokenBalances.map((token) =>
        token.ticker === "ETH"
          ? {
              ...token,
              amount: USD_RECEIVE_AMOUNT / ethPrice,
              usdConversion: ethPrice,
            }
          : token
      ),
    [ethPrice]
  )
  const [activeTabIndex, setActiveTabIndex] = useState(1)
  const nfts = [
    {
      title: "Cool art",
      image: NFTImage,
    },
  ]
  const fadeInProps = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
  }

  // Enable ProgressCta button after short delay for first step
  const [ctaDisabled, setCtaDisabled] = useState(step === 0)
  useEffect(() => {
    if (step !== 0) return
    const timeout = setTimeout(() => {
      setCtaDisabled(false)
    }, BASE_ANIMATION_DELAY_SEC * 1000)
    return () => clearTimeout(timeout)
  }, [step])

  return (
    <>
      {[0].includes(step) && <Browser />}
      {[1, 2, 3].includes(step) && (
        <Web3App displayUrl={EXAMPLE_APP_URL}>
          <Flex
            px={6}
            py={{ base: 8, md: 16 }}
            gap={{ base: 8, md: 16 }}
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
              lineHeight={1.4}
            >
              Welcome to Web3
              <Text as="span" display="block" mt={2} fontWeight="bold">
                NFT Marketplace
              </Text>
            </Text>
            <Text
              as={motion.p}
              {...fadeInProps}
              transitionDuration="0.75s"
              transitionDelay="0.5s"
            >
              Connect your wallet to view your collection
            </Text>
          </Flex>
        </Web3App>
      )}
      <AnimatePresence>
        {[2, 3].includes(step) && (
          <Slider isConnected={step === 3} displayUrl={EXAMPLE_APP_URL}>
            Connecting to the website will not share any personal or secure
            information with the site owners.
          </Slider>
        )}
      </AnimatePresence>
      {[4].includes(step) && (
        <motion.div
          {...fadeInProps}
          exit={{ opacity: 0 }}
          style={{ height: "100%" }}
        >
          <Web3App
            bg="background.base"
            appName="NFT Marketplace"
            displayUrl="app.example.com"
          >
            <Box
              px={6}
              py={{ base: 2, md: 6 }}
              fontSize="lg"
              sx={{ button: { textDecoration: "none" } }}
            >
              <Text fontWeight="bold" mb={4}>
                Your collection (1)
              </Text>
              <Flex gap={2} mb={6}>
                <Image
                  src={NFTs[0].image}
                  width={120}
                  height={120}
                  alt="NFT Image"
                />
                <NotificationPopover
                  title="Example walkthrough"
                  content="These are some things you could do as the owner of your NFTs"
                  side="top"
                >
                  <Flex
                    direction="column"
                    fontSize={{ base: "xs", sm: "sm" }}
                    textAlign="start"
                    alignItems="start"
                    gap={1}
                  >
                    <Text fontWeight="bold" fontSize="md" mb="auto" ms={2}>
                      Cool art
                    </Text>
                    <Button
                      variant="link"
                      isDisabled
                      leftIcon={<Icon as={RiAuctionLine} fontSize="xs" />}
                    >
                      Set a price
                    </Button>
                    <Button
                      variant="link"
                      isDisabled
                      leftIcon={<Icon as={RiPriceTag2Line} fontSize="xs" />}
                    >
                      Auction item
                    </Button>
                    <Button
                      variant="link"
                      isDisabled
                      leftIcon={<Icon as={RiFileTransferLine} fontSize="xs" />}
                    >
                      Transfer item
                    </Button>
                  </Flex>
                </NotificationPopover>
              </Flex>
              <NotificationPopover
                title="Example walkthrough"
                content="Try out a real Ethereum application when finished here"
                side="top"
              >
                <Box fontSize={{ base: "sm", md: "md" }}>
                  <Button variant="link" isDisabled display="block">
                    Browse other artwork
                  </Button>
                  <Button variant="link" isDisabled>
                    Mint new NFT
                  </Button>
                </Box>
              </NotificationPopover>
            </Box>
          </Web3App>
        </motion.div>
      )}
      {[0, 1, 2, 3, 4].includes(step) && (
        <ProgressCta
          className={step === 0 ? "mb-16" : "mb-0"}
          isAnimated={step === 0}
          disabled={ctaDisabled}
          progressStepper={progressStepper}
        >
          {ctaLabel}
        </ProgressCta>
      )}
      {[5].includes(step) && (
        <motion.div
          key="final-wallet-display"
          {...fadeInProps}
          transition={{ duration: 0.5 }}
          style={{ height: "100%" }}
        >
          <WalletHome
            tokenBalances={tokensWithEthBalance}
            activeTabIndex={activeTabIndex}
            setActiveTabIndex={setActiveTabIndex}
            nfts={nfts}
          />
        </motion.div>
      )}
    </>
  )
}
