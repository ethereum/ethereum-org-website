import { useState } from "react"

import { Image } from "@/components/Image"
import { Button, ButtonLink } from "@/components/ui/buttons/Button"
import Checkbox from "@/components/ui/checkbox"
import { Tag } from "@/components/ui/tag"

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
            onClick={() => setHasWallet(!hasWallet)}
          >
            <Checkbox className="size-6 [&_svg]:text-xl" checked={hasWallet} />
            <p>I have a wallet.</p>
          </div>
          <Button disabled={!hasWallet} onClick={handleNext}>
            Next
          </Button>
        </div>
      </div>
      <div className="flex w-full flex-1 flex-col gap-8">
        <div className="flex flex-col overflow-hidden rounded-2xl border shadow-window-box">
          {newToCryptoWallets.map((wallet) => (
            <div
              key={wallet.name}
              className="flex cursor-pointer flex-col gap-4 border-b border-body-light bg-background p-6 last:border-b-0 hover:bg-background-highlight"
              onClick={() => {
                window.open(wallet.url, "_blank")
              }}
            >
              <div className="flex flex-col items-center justify-between gap-2 sm:flex-row">
                <div className="flex w-full max-w-[200px] flex-row items-center gap-4">
                  <div>
                    <Image
                      src={wallet.image}
                      alt={wallet.name}
                      width={30}
                      height={30}
                    />
                  </div>
                  <p className="text-body-medium">{wallet.name}</p>
                </div>
                <ButtonLink
                  href={wallet.url}
                  variant="outline"
                  isSecondary
                  size="sm"
                  className="w-full sm:w-auto"
                >
                  Get wallet
                </ButtonLink>
              </div>
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-8 lg:hidden">
          <div
            className="group flex cursor-pointer flex-row items-center gap-2 hover:text-primary-hover"
            onClick={() => setHasWallet(!hasWallet)}
          >
            <Checkbox className="size-6 [&_svg]:text-xl" checked={hasWallet} />
            <p>I have a wallet.</p>
          </div>
          <Button disabled={!hasWallet} onClick={handleNext}>
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}

export default DownloadAWallet
