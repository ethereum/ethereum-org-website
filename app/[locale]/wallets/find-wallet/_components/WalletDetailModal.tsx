"use client"

import { Info, X } from "lucide-react"
import type { ReactNode } from "react"

import type { ChainName } from "@/lib/types"

import ChainImages, { getRenderableChains } from "@/components/ChainImages"
import { CheckCircle } from "@/components/icons/CheckCircle"
import Discord from "@/components/icons/discord.svg"
import Twitter from "@/components/icons/twitter.svg"
import { XCircle } from "@/components/icons/XCircle"
import { Image } from "@/components/Image"
import { SupportedLanguagesTooltip } from "@/components/SupportedLanguagesTooltip"
import Tooltip from "@/components/Tooltip"
import { ButtonLink } from "@/components/ui/buttons/Button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog-modal"
import InlineLink, { LinkWithArrow } from "@/components/ui/Link"

import { cn } from "@/lib/utils/cn"
import type { CatalogWalletCard } from "@/lib/utils/walletData"

import { getDeviceLabels, type WalletDeviceId } from "@/data/wallets/devices"

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

const DetailRow = ({
  label,
  tooltip,
  roomyLabel,
  children,
}: {
  label: string
  tooltip?: string
  /** Floors the label width; only where label and value are both long. */
  roomyLabel?: boolean
  children: ReactNode
}) => (
  <div className="flex items-center justify-between gap-4 rounded-lg bg-background-highlight px-4 py-3">
    <div
      className={cn(
        "flex items-center gap-1.5 text-sm text-body-medium",
        roomyLabel && "min-w-[35%]"
      )}
    >
      <span>{label}</span>
      {tooltip && (
        <Tooltip nested content={<p className="text-body">{tooltip}</p>}>
          <Info className="size-4 shrink-0" />
        </Tooltip>
      )}
    </div>
    <div className="min-w-0 text-end text-sm">{children}</div>
  </div>
)

/**
 * Client-side detail modal fed from the card payload; the standalone
 * `[wallet]` page stays the linkable, crawlable version. Composes the dialog
 * primitives directly, rather than the `Modal` wrapper, to keep the close
 * button in the same row as the title.
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

  const shownLanguages = wallet.supportedLanguages
    .slice(0, LANGUAGES_SHOWN)
    .join(" · ")
  const hasExtraLanguages = wallet.supportedLanguages.length > LANGUAGES_SHOWN

  return (
    <Dialog
      open
      size="lg"
      onOpenChange={(open) => {
        if (!open) onClose()
      }}
    >
      <DialogContent
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
        {...(description ? {} : { "aria-describedby": undefined })}
      >
        {description && (
          <DialogDescription className="sr-only">
            {description}
          </DialogDescription>
        )}
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Image
              src={wallet.image}
              alt=""
              className="size-14 shrink-0 object-contain"
            />
            <DialogTitle className="mt-0 text-h3">{wallet.name}</DialogTitle>
          </div>
          <DialogClose
            aria-label={labels.close}
            className="flex size-8 shrink-0 items-center justify-center rounded transition-colors hover:text-primary-hover"
          >
            <X size="20" />
          </DialogClose>
        </div>

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
                <span className="font-bold text-body">
                  {shownLanguages}{" "}
                  {hasExtraLanguages && (
                    <SupportedLanguagesTooltip
                      supportedLanguages={wallet.supportedLanguages}
                      shown={LANGUAGES_SHOWN}
                    />
                  )}
                </span>
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
      </DialogContent>
    </Dialog>
  )
}

export default WalletDetailModal
