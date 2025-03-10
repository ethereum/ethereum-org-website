import { useState } from "react"

import { Image } from "@/components/Image"
import { Button, ButtonLink } from "@/components/ui/buttons/Button"
import Checkbox from "@/components/ui/checkbox"
import { Tag } from "@/components/ui/tag"

import { trackCustomEvent } from "@/lib/utils/matomo"
import { getNewToCryptoWallets } from "@/lib/utils/wallets"

const DownloadAWallet = ({
  handleNext,
  stepIndex,
  totalSteps,
}: {
  handleNext: () => void
  stepIndex: number
  totalSteps: number
}) => {
  const [hasWallet, setHasWallet] = useState(false)
  const newToCryptoWallets = getNewToCryptoWallets()

  return (
    <div className="flex flex-col items-center gap-8 lg:flex-row lg:gap-24">
      <div className="flex flex-1 flex-col gap-14">
        <div className="flex flex-col gap-5">
          <div>
            <Tag status="tag">
              {stepIndex} / {totalSteps}
            </Tag>
          </div>
          <h2 className="text-3xl font-bold">Download a wallet</h2>
          <p>
            Wallet is an app that allows you to receive, send cryptocurrencies
            and manage your Ethereum account.
          </p>
        </div>
        <div className="hidden flex-col gap-8 lg:flex">
          <div
            className="group flex cursor-pointer flex-row items-center gap-2 hover:text-primary-hover"
            onClick={() => {
              setHasWallet(!hasWallet)
              trackCustomEvent({
                eventCategory: "start page",
                eventAction: "wallet checkbox",
                eventName: "I have a wallet",
              })
            }}
          >
            <Checkbox className="size-6 [&_svg]:text-xl" checked={hasWallet} />
            <p>I have a wallet.</p>
          </div>
          <Button
            disabled={!hasWallet}
            className="w-fit px-10"
            onClick={() => {
              handleNext()
              trackCustomEvent({
                eventCategory: "start page",
                eventAction: "next step",
                eventName: "Continue from 1",
              })
            }}
          >
            Continue
          </Button>
        </div>
      </div>
      <div className="flex w-full flex-1 flex-col gap-8">
        <div className="flex flex-col overflow-hidden rounded-2xl border shadow-window-box">
          {newToCryptoWallets.map((wallet) => (
            <div
              key={wallet.name}
              className="flex cursor-pointer flex-col gap-4 border-b border-body-light bg-background p-4 last:border-b-0 hover:bg-background-highlight sm:p-6"
              onClick={() => {
                window.open(wallet.url, "_blank")
                trackCustomEvent({
                  eventCategory: "start page",
                  eventAction: "get wallet",
                  eventName: wallet.name,
                })
              }}
            >
              <div className="flex flex-row items-center justify-between gap-2">
                <div className="flex w-full max-w-[200px] flex-row items-center gap-4">
                  <div>
                    <Image
                      src={wallet.image}
                      alt={wallet.name}
                      width={30}
                      height={30}
                    />
                  </div>
                  <p className="text-body">{wallet.name}</p>
                </div>
                <ButtonLink href={wallet.url} variant="outline" size="sm">
                  Get wallet
                </ButtonLink>
              </div>
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-8 lg:hidden">
          <div
            className="group flex cursor-pointer flex-row items-center gap-2 hover:text-primary-hover"
            onClick={() => {
              setHasWallet(!hasWallet)
              trackCustomEvent({
                eventCategory: "start page",
                eventAction: "wallet checkbox",
                eventName: "I have a wallet",
              })
            }}
          >
            <Checkbox className="size-6 [&_svg]:text-xl" checked={hasWallet} />
            <p>I have a wallet.</p>
          </div>
          <Button
            disabled={!hasWallet}
            className="w-full px-10 lg:w-fit"
            onClick={() => {
              handleNext()
              trackCustomEvent({
                eventCategory: "start page",
                eventAction: "next step",
                eventName: "Continue from 1",
              })
            }}
          >
            Continue
          </Button>
        </div>
      </div>
    </div>
  )
}

export default DownloadAWallet
