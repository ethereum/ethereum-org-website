"use client"

import type { ChainName } from "@/lib/types"

import CatalogDetailModal from "@/components/CatalogDetailModal"
import DetailRow from "@/components/CatalogDetailModal/DetailRow"
import ChainImages, { getRenderableChains } from "@/components/ChainImages"
import { CheckCircle } from "@/components/icons/CheckCircle"
import Discord from "@/components/icons/discord.svg"
import Twitter from "@/components/icons/twitter.svg"
import { XCircle } from "@/components/icons/XCircle"
import { ButtonLink } from "@/components/ui/buttons/Button"
import InlineLink, { LinkWithArrow } from "@/components/ui/Link"

import type { CatalogWalletCard } from "@/lib/utils/walletData"

import { getDeviceLabels, type WalletDeviceId } from "@/data/wallets/devices"

import WalletLanguages from "./WalletLanguages"

const LANGUAGES_SHOWN = 5

/** Built on the server so no i18n runtime ships to the browser. */
export type WalletModalLabels = {
  close: string
  yes: string
  no: string
  networkSupport: string
  device: string
  languages: string
  fees: string
  feesTooltip: string
  fullDetails: string
  /** Raw message with a `{wallet}` placeholder. */
  getWallet: string
  /** CROPS rows, in display order; `key` is matched against `advancedFlags`. */
  crops: { key: string; label: string; tooltip: string }[]
}

/**
 * Client-side detail modal fed from the card payload; the standalone
 * `[wallet]` page stays the linkable, crawlable version.
 */
const WalletDetailModal = ({
  wallet,
  labels,
  deviceLabels: deviceLabelMap,
  onClose,
}: {
  wallet: CatalogWalletCard
  labels: WalletModalLabels
  deviceLabels: Record<WalletDeviceId, string>
  onClose: () => void
}) => {
  const deviceLabels = getDeviceLabels(wallet.devices, deviceLabelMap)
  const chains = getRenderableChains(wallet.supported_chains as ChainName[])
  const description = wallet.descriptionStripped

  return (
    <CatalogDetailModal
      title={wallet.name}
      image={wallet.image}
      description={description}
      closeLabel={labels.close}
      onClose={onClose}
      // Radix aims focus at whatever was focused when the dialog mounted,
      // which lands on the body here; put the visitor back on the card.
      onCloseAutoFocus={(event) => {
        const card = document.querySelector<HTMLElement>(
          `a[href$="/wallets/find-wallet/${wallet.slug}/"]`
        )
        if (!card) return
        event.preventDefault()
        card.focus()
      }}
    >
      <div className="flex flex-col gap-6">
        {description && <p className="text-body-medium">{description}</p>}

        <div className="flex flex-col gap-2">
          {chains.length > 0 && (
            <DetailRow label={labels.networkSupport}>
              <ChainImages
                chains={chains}
                className="flex-wrap justify-end gap-1"
                nested
              />
            </DetailRow>
          )}

          {deviceLabels.length > 0 && (
            <DetailRow label={labels.device}>
              <span className="font-bold text-body">
                {deviceLabels.join(" · ")}
              </span>
            </DetailRow>
          )}

          {wallet.supportedLanguages.length > 0 && (
            <DetailRow label={labels.languages}>
              <WalletLanguages
                languages={wallet.supportedLanguages}
                localeLanguage={wallet.localeLanguage}
                shown={LANGUAGES_SHOWN}
              />
            </DetailRow>
          )}

          {wallet.fees && (
            <DetailRow
              label={labels.fees}
              tooltip={labels.feesTooltip}
              roomyLabel
            >
              <span className="font-bold text-body">{wallet.fees}</span>
            </DetailRow>
          )}

          {labels.crops.map((feature) => {
            const supported = (wallet.advancedFlags as string[]).includes(
              feature.key
            )
            return (
              <DetailRow
                key={feature.key}
                label={feature.label}
                tooltip={feature.tooltip}
              >
                {supported ? (
                  <span className="inline-flex items-center gap-1.5 font-bold text-success">
                    <CheckCircle className="my-0 shrink-0" />
                    {labels.yes}
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 font-bold text-error">
                    <XCircle className="my-0 shrink-0" />
                    {labels.no}
                  </span>
                )}
              </DetailRow>
            )
          })}

          <LinkWithArrow
            href={`/wallets/find-wallet/${wallet.slug}/`}
            className="mt-1 self-end text-sm"
          >
            {labels.fullDetails}
          </LinkWithArrow>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4">
          <ButtonLink
            href={wallet.url}
            variant="solid"
            className="w-fit"
            customEventOptions={{
              eventCategory: "WalletExternalLinkList",
              eventAction: "Tap main button",
              eventName: wallet.name,
            }}
          >
            {labels.getWallet.replace("{wallet}", wallet.name)}
          </ButtonLink>

          <div className="flex flex-row items-center gap-2">
            {wallet.discord && (
              <InlineLink
                href={wallet.discord}
                hideArrow
                className="flex size-10 items-center justify-center rounded-lg border transition-colors hover:bg-background-highlight"
                customEventOptions={{
                  eventCategory: "WalletExternalLinkList",
                  eventAction: "Go to wallet",
                  eventName: `Discord: ${wallet.name}`,
                }}
              >
                <Discord className="size-5 text-[#5865F2]" />
              </InlineLink>
            )}
            {wallet.twitter && (
              <InlineLink
                href={wallet.twitter}
                hideArrow
                className="flex size-10 items-center justify-center rounded-lg border transition-colors hover:bg-background-highlight"
                customEventOptions={{
                  eventCategory: "WalletExternalLinkList",
                  eventAction: "Go to wallet",
                  eventName: `Twitter: ${wallet.name}`,
                }}
              >
                <Twitter className="size-5 text-body" />
              </InlineLink>
            )}
          </div>
        </div>
      </div>
    </CatalogDetailModal>
  )
}

export default WalletDetailModal
