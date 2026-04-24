import { getTranslations } from "next-intl/server"

import PageJsonLD from "@/components/PageJsonLD"

import { normalizeUrlForJsonLd } from "@/lib/utils/url"

import { BASE_GRAPH_NODES, REFERENCE } from "@/lib/jsonld/constants"

export default async function StablecoinsPageJsonLD({ locale, contributors }) {
  const t = await getTranslations("page-stablecoins")

  const url = normalizeUrlForJsonLd(locale, `/stablecoins/`)

  const contributorList = contributors.map((contributor) => ({
    "@type": "Person",
    name: contributor.login,
    url: contributor.html_url,
  }))

  const webPageId = { "@id": url }
  const articleId = { "@id": `${url}#stablecoins` }

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      ...BASE_GRAPH_NODES,
      {
        "@type": "WebPage",
        ...webPageId,
        name: t("page-stablecoins-meta-title"),
        description: t("page-stablecoins-meta-description"),
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
              name: t("page-stablecoins-meta-title"),
              item: url,
            },
          ],
        },
        publisher: REFERENCE.ETHEREUM_FOUNDATION,
        reviewedBy: REFERENCE.ETHEREUM_FOUNDATION,
        mainEntity: articleId,
      },
      {
        "@type": "Article",
        ...articleId,
        isPartOf: webPageId,
        headline: t("page-stablecoins-title"),
        description: t("page-stablecoins-meta-description"),
        image: "https://ethereum.org/images/stablecoins/hero.png",
        author: [REFERENCE.ETHEREUM_COMMUNITY],
        contributor: contributorList,
        publisher: REFERENCE.ETHEREUM_FOUNDATION,
        about: {
          "@type": "Thing",
          name: "Stablecoins",
          description:
            "Digital currencies pegged to stable assets like the US dollar",
        },
      },
    ],
  }

  return <PageJsonLD structuredData={jsonLd} />
}
