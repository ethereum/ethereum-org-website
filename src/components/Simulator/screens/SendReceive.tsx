import React, { useEffect, useMemo, useState } from "react"
import { SimulatorStateProps } from "../interfaces"
import { ProgressCta, WalletHome } from "../"
import {
  ReceiveEther,
  SendEther,
  SendFromContacts,
  SendSummary,
  Success,
} from "./SendReceive/index"
import { defaultTokenBalances } from "../data"
import { TokenBalance } from "../Wallet/interfaces"
import { useEthPrice } from "../hooks"
import { AnimatePresence, motion } from "framer-motion"

const FALLBACK_ETH_PRICE = 1600 as const
const USD_RECEIVE_AMOUNT = 500 as const

export const SendReceive: React.FC<SimulatorStateProps> = ({ state }) => {
  const { step } = state
  const fetchedPrice = useEthPrice()
  const ethPrice = fetchedPrice > 1 ? fetchedPrice : FALLBACK_ETH_PRICE
  const ethReceiveAmount = USD_RECEIVE_AMOUNT / ethPrice
  const [chosenAmount, setChosenAmount] = useState<number>(0)

  useEffect(() => {
    if (step !== 2) return
    // Reset chosen amount if user goes back to step 2
    setChosenAmount(0)
  }, [step])

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
  return (
    <AnimatePresence>
      {[0].includes(step) && (
        <WalletHome state={state} isEnabled={[false, true]} />
      )}
      {[1].includes(step) && <ReceiveEther />}
      {[2].includes(step) && (
        <motion.div
          key="wallet-step-index-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.25 }}
        >
          <WalletHome
            state={state}
            isEnabled={[true, false]}
            tokenBalances={tokensWithEthBalance}
          />
        </motion.div>
      )}
      {[3].includes(step) && (
        <SendEther
          chosenAmount={chosenAmount}
          ethPrice={ethPrice}
          ethBalance={ethReceiveAmount}
          setChosenAmount={setChosenAmount}
        />
      )}
      {[4].includes(step) && <SendFromContacts state={state} />}
      {[5].includes(step) && (
        <SendSummary chosenAmount={chosenAmount} ethPrice={ethPrice} />
      )}
      {[6].includes(step) && <Success />}
      {[1, 3, 5].includes(step) && (
        <ProgressCta state={state} isDisabled={step === 3 && !chosenAmount} />
      )}
    </AnimatePresence>
  )
}
