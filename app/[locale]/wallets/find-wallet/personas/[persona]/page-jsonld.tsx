import { getTranslations } from "next-intl/server"

import PageJsonLD from "@/components/PageJsonLD"

import { normalizeUrlForJsonLd } from "@/lib/utils/url"
import type { CatalogWallet } from "@/lib/utils/walletData"

import { BASE_GRAPH_NODES } from "@/lib/jsonld/constants"
import { REFERENCE } from "@/lib/jsonld/references"

type Persona = {
  id: string
  titleKey: string
  descKey: string
  heroTitleKey: string
  heroDescKey: string
}

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
  // Hero title matches the page <title>/H1; short titleKey stays the crumb leaf.
  const name = t(persona.heroTitleKey)

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      ...BASE_GRAPH_NODES,
      {
        "@type": "CollectionPage",
        "@id": url,
        name,
        description: t(persona.heroDescKey),
        image: normalizeUrlForJsonLd(
          undefined,
          "/images/wallets/wallet-hero.png"
        ),
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
              name: t(persona.titleKey),
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
        name,
        description: t(persona.descKey),
        numberOfItems: wallets.length,
        itemListElement: wallets.map((wallet, index) => ({
          "@type": "ListItem",
          position: index + 1,
          item: {
            "@type": "SoftwareApplication",
            name: wallet.name,
            ...(wallet.descriptionStripped && {
              description: wallet.descriptionStripped,
            }),
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
