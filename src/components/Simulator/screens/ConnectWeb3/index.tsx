import { useEffect, useMemo, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import {
  RiAuctionLine,
  RiFileTransferLine,
  RiPriceTag2Line,
} from "react-icons/ri"

import type { PhoneScreenProps } from "@/lib/types"

import { Image } from "@/components/Image"
import { Button } from "@/components/ui/buttons/Button"
import { Flex } from "@/components/ui/flex"

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
          <Flex className="bg-background.highlight h-full flex-col gap-8 px-6 py-8 text-center md:gap-16 md:py-16">
            <motion.p
              className="text-xl leading-[1.4] duration-700 md:text-2xl"
              {...fadeInProps}
            >
              Welcome to Web3
              <span className="mt-2 block font-bold">NFT Marketplace</span>
            </motion.p>
            <motion.p className="delay-500 duration-700" {...fadeInProps}>
              Connect your wallet to view your collection
            </motion.p>
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
            className="bg-background"
            appName="NFT Marketplace"
            displayUrl="app.example.com"
          >
            <div className="px-6 py-2 text-lg md:py-6 [&_button]:no-underline">
              <p className="mb-4 font-bold">Your collection (1)</p>
              <Flex className="mb-6 gap-2">
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
                  <Flex className="flex-col items-start gap-1 text-start text-xs sm:text-sm">
                    <p className="mb-auto ms-2 text-md font-bold">Cool art</p>
                    <Button variant="link" disabled>
                      <RiAuctionLine className="text-xs" />
                      Set a price
                    </Button>
                    <Button variant="link" disabled>
                      <RiPriceTag2Line className="text-xs" />
                      Auction item
                    </Button>
                    <Button variant="link" disabled>
                      <RiFileTransferLine className="text-xs" />
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
                <div className="text-sm md:text-md">
                  <Button className="block" variant="link" disabled>
                    Browse other artwork
                  </Button>
                  <Button variant="link" disabled>
                    Mint new NFT
                  </Button>
                </div>
              </NotificationPopover>
            </div>
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
