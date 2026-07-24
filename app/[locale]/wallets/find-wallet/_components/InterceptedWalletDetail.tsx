import { Info } from "lucide-react"
import { notFound } from "next/navigation"
import { getTranslations } from "next-intl/server"
import type { ReactNode } from "react"

import type { ChainName } from "@/lib/types"

import ChainImages from "@/components/ChainImages"
import Discord from "@/components/icons/discord.svg"
import { GreenCheckProductGlyph } from "@/components/icons/staking"
import Twitter from "@/components/icons/twitter.svg"
import { SupportedLanguagesTooltip } from "@/components/SupportedLanguagesTooltip"
import Tooltip from "@/components/Tooltip"
import { ButtonLink } from "@/components/ui/buttons/Button"
import InlineLink from "@/components/ui/Link"

import { getWalletBySlug } from "@/lib/utils/walletData"

import { buildDeviceLabels, getDeviceLabels } from "@/data/wallets/devices"
import { CROPS_PROPERTIES } from "@/data/wallets/features"

import WalletDetailModal from "./WalletDetailModal"

// How many languages to list inline in the value cell before the "+ N" tooltip.
const LANGUAGES_SHOWN = 5

/** A single label/value row in the modal's info list. */
const DetailRow = ({
  label,
  tooltip,
  children,
}: {
  label: string
  tooltip?: string
  children: ReactNode
}) => (
  <div className="flex items-center justify-between gap-4 rounded-lg bg-background-highlight px-4 py-3">
    <div className="flex items-center gap-1.5 text-sm text-body-medium">
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
 * Server body for the intercepting modal slot: the compact, row-based wallet
 * detail rendered inside the client modal shell (`WalletDetailModal`). The
 * standalone `[wallet]` route has its own wider, grouped-checklist layout
 * (`WalletDetail`). Every info dimension is a labelled row: networks as chain
 * glyphs, devices/languages as text, and each feature as a yes/no value.
 */
const InterceptedWalletDetail = async ({
  locale,
  walletSlug,
}: {
  locale: string
  walletSlug: string
}) => {
  const wallet = getWalletBySlug(walletSlug, locale)
  if (!wallet) notFound()

  const t = await getTranslations({
    locale,
    namespace: "page-wallets-find-wallet",
  })
  const tCommon = await getTranslations({ locale, namespace: "common" })

  const deviceLabels = getDeviceLabels(wallet.devices, buildDeviceLabels(t))

  const shownLanguages = wallet.supportedLanguages
    .slice(0, LANGUAGES_SHOWN)
    .join(" · ")
  const hasExtraLanguages = wallet.supportedLanguages.length > LANGUAGES_SHOWN

  return (
    <WalletDetailModal
      title={wallet.name}
      image={wallet.image}
      description={wallet.descriptionStripped}
      closeLabel={tCommon("close")}
    >
      <div className="flex flex-col gap-6">
        {wallet.descriptionStripped && (
          <p className="text-body-medium">{wallet.descriptionStripped}</p>
        )}

        <div className="flex flex-col gap-2">
          {wallet.supported_chains.length > 0 && (
            <DetailRow label={t("page-find-wallet-network-support")}>
              <ChainImages
                chains={wallet.supported_chains as ChainName[]}
                className="flex-wrap justify-end gap-1"
                nested
              />
            </DetailRow>
          )}

          {deviceLabels.length > 0 && (
            <DetailRow label={t("page-find-wallet-device")}>
              <span className="font-bold text-body">
                {deviceLabels.join(" · ")}
              </span>
            </DetailRow>
          )}

          {wallet.supportedLanguages.length > 0 && (
            <DetailRow label={t("page-find-wallet-languages-supported")}>
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

          {CROPS_PROPERTIES.map((feature) => {
            const supported = Boolean(wallet[feature.key])
            return (
              <DetailRow
                key={feature.key}
                label={t(feature.labelKey)}
                tooltip={t(feature.descKey)}
              >
                {supported ? (
                  <span className="inline-flex items-center gap-1.5 font-bold text-success">
                    <GreenCheckProductGlyph className="size-4 shrink-0" />
                    {tCommon("yes")}
                  </span>
                ) : (
                  <span className="font-bold text-error">{tCommon("no")}</span>
                )}
              </DetailRow>
            )
          })}
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
            {t("page-find-wallet-get-wallet", { wallet: wallet.name })}
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
    </WalletDetailModal>
  )
}

export default InterceptedWalletDetail
