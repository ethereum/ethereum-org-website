import React, { useEffect, useMemo, useState } from "react"
import { SimulatorStateProps } from "../interfaces"
import { ProgressCta, WalletHome } from "../"
import { ReceiveEther, SendEther, SendFromContacts } from "./SendReceive/index"
import { defaultTokenBalances } from "../data"
import { TokenBalance } from "../Wallet/interfaces"
import axios from "axios"

const FALLBACK_ETH_PRICE = 1600 as const

export const SendReceive: React.FC<SimulatorStateProps> = ({ state }) => {
  const { step } = state
  const [ethPrice, setEthPrice] = useState<number>(0)
  const [chosenAmount, setChosenAmount] = useState<number>(0)

  useEffect(() => {
    if (step !== 2) return
    setChosenAmount(0)
  }, [step])

  useEffect(() => {
    ;(async () => {
      try {
        const response = await axios.get(
          "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd"
        )
        if (
          response.status !== 200 ||
          !response.data ||
          !response.data.ethereum
        )
          throw new Error(
            "Unable to fetch ETH price from CoinGecko, using fallback"
          )
        const currentPriceUSD = response.data.ethereum.usd
        setEthPrice(currentPriceUSD)
      } catch (error) {
        console.error(error)
        setEthPrice(FALLBACK_ETH_PRICE)
      }
    })()
  }, [])

  const USD_RECEIVE_AMOUNT = 500 as const
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
  return (
    <>
      {[0].includes(step) && (
        <WalletHome state={state} isEnabled={[false, true]} />
      )}
      {[1].includes(step) && <ReceiveEther />}
      {[2].includes(step) && (
        <WalletHome
          state={state}
          isEnabled={[true, false]}
          tokenBalances={tokensWithEthBalance}
        />
      )}
      {[3].includes(step) && (
        <SendEther
          chosenAmount={chosenAmount}
          setChosenAmount={setChosenAmount}
        />
      )}
      {[4].includes(step) && <SendFromContacts state={state} />}
      {[1, 3, 5].includes(step) && (
        <ProgressCta state={state} isDisabled={step === 3 && !chosenAmount} />
      )}
    </>
  )
}
