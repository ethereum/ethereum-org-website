import { getTranslations } from "next-intl/server"

import { FileContributor, Lang } from "@/lib/types"

import PageJsonLD from "@/components/PageJsonLD"

import { normalizeUrlForJsonLd } from "@/lib/utils/url"
import type { CatalogWallet } from "@/lib/utils/walletData"
import { getWalletPlatforms } from "@/lib/utils/walletData"

import { BASE_GRAPH_NODES } from "@/lib/jsonld/constants"
import { REFERENCE } from "@/lib/jsonld/references"
import { WALLET_APPLICATION_CATEGORY } from "@/lib/jsonld/software"

export default async function FindWalletPageJsonLD({
  locale,
  contributors,
  wallets,
}: {
  locale: Lang
  contributors: FileContributor[]
  wallets: CatalogWallet[]
}) {
  const t = await getTranslations({
    locale,
    namespace: "page-wallets-find-wallet",
  })

  const url = normalizeUrlForJsonLd(locale, `/wallets/find-wallet/`)

  const contributorList = contributors.map((contributor) => ({
    "@type": "Person",
    name: contributor.login,
    url: contributor.html_url,
  }))

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      ...BASE_GRAPH_NODES,
      {
        "@type": "CollectionPage",
        "@id": url,
        name: t("page-find-wallet-meta-title"),
        description: t("page-find-wallet-meta-description"),
        image: normalizeUrlForJsonLd(
          undefined,
          "/images/wallets/wallet-hero.png"
        ),
        url,
        inLanguage: locale,
        contributor: contributorList,
        author: [REFERENCE.ETHEREUM_COMMUNITY],
        isPartOf: REFERENCE.ETHEREUM_ORG_WEBSITE,
        breadcrumb: {
          "@type": "BreadcrumbList",
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: "Home",
              item: normalizeUrlForJsonLd(locale, "/"),
            },
            {
              "@type": "ListItem",
              position: 2,
              name: "Wallets",
              item: normalizeUrlForJsonLd(locale, "/wallets/"),
            },
            {
              "@type": "ListItem",
              position: 3,
              name: t("page-find-wallet-meta-title"),
              item: url,
            },
          ],
        },
        publisher: REFERENCE.ETHEREUM_FOUNDATION,
        reviewedBy: REFERENCE.ETHEREUM_FOUNDATION,
        mainEntity: { "@id": `${url}#wallet-list` },
      },
      {
        "@type": "ItemList",
        "@id": `${url}#wallet-list`,
        name: t("page-find-wallet-title"),
        description: t("page-find-wallet-meta-description"),
        numberOfItems: wallets.length,
        itemListElement: wallets.map((wallet, index) => {
          const os = getWalletPlatforms(wallet)
          const detailUrl = normalizeUrlForJsonLd(
            locale,
            `/wallets/find-wallet/${wallet.slug}/`
          )
          return {
            "@type": "ListItem",
            position: index + 1,
            item: {
              "@type": "SoftwareApplication",
              // Same node as the detail page's, so a wallet is one entity
              // across the index, its persona pages, and its own page.
              "@id": `${detailUrl}#wallet`,
              name: wallet.name,
              url: wallet.url,
              ...WALLET_APPLICATION_CATEGORY,
              ...(os.length > 0 && {
                operatingSystem: os.join(", "),
              }),
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "USD",
              },
              additionalProperty: [
                {
                  "@type": "PropertyValue",
                  name: "Open Source",
                  value: wallet.open_source ? "Yes" : "No",
                },
                {
                  "@type": "PropertyValue",
                  name: "Self Custody",
                  value: wallet.non_custodial ? "Yes" : "No",
                },
                {
                  "@type": "PropertyValue",
                  name: "Hardware Wallet Support",
                  value: wallet.hardware_support ? "Yes" : "No",
                },
                {
                  "@type": "PropertyValue",
                  name: "Layer 2 Support",
                  value: wallet.layer_2 ? "Yes" : "No",
                },
                {
                  "@type": "PropertyValue",
                  name: "Staking",
                  value: wallet.staking ? "Yes" : "No",
                },
                {
                  "@type": "PropertyValue",
                  name: "NFT Support",
                  value: wallet.nft_support ? "Yes" : "No",
                },
              ],
            },
          }
        }),
      },
    ],
  }

  return <PageJsonLD structuredData={jsonLd} />
}
