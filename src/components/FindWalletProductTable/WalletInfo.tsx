import { memo, useMemo } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"

import type { ChainName, Wallet } from "@/lib/types"

import { ChainImages } from "@/components/ChainImages"
import { DevicesIcon, LanguagesIcon } from "@/components/icons/wallets"
import { Image } from "@/components/Image"
import { SupportedLanguagesTooltip } from "@/components/SupportedLanguagesTooltip"
import { Tag } from "@/components/ui/tag"

import { formatStringList, getWalletPersonas } from "@/lib/utils/wallets"

import { NUMBER_OF_SUPPORTED_LANGUAGES_SHOWN } from "@/lib/constants"

import { ButtonLink } from "../ui/buttons/Button"

import { useTranslation } from "@/hooks/useTranslation"

interface WalletInfoProps {
  wallet: Wallet
  isExpanded: boolean
}

const WalletInfo = ({ wallet, isExpanded }: WalletInfoProps) => {
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

  const deviceLabelsText = useMemo(() => {
    return deviceLabels.join(" · ")
  }, [deviceLabels])

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

  const PersonaTags = useMemo(() => {
    if (walletPersonas.length === 0) return null

    return (
      <div className="flex flex-row flex-wrap gap-1">
        {walletPersonas.map((persona) => (
          <Tag key={persona} variant="high-contrast" size="small">
            {t(persona)}
          </Tag>
        ))}
      </div>
    )
  }, [walletPersonas, t])

  const ChainImagesComponent = useMemo(() => {
    return (
      <ChainImages
        chains={wallet.supported_chains as ChainName[]}
        className={`ml-2 ${walletPersonas.length === 0 ? "mb-4" : ""}`}
      />
    )
  }, [wallet.supported_chains, walletPersonas.length])

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-row items-center justify-between gap-4">
        <div className="flex flex-col gap-4">
          {/* Desktop layout */}
          <div className="hidden flex-row gap-4 lg:flex">
            <Image
              src={wallet.image}
              alt=""
              style={{ objectFit: "contain", width: "56px", height: "56px" }}
            />
            <div className="flex flex-col gap-2">
              <p className="text-xl font-bold">{wallet.name}</p>
              {PersonaTags}
              <div
                className={`ml-2 ${walletPersonas.length === 0 ? "mb-4" : ""} mt-1`}
              >
                {ChainImagesComponent}
              </div>
            </div>
          </div>

          {/* Mobile layout */}
          <div className="flex flex-col gap-4 lg:hidden">
            <div className="flex flex-row items-center gap-4">
              <Image
                src={wallet.image}
                alt=""
                style={{ objectFit: "contain", width: "24px", height: "24px" }}
              />
              <p className="text-xl font-bold">{wallet.name}</p>
            </div>
            {PersonaTags && <div>{PersonaTags}</div>}
            {ChainImagesComponent}
          </div>

          <div className="flex flex-row gap-4">
            <div className="relative hidden w-14 lg:block">
              <div
                className={`${isExpanded ? "block" : "hidden"} absolute -bottom-9 -top-0 left-1/2 w-1 -translate-x-1/2 transform ${wallet.twBackgroundColor}`}
              />
            </div>
            <div
              className={`flex flex-col gap-2 ${walletPersonas.length === 0 ? "-mt-4" : ""}`}
            >
              {deviceLabels.length > 0 && (
                <div className="flex flex-row gap-2">
                  <DevicesIcon className="size-6" />
                  <p className="text-md">{deviceLabelsText}</p>
                </div>
              )}
              <div className="flex flex-row gap-2">
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
          </div>
        </div>
        <div>
          <button className="text-primary">
            {isExpanded ? (
              <ChevronUp className="text-2xl" />
            ) : (
              <ChevronDown className="text-2xl" />
            )}
          </button>
        </div>
      </div>
      <div className="flex flex-row gap-4">
        <div className="relative hidden w-14 lg:block">
          <div
            className={`${isExpanded ? "block" : "hidden"} absolute -bottom-9 -top-0 left-1/2 w-1 -translate-x-1/2 transform ${wallet.twBackgroundColor}`}
          />
        </div>
        <div className="flex flex-1">
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
          >
            {t("page-find-wallet-visit-website")}
          </ButtonLink>
        </div>
      </div>
    </div>
  )
}

export default memo(WalletInfo)
