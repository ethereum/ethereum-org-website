"use client"

import { memo } from "react"

import { Image } from "@/components/Image"
import { LinkBox, LinkOverlay } from "@/components/ui/link-box"

import type { CatalogWalletCard } from "@/lib/utils/walletData"

import { getDeviceLabels, type WalletDeviceId } from "@/data/wallets/devices"
import type { WalletPersonaId } from "@/data/wallets/personas"

import WalletLanguages from "./WalletLanguages"
import WalletPersonaTags from "./WalletPersonaTags"

// Deliberately lower than the shared NUMBER_OF_SUPPORTED_LANGUAGES_SHOWN — the
// compact card fits fewer; the rest collapse into the "+ N" tooltip.
const LANGUAGES_SHOWN = 2

type WalletCardProps = {
  wallet: CatalogWalletCard
  deviceLabels: Record<WalletDeviceId, string>
  personaLabels: Record<WalletPersonaId, string>
  /** When set, a plain click opens the modal instead of following the link. */
  onOpen?: (slug: string) => void
}

const WalletCard = memo(function WalletCard({
  wallet,
  deviceLabels,
  personaLabels,
  onOpen,
}: WalletCardProps) {
  const deviceList = getDeviceLabels(wallet.devices, deviceLabels)

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
            // Real link for crawlers and modifier-clicks; no prefetch, or the
            // grid would warm 49 detail routes nobody navigates to.
            prefetch={false}
            className="text-lg font-bold text-body no-underline hover:text-body"
            customEventOptions={{
              eventCategory: "find-wallet",
              eventAction: "open_wallet_modal",
              eventName: wallet.name,
            }}
            onClick={(event) => {
              const modified =
                event.metaKey || event.ctrlKey || event.shiftKey || event.altKey
              if (!onOpen || event.button !== 0 || modified) return
              event.preventDefault()
              onOpen(wallet.slug)
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
              <WalletLanguages
                languages={wallet.supportedLanguages}
                localeLanguage={wallet.localeLanguage}
                shown={LANGUAGES_SHOWN}
              />
            </p>
            {wallet.fees && <p>{wallet.fees}</p>}
          </div>
        </div>
      </LinkBox>
    </div>
  )
})

export default WalletCard
