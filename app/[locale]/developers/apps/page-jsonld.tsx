import { getTranslations } from "next-intl/server"

import { FileContributor } from "@/lib/types"

import PageJsonLD from "@/components/PageJsonLD"

import {
  ethereumCommunityOrganization,
  ethereumFoundationOrganization,
} from "@/lib/utils/jsonld"
import { normalizeUrlForJsonLd } from "@/lib/utils/url"

import { DEV_APP_CATEGORIES } from "./constants"

export default async function DevelopersAppsJsonLD({
  locale,
  contributors,
}: {
  locale: string
  contributors: FileContributor[]
}) {
  const t = await getTranslations({ namespace: "page-developers-apps" })

  const url = normalizeUrlForJsonLd(locale, "/developers/apps/")

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
        name: t("page-developers-apps-meta-title"),
        description: t("page-developers-apps-meta-description"),
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
              name: "Developers",
              item: normalizeUrlForJsonLd(locale, "/developers/"),
            },
            {
              "@type": "ListItem",
              position: 3,
              name: t("page-developers-apps-meta-title"),
              item: url,
            },
          ],
        },
        publisher: ethereumFoundationOrganization,
        reviewedBy: ethereumFoundationOrganization,
        mainEntity: { "@id": `${url}#developer-apps` },
      },
      {
        "@type": "ItemList",
        "@id": `${url}#developer-apps`,
        name: t("page-developers-apps-categories-title"),
        description: t("page-developers-apps-meta-description"),
        url: url,
        numberOfItems: DEV_APP_CATEGORIES.length,
        itemListElement: DEV_APP_CATEGORIES.map((category, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: t(`page-developers-apps-category-${category.slug}-title`),
          description: t(
            `page-developers-apps-category-${category.slug}-description`
          ),
          url: normalizeUrlForJsonLd(
            locale,
            `/developers/apps/${category.slug}`
          ),
        })),
      },
    ],
  }

  return <PageJsonLD structuredData={jsonLd} />
}
