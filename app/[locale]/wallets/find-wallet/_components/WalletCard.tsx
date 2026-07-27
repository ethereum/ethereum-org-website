"use client"

import { memo } from "react"

import { Image } from "@/components/Image"
import { SupportedLanguagesTooltip } from "@/components/SupportedLanguagesTooltip"
import { LinkBox, LinkOverlay } from "@/components/ui/link-box"

import type { CatalogWalletCard } from "@/lib/utils/walletData"

import { getDeviceLabels, type WalletDeviceId } from "@/data/wallets/devices"
import type { WalletPersonaId } from "@/data/wallets/personas"

import WalletPersonaTags from "./WalletPersonaTags"

// Card shows only the first couple languages inline; the rest collapse into the
// "+ N" tooltip chip. Local (not the shared NUMBER_OF_SUPPORTED_LANGUAGES_SHOWN)
// because the compact card wants fewer than the app-detail page.
const LANGUAGES_SHOWN = 2

type WalletCardProps = {
  wallet: CatalogWalletCard
  /** Pre-localized label dicts, built once on the server. */
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
    // content-visibility lets the browser skip layout/paint of off-screen cards
    // while keeping them in the server HTML for crawlers.
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
                // Lift above the LinkOverlay's ::before so the tooltip is
                // hoverable; the rest of the card stays a click target.
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
