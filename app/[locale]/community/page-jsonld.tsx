import { getTranslations } from "next-intl/server"

import { FileContributor } from "@/lib/types"

import PageJsonLD from "@/components/PageJsonLD"

import {
  ethereumCommunityOrganization,
  ethereumFoundationOrganization,
} from "@/lib/utils/jsonld"
import { normalizeUrlForJsonLd } from "@/lib/utils/url"

export default async function CommunityJsonLD({
  locale,
  contributors,
}: {
  locale: string
  contributors: FileContributor[]
}) {
  const t = await getTranslations({ namespace: "page-community" })

  const url = normalizeUrlForJsonLd(locale, `/community/`)

  const contributorList = contributors.map((contributor) => ({
    "@type": "Person",
    name: contributor.login,
    url: contributor.html_url,
  }))

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": url,
        name: t("page-community-meta-title"),
        description: t("page-community-meta-description"),
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
              name: t("page-community-meta-title"),
              item: url,
            },
          ],
        },
        publisher: ethereumFoundationOrganization,
        reviewedBy: ethereumFoundationOrganization,
        mainEntity: { "@id": `${url}#resources` },
      },
      {
        "@type": "ItemList",
        "@id": `${url}#resources`,
        name: t("page-community-meta-title"),
        description: t("page-community-meta-description"),
        url: url,
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
        publisher: ethereumFoundationOrganization,
        reviewedBy: ethereumFoundationOrganization,
      },
    ],
  }

  return <PageJsonLD structuredData={jsonLd} />
}
