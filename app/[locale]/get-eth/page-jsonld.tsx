import { getTranslations } from "next-intl/server"

import { FileContributor, Lang } from "@/lib/types"

import PageJsonLD from "@/components/PageJsonLD"

import { normalizeUrlForJsonLd } from "@/lib/utils/url"

import { BASE_GRAPH_NODES } from "@/lib/jsonld/constants"
import { REFERENCE } from "@/lib/jsonld/references"

export default async function GetEthPageJsonLD({
  locale,
  lastEditLocaleTimestamp,
  contributors,
}: {
  locale: Lang | undefined
  lastEditLocaleTimestamp: string | null
  contributors: FileContributor[]
}) {
  const t = await getTranslations("page-get-eth")

  const url = normalizeUrlForJsonLd(locale, `/get-eth/`)

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
        name: t("page-get-eth-meta-title"),
        description: t("page-get-eth-meta-description"),
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
              name: t("page-get-eth-meta-title"),
              item: normalizeUrlForJsonLd(locale, "/get-eth/"),
            },
          ],
        },
        publisher: REFERENCE.ETHEREUM_FOUNDATION,
        reviewedBy: REFERENCE.ETHEREUM_FOUNDATION,
        mainEntity: { "@id": `${url}#get-eth` },
      },
      {
        "@type": "Article",
        "@id": `${url}#get-eth`,
        headline: t("page-get-eth-where-to-buy-title"),
        description: t("page-get-eth-meta-description"),
        image: "https://ethereum.org/images/get-eth.png", // TODO: adjust value when the old theme breakpoints are removed (src/theme.ts)
        contributor: contributorList,
        author: [REFERENCE.ETHEREUM_COMMUNITY],
        publisher: REFERENCE.ETHEREUM_FOUNDATION,
        ...(lastEditLocaleTimestamp && {
          dateModified: lastEditLocaleTimestamp,
        }),
      },
    ],
  }

  return <PageJsonLD structuredData={jsonLd} />
}
