import { Globe, Info } from "lucide-react"
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
import InlineLink from "@/components/ui/Link"
import { Tag } from "@/components/ui/tag"

import { getLocaleFormattedDate } from "@/lib/utils/date"
import type { CatalogWallet, WalletDeviceId } from "@/lib/utils/walletData"

import {
  WALLET_FEATURE_GROUPS,
  type WalletFeature,
} from "@/data/wallets/features"
import { PERSONA_TITLE_KEYS } from "@/data/wallets/personas"

const DEVICE_LABEL_KEYS: Record<WalletDeviceId, string> = {
  desktop: "page-find-wallet-desktop",
  mobile: "page-find-wallet-mobile",
  browser: "page-find-wallet-browser",
  hardware: "page-find-wallet-hardware",
}

type WalletDetailProps = {
  locale: string
  wallet: CatalogWallet
  /** `page` = full standalone route; `modal` = compact intercepted dialog. */
  variant?: "page" | "modal"
}

/**
 * Shared wallet-detail body used by both the standalone `[wallet]` route and
 * the intercepting modal (grouped feature checklists, socials, last-updated).
 */
const WalletDetail = async ({
  locale,
  wallet,
  variant = "page",
}: WalletDetailProps) => {
  const t = await getTranslations({
    locale,
    namespace: "page-wallets-find-wallet",
  })

  const Heading = variant === "page" ? "h1" : "h2"

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
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-4">
        <div className="flex flex-row items-center gap-4">
          <Image
            src={wallet.image}
            alt=""
            className="size-14 shrink-0 object-contain"
          />
          <Heading className="mt-0 text-h3">{wallet.name}</Heading>
        </div>

        {wallet.personas.length > 0 && (
          <div className="flex flex-row flex-wrap gap-1">
            {wallet.personas.map((persona) => (
              <Tag key={persona} variant="high-contrast" size="small">
                {t(PERSONA_TITLE_KEYS[persona])}
              </Tag>
            ))}
          </div>
        )}

        {wallet.descriptionStripped && (
          <p className="text-body-medium">{wallet.descriptionStripped}</p>
        )}

        <ChainImages chains={wallet.supported_chains as ChainName[]} nested />

        {deviceLabels.length > 0 && (
          <p className="text-sm text-body-medium">{deviceLabels.join(" · ")}</p>
        )}

        <p className="text-sm text-body-medium">
          {wallet.supportedLanguages.join(", ")}
        </p>

        <ButtonLink
          href={wallet.url}
          variant="outline"
          size="sm"
          className="w-fit"
          customEventOptions={{
            eventCategory: "WalletExternalLinkList",
            eventAction: "Tap main button",
            eventName: wallet.name,
          }}
        >
          {t("page-find-wallet-visit-website")}
        </ButtonLink>
      </div>

      <div
        className={
          variant === "page"
            ? "grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3"
            : "grid grid-cols-1 gap-6 sm:grid-cols-2"
        }
      >
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

      <div className="flex flex-col gap-2">
        <h3 className="text-md">{t("page-find-wallet-social-links")}</h3>
        <div className="flex flex-row gap-4">
          <InlineLink
            href={wallet.url}
            hideArrow
            className="flex h-6 items-center"
            customEventOptions={{
              eventCategory: "WalletExternalLinkList",
              eventAction: "Go to wallet",
              eventName: `Website: ${wallet.name}`,
            }}
          >
            <Globe className="text-2xl text-primary" />
          </InlineLink>
          {wallet.discord && (
            <InlineLink
              href={wallet.discord}
              hideArrow
              className="flex h-6 items-center"
              customEventOptions={{
                eventCategory: "WalletExternalLinkList",
                eventAction: "Go to wallet",
                eventName: `Discord: ${wallet.name}`,
              }}
            >
              <Discord className="text-2xl text-[#7289da]" />
            </InlineLink>
          )}
          {wallet.twitter && (
            <InlineLink
              href={wallet.twitter}
              hideArrow
              className="flex h-6 items-center"
              customEventOptions={{
                eventCategory: "WalletExternalLinkList",
                eventAction: "Go to wallet",
                eventName: `Twitter: ${wallet.name}`,
              }}
            >
              <Twitter className="text-2xl text-[#1da1f2]" />
            </InlineLink>
          )}
        </div>
      </div>

      <p className="text-body-medium italic">
        {`${wallet.name} ${t("page-find-wallet-info-updated-on")} ${lastUpdated}`}
      </p>
    </div>
  )
}

export default WalletDetail
