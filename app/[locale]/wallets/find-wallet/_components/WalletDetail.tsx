import { Info } from "lucide-react"
import { getTranslations } from "next-intl/server"

import type { ChainName, Lang } from "@/lib/types"

import ChainImages from "@/components/ChainImages"
import Discord from "@/components/icons/discord.svg"
import {
  GreenCheckProductGlyph,
  WarningProductGlyph,
} from "@/components/icons/staking"
import Twitter from "@/components/icons/twitter.svg"
import { Image } from "@/components/Image"
import Tooltip from "@/components/Tooltip"
import { ButtonLink } from "@/components/ui/buttons/Button"
import { Tag } from "@/components/ui/tag"

import { getLocaleFormattedDate } from "@/lib/utils/date"
import type { CatalogWallet, WalletDeviceId } from "@/lib/utils/walletData"

import {
  WALLET_FEATURE_GROUPS,
  type WalletFeature,
} from "@/data/wallets/features"
import { PERSONA_TAG_STATUS, PERSONA_TITLE_KEYS } from "@/data/wallets/personas"

const DEVICE_LABEL_KEYS: Record<WalletDeviceId, string> = {
  desktop: "page-find-wallet-desktop",
  mobile: "page-find-wallet-mobile",
  browser: "page-find-wallet-browser",
  hardware: "page-find-wallet-hardware",
}

const WALLET_LINK_EVENT = {
  eventCategory: "WalletExternalLinkList",
  eventAction: "Go to wallet",
} as const

/**
 * Standalone wallet-detail body for the `[wallet]` route. Mirrors the developer
 * tools detail layout (thumbnail + info column with tags, title, meta, and an
 * action-link row) and adds the wallet-specific grouped feature checklists. The
 * intercepting modal renders its own compact layout (`InterceptedWalletDetail`).
 */
const WalletDetail = async ({
  locale,
  wallet,
}: {
  locale: string
  wallet: CatalogWallet
}) => {
  const t = await getTranslations({
    locale,
    namespace: "page-wallets-find-wallet",
  })

  const deviceLabels = (Object.keys(wallet.devices) as WalletDeviceId[])
    .filter((device) => wallet.devices[device])
    .map((device) => t(DEVICE_LABEL_KEYS[device]))

  const lastUpdated = getLocaleFormattedDate(
    locale as Lang,
    wallet.last_updated
  )

  const renderFeature = (feature: WalletFeature) => {
    const supported = Boolean(wallet[feature.key])
    return (
      <li key={feature.key} className="mb-2 flex flex-row gap-2">
        <span className="translate-y-0.5">
          {supported ? (
            <GreenCheckProductGlyph className="size-4" />
          ) : (
            <WarningProductGlyph className="size-4" />
          )}
        </span>
        <p className={supported ? "text-body" : "text-disabled"}>
          {t(feature.labelKey)}
          <Tooltip
            nested
            content={<p className="text-body">{t(feature.descKey)}</p>}
          >
            <Info className="ms-1 inline size-[0.875em] translate-y-0.5" />
          </Tooltip>
        </p>
      </li>
    )
  }

  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col gap-6 lg:flex-row lg:gap-10">
        <Image
          src={wallet.image}
          alt=""
          className="size-16 shrink-0 rounded-xl object-contain xl:size-32"
        />
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            {wallet.personas.length > 0 && (
              <div className="flex flex-row flex-wrap gap-1">
                {wallet.personas.map((persona) => (
                  <Tag
                    key={persona}
                    variant="subtle"
                    status={PERSONA_TAG_STATUS[persona]}
                    size="small"
                  >
                    {t(PERSONA_TITLE_KEYS[persona])}
                  </Tag>
                ))}
              </div>
            )}

            <h1 className="mt-0">{wallet.name}</h1>

            {deviceLabels.length > 0 && (
              <p className="text-sm text-body-medium">
                {deviceLabels.join(" · ")}
              </p>
            )}

            {wallet.supported_chains.length > 0 && (
              <ChainImages
                chains={wallet.supported_chains as ChainName[]}
                nested
              />
            )}

            {wallet.supportedLanguages.length > 0 && (
              <p className="text-sm text-body-medium">
                {wallet.supportedLanguages.join(", ")}
              </p>
            )}
          </div>

          <div className="flex flex-wrap gap-2">
            <ButtonLink
              href={wallet.url}
              className="w-fit"
              customEventOptions={{
                ...WALLET_LINK_EVENT,
                eventAction: "Tap main button",
                eventName: wallet.name,
              }}
            >
              {t("page-find-wallet-visit-website")}
            </ButtonLink>
            {wallet.twitter && (
              <ButtonLink
                href={wallet.twitter}
                variant="outline"
                hideArrow
                className="flex w-fit"
                customEventOptions={{
                  ...WALLET_LINK_EVENT,
                  eventName: `Twitter: ${wallet.name}`,
                }}
              >
                <Twitter className="!size-5" />
                <span>Twitter</span>
              </ButtonLink>
            )}
            {wallet.discord && (
              <ButtonLink
                href={wallet.discord}
                variant="outline"
                hideArrow
                className="flex w-fit"
                customEventOptions={{
                  ...WALLET_LINK_EVENT,
                  eventName: `Discord: ${wallet.name}`,
                }}
              >
                <Discord className="!size-5" />
                <span>Discord</span>
              </ButtonLink>
            )}
          </div>
        </div>
      </div>

      {wallet.descriptionStripped && (
        <p className="max-w-3xl text-body-medium">
          {wallet.descriptionStripped}
        </p>
      )}

      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {WALLET_FEATURE_GROUPS.map((group) => (
          <div key={group.titleKey}>
            <h3 className="mb-2 text-md">{t(group.titleKey)}</h3>
            <ul className="m-0 list-none">
              {[...group.features]
                .sort(
                  (a, b) =>
                    Number(Boolean(wallet[b.key])) -
                    Number(Boolean(wallet[a.key]))
                )
                .map(renderFeature)}
            </ul>
          </div>
        ))}
      </div>

      <p className="text-body-medium italic">
        {`${wallet.name} ${t("page-find-wallet-info-updated-on")} ${lastUpdated}`}
      </p>
    </div>
  )
}

export default WalletDetail
