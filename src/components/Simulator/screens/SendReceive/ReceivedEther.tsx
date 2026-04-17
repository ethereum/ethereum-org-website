import { useEffect, useMemo, useState } from "react"
import { Info, X } from "lucide-react"
import { AnimatePresence, motion } from "motion/react"
import { useLocale, useTranslations } from "next-intl"

import type { SimulatorNavProps } from "@/lib/types"

import { formatWalletToken, formatWalletUsd } from "../../utils"
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
  const t = useTranslations("component-wallet-simulator")
  const locale = useLocale()
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

  const displayEth = formatWalletToken(ethReceiveAmount, locale)
  const usdReceiveAmount = ethReceiveAmount * ethPrice
  const displayUsd = formatWalletUsd(usdReceiveAmount)
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
          <motion.div
            key="toast"
            className="absolute inset-4 bottom-32 top-auto flex h-fit items-center gap-3 rounded bg-primary-high-contrast p-4 text-md text-background"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            data-testid="received-ether-toast"
          >
            <Info className="text-xl" />
            <p className="m-0 text-xs font-bold">
              {sender
                ? t("sim-received-toast", {
                    ethAmount: displayEth,
                    usdAmount: displayUsd,
                    sender,
                  })
                : t("sim-received-toast-no-sender", {
                    ethAmount: displayEth,
                    usdAmount: displayUsd,
                  })}
            </p>
            <X className="text-xl" onClick={() => setHidden(true)} />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
