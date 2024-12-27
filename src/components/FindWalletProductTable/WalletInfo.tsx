import { useTranslation } from "next-i18next"
import { IoChevronDownSharp, IoChevronUpSharp } from "react-icons/io5"

import { Wallet } from "@/lib/types"

import { ButtonLink } from "@/components/Buttons"
import { SupportedLanguagesTooltip } from "@/components/FindWalletProductTable/SupportedLanguagesTooltip"
import { DevicesIcon, LanguagesIcon } from "@/components/icons/wallets"
import { TwImage } from "@/components/Image"
import Tooltip from "@/components/Tooltip"
import { Badge } from "@/components/ui/badge"

import { formatStringList, getWalletPersonas } from "@/lib/utils/wallets"

import { ethereumNetworkData, layer2Data } from "@/data/networks/networks"

interface WalletInfoProps {
  wallet: Wallet
  isExpanded: boolean
}

const WalletInfo = ({ wallet, isExpanded }: WalletInfoProps) => {
  const { t } = useTranslation("page-wallets-find-wallet")
  const walletPersonas = getWalletPersonas(wallet)
  const deviceLabels: Array<string> = []

  wallet.ios && deviceLabels.push(t("page-find-wallet-iOS"))
  wallet.android && deviceLabels.push(t("page-find-wallet-android"))
  wallet.linux && deviceLabels.push(t("page-find-wallet-linux"))
  wallet.windows && deviceLabels.push(t("page-find-wallet-windows"))
  wallet.macOS && deviceLabels.push(t("page-find-wallet-macOS"))
  wallet.chromium && deviceLabels.push(t("page-find-wallet-chromium"))
  wallet.firefox && deviceLabels.push(t("page-find-wallet-firefox"))
  wallet.hardware && deviceLabels.push(t("page-find-wallet-hardware"))

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-row items-center justify-between gap-4">
        <div className="flex flex-col gap-4">
          <div className="hidden flex-row gap-4 lg:flex">
            <TwImage
              src={wallet.image}
              alt=""
              style={{ objectFit: "contain", width: "56px", height: "56px" }}
            />
            <div className="flex flex-col gap-2">
              <p className="text-xl font-bold">{wallet.name}</p>
              {walletPersonas.length > 0 && (
                <div className="flex flex-row flex-wrap gap-1">
                  {walletPersonas.map((persona) => (
                    <Badge key={persona} variant="productTable">
                      {t(persona)}
                    </Badge>
                  ))}
                </div>
              )}
              <div
                className={`ml-2 mt-1 flex flex-row ${
                  walletPersonas.length === 0 ? "mb-4" : ""
                }`}
              >
                {wallet.supported_chains.map((chain) => {
                  const chainData = [ethereumNetworkData, ...layer2Data].find(
                    (l2) => l2.chainName === chain
                  )
                  return (
                    <div
                      key={chain}
                      className="-ml-1.5 overflow-hidden rounded-full"
                    >
                      <Tooltip content={chainData?.name || ""}>
                        <TwImage
                          src={chainData?.logo || ""}
                          alt=""
                          className="rounded-full"
                          style={{
                            objectFit: "contain",
                            width: "24px",
                            height: "24px",
                          }}
                        />
                      </Tooltip>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4 lg:hidden">
            <div className="flex flex-row items-center gap-4">
              <TwImage
                src={wallet.image}
                alt=""
                style={{ objectFit: "contain", width: "24px", height: "24px" }}
              />
              <p className="text-xl font-bold">{wallet.name}</p>
            </div>
            <div>
              {walletPersonas.length > 0 && (
                <div className="flex flex-row flex-wrap gap-1">
                  {walletPersonas.map((persona) => (
                    <Badge key={persona} variant="productTable">
                      {t(persona)}
                    </Badge>
                  ))}
                </div>
              )}
            </div>
            <div
              className={`ml-2 flex flex-row ${
                walletPersonas.length === 0 ? "mb-4" : ""
              }`}
            >
              {wallet.supported_chains.map((chain) => {
                const chainData = [ethereumNetworkData, ...layer2Data].find(
                  (l2) => l2.chainName === chain
                )
                return (
                  <div
                    key={chain}
                    className="-ml-1.5 overflow-hidden rounded-full"
                  >
                    <Tooltip content={chainData?.name || ""}>
                      <TwImage
                        src={chainData?.logo || ""}
                        alt=""
                        className="rounded-full"
                        style={{
                          objectFit: "contain",
                          width: "24px",
                          height: "24px",
                        }}
                      />
                    </Tooltip>
                  </div>
                )
              })}
            </div>
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
                  <DevicesIcon />
                  <p className="text-md">{deviceLabels.join(" · ")}</p>
                </div>
              )}
              <div className="flex flex-row gap-2">
                <LanguagesIcon />
                <p className="text-md">
                  {formatStringList(wallet.supportedLanguages, 5)}{" "}
                  <SupportedLanguagesTooltip
                    supportedLanguages={wallet.supportedLanguages}
                  />
                </p>
              </div>
            </div>
          </div>
        </div>
        <div>
          <button className="text-primary">
            {isExpanded ? (
              <IoChevronUpSharp size={24} />
            ) : (
              <IoChevronDownSharp size={24} />
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
            w={{ base: "full", sm: "auto" }}
            isExternal
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

export default WalletInfo
