import { getTranslations } from "next-intl/server"

import { FileContributor } from "@/lib/types"

import PageJsonLD from "@/components/PageJsonLD"

import {
  ethereumCommunityOrganization,
  ethereumFoundationOrganization,
} from "@/lib/utils/jsonld"
import { normalizeUrlForJsonLd } from "@/lib/utils/url"

import type { DeveloperApp, DeveloperAppCategorySlug } from "../types"

export default async function DevelopersAppsCategoryJsonLD({
  locale,
  category,
  categoryApps,
  contributors,
}: {
  locale: string
  category: DeveloperAppCategorySlug
  categoryApps: DeveloperApp[]
  contributors: FileContributor[]
}) {
  const t = await getTranslations({ namespace: "page-developers-apps" })

  const url = normalizeUrlForJsonLd(locale, `/developers/apps/${category}`)

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
        name: t(`page-developers-apps-category-${category}-title`),
        description: t(
          `page-developers-apps-category-${category}-meta-description`
        ),
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
              item: normalizeUrlForJsonLd(locale, "/developers/apps/"),
            },
            {
              "@type": "ListItem",
              position: 4,
              name: t(`page-developers-apps-category-${category}-title`),
              item: url,
            },
          ],
        },
        publisher: ethereumFoundationOrganization,
        reviewedBy: ethereumFoundationOrganization,
        mainEntity: { "@id": `${url}#category-apps` },
      },
      {
        "@type": "ItemList",
        "@id": `${url}#category-apps`,
        name: t(`page-developers-apps-category-${category}-title`),
        description: t(`page-developers-apps-category-${category}-description`),
        url: url,
        numberOfItems: categoryApps.length,
        itemListElement: categoryApps.slice(0, 10).map((app, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: app.name,
          description: app.description,
          url: app.website,
        })),
      },
    ],
  }

  return <PageJsonLD structuredData={jsonLd} />
}
