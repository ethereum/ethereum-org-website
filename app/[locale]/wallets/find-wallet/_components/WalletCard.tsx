"use client"

import { memo } from "react"

import { Image } from "@/components/Image"
import { SupportedLanguagesTooltip } from "@/components/SupportedLanguagesTooltip"
import { LinkBox, LinkOverlay } from "@/components/ui/link-box"

import type { CatalogWalletCard } from "@/lib/utils/walletData"

import { getDeviceLabels, type WalletDeviceId } from "@/data/wallets/devices"
import type { WalletPersonaId } from "@/data/wallets/personas"

import WalletPersonaTags from "./WalletPersonaTags"

// Deliberately lower than the shared NUMBER_OF_SUPPORTED_LANGUAGES_SHOWN — the
// compact card fits fewer; the rest collapse into the "+ N" tooltip.
const LANGUAGES_SHOWN = 2

type WalletCardProps = {
  wallet: CatalogWalletCard
  deviceLabels: Record<WalletDeviceId, string>
  personaLabels: Record<WalletPersonaId, string>
}

const WalletCard = memo(function WalletCard({
  wallet,
  deviceLabels,
  personaLabels,
}: WalletCardProps) {
  const deviceList = getDeviceLabels(wallet.devices, deviceLabels)

  const formattedLanguages = wallet.supportedLanguages
    .slice(0, LANGUAGES_SHOWN)
    .join(" · ")
  const hasExtraLanguages = wallet.supportedLanguages.length > LANGUAGES_SHOWN

  return (
    // Skips layout/paint of off-screen cards without dropping them from the HTML.
    <div className="[contain-intrinsic-size:auto_120px] [content-visibility:auto]">
      <LinkBox className="flex flex-row items-start gap-3 rounded-xl p-3 transition-colors hover:bg-background-highlight">
        <Image
          src={wallet.image}
          alt=""
          className="size-14 shrink-0 rounded-lg object-contain"
        />
        <div className="flex min-w-0 flex-col gap-1">
          <LinkOverlay
            href={`/wallets/find-wallet/${wallet.slug}/`}
            className="text-lg font-bold text-body no-underline hover:text-body"
            matomoEvent={{
              eventCategory: "find-wallet",
              eventAction: "expanded",
              eventName: wallet.name,
            }}
          >
            {wallet.name}
          </LinkOverlay>

          <WalletPersonaTags
            personas={wallet.personas}
            labels={personaLabels}
          />

          <div className="space-y-0.5 text-sm text-body-medium">
            {deviceList.length > 0 && <p>{deviceList.join(" · ")}</p>}
            <p>
              <span className="font-semibold text-body">
                {formattedLanguages}
              </span>{" "}
              {hasExtraLanguages && (
                // Lift above the LinkOverlay's ::before so the tooltip is hoverable.
                <span className="relative z-10">
                  <SupportedLanguagesTooltip
                    supportedLanguages={wallet.supportedLanguages}
                    shown={LANGUAGES_SHOWN}
                  />
                </span>
              )}
            </p>
          </div>
        </div>
      </LinkBox>
    </div>
  )
})

export default WalletCard
