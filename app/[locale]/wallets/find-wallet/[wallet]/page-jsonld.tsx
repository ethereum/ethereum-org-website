import { getTranslations } from "next-intl/server"

import PageJsonLD from "@/components/PageJsonLD"

import { normalizeUrlForJsonLd } from "@/lib/utils/url"
import type { CatalogWallet } from "@/lib/utils/walletData"
import { getWalletPlatforms } from "@/lib/utils/walletData"

import { BASE_GRAPH_NODES } from "@/lib/jsonld/constants"
import { REFERENCE } from "@/lib/jsonld/references"

export default async function WalletDetailPageJsonLD({
  locale,
  wallet,
}: {
  locale: string
  wallet: CatalogWallet
}) {
  const t = await getTranslations({
    locale,
    namespace: "page-wallets-find-wallet",
  })

  const url = normalizeUrlForJsonLd(
    locale,
    `/wallets/find-wallet/${wallet.slug}/`
  )
  const os = getWalletPlatforms(wallet)

  const sameAs = [
    wallet.twitter,
    wallet.discord,
    wallet.reddit,
    wallet.telegram,
    wallet.repo_url,
  ].filter(Boolean)

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      ...BASE_GRAPH_NODES,
      {
        "@type": "WebPage",
        "@id": url,
        name: wallet.name,
        ...(wallet.descriptionStripped && {
          description: wallet.descriptionStripped,
        }),
        url,
        inLanguage: locale,
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
              name: t("page-find-wallet-title"),
              item: normalizeUrlForJsonLd(locale, "/wallets/find-wallet/"),
            },
            {
              "@type": "ListItem",
              position: 3,
              name: wallet.name,
              item: url,
            },
          ],
        },
        publisher: REFERENCE.ETHEREUM_FOUNDATION,
        reviewedBy: REFERENCE.ETHEREUM_FOUNDATION,
        mainEntity: { "@id": `${url}#wallet` },
      },
      {
        "@type": "SoftwareApplication",
        "@id": `${url}#wallet`,
        name: wallet.name,
        ...(wallet.descriptionStripped && {
          description: wallet.descriptionStripped,
        }),
        url: wallet.url,
        applicationCategory: "Cryptocurrency Wallet",
        ...(os.length > 0 && { operatingSystem: os.join(", ") }),
        ...(wallet.repo_url && { codeRepository: wallet.repo_url }),
        ...(sameAs.length > 0 && { sameAs }),
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
        ],
      },
    ],
  }

  return <PageJsonLD structuredData={jsonLd} />
}
