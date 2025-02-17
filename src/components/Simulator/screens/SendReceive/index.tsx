import React, { useEffect, useMemo, useState } from "react"

import type { PhoneScreenProps } from "@/lib/types"

import { useEthPrice } from "../../../../hooks/useEthPrice"
import {
  ETH_TRANSFER_FEE,
  FALLBACK_ETH_PRICE,
  USD_RECEIVE_AMOUNT,
} from "../../constants"
import { defaultTokenBalances } from "../../constants"
import { ProgressCta } from "../../ProgressCta"
import { WalletHome } from "../../WalletHome"
import type { TokenBalance } from "../../WalletHome/interfaces"

import { CONTACTS } from "./constants"
import { ReceivedEther } from "./ReceivedEther"
import { ReceiveEther } from "./ReceiveEther"
import { SendEther } from "./SendEther"
import { SendFromContacts } from "./SendFromContacts"
import { SendSummary } from "./SendSummary"
import { Success } from "./Success"

export const SendReceive = ({ nav, ctaLabel }: PhoneScreenProps) => {
  const { progressStepper, step } = nav
  const fetchedPrice = useEthPrice()
  const ethPrice = fetchedPrice > 1 ? fetchedPrice : FALLBACK_ETH_PRICE
  const ethReceiveAmount = USD_RECEIVE_AMOUNT / ethPrice
  const [chosenAmount, setChosenAmount] = useState(0)
  const ethChosenAmount = chosenAmount / ethPrice
  const [recipient, setRecipient] = useState<string | null>(null)
  const ethAfterTransfer = Math.max(
    ethReceiveAmount - chosenAmount / ethPrice - ETH_TRANSFER_FEE,
    0
  )

  useEffect(() => {
    if (step !== 2) return
    // Reset chosen amount if user goes back to step 2
    setChosenAmount(0)
  }, [step])

  useEffect(() => {
    if (step !== 4) return
    // Reset chosen amount if user goes back to step 2
    setRecipient(null)
  }, [step])

  const tokenBalancesAfterSend = useMemo<Array<TokenBalance>>(
    () =>
      defaultTokenBalances.map((token) =>
        token.ticker === "ETH"
          ? {
              ...token,
              amount: ethAfterTransfer,
              usdConversion: ethPrice,
            }
          : token
      ),
    [ethPrice, ethAfterTransfer]
  )

  return (
    <>
      {[0].includes(step) && <WalletHome nav={nav} isEnabled={[false, true]} />}
      {[1].includes(step) && <ReceiveEther />}
      {[2].includes(step) && (
        <ReceivedEther
          nav={nav}
          ethPrice={ethPrice}
          defaultTokenBalances={defaultTokenBalances}
          ethReceiveAmount={ethReceiveAmount}
          sender={CONTACTS[0].name}
        />
      )}
      {[3].includes(step) && (
        <SendEther
          chosenAmount={chosenAmount}
          ethPrice={ethPrice}
          ethBalance={ethReceiveAmount}
          setChosenAmount={setChosenAmount}
        />
      )}
      {[4].includes(step) && (
        <SendFromContacts nav={nav} setRecipient={setRecipient} />
      )}
      {[5].includes(step) && (
        <SendSummary
          chosenAmount={chosenAmount}
          ethPrice={ethPrice}
          recipient={recipient!}
          ethAvailable={ethReceiveAmount}
        />
      )}
      {[6].includes(step) && (
        <Success
          tokenBalances={tokenBalancesAfterSend}
          ethPrice={ethPrice}
          sentEthAmount={ethChosenAmount}
          recipient={recipient!}
        />
      )}
      {[1, 3, 5].includes(step) && (
        <ProgressCta
          isAnimated={step === 0}
          disabled={step === 3 && !chosenAmount}
          progressStepper={progressStepper}
        >
          {ctaLabel}
        </ProgressCta>
      )}
    </>
  )
}
