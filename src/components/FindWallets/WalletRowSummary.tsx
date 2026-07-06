import { ChevronDown, ChevronUp, ExternalLink } from "lucide-react"
import { getTranslations } from "next-intl/server"

import type { ChainName, WalletRow } from "@/lib/types"

import { DevicesIcon, LanguagesIcon } from "@/components/icons/wallets"
import { Image } from "@/components/Image"

import { cn } from "@/lib/utils/cn"
import { formatStringList, getWalletPersonas } from "@/lib/utils/wallets"

import { appOnlyNetworks } from "@/data/networks/app-networks"
import { ethereumNetworkData, layer2Data } from "@/data/networks/networks"

import { NUMBER_OF_SUPPORTED_LANGUAGES_SHOWN } from "@/lib/constants"

import { buttonVariants } from "../ui/buttons/button-variants"
import { Tag, TagsInlineText } from "../ui/tag"

import { chainTooltipId, walletLanguagesTooltipId } from "./tooltip-ids"

const networkData = [ethereumNetworkData, ...layer2Data, ...appOnlyNetworks]

const ChainImagesStatic = ({ chains }: { chains: ChainName[] }) => (
  <div className="flex flex-row">
    {chains.map((chain) => {
      const chainData = networkData.find(
        (network) => network.chainName === chain
      )
      if (!chainData) return null
      return (
        <button
          key={chain}
          type="button"
          data-tooltip-ref={chainTooltipId(chain)}
          aria-describedby={chainTooltipId(chain)}
          className="inline-flex h-6 items-center justify-center overflow-hidden rounded-full leading-none"
        >
          <Image
            src={chainData.logo || ""}
            alt={`${chain} blockchain network`}
            className="block rounded-full"
            placeholder="empty"
            style={{ objectFit: "contain", width: "24px", height: "24px" }}
          />
        </button>
      )
    })}
  </div>
)

const WalletRowSummary = async ({
  wallet,
  index,
}: {
  wallet: WalletRow
  index: number
}) => {
  const t = await getTranslations("page-wallets-find-wallet")

  const walletPersonas = getWalletPersonas(wallet)

  const deviceLabels: string[] = []
  if (wallet.ios) deviceLabels.push(t("page-find-wallet-iOS"))
  if (wallet.android) deviceLabels.push(t("page-find-wallet-android"))
  if (wallet.linux) deviceLabels.push(t("page-find-wallet-linux"))
  if (wallet.windows) deviceLabels.push(t("page-find-wallet-windows"))
  if (wallet.macOS) deviceLabels.push(t("page-find-wallet-macOS"))
  if (wallet.chromium) deviceLabels.push(t("page-find-wallet-chromium"))
  if (wallet.firefox) deviceLabels.push(t("page-find-wallet-firefox"))
  if (wallet.hardware) deviceLabels.push(t("page-find-wallet-hardware"))

  const formattedLanguages = formatStringList(
    wallet.supportedLanguages,
    NUMBER_OF_SUPPORTED_LANGUAGES_SHOWN
  )
  const extraLanguagesCount =
    wallet.supportedLanguages.length - NUMBER_OF_SUPPORTED_LANGUAGES_SHOWN

  return (
    <div className="relative flex flex-col gap-4">
      {/* Open-state stripe (desktop only), sits in the image-column gutter. */}
      <div
        aria-hidden
        className={`pointer-events-none absolute inset-s-7 top-16 -bottom-9 hidden w-1 -translate-x-1/2 lg:group-[[open]]/collapsible:block rtl:translate-x-1/2 ${wallet.twBackgroundColor}`}
      />

      <div className="flex flex-row items-center justify-between gap-4">
        <div className="grid flex-1 grid-cols-[auto_1fr] items-start gap-x-4 gap-y-2">
          <Image
            src={wallet.image}
            alt=""
            className="size-6 self-center object-contain lg:row-span-2 lg:size-14 lg:self-start"
          />

          <p className="self-center text-xl font-bold lg:self-start">
            {wallet.name}
          </p>

          {walletPersonas.length > 0 && (
            <div className="col-span-2 lg:col-span-1 lg:col-start-2">
              <div className="flex flex-row flex-wrap gap-1">
                {walletPersonas.map((personaKey) => (
                  <Tag key={personaKey} variant="high-contrast" size="small">
                    {t(personaKey)}
                  </Tag>
                ))}
              </div>
            </div>
          )}

          <div className="col-span-2 lg:col-span-1 lg:col-start-2">
            <ChainImagesStatic
              chains={wallet.supported_chains as ChainName[]}
            />
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
              {extraLanguagesCount > 0 && (
                <>
                  <button
                    type="button"
                    data-tooltip-ref={walletLanguagesTooltipId(index)}
                    aria-describedby={walletLanguagesTooltipId(index)}
                    className="text-md font-normal text-primary"
                  >
                    + {extraLanguagesCount}
                  </button>
                  <span id={walletLanguagesTooltipId(index)} hidden>
                    {formatStringList(
                      wallet.supportedLanguages.slice(
                        NUMBER_OF_SUPPORTED_LANGUAGES_SHOWN
                      )
                    )}
                  </span>
                </>
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
        <a
          href={wallet.url}
          target="_blank"
          rel="noopener noreferrer"
          data-matomo={JSON.stringify({
            eventCategory: "WalletExternalLinkList",
            eventAction: "Tap main button",
            eventName: wallet.name,
          })}
          className={cn(
            buttonVariants({ variant: "outline", size: "sm" }),
            "no-underline hover:no-underline [&_[data-label='arrow']]:ms-0",
            "relative p-2 max-sm:w-full"
          )}
        >
          {t("page-find-wallet-visit-website")}
          <span className="sr-only select-none">
            &nbsp;(opens in a new tab)
          </span>
          <ExternalLink
            data-label="arrow"
            className="ms-1 mb-0.5! inline-block size-[0.875em] max-h-4 max-w-4 shrink-0 rtl:-scale-x-100"
          />
        </a>
      </div>
    </div>
  )
}

export default WalletRowSummary
