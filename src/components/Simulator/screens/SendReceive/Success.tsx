import { useEffect, useState } from "react"
import { Check } from "lucide-react"
import { AnimatePresence, motion } from "motion/react"
import { useLocale, useTranslations } from "next-intl"

import { Flex, VStack } from "@/components/ui/flex"
import { Spinner } from "@/components/ui/spinner"

import { cn } from "@/lib/utils/cn"

import { formatWalletToken, formatWalletUsd } from "../../utils"
import { WalletHome } from "../../WalletHome"
import type { TokenBalance } from "../../WalletHome/interfaces"

const ICON_SIZE = "text-[4.5rem]"

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
  const t = useTranslations("component-wallet-simulator")
  const locale = useLocale()
  const [txPending, setTxPending] = useState(true)
  const [showWallet, setShowWallet] = useState(false)
  const [categoryIndex, setCategoryIndex] = useState(0)

  const usdAmount = sentEthAmount * ethPrice
  const usdValue = formatWalletUsd(usdAmount)
  const sentEthValue = formatWalletToken(sentEthAmount, locale)

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
          className="h-full justify-center bg-background-highlight max-md:pt-24 md:items-center"
          asChild
        >
          <motion.div
            animate={{ opacity: [0, 1] }}
            exit={{ opacity: 0 }}
            key="success-fade-out"
          >
            <VStack className="gap-4 pt-8">
              {txPending ? (
                <motion.div
                  key="spinner"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <Spinner className={ICON_SIZE} />
                </motion.div>
              ) : (
                <motion.div
                  key="checkmark"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", delay: 0.25 }}
                  data-testid="success-icon"
                >
                  <Check
                    className={cn(
                      ICON_SIZE,
                      "size-[1em] -rotate-[10deg] stroke-1"
                    )}
                  />
                </motion.div>
              )}
              <p className="px-4 text-center md:px-8">
                {txPending ? (
                  t("sim-success-sending")
                ) : (
                  <span>
                    {t.rich("sim-success-sent", {
                      ethAmount: sentEthValue,
                      usdAmount: usdValue,
                      recipient,
                      strong: (chunks) => <strong>{chunks}</strong>,
                    })}
                  </span>
                )}
              </p>
            </VStack>
          </motion.div>
        </Flex>
      )}
    </AnimatePresence>
  )
}
