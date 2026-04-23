import { getTranslations } from "next-intl/server"

import { FileContributor, Lang } from "@/lib/types"

import PageJsonLD from "@/components/PageJsonLD"

import { BASE_GRAPH_NODES, REFERENCE } from "@/lib/jsonld/constants"
import { normalizeUrlForJsonLd } from "@/lib/utils/url"

export default async function StartPageJsonLD({
  locale,
  contributors,
}: {
  locale: Lang | undefined
  contributors: FileContributor[]
}) {
  const t = await getTranslations("page-start")

  const url = normalizeUrlForJsonLd(locale, `/start/`)

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
        "@type": "WebPage",
        "@id": url,
        name: t("page-start-meta-title"),
        description: t("page-start-meta-description"),
        url: url,
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
              name: t("page-start-meta-title"),
              item: url,
            },
          ],
        },
        publisher: REFERENCE.ETHEREUM_FOUNDATION,
        reviewedBy: REFERENCE.ETHEREUM_FOUNDATION,
        mainEntity: { "@id": `${url}#start` },
      },
      {
        "@type": "Article",
        "@id": `${url}#start`,
        headline: t("page-start-title"),
        description: t("page-start-meta-description"),
        image: "https://ethereum.org/images/heroes/developers-hub-hero.jpg",
        author: [REFERENCE.ETHEREUM_COMMUNITY],
        publisher: REFERENCE.ETHEREUM_FOUNDATION,
        contributor: contributorList,
        about: {
          "@type": "Thing",
          name: "Getting Started with Ethereum",
          description:
            "Beginner's guide to getting started with Ethereum, crypto wallets, and web3",
        },
      },
    ],
  }

  return <PageJsonLD structuredData={jsonLd} />
}
