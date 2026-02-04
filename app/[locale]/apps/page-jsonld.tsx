import { getTranslations } from "next-intl/server"

import { FileContributor } from "@/lib/types"

import PageJsonLD from "@/components/organisms/PageJsonLD"

import {
  ethereumCommunityOrganization,
  ethereumFoundationOrganization,
} from "@/lib/utils/jsonld"
import { normalizeUrlForJsonLd } from "@/lib/utils/url"

import { appsCategories } from "@/data/apps/categories"

export default async function AppsJsonLD({
  locale,
  contributors,
}: {
  locale: string
  contributors: FileContributor[]
}) {
  const t = await getTranslations({ namespace: "page-apps" })

  const url = normalizeUrlForJsonLd(locale, "/apps/")

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
        name: t("page-apps-meta-title"),
        description: t("page-apps-meta-description"),
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
              name: t("page-apps-meta-title"),
              item: url,
            },
          ],
        },
        publisher: ethereumFoundationOrganization,
        reviewedBy: ethereumFoundationOrganization,
        mainEntity: { "@id": `${url}#apps` },
      },
      {
        "@type": "ItemList",
        "@id": `${url}#apps`,
        name: t("page-apps-categories-title"),
        description: t("page-apps-meta-description"),
        url: url,
        numberOfItems: Object.keys(appsCategories).length,
        itemListElement: Object.values(appsCategories).map(
          (category, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: t(category.name),
            description: t(category.description),
            url: normalizeUrlForJsonLd(
              locale,
              `/apps/categories/${category.slug}`
            ),
          })
        ),
      },
    ],
  }

  return <PageJsonLD structuredData={jsonLd} />
}
