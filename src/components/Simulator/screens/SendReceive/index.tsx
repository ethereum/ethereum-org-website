import React, { useEffect, useState } from "react"
import { ReceiveEther } from "./ReceiveEther"
import { ReceivedEther } from "./ReceivedEther"
import { SendEther } from "./SendEther"
import { SendFromContacts } from "./SendFromContacts"
import { SendSummary } from "./SendSummary"
import { Success } from "./Success"
import { ProgressCta } from "../../ProgressCta"
import { WalletHome } from "../../WalletHome"
import { PhoneScreenProps } from "../../interfaces"
import { FALLBACK_ETH_PRICE, USD_RECEIVE_AMOUNT } from "./constants"
import { defaultTokenBalances } from "../../constants"
import { useEthPrice } from "../../../../hooks/useEthPrice"

export const SendReceive: React.FC<PhoneScreenProps> = ({ nav, ctaLabel }) => {
  const { progressStepper, step } = nav
  const fetchedPrice = useEthPrice()
  const ethPrice = fetchedPrice > 1 ? fetchedPrice : FALLBACK_ETH_PRICE
  const ethReceiveAmount = USD_RECEIVE_AMOUNT / ethPrice
  const [chosenAmount, setChosenAmount] = useState<number>(0)

  useEffect(() => {
    if (step !== 2) return
    // Reset chosen amount if user goes back to step 2
    setChosenAmount(0)
  }, [step])

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
      {[4].includes(step) && <SendFromContacts nav={nav} />}
      {[5].includes(step) && (
        <SendSummary chosenAmount={chosenAmount} ethPrice={ethPrice} />
      )}
      {[6].includes(step) && <Success />}
      {[1, 3, 5].includes(step) && (
        <ProgressCta
          isAnimated={step === 0}
          isDisabled={step === 3 && !chosenAmount}
          progressStepper={progressStepper}
        >
          {ctaLabel}
        </ProgressCta>
      )}
    </>
  )
}
