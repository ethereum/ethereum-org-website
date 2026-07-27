import { Info } from "lucide-react"
import { notFound } from "next/navigation"
import { getTranslations, setRequestLocale } from "next-intl/server"

import type { ChainName, Lang, PageParams } from "@/lib/types"

import ChainImages from "@/components/ChainImages"
import ContentFeedback from "@/components/ContentFeedback"
import Discord from "@/components/icons/discord.svg"
import {
  GreenCheckProductGlyph,
  WarningProductGlyph,
} from "@/components/icons/staking"
import Twitter from "@/components/icons/twitter.svg"
import { Image } from "@/components/Image"
import MainArticle from "@/components/MainArticle"
import Tooltip from "@/components/Tooltip"
import { ButtonLink } from "@/components/ui/buttons/Button"

import { getLocaleFormattedDate } from "@/lib/utils/date"
import { getMetadata } from "@/lib/utils/metadata"
import { getCatalogWallets, getWalletBySlug } from "@/lib/utils/walletData"

import { buildDeviceLabels, getDeviceLabels } from "@/data/wallets/devices"
import {
  WALLET_FEATURE_GROUPS,
  type WalletFeature,
} from "@/data/wallets/features"
import { buildPersonaLabels } from "@/data/wallets/personas"

import { DEFAULT_LOCALE } from "@/lib/constants"

import FindWalletBreadcrumbs from "../_components/FindWalletBreadcrumbs"
import WalletPersonaTags from "../_components/WalletPersonaTags"

import WalletDetailPageJsonLD from "./page-jsonld"

// Repo-checked-in data, deploy-coupled: render once on demand, cache durably,
// invalidate at next deploy.
export const revalidate = false
export const dynamicParams = true

type WalletPageParams = PageParams & { wallet: string }

const WALLET_LINK_EVENT = {
  eventCategory: "WalletExternalLinkList",
  eventAction: "Go to wallet",
} as const

/**
 * Standalone wallet detail. Mirrors the developer tools detail layout
 * (thumbnail + info column with tags, title, meta, and an action-link row) and
 * adds the wallet-specific grouped feature checklists. Reached by direct load or
 * refresh; navigating here from within the find-wallet subtree is intercepted by
 * `@modal/(.)[wallet]`, which renders its own compact, row-based layout.
 */
const Page = async (props: { params: Promise<WalletPageParams> }) => {
  const { locale, wallet: walletSlug } = await props.params
  setRequestLocale(locale)

  const wallet = getWalletBySlug(walletSlug, locale)
  if (!wallet) notFound()

  const t = await getTranslations({
    locale,
    namespace: "page-wallets-find-wallet",
  })

  const deviceLabels = getDeviceLabels(wallet.devices, buildDeviceLabels(t))
  const personaLabels = buildPersonaLabels(t)

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
    <>
      <WalletDetailPageJsonLD locale={locale} wallet={wallet} />
      {/* Breadcrumb sits outside <main>, matching the catalog page inset. */}
      <div className="px-page py-hero lg:py-hero-2x">
        <FindWalletBreadcrumbs locale={locale} leaf={wallet.name} />
      </div>

      <main className="px-page pb-page">
        <MainArticle className="max-w-5xl">
          <div className="flex flex-col gap-10">
            <div className="flex flex-col gap-6 lg:flex-row lg:gap-10">
              <Image
                src={wallet.image}
                alt=""
                className="size-16 shrink-0 rounded-xl object-contain xl:size-32"
              />
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <WalletPersonaTags
                    personas={wallet.personas}
                    labels={personaLabels}
                  />

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
        </MainArticle>
        <ContentFeedback />
      </main>
    </>
  )
}

export function generateStaticParams() {
  // Prebuild English wallet pages; other locales render on demand.
  return getCatalogWallets(DEFAULT_LOCALE).map((wallet) => ({
    locale: DEFAULT_LOCALE,
    wallet: wallet.slug,
  }))
}

export async function generateMetadata(props: {
  params: Promise<WalletPageParams>
}) {
  const { locale, wallet: walletSlug } = await props.params
  setRequestLocale(locale)

  const wallet = getWalletBySlug(walletSlug, locale)
  if (!wallet) return {}

  return await getMetadata({
    locale,
    slug: ["wallets", "find-wallet", walletSlug],
    title: wallet.name,
    description: wallet.descriptionStripped?.slice(0, 160) ?? wallet.name,
    image: "/images/wallets/wallet-hero.png",
  })
}

export default Page
