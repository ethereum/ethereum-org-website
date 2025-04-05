import React from "react"

import { Button } from "@/components/ui/buttons/Button"
import { Flex, HStack } from "@/components/ui/flex"

import { cn } from "@/lib/utils/cn"

import { EthTokenIcon } from "../../icons"
import { NotificationPopover } from "../../NotificationPopover"

type SendEtherProps = {
  ethPrice: number
  ethBalance: number
  chosenAmount: number
  setChosenAmount: (amount: number) => void
}
export const SendEther = ({
  ethPrice,
  ethBalance,
  chosenAmount,
  setChosenAmount,
}: SendEtherProps) => {
  const formatDollars = (amount: number): string =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      notation: "compact",
    }).format(amount)

  const usdAmount = formatDollars(ethPrice * ethBalance)

  const ethAmount = new Intl.NumberFormat("en", {
    maximumFractionDigits: 5,
  }).format(ethBalance)

  const maxUsdAmount = ethPrice * ethBalance

  const handleSelection = (amount: number): void => {
    if (amount === maxUsdAmount) {
      setChosenAmount(maxUsdAmount)
      return
    }
    setChosenAmount(amount)
  }

  const AMOUNTS: Array<number> = [5, 10, 20, maxUsdAmount]
  const formatButtonLabel = (amount: number): string => {
    if (amount === maxUsdAmount) return "Max"
    return formatDollars(amount)
  }
  const formatChosenAmount = new Intl.NumberFormat("en", {
    style: "currency",
    currency: "USD",
    notation: "compact",
    maximumFractionDigits: 0,
  }).format(chosenAmount)

  return (
    <div className="h-full">
      <div className="px-6 py-8">
        <p className="mb-4 text-xl font-bold md:mb-6 md:text-2xl">Send</p>
        <p className="md:mb-6">How much do you want to send?</p>
      </div>
      <Flex className="justify-between gap-4 border-y border-background-highlight px-6 py-4 text-xs text-body-medium md:py-6">
        {/* Left side: Displayed send amount */}
        <NotificationPopover
          title="Example walkthrough"
          content="Choose a value below"
          side="top"
        >
          <Flex
            className={cn(
              "font-bold",
              chosenAmount > 0 ? "text-body" : "text-disabled"
            )}
          >
            <p className="h-full text-6xl leading-[1em]">
              {formatChosenAmount}
            </p>
          </Flex>
        </NotificationPopover>
        {/* Right side */}
        <Flex className="flex-col items-end">
          <NotificationPopover
            side="top"
            title="Example walkthrough"
            content="In this walkthrough you can only send ETH, but in real wallet you can send different tokens as well"
          >
            {/* Token selector pill */}
            <HStack className="mb-4 gap-0 rounded-full bg-body-light px-2 py-1">
              {/* TODO: remove flags and `size` class when icon is migrated */}
              <EthTokenIcon className="!me-1.5 !size-[1em] !text-xl" />
              <p className="m-0 font-bold text-body">ETH</p>
            </HStack>
          </NotificationPopover>
          {/* Balances */}
          <p className="font-bold leading-none">Balance: {usdAmount}</p>
          <p>
            <>{ethAmount} ETH</>
          </p>
        </Flex>
      </Flex>
      <div className="h-full bg-background-highlight">
        <Flex className="relative flex-nowrap justify-between bg-background-highlight p-6 font-bold">
          {/* Amount buttons */}
          {AMOUNTS.map((amount, i) => (
            <Button
              key={i}
              onClick={() => handleSelection(amount)}
              className={cn(
                "rounded-[10px] text-sm font-bold uppercase",
                amount === chosenAmount ? "bg-primary-hover" : "bg-primary"
              )}
            >
              {formatButtonLabel(amount)}
            </Button>
          ))}
        </Flex>
      </div>
    </div>
  )
}
