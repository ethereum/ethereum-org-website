import { Info } from "lucide-react"
import { notFound } from "next/navigation"
import { getTranslations, setRequestLocale } from "next-intl/server"

import type { CatalogItem, ChainName, PageParams } from "@/lib/types"

import CatalogItemLayout, {
  CatalogItemLanguages,
  RelatedCatalogItems,
} from "@/components/CatalogItem"
import { CheckCircle } from "@/components/icons/CheckCircle"
import { XCircle } from "@/components/icons/XCircle"
import Tooltip from "@/components/Tooltip"

import { formatTimeAgo } from "@/lib/utils/date"
import { getMetadata } from "@/lib/utils/metadata"
import {
  buildWalletMetaDescription,
  type CatalogWallet,
  getNextWallet,
  getRelatedWallets,
  getWalletBySlug,
  getWalletSlug,
  getWalletSocialLinks,
  toCatalogCard,
} from "@/lib/utils/walletData"
import { formatWalletFees } from "@/lib/utils/wallets"

import { buildDeviceLabels, getDeviceLabels } from "@/data/wallets/devices"
import {
  WALLET_FEATURE_GROUPS,
  type WalletFeature,
} from "@/data/wallets/features"
import { buildPersonaLabels } from "@/data/wallets/personas"

import WalletCard from "../_components/WalletCard"

import WalletDetailPageJsonLD from "./page-jsonld"

// Wallet data is repo-checked-in: render on first request, cache until deploy.
export const revalidate = false
export const dynamicParams = true

type WalletPageParams = PageParams & { wallet: string }

/** Standalone wallet detail: the linkable, crawlable twin of the catalog modal. */
const Page = async (props: { params: Promise<WalletPageParams> }) => {
  const { locale, wallet: walletSlug } = await props.params
  setRequestLocale(locale)

  const [t, tCommon, tItem, walletDescriptions] = await Promise.all([
    getTranslations({ locale, namespace: "page-wallets-find-wallet" }),
    getTranslations({ locale, namespace: "common" }),
    getTranslations({ locale, namespace: "component-catalog-item" }),
    getTranslations({ locale, namespace: "page-wallet-descriptions" }),
  ])

  const wallet = getWalletBySlug(walletSlug, locale, walletDescriptions)
  if (!wallet) notFound()

  const deviceLabelMap = buildDeviceLabels(t)
  const personaLabels = buildPersonaLabels(t)
  const nextWallet = getNextWallet(wallet)
  const relatedWallets = getRelatedWallets(wallet, locale, walletDescriptions, {
    exclude: getWalletSlug(nextWallet),
  })
  const lastUpdated = formatTimeAgo(locale, wallet.last_updated)

  const item: CatalogItem = {
    kind: "wallet",
    slug: wallet.slug,
    name: wallet.name,
    logo: wallet.image,
    banner: wallet.banner,
    screenshots: wallet.screenshots ?? [],
    tags: wallet.personas.map((persona) => ({ label: personaLabels[persona] })),
    subtitle:
      getDeviceLabels(wallet.devices, deviceLabelMap).join(" · ") || undefined,
    chains: wallet.supported_chains as ChainName[],
    description: wallet.descriptionStripped,
    primaryLink: {
      href: wallet.url,
      label: tItem("catalog-item-visit-website"),
    },
    socialLinks: getWalletSocialLinks(wallet),
    infoRows: [
      wallet.supportedLanguages.length > 0 && {
        label: t("page-find-wallet-info-languages"),
        value: <CatalogItemLanguages names={wallet.supportedLanguages} />,
      },
      wallet.fees?.length && {
        label: t("page-find-wallet-info-fees"),
        value: formatWalletFees(wallet.fees, locale, t),
      },
      lastUpdated && {
        label: t("page-find-wallet-info-last-updated"),
        value: lastUpdated,
      },
    ].filter((row) => !!row),
    breadcrumbs: [
      { label: "ethereum.org", href: "/" },
      { label: tCommon("wallets"), href: "/wallets/" },
      { label: tCommon("find-wallet"), href: "/wallets/find-wallet/" },
    ],
    next: {
      name: nextWallet.name,
      href: `/wallets/find-wallet/${getWalletSlug(nextWallet)}/`,
    },
  }

  const renderFeature = (feature: WalletFeature) => {
    const supported = Boolean(wallet[feature.key])
    return (
      <li key={feature.key} className="mb-2 flex flex-row gap-2">
        {supported ? (
          <CheckCircle className="shrink-0" />
        ) : (
          <XCircle className="shrink-0" />
        )}
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
      <CatalogItemLayout
        item={item}
        related={
          relatedWallets.length > 0 && (
            <RelatedCatalogItems title={t("page-find-wallet-related-title")}>
              {relatedWallets.map((related: CatalogWallet) => (
                <WalletCard
                  key={related.slug}
                  wallet={toCatalogCard(related, { t, locale })}
                  deviceLabels={deviceLabelMap}
                  personaLabels={personaLabels}
                />
              ))}
            </RelatedCatalogItems>
          )
        }
      >
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
      </CatalogItemLayout>
    </>
  )
}

// Empty on purpose: absent, Next renders the route dynamically on every request.
export function generateStaticParams() {
  return []
}

export async function generateMetadata(props: {
  params: Promise<WalletPageParams>
}) {
  const { locale, wallet: walletSlug } = await props.params
  setRequestLocale(locale)

  const [t, walletDescriptions] = await Promise.all([
    getTranslations({ locale, namespace: "page-wallets-find-wallet" }),
    getTranslations({ locale, namespace: "page-wallet-descriptions" }),
  ])

  const wallet = getWalletBySlug(walletSlug, locale, walletDescriptions)
  if (!wallet) return {}

  const description =
    wallet.descriptionStripped ??
    buildWalletMetaDescription(wallet, t, locale) ??
    wallet.name

  return await getMetadata({
    locale,
    slug: ["wallets", "find-wallet", walletSlug],
    title: wallet.name,
    description: description.slice(0, 160),
    image: "/images/wallets/wallet-hero.png",
  })
}

export default Page
