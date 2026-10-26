import { notFound } from "next/navigation"
import { getTranslations, setRequestLocale } from "next-intl/server"

import type { CatalogItem, PageParams } from "@/lib/types"

import CatalogItemLayout, {
  RelatedCatalogItems,
} from "@/components/CatalogItem"
import InlineLink from "@/components/ui/Link"

import { getMetadata } from "@/lib/utils/metadata"
import {
  getNetworkHref,
  getNextNetwork,
  getRelatedNetworks,
  toNetworkCard,
} from "@/lib/utils/networkData"

import NetworkCard from "../_components/NetworkCard"
import NetworkMaturityTag from "../_components/NetworkMaturityTag"
import NetworkUsageChart from "../_components/NetworkUsageChart"
import { getNetworks } from "../_lib/networks"

import NetworkDetailPageJsonLD from "./page-jsonld"

export const dynamicParams = true

type NetworkPageParams = PageParams & { network: string }

const getNetworkPage = async (locale: string, slug: string) => {
  const { networks, walletsTotal } = await getNetworks()
  const network = networks.find((entry) => entry.slug === slug)
  if (!network) return null

  const tLayer2 = await getTranslations({ locale, namespace: "page-layer-2" })
  const toCard = (entry: typeof network) =>
    toNetworkCard(entry, {
      locale,
      description: tLayer2(entry.description),
      walletsTotal,
    })
  return { network, networks, toCard, card: toCard(network) }
}

/** Standalone network detail: the linkable, crawlable twin of the catalog modal. */
const Page = async (props: { params: Promise<NetworkPageParams> }) => {
  const { locale, network: slug } = await props.params
  setRequestLocale(locale)

  const page = await getNetworkPage(locale, slug)
  if (!page) notFound()
  const { network, networks, toCard, card } = page

  const t = await getTranslations({
    locale,
    namespace: "page-layer-2-networks",
  })
  const maturityLabel = t(
    `page-layer-2-networks-${network.networkMaturity}-label`
  )
  const next = getNextNetwork(network, networks)
  const related = getRelatedNetworks(network, networks, { exclude: next.slug })

  const item: CatalogItem = {
    kind: "network",
    slug: network.slug,
    name: network.name,
    logo: network.logo,
    screenshots: [],
    tags: [
      {
        label: maturityLabel,
        node: (
          <NetworkMaturityTag
            maturity={network.networkMaturity}
            label={maturityLabel}
          />
        ),
      },
    ],
    chains: [],
    description: card.description,
    primaryLink: {
      href: network.bridgeLink,
      label: `${t("page-layer-2-networks-bridge-to")} ${network.name}`,
    },
    secondaryLinks: [
      {
        href: network.applicationsLink,
        label: t("page-layer-2-networks-view-apps"),
      },
      {
        href: network.website,
        label: t("page-layer-2-networks-official-website"),
      },
    ],
    socialLinks: [],
    infoRows: [
      {
        label: t("page-layer-2-networks-market-share"),
        value: card.tvl,
        tooltip: t("page-layer-2-networks-market-share-description"),
      },
      {
        label: t("page-layer-2-networks-age"),
        value: card.age ?? "-",
        tooltip: t("page-layer-2-networks-show-how-long"),
      },
      {
        label: t("page-layer-2-networks-wallet-support"),
        value: (
          <InlineLink href={card.walletsHref}>{card.walletSupport}</InlineLink>
        ),
        tooltip: t("page-layer-2-networks-how-many-wallet-support"),
      },
      {
        label: t("page-layer-2-networks-active-address"),
        value: card.activeAddresses ?? "-",
        tooltip: t("page-layer-2-networks-active-address-number"),
      },
      {
        label: t("page-layer-2-networks-fee-token"),
        value: card.feeToken,
        tooltip: t("page-layer-2-networks-token-used-to-pay"),
      },
      {
        label: t("page-layer-2-networks-avg-transaction-fee"),
        value: card.txFee ?? "-",
        tooltip: t("page-layer-2-networks-transaction-fee-description"),
      },
    ],
    breadcrumbSlug: `/layer-2/networks/${network.slug}`,
    next: { name: next.name, href: getNetworkHref(next.slug) },
  }

  const analysisLinks = [
    {
      href: network.l2BeatLink,
      label: t("page-layer-2-networks-risk-analysis"),
      caption: t("page-layer-2-networks-assessment-by-l2beat"),
      action: "l2beat_profiles",
    },
    {
      href: network.growthepieLink,
      label: t("page-layer-2-networks-detailed-analytics"),
      caption: t("page-layer-2-networks-assessment-by-growthepie"),
      action: "analytics_profiles",
    },
  ]

  return (
    <>
      <NetworkDetailPageJsonLD
        locale={locale}
        network={network}
        description={card.description}
      />
      <CatalogItemLayout
        item={item}
        related={
          related.length > 0 && (
            <RelatedCatalogItems
              title={t("page-layer-2-networks-similar-title")}
            >
              {related.map((entry) => (
                <NetworkCard
                  key={entry.slug}
                  network={toCard(entry)}
                  maturityLabel={t(
                    `page-layer-2-networks-${entry.networkMaturity}-label`
                  )}
                  walletsCount={t.raw("page-layer-2-networks-wallets-count")}
                  href={getNetworkHref(entry.slug)}
                />
              ))}
            </RelatedCatalogItems>
          )
        }
      >
        <div className="flex flex-wrap gap-x-10 gap-y-4">
          {analysisLinks.map(({ href, label, caption, action }) => (
            <div key={href} className="flex flex-col gap-0.5">
              <InlineLink
                href={href}
                customEventOptions={{
                  eventCategory: "l2_networks",
                  eventAction: action,
                  eventName: network.name,
                }}
              >
                {label}
              </InlineLink>
              <p className="text-xs text-body-medium">{caption}</p>
            </div>
          ))}
        </div>
        {network.blockspaceData && (
          <div className="w-fit rounded-2xl bg-background p-4">
            <h3 className="text-sm font-bold text-body-medium">
              {t("page-layer-2-networks-network-usage")}
            </h3>
            <NetworkUsageChart
              usageData={network.blockspaceData}
              labels={{
                nft: t("page-layer-2-networks-usage-nft"),
                defi: t("page-layer-2-networks-usage-defi"),
                social: t("page-layer-2-networks-usage-social"),
                token_transfers: t(
                  "page-layer-2-networks-usage-token-transfers"
                ),
                unlabeled: t("page-layer-2-networks-usage-unlabeled"),
              }}
            />
          </div>
        )}
      </CatalogItemLayout>
    </>
  )
}

// Empty on purpose: absent, Next renders the route dynamically on every request.
export function generateStaticParams() {
  return []
}

export async function generateMetadata(props: {
  params: Promise<NetworkPageParams>
}) {
  const { locale, network: slug } = await props.params
  setRequestLocale(locale)

  const page = await getNetworkPage(locale, slug)
  if (!page) return {}

  return await getMetadata({
    locale,
    slug: ["layer-2", "networks", slug],
    title: page.network.name,
    description: page.card.description.slice(0, 160),
    image: "/images/heroes/layer-2-hub-hero.png",
  })
}

export default Page
