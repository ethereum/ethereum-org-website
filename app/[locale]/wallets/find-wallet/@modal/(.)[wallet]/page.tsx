import { notFound } from "next/navigation"
import { getTranslations } from "next-intl/server"

import type { ChainName, Lang } from "@/lib/types"

import CatalogDetailModal from "@/components/CatalogDetailModal"
import DetailRow from "@/components/CatalogDetailModal/DetailRow"
import FullDetailsLink from "@/components/CatalogDetailModal/FullDetailsLink"
import ChainImages, { getRenderableChains } from "@/components/ChainImages"
import { CheckCircle } from "@/components/icons/CheckCircle"
import Discord from "@/components/icons/discord.svg"
import Twitter from "@/components/icons/twitter.svg"
import { XCircle } from "@/components/icons/XCircle"
import { SupportedLanguagesTooltip } from "@/components/SupportedLanguagesTooltip"
import { ButtonLink } from "@/components/ui/buttons/Button"
import InlineLink from "@/components/ui/Link"

import { getWalletBySlug } from "@/lib/utils/walletData"
import { formatWalletFees } from "@/lib/utils/wallets"

import { buildDeviceLabels, getDeviceLabels } from "@/data/wallets/devices"
import { CROPS_PROPERTIES } from "@/data/wallets/features"

import { getPathname } from "@/i18n/navigation"

type ModalParams = { locale: string; wallet: string }

const LANGUAGES_SHOWN = 5

// Without this the interceptor is uncacheable and re-renders on every modal
// open; the standalone `[wallet]` page already sets it.
export const revalidate = false

/**
 * Shown as a modal when navigated to from inside the find-wallet subtree; a
 * direct load or refresh renders the standalone `[wallet]` page instead. Body
 * is server-rendered and passed to the client shell as children.
 */
export default async function InterceptedWalletModal(props: {
  params: Promise<ModalParams>
}) {
  const { locale, wallet: walletSlug } = await props.params

  const wallet = getWalletBySlug(walletSlug, locale)
  if (!wallet) notFound()

  const t = await getTranslations({
    locale,
    namespace: "page-wallets-find-wallet",
  })
  const tCommon = await getTranslations({ locale, namespace: "common" })

  const deviceLabels = getDeviceLabels(wallet.devices, buildDeviceLabels(t))
  const chains = getRenderableChains(wallet.supported_chains as ChainName[])

  const detailHref = getPathname({
    href: `/wallets/find-wallet/${wallet.slug}/`,
    locale: locale as Lang,
  })

  const shownLanguages = wallet.supportedLanguages
    .slice(0, LANGUAGES_SHOWN)
    .join(" · ")
  const hasExtraLanguages = wallet.supportedLanguages.length > LANGUAGES_SHOWN

  return (
    <CatalogDetailModal
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
          {chains.length > 0 && (
            <DetailRow label={t("page-find-wallet-network-support")}>
              <ChainImages
                chains={chains}
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

          {wallet.fees?.length ? (
            <DetailRow
              label={t("page-find-wallet-fee-row-label")}
              tooltip={t("page-find-wallet-fee-row-tooltip")}
              roomyLabel
            >
              <span className="font-bold text-body">
                {formatWalletFees(wallet.fees, locale, t)}
              </span>
            </DetailRow>
          ) : null}

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
                    <CheckCircle className="my-0 shrink-0" />
                    {tCommon("yes")}
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 font-bold text-error">
                    <XCircle className="my-0 shrink-0" />
                    {tCommon("no")}
                  </span>
                )}
              </DetailRow>
            )
          })}

          {/* Belongs with the rows it extends: these properties are a summary
              of the full feature set. */}
          <FullDetailsLink
            href={detailHref}
            label={t("page-find-wallet-full-details")}
          />
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
    </CatalogDetailModal>
  )
}
