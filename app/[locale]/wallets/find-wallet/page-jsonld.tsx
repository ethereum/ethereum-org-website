import { getTranslations } from "next-intl/server"

import { FileContributor, Lang, WalletData } from "@/lib/types"

import PageJsonLD from "@/components/PageJsonLD"

import {
  ethereumCommunityOrganization,
  ethereumFoundationOrganization,
} from "@/lib/utils/jsonld"
import { normalizeUrlForJsonLd } from "@/lib/utils/url"

export default async function FindWalletPageJsonLD({
  locale,
  contributors,
  wallets,
}: {
  locale: Lang | undefined
  contributors: FileContributor[]
  wallets: WalletData[]
}) {
  const t = await getTranslations({
    namespace: "page-wallets-find-wallet",
  })

  const url = normalizeUrlForJsonLd(locale, `/wallets/find-wallet/`)

  const contributorList = contributors.map((contributor) => ({
    "@type": "Person",
    name: contributor.login,
    url: contributor.html_url,
  }))

  const platforms = (wallet: WalletData): string[] => {
    const os: string[] = []
    if (wallet.ios) os.push("iOS")
    if (wallet.android) os.push("Android")
    if (wallet.linux) os.push("Linux")
    if (wallet.windows) os.push("Windows")
    if (wallet.macOS) os.push("macOS")
    if (wallet.chromium) os.push("Chrome OS")
    if (wallet.firefox) os.push("Firefox")
    if (wallet.hardware) os.push("Hardware")
    return os
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": url,
        name: t("page-find-wallet-meta-title"),
        description: t("page-find-wallet-meta-description"),
        url: url,
        inLanguage: locale,
        contributor: contributorList,
        author: [ethereumCommunityOrganization],
        isPartOf: {
          "@type": "WebSite",
          "@id": "https://ethereum.org/#website",
          name: "ethereum.org",
          url: "https://ethereum.org",
        },
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
        publisher: ethereumFoundationOrganization,
        reviewedBy: ethereumFoundationOrganization,
        mainEntity: { "@id": `${url}#wallet-list` },
      },
      {
        "@type": "ItemList",
        "@id": `${url}#wallet-list`,
        name: t("page-find-wallet-title"),
        description: t("page-find-wallet-meta-description"),
        numberOfItems: wallets.length,
        itemListElement: wallets.map((wallet, index) => ({
          "@type": "ListItem",
          position: index + 1,
          item: {
            "@type": "SoftwareApplication",
            name: wallet.name,
            url: wallet.url,
            applicationCategory: "Cryptocurrency Wallet",
            operatingSystem: platforms(wallet).join(", "),
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
        })),
      },
    ],
  }

  return <PageJsonLD structuredData={jsonLd} />
}
