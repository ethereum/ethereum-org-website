import { useState } from "react"
import { useTranslations } from "next-intl"

import { Wallet } from "@/lib/types"

import { Image } from "@/components/Image"
import { Button, ButtonLink } from "@/components/ui/buttons/Button"
import Checkbox from "@/components/ui/checkbox"
import InlineLink from "@/components/ui/Link"
import { LinkBox, LinkOverlay } from "@/components/ui/link-box"
import { Tag } from "@/components/ui/tag"

import { trackCustomEvent } from "@/lib/utils/matomo"

const DownloadAWallet = ({
  handleNext,
  stepIndex,
  totalSteps,
  newToCryptoWallets,
}: {
  handleNext: () => void
  stepIndex: number
  totalSteps: number
  newToCryptoWallets: Wallet[]
}) => {
  const [hasWallet, setHasWallet] = useState(false)
  const t = useTranslations("page-start")

  return (
    <div className="flex flex-col items-center gap-8 lg:flex-row lg:gap-24">
      <div className="flex flex-1 flex-col gap-14">
        <div className="flex flex-col gap-5">
          <div>
            <Tag status="tag">
              {stepIndex} / {totalSteps}
            </Tag>
          </div>
          <h2 className="text-3xl font-bold">
            {t("page-start-download-wallet-title")}
          </h2>
          <p>{t("page-start-download-wallet-description")}</p>
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
            <p>{t("page-start-download-wallet-checkbox")}</p>
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
            {t("page-start-download-wallet-continue")}
          </Button>
        </div>
      </div>
      <div className="flex w-full flex-1 flex-col gap-8">
        <div className="flex flex-col overflow-hidden rounded-2xl border shadow-window-box">
          {newToCryptoWallets.map((wallet) => (
            <LinkBox
              key={wallet.name}
              className="flex flex-col gap-4 border-b border-body-light bg-background p-4 last:border-b-0 hover:bg-background-highlight sm:p-6"
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
                  <p>
                    <LinkOverlay
                      className="text-body no-underline hover:text-body"
                      asChild
                    >
                      <InlineLink
                        href={wallet.url}
                        hideArrow
                        onClick={() => {
                          trackCustomEvent({
                            eventCategory: "start page",
                            eventAction: "get wallet",
                            eventName: wallet.name,
                          })
                        }}
                      >
                        {wallet.name}
                      </InlineLink>
                    </LinkOverlay>
                  </p>
                </div>

                <ButtonLink href={wallet.url} variant="outline" size="sm">
                  {t("page-start-download-wallet-get-wallet")}
                </ButtonLink>
              </div>
            </LinkBox>
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
            <p>{t("page-start-download-wallet-checkbox")}</p>
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
            {t("page-start-download-wallet-continue")}
          </Button>
        </div>
      </div>
    </div>
  )
}

export default DownloadAWallet
