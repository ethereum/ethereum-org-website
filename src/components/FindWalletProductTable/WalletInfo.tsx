import { memo, useMemo } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"

import type { ChainName, Wallet } from "@/lib/types"

import ChainImages from "@/components/ChainImages"
import { DevicesIcon, LanguagesIcon } from "@/components/icons/wallets"
import { Image } from "@/components/Image"
import { SupportedLanguagesTooltip } from "@/components/SupportedLanguagesTooltip"

import { formatStringList, getWalletPersonas } from "@/lib/utils/wallets"

import { NUMBER_OF_SUPPORTED_LANGUAGES_SHOWN } from "@/lib/constants"

import { ButtonLink } from "../ui/buttons/Button"
import { TagsInlineText } from "../ui/tag"

import PersonaTags from "./PersonaTags"

import { useTranslation } from "@/hooks/useTranslation"

interface WalletInfoProps {
  wallet: Wallet
}

const WalletInfo = ({ wallet }: WalletInfoProps) => {
  const { t } = useTranslation("page-wallets-find-wallet")

  const walletPersonas = useMemo(() => {
    return getWalletPersonas(wallet)
  }, [wallet])

  const deviceLabels = useMemo(() => {
    const labels: Array<string> = []
    if (wallet.ios) labels.push(t("page-find-wallet-iOS"))
    if (wallet.android) labels.push(t("page-find-wallet-android"))
    if (wallet.linux) labels.push(t("page-find-wallet-linux"))
    if (wallet.windows) labels.push(t("page-find-wallet-windows"))
    if (wallet.macOS) labels.push(t("page-find-wallet-macOS"))
    if (wallet.chromium) labels.push(t("page-find-wallet-chromium"))
    if (wallet.firefox) labels.push(t("page-find-wallet-firefox"))
    if (wallet.hardware) labels.push(t("page-find-wallet-hardware"))
    return labels
  }, [wallet, t])

  const formattedLanguages = useMemo(() => {
    return formatStringList(
      wallet.supportedLanguages,
      NUMBER_OF_SUPPORTED_LANGUAGES_SHOWN
    )
  }, [wallet.supportedLanguages])

  const hasExtraLanguages = useMemo(() => {
    return (
      wallet.supportedLanguages.length > NUMBER_OF_SUPPORTED_LANGUAGES_SHOWN
    )
  }, [wallet.supportedLanguages])

  return (
    <div className="relative flex flex-col gap-4">
      {/* Open-state stripe (desktop only), sits in the image-column gutter. */}
      <div
        aria-hidden
        className={`pointer-events-none absolute top-14 -bottom-9 left-7 hidden w-1 -translate-x-1/2 lg:group-[[open]]/collapsible:block ${wallet.twBackgroundColor}`}
      />

      <div className="flex flex-row items-center justify-between gap-4">
        <div className="grid flex-1 grid-cols-[auto_1fr] items-start gap-x-4 gap-y-2">
          <Image
            src={wallet.image}
            alt=""
            className="size-6 self-center object-contain lg:row-span-full lg:size-14 lg:self-start"
          />

          <p className="self-center text-xl font-bold lg:self-start">
            {wallet.name}
          </p>

          {walletPersonas.length > 0 && (
            <div className="col-span-2 lg:col-span-1 lg:col-start-2">
              <PersonaTags walletPersonas={walletPersonas} />
            </div>
          )}

          <div className="col-span-2 lg:col-span-1 lg:col-start-2">
            <ChainImages chains={wallet.supported_chains as ChainName[]} />
          </div>

          {deviceLabels.length > 0 && (
            <div className="col-span-2 flex flex-row gap-2 lg:col-span-1 lg:col-start-2">
              <DevicesIcon className="size-6" />
              <TagsInlineText list={deviceLabels} />
            </div>
          )}

          <div className="col-span-2 flex flex-row gap-2 lg:col-span-1 lg:col-start-2">
            <LanguagesIcon className="size-6" />
            <p className="text-md">
              {formattedLanguages}{" "}
              {hasExtraLanguages && (
                <SupportedLanguagesTooltip
                  supportedLanguages={wallet.supportedLanguages}
                />
              )}
            </p>
          </div>
        </div>

        <span className="text-primary">
          <ChevronUp className="text-2xl group-[&:not([open])]/collapsible:hidden" />
          <ChevronDown className="text-2xl group-[[open]]/collapsible:hidden" />
        </span>
      </div>

      <div className="lg:ps-18">
        <ButtonLink
          href={wallet.url}
          variant="outline"
          className="p-2 max-sm:w-full"
          size="sm"
          customEventOptions={{
            eventCategory: "WalletExternalLinkList",
            eventAction: "Tap main button",
            eventName: `${wallet.name}`,
          }}
          onClick={(e) => {
            // Prevent expanding the wallet more info section when clicking on the "Visit website" button
            e.stopPropagation()
          }}
        >
          {t("page-find-wallet-visit-website")}
        </ButtonLink>
      </div>
    </div>
  )
}

export default memo(WalletInfo)
