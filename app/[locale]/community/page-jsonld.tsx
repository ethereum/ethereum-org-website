import { getTranslations } from "next-intl/server"

import { FileContributor } from "@/lib/types"

import PageJsonLD from "@/components/PageJsonLD"

import { normalizeUrlForJsonLd } from "@/lib/utils/url"

import { BASE_GRAPH_NODES } from "@/lib/jsonld/constants"
import { REFERENCE } from "@/lib/jsonld/references"

export default async function CommunityJsonLD({
  locale,
  contributors,
}: {
  locale: string
  contributors: FileContributor[]
}) {
  const t = await getTranslations("page-community")

  const url = normalizeUrlForJsonLd(locale, `/community/`)

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
        name: t("page-community-meta-title"),
        description: t("page-community-meta-description"),
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
              name: t("page-community-meta-title"),
              item: url,
            },
          ],
        },
        publisher: REFERENCE.ETHEREUM_FOUNDATION,
        reviewedBy: REFERENCE.ETHEREUM_FOUNDATION,
        mainEntity: { "@id": `${url}#resources` },
      },
      {
        "@type": "ItemList",
        "@id": `${url}#resources`,
        name: t("page-community-meta-title"),
        description: t("page-community-meta-description"),
        url,
        numberOfItems: 4,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: t("page-community-card-1-title"),
            description: t("page-community-card-1-description"),
            url: normalizeUrlForJsonLd(locale, "/community/online/"),
          },
          {
            "@type": "ListItem",
            position: 2,
            name: t("page-community-card-2-title"),
            description: t("page-community-card-2-description"),
            url: normalizeUrlForJsonLd(locale, "/community/events/"),
          },
          {
            "@type": "ListItem",
            position: 3,
            name: t("page-community-card-3-title"),
            description: t("page-community-card-3-description"),
            url: normalizeUrlForJsonLd(locale, "/community/get-involved/"),
          },
          {
            "@type": "ListItem",
            position: 4,
            name: t("page-community-card-4-title"),
            description: t("page-community-card-4-description"),
            url: normalizeUrlForJsonLd(locale, "/community/grants/"),
          },
        ],
        publisher: REFERENCE.ETHEREUM_FOUNDATION,
      },
    ],
  }

  return <PageJsonLD structuredData={jsonLd} />
}
