import { memo, useMemo } from "react"
import { useTranslations } from "next-intl"

import type { ChainName } from "@/lib/types"

import ChainImages from "@/components/ChainImages"
import { DevicesIcon, LanguagesIcon } from "@/components/icons/wallets"
import { Image } from "@/components/Image"
import { SupportedLanguagesTooltip } from "@/components/SupportedLanguagesTooltip"
import { ButtonLink } from "@/components/ui/buttons/Button"
import { LinkBox, LinkOverlay } from "@/components/ui/link-box"
import { TagsInlineText } from "@/components/ui/tag"

import type { CatalogWallet, WalletDeviceId } from "@/lib/utils/walletData"

import { NUMBER_OF_SUPPORTED_LANGUAGES_SHOWN } from "@/lib/constants"

import WalletPersonaTags from "./WalletPersonaTags"

const DEVICE_LABEL_KEYS: Record<WalletDeviceId, string> = {
  desktop: "page-find-wallet-desktop",
  mobile: "page-find-wallet-mobile",
  browser: "page-find-wallet-browser",
  hardware: "page-find-wallet-hardware",
}

const WalletCard = memo(function WalletCard({
  wallet,
}: {
  wallet: CatalogWallet
}) {
  const t = useTranslations("page-wallets-find-wallet")

  const deviceLabels = useMemo(
    () =>
      (Object.keys(wallet.devices) as WalletDeviceId[])
        .filter((device) => wallet.devices[device])
        .map((device) => t(DEVICE_LABEL_KEYS[device])),
    [wallet.devices, t]
  )

  const formattedLanguages = wallet.supportedLanguages
    .slice(0, NUMBER_OF_SUPPORTED_LANGUAGES_SHOWN)
    .join(", ")
  const hasExtraLanguages =
    wallet.supportedLanguages.length > NUMBER_OF_SUPPORTED_LANGUAGES_SHOWN

  return (
    // content-visibility lets the browser skip layout/paint of off-screen cards
    // while keeping them in the server HTML for crawlers.
    <div className="[contain-intrinsic-size:auto_200px] [content-visibility:auto]">
      <LinkBox className="flex h-full flex-col gap-4 rounded-xl border p-4 transition-colors hover:bg-background-highlight">
        <div className="grid grid-cols-[auto_1fr] items-start gap-x-4 gap-y-2">
          <Image
            src={wallet.image}
            alt=""
            className="size-10 self-center object-contain"
          />
          <LinkOverlay
            href={`/wallets/find-wallet/${wallet.slug}/`}
            className="self-center text-lg font-bold text-body no-underline hover:text-body"
            matomoEvent={{
              eventCategory: "find-wallet",
              eventAction: "expanded",
              eventName: wallet.name,
            }}
          >
            {wallet.name}
          </LinkOverlay>

          {wallet.personas.length > 0 && (
            <div className="col-span-2">
              <WalletPersonaTags personas={wallet.personas} />
            </div>
          )}

          {wallet.descriptionStripped && (
            <p className="col-span-2 line-clamp-2 text-sm text-body-medium">
              {wallet.descriptionStripped}
            </p>
          )}

          <div className="col-span-2">
            <ChainImages
              chains={wallet.supported_chains as ChainName[]}
              nested
            />
          </div>

          {deviceLabels.length > 0 && (
            <div className="col-span-2 flex flex-row gap-2">
              <DevicesIcon className="size-5 shrink-0" />
              <TagsInlineText list={deviceLabels} />
            </div>
          )}

          <div className="col-span-2 flex flex-row gap-2">
            <LanguagesIcon className="size-5 shrink-0" />
            <p className="text-sm">
              {formattedLanguages}{" "}
              {hasExtraLanguages && (
                <SupportedLanguagesTooltip
                  supportedLanguages={wallet.supportedLanguages}
                />
              )}
            </p>
          </div>
        </div>

        <div className="mt-auto">
          <ButtonLink
            href={wallet.url}
            variant="outline"
            size="sm"
            className="w-full p-2"
            customEventOptions={{
              eventCategory: "WalletExternalLinkList",
              eventAction: "Tap main button",
              eventName: wallet.name,
            }}
          >
            {t("page-find-wallet-visit-website")}
          </ButtonLink>
        </div>
      </LinkBox>
    </div>
  )
})

export default WalletCard
