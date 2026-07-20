import { getTranslations } from "next-intl/server"

import PageJsonLD from "@/components/PageJsonLD"

import { normalizeUrlForJsonLd } from "@/lib/utils/url"
import type { CatalogWallet } from "@/lib/utils/walletData"

import { BASE_GRAPH_NODES } from "@/lib/jsonld/constants"
import { REFERENCE } from "@/lib/jsonld/references"

type Persona = { id: string; titleKey: string; descKey: string }

export default async function PersonaPageJsonLD({
  locale,
  persona,
  wallets,
}: {
  locale: string
  persona: Persona
  wallets: CatalogWallet[]
}) {
  const t = await getTranslations({
    locale,
    namespace: "page-wallets-find-wallet",
  })

  const url = normalizeUrlForJsonLd(
    locale,
    `/wallets/find-wallet/personas/${persona.id}/`
  )
  const title = t(persona.titleKey)

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      ...BASE_GRAPH_NODES,
      {
        "@type": "CollectionPage",
        "@id": url,
        name: title,
        description: t(persona.descKey),
        url,
        inLanguage: locale,
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
              name: title,
              item: url,
            },
          ],
        },
        publisher: REFERENCE.ETHEREUM_FOUNDATION,
        mainEntity: { "@id": `${url}#wallet-list` },
      },
      {
        "@type": "ItemList",
        "@id": `${url}#wallet-list`,
        name: title,
        numberOfItems: wallets.length,
        itemListElement: wallets.map((wallet, index) => ({
          "@type": "ListItem",
          position: index + 1,
          item: {
            "@type": "SoftwareApplication",
            name: wallet.name,
            url: normalizeUrlForJsonLd(
              locale,
              `/wallets/find-wallet/${wallet.slug}/`
            ),
            applicationCategory: "Cryptocurrency Wallet",
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "USD",
            },
          },
        })),
      },
    ],
  }

  return <PageJsonLD structuredData={jsonLd} />
}
